import { format, isAfter, isEqual, startOfDay } from 'date-fns'; 
import Pagination from './Pagination';
import { useState } from 'react'; 

export default function ListView({ events }) { 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 
  const today = startOfDay(new Date()); 

  const expandedEvents = events.flatMap(event => {
     const days = []; let current = startOfDay(new Date(event.start)); 
     const end = startOfDay(new Date(event.end)); 
        while (current <= end) { 
          days.push({...event, dateKey: format(current, 'yyyy-MM-dd') }); 
          current.setDate(current.getDate() + 1); 
        } return days; }); 
        
        const filtered = expandedEvents.filter(e => isAfter(new Date(e.dateKey), today) || isEqual(new Date(e.dateKey), today) ); 
        
        // Group events by display date 
        const grouped = filtered.reduce((acc, event) => { 
            const dateKey = event.dateKey; if (!acc[dateKey]) acc[dateKey] = []; acc[dateKey].push(event); return acc; 
            }, {}); 
            const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b)); 
            const allEvents = sortedDates.flatMap(dateKey => grouped[dateKey]); 
            const totalPages = Math.ceil(allEvents.length / itemsPerPage); 
            const paginatedEvents = allEvents.slice( (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage ); 

            const groupedPaginated = paginatedEvents.reduce((acc, event) => { 
                const dateKey = event.dateKey; 
                if (
                  !acc[dateKey]) acc[dateKey] = []; acc[dateKey].push(event); 
                return acc; 
                }, {}); 
                const sortedPaginatedDates = Object.keys(groupedPaginated).sort( (a, b) => new Date(a) - new Date(b) ); 
                
                return ( 
                
                <div className="container mt-4"> 
                  {sortedPaginatedDates.map(dateKey => ( 
                    <div key={dateKey} className="mb-5"> 
                      {groupedPaginated[dateKey].map((event, idx) => ( 
                        <div key={idx} className="d-flex border rounded p-3 mb-3 align-items-start"> 
                        
                        {/* Date Section */} 
                        <div className="text-center pe-3" style={{ width: '60px'}}> 
                            <div className='fs-3 fw-bold'> 
                              {format(new Date(dateKey), 'd')} 
                            </div> 
                            <div className='text-uppercase'>
                              {format(new Date(dateKey), 'MMM')} 
                            </div> 
                            <div className='text-uppercase'> 
                              {format(new Date(dateKey), 'yyyy')} 
                            </div> 
                        </div> 
                        {/* Vertical line */} 
                        <div style={{ width: '2px', backgroundColor: '#ccc', margin: '0 1rem', alignSelf: 'stretch' }} /> 
                        
                        {/* RIGHT: Event Info */} 
                        <div style={{ flex: 1 }}> 
                          <h4 className='text-break'><strong>{event.title}</strong></h4> 
                          <p className='text-break'>{event.description}</p>
                          <p> <strong>From:</strong> {format(new Date(event.start), 'dd/MM/yyyy')} &nbsp; <strong>To:</strong> {format(new Date(event.end), 'dd/MM/yyyy')} </p> 
                          <p><strong>Cost:</strong> €{event.cost}</p> 
                          {event.tags && event.tags.length > 0 && ( 
                             <p><strong>Tags:</strong> {event.tags.map(t => t.name).join(", ")}</p> )} 
                        </div> 
                      </div> ))} 
                    </div> ))} 
        
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> </div> ); }
