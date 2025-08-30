import { useState } from "react";
import Form from 'react-bootstrap/Form';
import FormUnified from '../components/FormUnified';

const InputPage = () => {
  const [type, setType] = useState("event");

  return (
    <div className="container mt-4">
      {/* Dropdown to pick what the user wants to input */}
      <Form.Select 
        value={type} 
        onChange={(e) => setType(e.target.value)} 
        className="mb-3"
      >
        <option value="event">Event</option>
        <option value="volunteer">Volunteer</option>
        <option value="shop">Shop</option>
        <option value="dine">Dine</option>
      </Form.Select>

      {/* Dynamic form component */}
      <FormUnified type={type} />
    </div>
  );
};

export default InputPage;
