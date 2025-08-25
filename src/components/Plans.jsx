import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const Plans = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    {blok.items?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
  </div>
);

export default Plans;