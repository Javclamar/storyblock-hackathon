import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const Features = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    {blok.items?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
  </div>
);

export default Features;