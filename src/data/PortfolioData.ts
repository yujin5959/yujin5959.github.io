export interface Project {
  id: number;
  title: string;
  period: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  highlights: string[];
}

export interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  status: "취득" | "예정" | "이수";
}

export interface SkillCategory {
  category: string;
  iconKeys: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "지유진",
    role: "Frontend Developer",
    school: "상명대학교",
    major: "컴퓨터과학과",
    age: "2004.05.07(만 22세)",
    email: "jinjin17104@naver.com",
    location: "서울특별시 용산구",
    intro:
      "사용자 경험을 생각하고 효율적인 프론트엔드 코드 구조를 고민하는 개발자입니다.",
    aboutMe:
      "React와 TypeScript 기반의 웹 어플리케이션 구축에 관심이 많으며, 새로운 기술을 배우고 기록하는 것을 즐깁니다.",
    github: "https://github.com/yujin5959",
    blog: "https://yujenius.tistory.com/",
    linkedin: "https://www.linkedin.com/in/jiyujin/",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
  },
  skillCategories: [
    {
      category: "Web Core",
      iconKeys: "html,css,js,ts",
    },
    {
      category: "Framework & State",
      iconKeys: "react,redux",
    },
    {
      category: "Styling",
      iconKeys: "tailwind,styledcomponents,emotion",
    },
    {
      category: "Languages",
      iconKeys: "c,py",
    },
    {
      category: "Tools & DevOps",
      iconKeys: "git,github,aws,vercel,notion",
    },
  ] as SkillCategory[],
  experiences: [
    {
      title: "멋쟁이 사자처럼 14기 FE 대표",
      organization: "멋쟁이 사자처럼",
      period: "2026.03 ~ Present",
    },
    {
      title: "SMUMC 9기 WEB 시니어 파트",
      organization: "SMUMC",
      period: "2025.09 ~ 2026.02",
    },
    {
      title: "SMUMC 8기 WEB 시니어 파트",
      organization: "SMUMC",
      period: "2025.03 ~ 2025.09",
    },
    {
      title: "멋쟁이 사자처럼 13기 FE 운영진",
      organization: "멋쟁이 사자처럼",
      period: "2025.03 ~ 2025.12",
    },
    {
      title: "멋쟁이 사자처럼 12기 FE 아기사자",
      organization: "멋쟁이 사자처럼",
      period: "2024.03 ~ 2024.12",
    },
    {
      title: "멋쟁이 사자처럼 11기 FE 아기사자",
      organization: "멋쟁이 사자처럼",
      period: "2023.03 ~ 2023.12",
    },
  ] as Experience[],
  certificates: [
    {
      name: "정보기처리기사",
      issuer: "한국산업인력공단",
      date: "2026년 예정",
      status: "예정",
    },
    {
      name: "COSS & HNH CLOUD 프로그램 수료",
      issuer: "NHN / COSS",
      status: "수료",
    },
    {
      name: "PCCE (코딩필수역량인증)",
      issuer: "프로그래머스",
      status: "취득",
    },
    {
      name: "해킹보안전문가 3급",
      issuer: "한국해킹보안협회",
      status: "취득",
    },
  ] as Certificate[],
};
