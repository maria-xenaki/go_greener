import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { useEffect, useState } from 'react';
import enUS from 'date-fns/locale/en-US';
import { Modal, Button } from "react-bootstrap";
import AddEventBtn from './AddNewEventBtn';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function CalendarView() {

    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [view, setView] = useState("month");

    useEffect (() => {
      const fetchEvents = async () => {
        try {
          const res = await fetch("http://localhost:8080/api/events");
          const data = await res.json();

          const mappedEvents = data
            .filter(event => event.approved)
            .map(event => ({
              title: event.title,
              start: new Date(event.startDate),
              end: new Date(event.endDate),
              description: event.description,
              cost: event.cost
            }));

            setEvents(mappedEvents);
        }   catch (error) {
            console.error("Error fetching events:", error);
        } 
      };
      fetchEvents();
    }, []);

    const handleClose = () => setSelectedEvent(null);

    return (
        <div style={{ height: '73vh', padding: '2rem' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day']}
                defaultView='month'
                view={view}
                onView={setView}
                onNavigate={(date) => setDate(date)}
                date={date}
                onSelectEvent={(event) => setSelectedEvent(event)}
                style={{ height: 400 }}
            />

            <AddEventBtn/>

            <Modal show={!!selectedEvent} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Title: {selectedEvent?.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* In From and To we only want Date and not Time */}
                <p><strong>From: </strong>{selectedEvent?.start ? format(new Date(selectedEvent.start), "MMMM d, yyyy") : "N/A"}</p> 
                <p><strong>To: </strong>{selectedEvent?.end ? format(new Date(selectedEvent.end), "MMMM d, yyyy") : "N/A"}</p>
                <p><strong>Description: </strong>{selectedEvent?.description}</p>
                <p><strong>Cost: </strong>{selectedEvent?.cost} €</p>
              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={handleClose} className='btn-success'>Close</Button>
              </Modal.Footer>
            </Modal>
    </div>
    );
}