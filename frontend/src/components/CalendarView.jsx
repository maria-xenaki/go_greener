import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { useEffect, useState } from 'react';
import enUS from 'date-fns/locale/en-US';
import { Modal, Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import FilterMenu from './FilterMenu';
import ListView from './ListView';
import '../App.css';
import { fetchApprovedEvents } from "../api";

const locales = { 'en-US': enUS };

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
  const [filters, setFilters] = useState({ city: "", tags: [] });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchApprovedEvents();

        // Only approved events
        const approvedEvents = data.filter(event => event.approved);

        // Break multi-day events per day
        const expanded = [];
        approvedEvents.forEach(e => {
          if (e.startDate) {
            const start = new Date(e.startDate);
            const end = e.endDate ? new Date(e.endDate) : start;

            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
              const dayCopy = new Date(d);
              dayCopy.setHours(0, 0, 0, 0);

              expanded.push({
                ...e,
                currentDate: new Date(dayCopy),
                start: new Date(dayCopy),
                end: new Date(dayCopy),
              });
            }
          }
        });

        expanded.sort((a, b) => a.currentDate - b.currentDate);
        setEvents(expanded);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Apply filters: city and tags
  const filteredEvents = events.filter(event => {
    const cityMatch = !filters.city || event.city === filters.city;
    const tagMatch =
      filters.tags.length === 0 ||
      event.tags?.some(tag => filters.tags.includes(tag.name));
    return cityMatch && tagMatch;
  });

  const handleClose = () => setSelectedEvent(null);

  return (
    <div style={{ padding: '2rem' }}>
      <div
        className="d-flex align-items-center mb-4 flex-wrap"
      >
        <ToggleButtonGroup
          type="radio"
          name="viewMode"
          value={mode}
          onChange={setMode}
        >
          <ToggleButton
            id="calendar"
            value="calendar"
            variant="outline-success"
            size="sm"
          >
            Calendar
          </ToggleButton>
          <ToggleButton
            id="list"
            value="list"
            variant="outline-success"
            size="sm"
          >
            List
          </ToggleButton>
        </ToggleButtonGroup>

        <div className="ms-auto mt-2 mt-md-0">
          <FilterMenu
            entities={events}
            onApply={(newFilters) => setFilters(newFilters)}
          />
        </div>
      </div>

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
            onNavigate={setDate}
            date={date}
            style={{ height: '73vh' }}
            onSelectEvent={setSelectedEvent}
            toolbar={true}
            min={calendarView === "day" ? new Date(0, 0, 0, 0, 0) : undefined}
            max={calendarView === "day" ? new Date(0, 0, 0, 23, 59) : undefined}
            step={calendarView === "day" ? 1440 : 30}
            timeslots={calendarView === "day" ? 1 : 2}
            showMultiDayTimes={false}
            components={{
              timeGutterHeader: calendarView === "day" ? () => null : undefined,
              timeGutter: calendarView === "day" ? () => null : undefined,
            }}
          />
          {selectedEvent && (
            <Modal show={true} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title className='text-break'>
                  <strong>{selectedEvent?.title}</strong> 
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                
                <p className='text-break'style={{ whiteSpace: "pre-wrap" }}>{selectedEvent?.description}</p>
                <p><strong>From: </strong>{selectedEvent?.start ? format(new Date(selectedEvent.start), "MMMM d, yyyy") : "N/A"}</p>
                <p><strong>To: </strong>{selectedEvent?.end ? format(new Date(selectedEvent.end), "MMMM d, yyyy") : "N/A"}</p>
                <p>
                <strong> Cost: </strong>
                {selectedEvent.cost > 0 ? `€${selectedEvent.cost}` : "Free"}
              </p>
                <p><strong>City: </strong>{selectedEvent?.city}</p>
                {selectedEvent?.address && <p><strong>Address: </strong>{selectedEvent.address}</p>}
                {selectedEvent?.link && (
                  <p>
                    <strong>Link: </strong>
                    <a 
                      href={selectedEvent.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                              wordBreak: "break-all",
                              display: "inline-block",
                              maxWidth: "100%"
                      }}>
                      {selectedEvent.link}
                    </a>
                  </p>
                )}
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