import { storyblokEditable } from "@storyblok/react";
import "../styles/Plans.css";

const Pricing = ({ blok }) => (
  <div className="pricing" {...storyblokEditable(blok)}>
    <h1>{blok.name}</h1>
    <p>{blok.price}</p>
    <p>{blok.description}</p>
    <a href={blok.cta_link}>{blok.cta_text}</a>
  </div>
);

export default Pricing;