import { useQuery } from "@tanstack/react-query";

export interface NotionProject {
  id: string;
  title: string;
  coverImage?: string;
  tags?: string[];
  stacks?: string[];
  tools?: string[];
  collaboration?: string[];
  where?: string[];
  date?: string;
  projectType?: string;
  summary?: string;
  url?: string;
}

async function fetchNotionProjects(): Promise<NotionProject[]> {
  const res = await fetch("/notion-posts.json");
  if (!res.ok) return [];
  return res.json();
}

export function useNotionProjects() {
  return useQuery<NotionProject[]>({
    queryKey: ["notionProjects"],
    queryFn: fetchNotionProjects,
  });
}
