import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createEvent } from "../api";
import { Row, Col } from 'react-bootstrap';

const predefinedTags = [ "Art", "Activism","Animals", "Cleanup","Festival", "Forests", "Green Tech", "Seminar", "Urban Gardening", "Volunteer", "Wildlife", "Workshop", "Zero Waste", "Other"]

const EventForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [cost,setCost] = useState("");
    const [tags, setTags] = useState([]);

const handleTag = (tag) => {
    setTags(prev =>
        prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

    if (new Date(endDate) < new Date(startDate)) {
        alert ("End date cannot be prior to Start date.");
        return;
    }

    try {
            const eventData = {
                title,
                description,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0], //we separate date and time, to get only Date.
                cost: parseFloat(cost),
                tags,
                approved: false
            };

            await createEvent(eventData);
            alert("Event created successfully!");

            // Clear form
            setTitle("");
            setDescription("");
            setStartDate(null);
            setEndDate(null);
            //setIsFree(false);
            setCost("");
            setTags([]);
        } catch (error) {
            console.error(error);
            alert("Error creating event. Make sure you're logged in.");
        }
    };

    return (
        <>
    <h1 className="text-center mb-4">Add New Event</h1>
    <Form onSubmit={handleSubmit} className="container-fluid px-3">
        <div className="row justify-content-center">
            <div className="col-12">

                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="form-control mb-3"
                />

                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="form-control mb-3"
                />

                <div className="row justify-content-center g-3 mb-3">
                    <div className="col-12 col-md-3 d-flex flex-column">
                        <label className="form-label mb-1">From</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Choose start date"
                            dateFormat="dd/MM/yyyy"
                            className="form-control justify-content-center"
                        />
                    </div>
                    <div className="col-12 col-md-3 d-flex flex-column">
                        <label className="form-label mb-1">To</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            placeholderText="Choose end date"
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                        />
                    </div>
                </div>

                <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    required
                    min="0"
                    step="0.1"
                    placeholder="Cost"
                    className="form-control mb-3"
                />

                <div className="mb-3">
                    <label>Tags:</label>
                    <div className="mt-2">
                        <Row>
                             {predefinedTags.map((tag, index) => (
        <Col key={tag} xs={12} sm={6} md={4} className="mb-2">
          <div className="form-check">
            <input
              className="form-check-input me-1"
              type="checkbox"
              id={tag}
              checked={tags.includes(tag)}
              onChange={() => handleTag(tag)}
            />
                            {/* {predefinedTags.map(tag => (
                                <div key={tag}>
                                    <input
                                        className="form-check-input me-1"
                                        type="checkbox"
                                        id={tag}
                                        checked={tags.includes(tag)}
                                        onChange={() => handleTag(tag)}
                                    /> */}
                                    <label htmlFor={tag} className="form-check-label">
                                        {tag}
                                    </label>
                                </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3 pb-1">
                    <Button type="submit" className="btn-success">Add Event</Button>
                </div>

            </div>
        </div>
    </Form>
</>

  );
};

export default EventForm;