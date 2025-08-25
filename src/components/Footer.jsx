import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import "../styles/Footer.css";

const Footer = ({ blok }) => (
  <footer className="footer" {...storyblokEditable(blok)}>
    <div className="footer-links">
      {blok.links?.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
    <h1>{blok.copyright}</h1>
  </footer>
);

export default Footer;