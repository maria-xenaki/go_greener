import { useEffect, useState } from 'react';
import { fetchUnapprovedEvents, approveEvent, deleteEvent, updateEvent } from "../api";
import { format } from 'date-fns';

const AdminEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] =     useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        cost: '',
        link: '',
        tags: []
    });
    
    useEffect(() =>{
        loadUnapprovedEvents();
    }, []);
    
     const loadUnapprovedEvents = async () => {
        try {
            const data = await fetchUnapprovedEvents();
            setEvents(data);
        } catch (error) {
            alert("Error fetching events");
            console.error(error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await approveEvent(id);
            setEvents(prev => prev.filter(event => event.id !== id));
        } catch (error) {
            alert("Failed to approve event.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;
        try {
            await deleteEvent(id);
            setEvents(prev => prev.filter(event => event.id !== id));
        } catch (error) {
            alert("Failed to delete event.");
        }
    };

    const handleEditClick = (event) => {
    setEditingEvent(event.id);
    setFormData({
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        cost: event.cost,
        link: event.link,
        tags: event.tags.map(t => t.name) || []
    });
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

const handleUpdate = async (id) => {
    try {
        const payload = {
            ...formData,
            tags: formData.tags.map(name => ({ name }))  // wrap in objects
        };
        const updatedEvent = await updateEvent(id, payload);
        setEvents(prev => prev.map(ev => ev.id === id ? updatedEvent : ev));
        setEditingEvent(null);
    } catch (error) {
        alert("Failed to update event.");
        console.error(error);
    }
};

    return (
        <>
        <h1 className='text-center'>Unapproved Events</h1>
        <div className="container mt-4">
            {events.length === 0 ? (
                <p>No unapproved events found.</p>
            ) : (
                events.map(event => (
                    <div key={event.id} className="card mb-3 p-3">
                        {editingEvent === event.id ? (
            <>
                <input name="title" value={formData.title} onChange={handleChange} className="form-control mb-2" />
                <textarea name="description" value={formData.description} onChange={handleChange} className="form-control mb-2" />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="form-control mb-2" />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="form-control mb-2" />
                <input type="number" name="cost" value={formData.cost} onChange={handleChange} className="form-control mb-2" />
                <input type="url" name="link" value={formData.link} onChange={handleChange} className='form-control mb-2'/>
                <div className="d-flex gap-2">
                    <button onClick={() => handleUpdate(event.id)} className="btn btn-primary">Save</button>
                    <button onClick={() => setEditingEvent(null)} className="btn btn-secondary">Cancel</button>
                </div>
                <div className="mb-2">
                    <label>Edit Tags:</label>
                    <div className="d-flex flex-wrap gap-2">
                        {["Art", "Activism", "Animals", "Cleanup", "Festival", "Forests", "Green Tech", "Seminar", "Urban Gardening", "Volunteering", "Wildlife", "Workshop", "Zero Waste", "Other"].map(tag => (
                            <div key={tag} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`${event.id}-${tag}`}
                                    checked={formData.tags.includes(tag)}
                                    onChange={() =>
                                        setFormData(prev => ({
                                            ...prev,
                                            tags: prev.tags.includes(tag)
                                                ? prev.tags.filter(t => t !== tag)
                                                : [...prev.tags, tag]
                                        }))
                                    }
                                />
                                <label htmlFor={`${event.id}-${tag}`} className="form-check-label">
                                    {tag}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </>
                        ) : (
                        <>
                        <h4>{event.title}</h4>
                        <p>{event.description}</p>
                        <p><strong>From:</strong> {format(new Date(event.startDate), 'dd/MM/yyyy')} <strong>To:</strong> {format(new Date(event.endDate), 'dd/MM/yyyy')}</p>
                        <p><strong>Cost:</strong> {event.cost} €</p>
                        <p><strong>Link:</strong> {event.link}</p>
                        {event.tags && event.tags.length > 0 && (
                            <p>
                                <strong>Tags:</strong> {event.tags.map(t => t.name).join(", ")}
                            </p>
                        )}

                        <div className="d-flex gap-2">
                            <button onClick={() => handleApprove(event.id)} className="btn btn-success">Approve</button>
                            <button onClick={() => handleEditClick(event)} className="btn btn-warning">Edit</button>
                            <button onClick={() => handleDelete(event.id)} className="btn btn-danger">Delete</button>
                        </div>
                        </>
                        )}
                    </div>
                ))
            )}
        </div>
    </>
    );
};
export default AdminEventsPage;