import { useQuery } from "@tanstack/react-query";

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

async function fetchLatestBlogPosts(count = 6): Promise<BlogPost[]> {
  const TISTORY_RSS_URL = "https://yujenius.tistory.com/rss"; // 본인 티스토리 주소 입력
  const RSS2JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
    TISTORY_RSS_URL,
  )}`;

  const res = await fetch(RSS2JSON_API);
  if (!res.ok) {
    throw new Error("블로그 피드를 불러오는 데 실패했습니다.");
  }

  const data = await res.json();
  if (data.status !== "ok") {
    throw new Error("RSS 데이터를 해석할 수 없습니다.");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.items.slice(0, count).map((item: any) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate.split(" ")[0], // YYYY-MM-DD
    description:
      item.description.replace(/<[^>]*>?/gm, "").slice(0, 100) + "...", // HTML 태그 제거
  }));
}

// TanStack Query Custom Hook
export function useBlogPosts(count = 3) {
  return useQuery({
    queryKey: ["latestBlogPosts", count],
    queryFn: () => fetchLatestBlogPosts(count),
    staleTime: 1000 * 60 * 30, // 30분간 캐시 유지
    gcTime: 1000 * 60 * 60, // 1시간 후 메모리 해제
  });
}
