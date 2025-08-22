import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { useEffect, useState } from 'react';
import enUS from 'date-fns/locale/en-US';
import { Modal, Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
//import AddEventBtn from './AddNewEventBtn';
import ListView from './ListView';

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
    const [calendarView, setCalendarView] = useState("month");
    const [mode, setMode] = useState("calendar");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    
    useEffect (() => {
      const fetchEvents = async () => {
        try {
          const res = await fetch("http://localhost:8080/api/events");
          const data = await res.json();

          // const mappedEvents = data
          //   .filter(event => event.approved)
          //   .map(event => ({
          //     title: event.title,
          //     start: new Date(event.startDate),
          //     end: new Date(event.endDate),
          //     description: event.description,
          //     cost: event.cost
          //   }));

          //   setEvents(mappedEvents);

          const approvedEvents = data
            .filter(event => event.approved)
            .map(event => ({
              ...event,
              start: new Date(event.startDate),
              end: new Date(event.endDate)
            }));

            setEvents(approvedEvents);

        }   catch (error) {
            console.error("Error fetching events:", error);
        } 
      };
      fetchEvents();
    }, []);

    const handleClose = () => setSelectedEvent(null);

    const filteredEvents = selectedTags.length === 0
  ? events
  : events.filter(event =>
      event.tags?.some(tag => selectedTags.includes(tag.name))
    );


    return (
      <div style={{ padding: '2rem' }}>

      <div className="mb-3 d-flex flex-wrap gap-2 justify-content-center">
  {[
    "Art", "Activism", "Animals", "Cleanup", "Festival", "Forests",
    "Green Tech", "Seminar", "Urban Gardening", "Volunteering",
    "Wildlife", "Workshop", "Zero Waste", "Other"
  ].map(tag => (
    <Button
      key={tag}
      variant={selectedTags.includes(tag) ? "primary" : "outline-primary"}
      onClick={() => {
        setSelectedTags(prev =>
          prev.includes(tag)
            ? prev.filter(t => t !== tag)
            : [...prev, tag]
        );
      }}
      size="sm"
    >
      {tag}
    </Button>
  ))}
</div>


      <div className="d-flex justify-content-center mb-4">
        <ToggleButtonGroup
          type="radio"
          name="viewMode"
          value={mode}
          onChange={setMode}
        >
          <ToggleButton id="calendar" value="calendar" variant="outline-primary">
            Calendar View
          </ToggleButton>
          <ToggleButton id="list" value="list" variant="outline-secondary">
            List View
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Add Event Button
      <div className="d-flex justify-content-end mb-3">
        <AddEventBtn />
      </div> */}

      {mode === 'calendar' ? (
        <>
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']}
          defaultView="month"
          view={calendarView}
          onView={setCalendarView}
          onNavigate={(date) => setDate(date)}
          date={date}
          style={{ height: '73vh' }}
          onSelectEvent={(event) => setSelectedEvent(event)}
        />
{selectedEvent && (

               <Modal show={true} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title className='text-break'><strong>Title: </strong> {selectedEvent?.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* In From and To we only want Date and not Time */}
                <p><strong>From: </strong>{selectedEvent?.start ? format(new Date(selectedEvent.start), "MMMM d, yyyy") : "N/A"}</p> 
                <p><strong>To: </strong>{selectedEvent?.end ? format(new Date(selectedEvent.end), "MMMM d, yyyy") : "N/A"}</p>
                <p className='text-break'><strong>Description: </strong>{selectedEvent?.description}</p>
                <p><strong>Cost: </strong>{selectedEvent?.cost} €</p>
                <p><strong>Link: </strong>{selectedEvent?.link}</p>
                {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <p><strong>Tags:</strong> {selectedEvent.tags.map(t => t.name).join(", ")}</p>
                )}

              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={handleClose} className='btn-success'>Close</Button>
              </Modal.Footer>
            </Modal>
      )}
      </>
      ) : (
        <ListView events={filteredEvents} />
      )}
    </div>
    );
}