import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col } from 'react-bootstrap';
import { createEntity, updateEvent } from "../api";
import '../App';
import { getTagsForType } from "./Tags";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const CityDropdown = ({ value, onChange, language = "en", cities = [] }) => {
  return (
    <Form.Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="mb-3 darker-outline"
    >
      <option value="">Select a city</option>
      {cities.map(city => (
        <option key={city.id} value={city.name[language]}>
          {city.name[language]}
        </option>
      ))}
    </Form.Select>
  );
};

const FormUnified = ({ type, language = "en", initialData = null, onSuccess }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [startDate, setStartDate] = useState(initialData?.startDate ? new Date(initialData.startDate) : null);
  const [endDate, setEndDate] = useState(initialData?.endDate ? new Date(initialData.endDate) : null);
  const [cost, setCost] = useState(initialData?.cost || "");
  const [link, setLink] = useState(initialData?.link || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [tags, setTags] = useState(initialData?.tags?.map(t => t.name) || []);
  const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    fetch("/greekCities.json")
      .then(res => res.json())
      .then(data => setCitiesList(data))
      .catch(err => console.error("Failed to load cities:", err));
  }, []);

  const handleTag = (tag) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2,'0');
    const day = `${d.getDate()}`.padStart(2,'0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const normalizeLink = (value) => value && !/^https?:\/\//.test(value) ? "https://" + value : value;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "event" && (!startDate || !endDate)) {
      alert("Please select Start and End dates.");
      return;
    }
    if (type === "event" && new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be prior to Start date.");
      return;
    }

    const data = {
      title,
      description,
      ...(startDate && { startDate: formatDate(startDate) }),
      ...(endDate && { endDate: formatDate(endDate) }),
      ...(type === "event" ? { cost: parseFloat(cost) } : {}),
      ...(link && { link: normalizeLink(link) }),
      ...(address && { address }),
      ...(tags.length ? { tags: tags.map(tag => ({ name: tag })) } : {}),
      ...(city && { city }),
      approved: initialData?.approved || false
    };

    try {
      if (initialData && type === "event") {
        await updateEvent(initialData.id, data);
        alert("Event updated successfully!");
      } else {
        await createEntity(type, data);
        alert(`${type} created successfully!`);

        setTitle("");
        setDescription("");
        setStartDate(null);
        setEndDate(null);
        setCost("");
        setLink("");
        setAddress("");
        setCity("");
        setTags([]);
        }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  };

  const currentTags = getTagsForType(type);

  return (
    <Form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={`${capitalize(type)} Title`} required className="form-control mb-3 darker-outline" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder={`${capitalize(type)} Description`} required className="form-control mb-3 darker-outline" />
      <CityDropdown value={city} onChange={setCity} language={language} cities={citiesList} />
      <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder={`${capitalize(type)} Address`} className="form-control mb-3 mt-3 darker-outline" />

      {(type === "event") && (
        <div className="row justify-content-center g-3 mb-3">
          <div className="col-12 col-md-3 d-flex flex-column">
            <label className="form-label mb-1">From</label>
            <DatePicker selected={startDate} onChange={setStartDate} dateFormat="dd/MM/yyyy" className="form-control darker-outline" />
          </div>
          <div className="col-12 col-md-3 d-flex flex-column">
            <label className="form-label mb-1">To</label>
            <DatePicker selected={endDate} onChange={setEndDate} dateFormat="dd/MM/yyyy" className="form-control darker-outline" />
          </div>
        </div>
      )}

      {(type === "event") && <input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder="Cost (€)" min="0" step="0.1" className="form-control mb-3 darker-outline" />}
      {(type === "event" || type === "shop" || type === "dine" || type === "volunteer") && <input type="text" value={link} onChange={e => setLink(e.target.value)} placeholder="Link" className="form-control mb-3 darker-outline" />}

      {currentTags.length > 0 && (
        <div className="mb-3">
          <label className="form-label">Tags:</label>
          <Row>
            {currentTags.map(tag => (
              <Col key={tag} xs={6} md={4}>
                <Form.Check 
                  type="checkbox" 
                  label={<span className="ms-2">{tag}</span>} 
                  checked={tags.includes(tag)} 
                  onChange={() => handleTag(tag)} 
                  className="d-flex align-items-center"
                />
              </Col>
            ))}
          </Row>
        </div>
      )}

      <Button type="submit" className="btn-success">{initialData ? "Update" : "Add"} {type}</Button>
    </Form>
  );
};

export default FormUnified;