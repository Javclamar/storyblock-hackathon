import { storyblokEditable } from "@storyblok/react";
import "../styles/Header.css";

const Header = ({ blok }) => (
  <header {...storyblokEditable(blok)} className="header">
    <div className="header-logo">
      {blok.logo?.filename && (
        <img
          src={blok.logo.filename}
          alt={blok.logo.alt || "logo"}
        />
      )}
    </div>

    <nav className="header-nav">
      <a href={blok.link1.linktype === 'story' ? `/${blok.link1.cached_url}` : blok.link1.url}>{blok.nav_link1}</a>
      <a href={blok.link2}>{blok.nav_link2}</a>
      <a href={blok.link3}>{blok.nav_link3}</a>
    </nav>

    <a href={blok.cta_link} className="header-cta">
      {blok.cta_text}
    </a>
  </header>
);

export default Header;
