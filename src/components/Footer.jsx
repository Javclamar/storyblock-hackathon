import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const Footer = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    {blok.links?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
    <h1>{blok.copyright}</h1>
  </div>
);

export default Footer;