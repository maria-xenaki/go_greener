import { useState } from "react";
import { format } from "date-fns";
import { getTagsForType } from "./Tags";

const UnifiedCard = ({
  entity,
  onApprove,
  onDelete,
  onUpdate,
  isAdmin = false,
  onRefresh
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: entity.title || "",
    description: entity.description || "",
    startDate: entity.startDate || "",
    endDate: entity.endDate || "",
    cost: entity.cost || "",
    link: entity.link || "",
    city: entity.city || "",
    address: entity.address || "",
    tags: entity.tags ? entity.tags.map(t => t.name) : []
  });

  const availableTags = getTagsForType(entity.type);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSave = async () => {
  if (onUpdate) {
    await onUpdate(entity.id, {
      ...formData,
      tags: formData.tags.map(name => ({ name }))
    });
    onRefresh?.();
  }
  setIsEditing(false);
};

  // Timeline layout for events
  if (entity.startDate && entity.endDate) {
    const timelineDate = entity.currentDate ? new Date(entity.currentDate) : new Date(entity.startDate);
    const start = new Date(entity.startDate);
    const end = new Date(entity.endDate);

    return (
      <div className="d-flex border rounded p-3 mb-3 align-items-start">
        {/* Date Section */}
        <div className="text-center pe-3" style={{ width: '60px' }}>
          <div className="fs-3 fw-bold">{format(timelineDate, 'd')}</div>
          <div className="text-uppercase">{format(timelineDate, 'MMM')}</div>
          <div className="text-uppercase">{format(timelineDate, 'yyyy')}</div>
        </div>

        {/* Vertical line */}
        <div style={{
          width: '2px',
          backgroundColor: '#ccc',
          margin: '0 1rem',
          alignSelf: 'stretch'
        }} />

        {/* Event Info */}
        <div style={{ flex: 1 }}>
          {isEditing ? (
            <>
              <input
                name="title"
                value={formData.title || ""}
               // value={formData.title}
                onChange={handleChange}
               placeholder={`${entity.type} title`}
                className="form-control mb-2"
              />
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder={`${entity.type} description`}
                className="form-control mb-2"
              />
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-control mb-2"
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="form-control mb-2"
              />
              <input
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
                placeholder={`${entity.type} city`}
                className="form-control mb-2"  
              />
              <input
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                placeholder={`${entity.type} address`}
                className="form-control mb-2"  
              />
              <input
                type="number"
                name="cost"
                value={formData.cost || ""}
                onChange={handleChange}
                placeholder={`${entity.type} cost`}
                className="form-control mb-2"
              />
              <input
                type="url"
                name="link"
                //value={formData.link}
                value={formData.link || ""}
                onChange={handleChange}
                placeholder={formData.link ? "" : `${entity.type} link`}
                className="form-control mb-2"
              />

              <div className="mb-2">
                <label>Edit Tags:</label>
                <div className="d-flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <div key={tag} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`${entity.id}-${tag}`}
                        checked={formData.tags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                      />
                      <label htmlFor={`${entity.id}-${tag}`} className="form-check-label">{tag}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-flex gap-2">
                <button onClick={handleSave} className="btn btn-primary">Save</button>
                <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h4 className='text-break'><strong>{entity.title}</strong></h4>
              <p className='text-break'>{entity.description}</p>
              <p>
                <strong>From:</strong> {format(start, 'dd/MM/yyyy')} &nbsp;
                <strong>To:</strong> {format(end, 'dd/MM/yyyy')}
              </p>
              <p>
                <strong>City:</strong> {entity.city}
              </p>
              {entity.address && <p><strong>Address: </strong> {entity.address}</p>}
              {entity.cost && <p><strong>Cost:</strong> €{entity.cost}</p>}
              {entity.link && (
                <p><strong>Link: </strong>
                  <a href={entity.link} target="_blank" rel="noopener noreferrer">{entity.link}</a>
                </p>
              )}
              {entity.tags?.length > 0 && (
                <p><strong>Tags:</strong> {entity.tags.map(t => t.name).join(", ")}</p>
              )}

              {isAdmin && (
                <div className="d-flex gap-2">
                  {onApprove && <button onClick={() => onApprove(entity.id)} className="btn btn-success">Approve</button>}
                  <button onClick={() => setIsEditing(true)} className="btn btn-warning">Edit</button>
                  {onDelete && <button onClick={() => onDelete(entity.id)} className="btn btn-danger">Delete</button>}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // Normal card layout for shops, dine, volunteers, etc
  return (
    <div className="card mb-3 p-3">
      {isEditing ? (
        <>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-control mb-2"  
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control mb-2"  
          />
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <div className="mb-2">
            <label>Edit Tags:</label>
            <div className="d-flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <div key={tag} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`${entity.id}-${tag}`}
                    checked={formData.tags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                  />
                  <label htmlFor={`${entity.id}-${tag}`} className="form-check-label">{tag}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex gap-2">
            <button onClick={handleSave} className="btn btn-primary">Save</button>
            <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h4><strong>{entity.title}</strong></h4>
          <p>{entity.description}</p>
          <p>
            <strong>City:</strong> {entity.city}
          </p>
          {entity.address && <p><strong>Address: </strong> {entity.address}</p>}
          {entity.link && (
            <p><strong>Link: </strong> 
              <a href={entity.link} target="_blank" rel="noopener noreferrer">{entity.link}</a>
            </p>
          )}
          {entity.tags?.length > 0 && (
            <p><strong>Tags:</strong> {entity.tags.map(t => t.name).join(", ")}</p>
          )}

          {isAdmin && (
            <div className="d-flex gap-2">
              {onApprove && <button onClick={() => onApprove(entity.id)} className="btn btn-success">Approve</button>}
              <button onClick={() => setIsEditing(true)} className="btn btn-warning">Edit</button>
              {onDelete && <button onClick={() => onDelete(entity.id)} className="btn btn-danger">Delete</button>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UnifiedCard;