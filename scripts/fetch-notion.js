import notionClient from "@notionhq/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const Client = notionClient.Client || notionClient;
const notion = new Client({
  auth: process.env.NOTION_KEY || process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

function getFullText(arr) {
  if (!arr || !Array.isArray(arr)) return "";
  return arr.map((item) => item.plain_text || "").join("");
}

function getTags(prop) {
  if (!prop) return [];
  if (prop.type === "multi_select" && prop.multi_select) {
    return prop.multi_select.map((item) => item.name);
  }
  if (prop.type === "select" && prop.select) {
    return [prop.select.name];
  }
  return [];
}

function findProp(props, targetName) {
  const key = Object.keys(props).find((k) =>
    k.toLowerCase().includes(targetName.toLowerCase()),
  );
  return key ? props[key] : null;
}

async function fetchNotionPosts() {
  try {
    if (!databaseId) {
      throw new Error(
        ".env 파일에 NOTION_DATABASE_ID가 설정되어 있지 않습니다.",
      );
    }

    let response;
    if (typeof notion.dataSources?.query === "function") {
      response = await notion.dataSources.query({ data_source_id: databaseId });
    } else if (typeof notion.databases?.query === "function") {
      response = await notion.databases.query({ database_id: databaseId });
    } else {
      throw new Error("노션 데이터베이스 조회 메서드를 찾을 수 없습니다.");
    }

    const posts = response.results.map((page) => {
      const props = page.properties || {};

      // 1. 제목 (글자 잘림 완전히 방지)
      const titlePropKey = Object.keys(props).find(
        (k) => props[k].type === "title",
      );
      const title = titlePropKey
        ? getFullText(props[titlePropKey].title)
        : "제목 없음";

      // 2. 커버 이미지 (대표 사진)
      let coverImage = "";
      if (page.cover) {
        coverImage = page.cover.external?.url || page.cover.file?.url || "";
      }

      // 3. 사용 스택 & 툴 & 협업 툴 (Multi-select)
      const stacks = getTags(findProp(props, "Used Stacks"));
      const tools = getTags(findProp(props, "Used Tools"));
      const collaboration = getTags(findProp(props, "Used Collaborat"));
      const where = getTags(findProp(props, "Where"));
      const tags = getTags(findProp(props, "태그"));

      const dateProp =
        findProp(props, "프로젝트 기간") || findProp(props, "Date");
      let dateStr = "";
      if (dateProp?.type === "date" && dateProp.date) {
        const start = dateProp.date.start || "";
        const end = dateProp.date.end || "";
        dateStr = end ? `${start} ~ ${end}` : start;
      }

      const typeProp = findProp(props, "프로젝트 유형");
      const projectType = typeProp?.select?.name || "";

      const summaryProp = findProp(props, "Summary") || findProp(props, "설명");
      const summary =
        summaryProp?.type === "rich_text"
          ? getFullText(summaryProp.rich_text)
          : "";

      return {
        id: page.id,
        title,
        coverImage,
        tags,
        stacks,
        tools,
        collaboration,
        where,
        date: dateStr,
        projectType,
        summary,
        url: page.url,
      };
    });

    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(publicDir, "notion-posts.json"),
      JSON.stringify(posts, null, 2),
    );

    console.log(
      "노션 전체 데이터 추출 성공! (public/notion-posts.json 생성 완료)",
    );
  } catch (error) {
    console.error("노션 데이터 추출 실패:", error.message || error);
  }
}

fetchNotionPosts();
