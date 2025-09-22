import { useEffect, useState } from "react";
import { fetchApprovedShops } from "../api"; 
import UnifiedList from "../components/UnifiedList";

const ShopPage = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const data = await fetchApprovedShops();
      setShops(data);
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
      ) : shops.length === 0 ? (
        <p>No posts available.</p>
      ) : (
          <UnifiedList entities={shops} 
          showFilter={true}/>
      )}
    </div>
  );
};

export default ShopPage;
