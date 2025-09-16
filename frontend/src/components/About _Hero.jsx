import { storyblokEditable } from "@storyblok/react";
import "../styles/AboutHero.css";

const About_Hero = ({ blok }) => (
  <section className="about-hero" {...storyblokEditable(blok)}>
    <div className="about-hero-content">
      <div className="text-container">
        <div className="title-subtitle-container">
          <div className="title">{blok.title}</div>
          <div className="subtitle">{blok.subtitle}</div>
        </div>
        <div className="description-container">
          <div className="description">{blok.description}</div>
        </div>
      </div>
      <div className="images-container">
        <img className="about-image1" src={blok.photo1.filename} alt="About Hero" />
      </div>
    </div>
  </section>
);

export default About_Hero;