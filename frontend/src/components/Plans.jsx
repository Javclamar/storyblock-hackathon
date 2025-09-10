import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import "../styles/Plans.css";

const Plans = ({ blok }) => (
  <div className="wrapper"{...storyblokEditable(blok)}>
    <h1>{blok.headline}</h1>
    <div className="plans">
    {blok.items?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
    </div>
  </div>
);

export default Plans;