import { storyblokEditable } from "@storyblok/react";
import "../styles/Hero.css";

const Hero = ({ blok }) => (
  <section className="hero" {...storyblokEditable(blok)}>
    <div className="hero-overlay"></div>
    <img className="hero-bg" src={blok.hero_image.filename} alt="Hero background" />
    <div className="hero-content">
      <h1>{blok.headline}</h1>
      <p>{blok.subheadline}</p>
      <a href={blok.cta_link}>{blok.cta_text}</a>
    </div>
  </section>
);

export default Hero;