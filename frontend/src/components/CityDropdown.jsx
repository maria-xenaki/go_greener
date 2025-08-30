import { useEffect, useState } from "react";

const CityDropdown = ({ value, onChange, language = "en", className = "" }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("/greekCities.json")
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(err => console.error("Failed to load cities:", err));
  }, []);

  return (
    <Form.Select
      className={`form-control ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    >
      <option value="">Select a city</option>
      {cities.map(city => {
        // fallback if city.name or city.name[language] is undefined
        const cityName = city?.name?.[language] || city?.name?.en || `City ${city.id}`;
        return (
          <option key={city.id} value={cityName}>
            {cityName}
          </option>
        );
      })}
    </Form.Select>
  );
};
export default CityDropdown;
