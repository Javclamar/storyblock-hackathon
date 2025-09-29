import { useState } from "react";
import "../styles/PreferencesForm.css"

function PreferencesForm({ onSave }) {
  const [teamSize, setTeamSize] = useState("solo");
  const [language, setLanguage] = useState("en");
  const [industry, setIndustry] = useState("software");

  const handleSubmit = (e) => {
    e.preventDefault();
    const prefs = { teamSize, language, industry, isComplete: true, expiry: Date.now() + 60 * 1000 };
    localStorage.setItem("userPreferences", JSON.stringify(prefs));
    onSave(prefs);
  };

  return (
    <div className="form">
      <h2 className="title">Set your preferences</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <label>
          Team Size:
          <select
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            className="label"
          >
            <option value="solo">Solo</option>
            <option value="small team">Small Team</option>
            <option value="growing team">Growing Team</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </label>

        <label>
          Language:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="label"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>

        <label>
          Industry:
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="label"
          >
            <option value="software">Software Development</option>
            <option value="education">Educational</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="ecommerce">E-commerce</option>
            <option value="marketing">Marketing/Advertising</option>
            <option value="nonprofit">Non-profit</option>
            <option value="other">Other</option>
          </select>
        </label>

        <button
          type="submit"
          className="submit-button"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}

export default PreferencesForm;