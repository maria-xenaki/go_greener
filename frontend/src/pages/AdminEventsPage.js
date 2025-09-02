import { useEffect, useState } from "react";
import {
  fetchUnapprovedEvents, fetchUnapprovedVolunteers, fetchUnapprovedShops,
  fetchUnapprovedDine,
  fetchApprovedEvents, fetchApprovedVolunteers, fetchApprovedShops, fetchApprovedDine,
  approveEvent, approveVolunteer, approveShop, approveDine,
  deleteEvent, deleteVolunteer, deleteShop, deleteDine,
  updateEvent, updateVolunteer, updateShop, updateDine,
} from "../api";
import UnifiedCard from "../components/CardUnified";

const AdminEventsPage = () => {
  const [entities, setEntities] = useState([]);
  const [showApproved, setShowApproved] = useState(false);

 
    const loadEntities = async () => {
      try {
        let events, volunteers, shops, dine;

        if (showApproved) {
          events = await fetchApprovedEvents();
          volunteers = await fetchApprovedVolunteers();
          shops = await fetchApprovedShops();
          dine = await fetchApprovedDine();
        } else {
          events = await fetchUnapprovedEvents();
          volunteers = await fetchUnapprovedVolunteers();
          shops = await fetchUnapprovedShops();
          dine = await fetchUnapprovedDine();
        }
        const allEntities = [
          ...events.map(e => ({ ...e, type: "event" })),
          ...volunteers.map(v => ({ ...v, type: "volunteer" })),
          ...shops.map(s => ({ ...s, type: "shop" })),
          ...dine.map(d => ({ ...d, type: "dine" })),
        ];

        setEntities(allEntities);
      } catch (error) {
        console.error(error);
        alert("Error fetching entities");
      }
    };

      useEffect(() => {
        loadEntities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [showApproved]);

     
  const handleApprove = async (id, type) => {
    try {
      switch (type) {
        case "event":
          await approveEvent(id);
          break;
        case "volunteer":
          await approveVolunteer(id);
          break;
        case "shop":
          await approveShop(id);
          break;
        case "dine":
          await approveDine(id);
          break;
        default:
          return;
      }
      setEntities((prev) => prev.filter((ent) => ent.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to approve entity.");
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      switch (type) {
        case "event":
          await deleteEvent(id);
          break;
        case "volunteer":
          await deleteVolunteer(id);
          break;
        case "shop":
          await deleteShop(id);
          break;
        case "dine":
          await deleteDine(id);
          break;
        default:
          return;
      }
      setEntities((prev) => prev.filter((ent) => ent.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete entity.");
    }
  };

  const handleUpdate = async (id, type, payload) => {
    try {
      let updatedEntity;
      switch (type) {
        case "event":
          updatedEntity = await updateEvent(id, payload);
          break;
        case "volunteer":
          updatedEntity = await updateVolunteer(id, payload);
          break;
        case "shop":
          updatedEntity = await updateShop(id, payload);
          break;
        case "dine":
          updatedEntity = await updateDine(id, payload);
          break;
        default:
          return;
      }
      
      setEntities(prev => [
        ...prev.filter(ent => ent.id !== id),
        updatedEntity
      ]);


    } catch (error) {
      console.error(error);
      alert("Failed to update entity.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <button 
          className="btn btn-outline-success"
          onClick={() => setShowApproved(prev => !prev)}
        >
          {showApproved ? "Show Unapproved" : "Show Approved"}
        </button>
      </div>
      {entities.length === 0 ? (
         <p>No {showApproved ? "approved" : "unapproved"} items found.</p>
      ) : (
        entities.map(entity => (
          <UnifiedCard
            key={`${entity.type}-${entity.id}`}
            entity={entity}
            isAdmin={true}
            onApprove={entity.approved ? null : () => handleApprove(entity.id, entity.type)}
            onDelete={() => handleDelete(entity.id, entity.type)}
            onUpdate={(id, payload) => handleUpdate(id, entity.type, payload)}
            onRefresh={loadEntities}
          />
        ))
      )}
    </div>
  );
};

export default AdminEventsPage;