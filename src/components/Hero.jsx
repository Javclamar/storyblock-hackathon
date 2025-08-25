import { storyblokEditable } from "@storyblok/react";

const Hero = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
        <h1>{blok.headline}</h1>
        <p>{blok.subheadline}</p>
        <img src={blok.hero_image} alt="Not found"></img>
        <a href={blok.cta_link}>{blok.cta_text}</a>
  </div>
);

export default Hero;