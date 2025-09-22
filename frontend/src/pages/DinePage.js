import { useEffect, useState } from "react";
import { fetchApprovedDine } from "../api"; 
import UnifiedList from "../components/UnifiedList";

const DinePage = () => {
  const [dines, setDines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDines();
  }, []);

  const loadDines = async () => {
    try {
      const data = await fetchApprovedDine();
      setDines(data);
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
      ) : dines.length === 0 ? (
        <p>No posts available.</p>
      ) : (
          <UnifiedList entities={dines} 
          showFilter={true}/>
      )}
    </div>
  );
};

export default DinePage;
