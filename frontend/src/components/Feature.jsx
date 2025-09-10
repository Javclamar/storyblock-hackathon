import { storyblokEditable } from "@storyblok/react";
import "../styles/Features.css";

const Feature = ({ blok }) => (
  <div className="feature" {...storyblokEditable(blok)}>
    <h1>{blok.title}</h1>
    <img src={blok.icon.filename} alt={blok.icon.alt || blok.title} />
    <p>{blok.description}</p>
  </div>
);

export default Feature;
