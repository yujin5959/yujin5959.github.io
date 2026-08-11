import { useState } from "react";
import { useBlogPosts } from "../api/blog";
import {
  useNotionProjects,
  type NotionProject,
} from "../api/useNotionProjects";
import { PORTFOLIO_DATA } from "../data/PortfolioData";

function ProjectCard({ project }: { project: NotionProject }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="overflow-hidden bg-neutral-900/30 hover:bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 rounded-xl transition-all space-y-0 group">
      {project.coverImage && !imageError && (
        <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-neutral-950/50 border-b border-neutral-800/60">
          <img
            src={project.coverImage}
            alt={project.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </div>
      )}

      <div className="p-6 sm:p-7 space-y-4">
        {/* 상단: 유형 / 위치 & 날짜 */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 items-center">
            {project.projectType && (
              <span className="px-2 py-0.5 text-[11px] font-medium bg-neutral-800 text-neutral-300 rounded-md border border-neutral-700/50">
                {project.projectType}
              </span>
            )}
            {project.where &&
              project.where.map((loc) => (
                <span
                  key={loc}
                  className="px-2 py-0.5 text-[11px] font-medium bg-amber-500/10 text-amber-300/90 rounded-md border border-amber-500/20"
                >
                  {loc}
                </span>
              ))}
          </div>

          {project.date && (
            <span className="text-xs text-neutral-400 font-mono">
              {project.date}
            </span>
          )}
        </div>

        {/* 프로젝트 제목 */}
        <h3 className="text-xl font-bold text-neutral-100 group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* 프로젝트 요약 / 설명 */}
        {project.summary && (
          <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
            {project.summary}
          </p>
        )}

        {/* 기술 스택 뱃지 목록 */}
        <div className="pt-2 flex flex-wrap items-center gap-1.5">
          {project.stacks &&
            project.stacks.map((stack) => (
              <span
                key={stack}
                className="px-2.5 py-1 text-xs font-mono bg-neutral-800/80 text-neutral-200 border border-neutral-700/60 rounded-md"
              >
                {stack}
              </span>
            ))}

          {project.tools &&
            project.tools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 text-xs font-mono bg-neutral-900 text-neutral-400 border border-neutral-800 rounded-md"
              >
                {tool}
              </span>
            ))}

          {project.collaboration &&
            project.collaboration.map((collab) => (
              <span
                key={collab}
                className="px-2.5 py-1 text-xs font-mono bg-neutral-900/60 text-neutral-500 border border-neutral-800/60 rounded-md"
              >
                {collab}
              </span>
            ))}
        </div>

        {/* 하단 링크 */}
        {project.url && (
          <div className="flex items-center justify-end pt-3 border-t border-neutral-800/40 text-sm">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
            >
              프로젝트 상세보기
              <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function Home() {
  // 1. 블로그 데이터
  const {
    data: posts,
    isLoading: isBlogLoading,
    isError: isBlogError,
  } = useBlogPosts(6);

  // 2. 노션 프로젝트 데이터
  const {
    data: notionProjects,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useNotionProjects();

  const { profile, skillCategories, experiences, certificates } =
    PORTFOLIO_DATA;

  return (
    <div className="space-y-28">
      {/* 1. 자기소개 섹션 */}
      <section
        id="about"
        className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-12 pt-6 scroll-mt-20"
      >
        <div className="flex-1 space-y-6">
          <div className="inline-block px-3.5 py-1.5 text-sm font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-md">
            {profile.role}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-100 tracking-tight leading-snug">
            안녕하세요, <br />
            사용자 경험을 생각하는 <br />
            프론트엔드 개발자 <br />
            <span className="text-white font-extrabold">{profile.name}</span>
            입니다.
          </h1>

          <p className="text-neutral-200 text-base sm:text-lg leading-relaxed">
            {profile.intro}
          </p>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            {profile.aboutMe}
          </p>

          {/* 프로필 인적사항 정보 */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-300 border-t border-b border-neutral-900 py-5">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-20">학교/전공</span>
              <span className="text-neutral-100 font-medium">
                {profile.school} ({profile.major})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-20">생년월일</span>
              <span className="text-neutral-100 font-medium">
                {profile.age}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-20">이메일</span>
              <a
                href={`mailto:${profile.email}`}
                className="text-neutral-100 hover:underline font-medium"
              >
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-20">위치</span>
              <span className="text-neutral-100 font-medium">
                {profile.location}
              </span>
            </div>
          </div>

          {/* 링크 버튼 */}
          <div className="flex flex-wrap gap-3 pt-2">
            {/* GitHub */}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-100 text-neutral-900 hover:bg-white font-semibold text-sm transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub ↗
            </a>

            {/* Blog (Tistory) */}
            <a
              href={profile.blog}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-medium text-sm transition-all"
            >
              {/* 티스토리 심볼 아이콘 */}
              <svg
                className="w-4 h-4 fill-current text-amber-500"
                viewBox="0 0 24 24"
              >
                <circle cx="6" cy="6" r="3" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="12" cy="12" r="3" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="18" r="3" />
              </svg>
              Blog ↗
            </a>

            {/* LinkedIn */}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-medium text-sm transition-all"
              >
                <svg
                  className="w-4 h-4 fill-current text-sky-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>

        {/* 대형 프로필 이미지 */}
        <div className="shrink-0">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-72 h-96 sm:w-80 sm:h-104 rounded-2xl object-cover border border-neutral-800 shadow-2xl transition-all duration-500"
          />
        </div>
      </section>

      {/* 2. 기술 스택 / 경험 / 자격증 섹션 */}
      <section
        id="experience"
        className="space-y-6 pt-10 border-t border-neutral-900 scroll-mt-20"
      >
        <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
          Experience & Skills
        </h2>

        <div className="space-y-5">
          {/* [1층] Tech Stack */}
          <div className="p-7 bg-neutral-900/40 border border-neutral-800/80 rounded-xl space-y-5">
            <h3 className="text-base font-semibold text-neutral-100">
              Tech Stack
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
              {skillCategories.map(function (item) {
                return (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-neutral-200">
                        {item.category}
                      </span>
                    </div>
                    <div className="pt-1">
                      <img
                        src={`https://skillicons.dev/icons?i=${item.iconKeys}`}
                        alt={item.category}
                        className="h-11 hover:scale-[1.02] transition-transform duration-200"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-7 bg-neutral-900/40 border border-neutral-800/80 rounded-xl space-y-5">
              <h3 className="text-base font-semibold text-neutral-100">
                Experience
              </h3>
              <div className="space-y-4">
                {experiences.map(function (exp, idx) {
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="text-sm font-medium text-neutral-200">
                        {exp.title}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {exp.organization} · {exp.period}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-7 bg-neutral-900/40 border border-neutral-800/80 rounded-xl space-y-5">
              <h3 className="text-base font-semibold text-neutral-100">
                Certificates
              </h3>
              <div className="space-y-4">
                {certificates.map(function (cert, idx) {
                  return (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <div>
                        <div className="font-medium text-neutral-200">
                          {cert.name}
                        </div>
                        <div className="text-xs text-neutral-400">
                          {cert.issuer}
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded font-medium">
                        {cert.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="space-y-6 pt-10 border-t border-neutral-900 scroll-mt-20"
      >
        <div className="flex justify-between items-end pb-1 border-b border-neutral-900">
          <div>
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
              Projects
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              참여했던 프로젝트 및 개인 프로젝트
            </p>
          </div>
        </div>

        {/* 1. 로딩 상태 스켈레톤 UI */}
        {isProjectLoading && (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-neutral-900/20 border border-neutral-800/50 rounded-xl overflow-hidden animate-pulse"
              >
                <div className="h-48 sm:h-56 bg-neutral-800/40 w-full" />
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="h-6 bg-neutral-800 rounded w-1/3" />
                  <div className="h-4 bg-neutral-800/60 rounded w-full" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-neutral-800/60 rounded w-16" />
                    <div className="h-6 bg-neutral-800/60 rounded w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {(isProjectError ||
          (!isProjectLoading &&
            (!notionProjects || notionProjects.length === 0))) && (
          <div className="p-8 bg-neutral-900/30 border border-neutral-800/80 rounded-xl text-center">
            <p className="text-sm text-neutral-400">
              등록된 프로젝트를 불러올 수 없습니다.
            </p>
          </div>
        )}

        {!isProjectLoading && notionProjects && notionProjects.length > 0 && (
          <div className="space-y-6">
            {notionProjects.map((project: NotionProject) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* 4. 블로그 섹션 */}
      <section
        id="blog"
        className="pt-10 border-t border-neutral-900 pb-16 scroll-mt-20"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-end pb-1 border-b border-neutral-900">
            <div>
              <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
                Tech Blog Posts
              </h2>
            </div>
            <a
              href={profile.blog}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group shrink-0"
            >
              전체 글 보기
              <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>

          {isBlogLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="p-6 bg-neutral-900/20 border border-neutral-800/50 rounded-xl space-y-4 animate-pulse"
                >
                  <div className="h-3 w-20 bg-neutral-800 rounded" />
                  <div className="space-y-2 pt-1">
                    <div className="h-5 bg-neutral-800 rounded w-full" />
                    <div className="h-5 bg-neutral-800 rounded w-3/4" />
                  </div>
                  <div className="space-y-1.5 pt-2">
                    <div className="h-3 bg-neutral-800/60 rounded w-full" />
                    <div className="h-3 bg-neutral-800/60 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. 에러 및 데이터 없음 상태 */}
          {(isBlogError ||
            (!isBlogLoading && (!posts || posts.length === 0))) && (
            <div className="p-10 bg-neutral-900/20 border border-neutral-800/60 rounded-2xl text-center space-y-4">
              <p className="text-sm text-neutral-400">
                블로그 포스트를 불러오는 중 문제가 발생했습니다.
              </p>
              <a
                href={profile.blog}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-5 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 transition-all border border-neutral-700/50"
              >
                티스토리에서 직접 확인하기 ↗
              </a>
            </div>
          )}

          {!isBlogLoading && posts && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, idx) => (
                <a
                  key={idx}
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative p-6 bg-neutral-900/30 hover:bg-neutral-900/80 border border-neutral-800/70 hover:border-neutral-700 rounded-xl transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 shadow-lg hover:shadow-neutral-950/50"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-mono">
                        {post.pubDate}
                      </span>
                      <span className="px-2 py-0.5 text-[11px] font-medium text-neutral-400 bg-neutral-800/80 rounded border border-neutral-700/40">
                        Tistory
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-neutral-200 group-hover:text-white line-clamp-2 leading-snug transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-neutral-800/40 flex items-center justify-between text-xs text-neutral-500 group-hover:text-neutral-300 font-medium transition-colors">
                    <span>Read article</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
