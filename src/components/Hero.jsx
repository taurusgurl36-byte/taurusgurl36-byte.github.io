
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Mail, MapPin, Sparkles } from "lucide-react";
import { fadeInVariants } from "../animations/variants";
import { personalInfo, socialLinks } from "../data/portfolioData";

function SocialIcon({ name }) {
  if (name === "resume") return <FileText size={19} aria-hidden="true" />;

  if (name === "facebook") {
    return (
      <img
        src={personalInfo.facebookLogo || "/assets/facebook-logo.png"}
        alt=""
        width={22}
        height={22}
        className="profile-social-logo"
      />
    );
  }

  if (name === "email") return <Mail size={19} aria-hidden="true" />;

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.31c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <header className="profile-hero neon-hero w-full max-w-5xl mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariants}
        className="profile-heading neon-hero-heading"
      >
        <div className="profile-identity">
          <span className="neon-eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            COMPUTER ENGINEERING PORTFOLIO
          </span>
          <h1>{personalInfo.name}</h1>
          <p className="neon-role">{personalInfo.title}</p>
        </div>

        <div className="neon-avatar-frame">
          <img
            src={personalInfo.avatarLight}
            alt={personalInfo.name}
            width={128}
            height={128}
            fetchPriority="high"
            className="profile-avatar"
          />
        </div>
      </motion.div>

      <motion.dl
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        custom={0.08}
        variants={fadeInVariants}
        className="profile-details neon-details"
      >
        <div>
          <dt>LOCATION</dt>
          <dd>
            <MapPin size={16} aria-hidden="true" />
            <span>{personalInfo.location}</span>
          </dd>
        </div>
        <div>
          <dt>EMAIL</dt>
          <dd>
            <Mail size={16} aria-hidden="true" />
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          </dd>
        </div>
      </motion.dl>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        custom={0.16}
        variants={fadeInVariants}
        className="profile-bio neon-bio"
      >
        {personalInfo.bioParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </motion.div>

      <motion.nav
        aria-label="Profile links"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        custom={0.24}
        variants={fadeInVariants}
        className="profile-links neon-profile-links"
      >
        {socialLinks.map((link) => {
          const ButtonLink = link.icon === "resume" ? Link : "a";

          const linkProps =
            link.icon === "resume"
              ? { to: link.href }
              : {
                  href: link.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                };

          return (
            <ButtonLink
              key={link.label}
              {...linkProps}
              title={link.label}
              aria-label={link.label}
              className={`profile-social-link profile-social-${link.icon}`}
            >
              <SocialIcon name={link.icon} />
              <span>{link.label}</span>
            </ButtonLink>
          );
        })}
      </motion.nav>
    </header>
  );
}
