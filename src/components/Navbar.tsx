import { NavLink } from "react-router-dom";

export function Navbar() {
  const navItems = [
    { name: "소개", path: "#about" },
    { name: "스택 & 자격증", path: "#experience" },
    { name: "프로젝트", path: "#projects" },
    { name: "블로그", path: "#blog" },
  ];

  function handleScroll(e: React.MouseEvent<HTMLAnchorElement>, path: string) {
    e.preventDefault();
    const targetId = path.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/60">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-base font-semibold text-neutral-100 hover:text-white transition-colors"
        >
          지유진{" "}
          <span className="text-xs font-normal text-neutral-500 ml-1">
            Portfolio
          </span>
        </NavLink>
        <nav className="flex gap-6">
          {navItems.map(function (item) {
            return (
              <a
                key={item.name}
                href={item.path}
                onClick={function (e) {
                  handleScroll(e, item.path);
                }}
                className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
              >
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
