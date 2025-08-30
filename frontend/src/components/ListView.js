import UnifiedList from "./UnifiedList";

const ListView = ({ events }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Only future events (today onward)
  const futureEvents = events
    .filter(e => e.currentDate >= today)
    .sort((a, b) => a.currentDate - b.currentDate); // chronological

  return (
    <div className="container mt-4">
      {futureEvents.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <UnifiedList
          entities={futureEvents}
          type="event"
          showFilter={false}
        />
      )}
    </div>
  );
};

export default ListView;
