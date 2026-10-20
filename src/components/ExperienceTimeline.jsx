import { motion } from "framer-motion";
import { fadeInVariants } from "../animations/variants";

export default function ExperienceTimeline({ items, staggerDelay = 0.08, showMeta = false }) {
  return (
    <div className="relative mt-8">
      
      <div className="space-y-7">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={idx * staggerDelay}
            variants={fadeInVariants}
            className="group relative flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4 min-w-0">
              {/* Dot indicator */}
              <span
                className={`relative z-10 mt-1.5 size-3 rounded-full shrink-0 transition-colors duration-base ease-out ${
                  item.active ? "bg-accent" : "bg-bg border border-border group-hover:border-accent"
                }`}
              />

              <div className="min-w-0">
                {item.project && <p className="text-sm text-text mt-1">{item.project}</p>}
                <h3 className="text-sm font-medium text-text">{item.role}</h3>
                {showMeta && (
                  <p className="text-text-faint text-[11px] md:text-xs mt-1 tracking-wide uppercase">
                    {item.institution} · {item.period}
                  </p>
                )}
                {!item.responsibilities && (
                  <p className="text-text-muted text-xs md:text-sm mt-1">{item.description}</p>
                )}
                {item.responsibilities && (
                  <ul className="responsibilities text-text-muted text-xs md:text-sm mt-2">
                    {item.responsibilities.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Year Badge */}
            <span className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-text-faint">
              {item.year}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
