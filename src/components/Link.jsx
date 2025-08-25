import { storyblokEditable } from "@storyblok/react";
import "../styles/Footer.css";

const Link = ({ blok }) => (
  <div className="footer-link" {...storyblokEditable(blok)}>
    <a href={blok.f_link}>{blok.first_link}</a>
    <a href={blok.s_link}>{blok.second_link}</a>
    <a href={blok.t_link}>{blok.third_link}</a>
  </div>
);

export default Link;