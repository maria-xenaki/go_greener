import { useEffect, useState } from "react";
import { fetchApprovedVolunteers } from "../api"; 
import UnifiedList from "../components/UnifiedList";

const VolunteerPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVolunteers();
  }, []);

  const loadVolunteers = async () => {
    try {
      const data = await fetchApprovedVolunteers();
      setVolunteers(data);
    } catch (error) {
      console.error();
      setError("Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <p>Loading posts...</p>
      ) : error? (
        <p>{error}</p>
      ) : volunteers.length === 0 ? (
        <p>No posts available.</p>
      ) : (
          <UnifiedList entities={volunteers} 
          showFilter={true}/>
      )}
    </div>
  );
};

export default VolunteerPage;
