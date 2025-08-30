import { useEffect, useState } from "react";
import { fetchApprovedVolunteers } from "../api"; 
import UnifiedList from "../components/UnifiedList";

const VolunteerPage = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    loadVolunteers();
  }, []);

  const loadVolunteers = async () => {
    try {
      const data = await fetchApprovedVolunteers();
      setVolunteers(data);
    } catch (error) {
      alert("Error fetching events");
    }
  };

  return (
    <div className="container mt-4">
      {volunteers.length === 0 ? (
        <p>No posts available.</p>
      ) : (
          <UnifiedList entities={volunteers} />
      )}
    </div>
  );
};

export default VolunteerPage;
