import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fadeInVariants } from "../animations/variants";

// Section title bar on Homepage with numbered pill and action link
export function SectionHeader({ number, label, action }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      custom={0}
      variants={fadeInVariants}
      className={`section-neon-heading flex items-center ${
  action ? "justify-between" : "gap-2"
} text-xs text-text-faint`}
    >
      
<div className="inline-flex items-center gap-2">
  <span className="section-neon-number rounded-md px-1.5 py-0.5 text-[11px]">
    {number}
  </span>
  <span className="section-neon-label tracking-wider uppercase">
    {label}
  </span>
</div>


      {action && (
        <Link
          to={action.to}
          className="inline-flex items-center gap-1.5 text-xs text-text-faint tracking-wider uppercase hover:text-text transition-colors duration-base ease-out"
        >
          <span>{action.label}</span>
          <ArrowRight size={14} />
        </Link>
      )}
    </motion.div>
  );
}

// Back navigation button
export function BackButton({ to = "/" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = location.key !== "default";

  function handleClick(e) {
    if (
      !canGoBack ||
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-xs text-text-faint tracking-wider uppercase hover:text-text transition-colors duration-base ease-out"
    >
      <ArrowLeft size={14} />
      <span>Back</span>
    </Link>
  );
}

// Page Header for subpages (/projects, /experience, etc.)
export function PageHeader({ title, description, backTo = "/", className }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      custom={0}
      variants={fadeInVariants}
      className={className}
    >
      <BackButton to={backTo} />
      <h1 className="text-xl md:text-2xl font-bold text-text mt-8">{title}</h1>
      {description && <p className="text-text-muted text-sm mt-2">{description}</p>}
    </motion.div>
  );
}

