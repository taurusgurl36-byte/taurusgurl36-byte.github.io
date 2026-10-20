import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import useCardGlow from "../hooks/useCardGlow";
import { personalInfo } from "../data/portfolioData";
import { fadeInVariants } from "../animations/variants";

export default function ContactSection() {
  const { ref, onMouseMove, onMouseEnter, onMouseLeave } = useCardGlow();

  return (
    <section className="w-full max-w-3xl mx-auto px-6 pb-18">
      <SectionHeader number="06" label="Get in Touch" />

      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        custom={0.08}
        variants={fadeInVariants}
        className="contact-neon-card relative overflow-hidden rounded-xl border border-border p-8 md:p-10 mt-8 text-center md:text-left"
        style={{ "--glow-opacity": 0 }}
      >
        {/* Animated Radial Glow Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
          style={{
            opacity: "var(--glow-opacity, 0)",
            background:
              "radial-gradient(circle 280px at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 ease-out"
          style={{
            opacity: "var(--glow-opacity, 0)",
            padding: "1px",
            background:
              "radial-gradient(circle 320px at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in srgb, var(--color-accent) 90%, transparent), transparent 70%)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative flex flex-col items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-text">Let's work together</h3>
          <p className="text-text-muted text-sm max-w-lg">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center justify-center gap-2 mt-2 rounded-md shadow-sm px-5 py-2.5 text-xs shrink-0 bg-accent text-white transition-all duration-base ease-out hover:opacity-90 hover:-translate-y-0.5"
          >
            <Mail size={14} />
            <span>{personalInfo.email}</span>
            <ArrowRight size={14} />
          </a>
          <a
            href={`tel:${personalInfo.phone}`}
            className="text-sm text-text-muted hover:text-accent transition-colors duration-base ease-out"
          >
            {personalInfo.phone}
          </a>
          <p className="text-text-faint text-xs">{personalInfo.address}</p>
        </div>
      </motion.div>
    </section>
  );
}
