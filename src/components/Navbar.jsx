
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { personalInfo, navLinks } from "../data/portfolioData";

export default function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  if (pathname !== currentPath) {
    setCurrentPath(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setIsOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-[58px] border-b border-border transition-colors duration-base ease-out ${
        isOpen ? "bg-bg" : "bg-bg/80 backdrop-blur-md"
      }`}
    >
      <div className="w-full max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img
            src={personalInfo.avatarLight}
            alt={personalInfo.name}
            width={28}
            height={28}
            className="size-7 rounded-full object-cover shrink-0 dark:hidden"
          />
          <img
            src={personalInfo.avatarDark}
            alt={personalInfo.name}
            width={28}
            height={28}
            className="size-7 rounded-full object-cover shrink-0 hidden dark:block"
          />
          <span className="text-xs font-medium text-text truncate">
            {personalInfo.name}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-xs transition-colors duration-base ease-out ${
                  isActive
                    ? "text-text"
                    : "text-text-faint hover:text-text"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="md:hidden relative size-11 -mr-3 shrink-0 flex items-center justify-center"
        >
          <span
            className={`absolute h-[0.8px] w-4 rounded-full bg-text transition-transform duration-base ease-out ${
              isOpen
                ? "translate-y-0 rotate-45"
                : "-translate-y-0.75 rotate-0"
            }`}
          />
          <span
            className={`absolute h-[0.8px] w-4 rounded-full bg-text transition-transform duration-base ease-out ${
              isOpen
                ? "translate-y-0 -rotate-45"
                : "translate-y-0.75 rotate-0"
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={`md:hidden fixed top-[58px] inset-x-0 h-[calc(100vh-58px)] bg-bg transition-opacity duration-base ease-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-8 h-full">
          {navLinks.map((item, idx) => (
            <div
              key={item.to}
              style={{
                transitionDelay: isOpen ? `${100 + idx * 60}ms` : "0ms",
              }}
              className={`transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              <NavLink
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm tracking-wider uppercase transition-colors duration-base ease-out ${
                    isActive
                      ? "text-text"
                      : "text-text-faint hover:text-text"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
