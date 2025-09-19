import { useEffect, useState } from "react";
import { fetchApprovedShops } from "../api"; 
import UnifiedList from "../components/UnifiedList";

const ShopPage = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const data = await fetchApprovedShops();
      setShops(data);
    } catch (error) {
      alert("Error fetching events");
    }
  };

  return (
    <div className="container mt-4">
      {shops.length === 0 ? (
        <p>No posts available.</p>
      ) : (
          <UnifiedList entities={shops} />
      )}
    </div>
  );
};

export default ShopPage;
