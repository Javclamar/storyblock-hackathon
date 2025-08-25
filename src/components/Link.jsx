import { storyblokEditable } from "@storyblok/react";

const Link = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    <a href={blok.f_link}>{blok.first_link}</a>
    <a href={blok.s_link}>{blok.second_link}</a>
    <a href={blok.t_link}>{blok.third_link}</a>
  </div>
);

export default Link;