
import { personalInfo } from "../data/portfolioData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-3xl mx-auto px-6 py-8 border-t border-border">
      <div className="flex items-start justify-between gap-6">
        {/* Left Side: Avatar & Name */}
        <div className="flex items-center gap-3 text-left">
          <img
            src={personalInfo.avatarLight}
            alt={personalInfo.name}
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full object-cover dark:hidden"
          />

          <img
            src={personalInfo.avatarDark}
            alt={personalInfo.name}
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full object-cover hidden dark:block"
          />

          <div>
            <h3 className="text-sm font-medium text-text">
              {personalInfo.name}
            </h3>
            <p className="text-text-muted text-xs mt-1">
              {personalInfo.title}
            </p>
          </div>
        </div>

        {/* Desktop Copyright */}
        <p className="hidden md:block text-text-faint text-xs">
          © {currentYear} {personalInfo.name}. All rights reserved.
        </p>
      </div>

      {/* Mobile Copyright */}
      <p className="md:hidden text-text-faint text-xs mt-4 text-center">
        © {currentYear} {personalInfo.name}. All rights reserved.
      </p>
    </footer>
  );
}
