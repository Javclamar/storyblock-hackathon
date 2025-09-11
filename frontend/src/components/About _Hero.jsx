import { storyblokEditable } from "@storyblok/react";
import "../styles/AboutHero.css";

const About_Hero = ({ blok }) => (
  <section className="hero" {...storyblokEditable(blok)}>
    <div className="hero-content">
      <div className="title">{blok.title}</div>
      <div className="subtitle">{blok.subtitle}</div>
      <div className="description">{blok.description}</div>
      <img className="about-image1" src={blok.photo1.filename} alt="About Hero" />
      <img className="about-image2" src={blok.photo2.filename} alt="About Hero" />
    </div>
  </section>
);

export default About_Hero;