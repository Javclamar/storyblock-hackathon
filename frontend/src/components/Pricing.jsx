import { storyblokEditable } from "@storyblok/react";
import "../styles/Plans.css";

const Pricing = ({ blok }) => (
  <div className="pricing" {...storyblokEditable(blok)}>
    <h1>{blok.name}</h1>
    <p>{blok.price}</p>
    <p>{blok.description}</p>

     {blok.features.tbody.length > 0 && (
        <table className="pricing-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Included</th>
          </tr>
        </thead>
        <tbody>
          {blok.features.tbody.map((row) => (
            <tr key={row._uid}>
              <td>{row.body?.[0]?.value}</td>
              <td>{row.body?.[1]?.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    <a href={blok.cta_link}>{blok.cta_text}</a>
  </div>
);

export default Pricing;