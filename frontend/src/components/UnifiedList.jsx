import { useState, useEffect } from "react";
import UnifiedCard from "./CardUnified";
import Pagination from "./Pagination";
import FilterMenu from "./FilterMenu"; 

const ITEMS_PER_PAGE = 10;

// Utility: flatten events
export function flattenEntities(entities, type, { includePast = false } = {}) {
  if (!entities) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const flattened = [];

  if (type === "event") {
    entities.forEach(e => {
      if (e.startDate) {
        const start = new Date(e.startDate);
        const end = e.endDate ? new Date(e.endDate) : start;

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const dayCopy = new Date(d);
          dayCopy.setHours(0, 0, 0, 0);

          if (includePast || dayCopy >= today) {
            flattened.push({
              ...e,
              currentDate: new Date(dayCopy),
              start: new Date(dayCopy),
              end: new Date(dayCopy),
            });
          }
        }
      } else {
        flattened.push({ ...e, currentDate: null });
      }
    });

    // Sort events by date
    flattened.sort((a, b) => {
      if (a.currentDate && b.currentDate) return a.currentDate - b.currentDate;
      if (a.currentDate) return -1;
      if (b.currentDate) return 1;
      return 0;
    });
  } else {
    return entities.map(e => ({ ...e, currentDate: null }));
  }

  return flattened;
}

const UnifiedList = ({ entities, type, isAdmin, onApprove, onDelete, onUpdate, showFilter = true }) => {
  const [flatItems, setFlatItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ city: "", tags: [] });

  useEffect(() => {
  if (!entities) return;

  let filtered = entities;

  if (filters.city) {
    filtered = filtered.filter(e => e.city === filters.city);
  }

  if (filters.tags.length > 0) {
    filtered = filtered.filter(e =>
      e.tags?.some(tag => filters.tags.includes(tag.name))
    );
  }

  // Only flatten if entities are NOT already flattened
  const flattened = filtered.some(e => !e.currentDate) 
    ? flattenEntities(filtered, type) 
    : filtered;

  setFlatItems(flattened);
  setCurrentPage(1);
}, [entities, type, filters]);

  const totalPages = Math.ceil(flatItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = flatItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="">
      {showFilter && 
        <div className="d-flex justify-content-end mb-3" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <FilterMenu entities={entities} onApply={setFilters} />
        </div>
      }

      {paginatedItems.map((item, index) => (
        <UnifiedCard
          key={`${item.id}-${item.currentDate?.toISOString() || ''}-${index}`}
          entity={item}
          isAdmin={isAdmin}
          onApprove={onApprove}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default UnifiedList;