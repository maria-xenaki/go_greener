import { useEffect, useState } from "react";
import { fetchApprovedDine } from "../api"; 
import UnifiedList from "../components/UnifiedList";

const DinePage = () => {
  const [dines, setDines] = useState([]);

  useEffect(() => {
    loadDines();
  }, []);

  const loadDines = async () => {
    try {
      const data = await fetchApprovedDine();
      setDines(data);
    } catch (error) {
      alert("Error fetching events");
    }
  };

  return (
    <div className="container mt-4">
      {dines.length === 0 ? (
        <p>No posts available.</p>
      ) : (
          <UnifiedList entities={dines} 
          showFilter={true}/>
      )}
    </div>
  );
};

export default DinePage;
