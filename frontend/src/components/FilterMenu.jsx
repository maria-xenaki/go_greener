import { useState } from "react";
import { Dropdown, Form, Button } from "react-bootstrap";
import { Filter } from "lucide-react";

const FilterMenu = ({ entities, onApply }) => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Extract available cities and tags
  const cities = [...new Set(entities.map(e => e.city).filter(Boolean))];
  const tags = [
    ...new Set(
      entities.flatMap(e => (e.tags ? e.tags.map(t => t.name) : []))
    ),
  ];

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleCityToggle = (city) => {
  setSelectedCities(prev =>
    prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
  );
};

  const handleApply = () => {
    onApply({ city: selectedCities, tags: selectedTags });
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="outline-success" id="filter-dropdown">
        <Filter size={16} className="me-1" /> Filter
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: "250px", padding: "1rem" }}>
        <div className="mb-3">
          <strong>City</strong>
          {cities.map(city => (
            <Form.Check
              key={city}
              type="checkbox"
              label={city}
              name="city"
              checked={selectedCities.includes(city)}
              onChange={() => handleCityToggle(city)}
            />
          ))}
        </div>

        <div className="mb-3">
          <strong>Tags</strong>
          {tags.map(tag => (
            <Form.Check
              key={tag}
              type="checkbox"
              label={tag}
              checked={selectedTags.includes(tag)}
              onChange={() => handleTagToggle(tag)}
            />
          ))}
        </div>

        <div className="d-flex justify-content-between">
          <Button size="sm" variant="secondary" onClick={() => { setSelectedCities([]); setSelectedTags([]); }}>
            Clear
          </Button>
          <Button size="sm" variant="success" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterMenu;