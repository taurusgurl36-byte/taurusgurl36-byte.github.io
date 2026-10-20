import { motion } from "framer-motion";
import { fadeInVariants } from "../animations/variants";
import SkillIcon from "./SkillIcon";

export default function TechStack({ groups, staggerDelay = 0.08 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {groups.map((group, idx) => (
        <motion.div
          key={group.category}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={idx * staggerDelay}
          variants={fadeInVariants}
          className="skill-neon-card rounded-xl border border-border p-5"
        >
          <h3 className="skill-neon-title text-xs text-text-faint tracking-wider uppercase">{group.category}</h3>
          <ul className="skill-list">
            {group.tools.map((tool) => (
              <li key={tool} className="skill-item">
                <SkillIcon skill={tool} />
                <span className="skill-label">{tool}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
