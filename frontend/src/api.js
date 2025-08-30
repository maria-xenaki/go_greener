const API_URL = "http://localhost:8080";

export const login = async (username, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    
    const token = await res.text();

    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const user = {
        username: payload.sub,
        role: payload.role
    };

    console.log("to payload base64 einai: ", payloadBase64)
    console.log("to payload einai: ", payload)
    localStorage.setItem("token", token);

    return { token, user};
    };

export const register = async (user) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error("Register failed");
    return res.text();
}
// Send authenticated request
const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    return fetch(url, { ...options, headers });
};

// AUTH - Forgot / Reset Password
export const requestPasswordReset = async (email) => {
  const res = await fetch(`${API_URL}/auth/password/forgot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to request password reset");
  }
  return res.text(); // backend usually returns "Reset link sent"
};

export const resetPassword = async (token, newPassword) => {
  const res = await fetch(`${API_URL}/auth/password/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }) // ✅ send JSON, not query params
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to reset password");
  }
  return res.text();
};

//EVENTS
// Post a new event (authenticated)
export const createEvent = async (eventData) => {
     const token = localStorage.getItem("token");
    if (!token) throw new Error("No token, user might not be logged in");

    const res = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
    });

    if (!res.ok) throw new Error("Failed to create event");
    return res.json();
};

export const fetchUnapprovedEvents = async () => {
    const res = await authFetch(`${API_URL}/api/events/unapproved`);
    if (!res.ok) throw new Error("Failed to fetch unapproved events");
    return res.json();
};

// Approve event
export const approveEvent = async (id) => {
    const res = await authFetch(`${API_URL}/api/events/${id}/approve`, { method: "PUT" });
    if (!res.ok) throw new Error("Failed to approve event");
    return res.json();
};

// Delete event
export const deleteEvent = async (id) => {
    const res = await authFetch(`${API_URL}/api/events/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete event");
};

// Update event
// export const updateEvent = async (id, updatedData) => {
//     const res = await authFetch(`${API_URL}/api/events/${id}`, {
//         method: "PUT",
//         body: JSON.stringify(updatedData)
//     });

//     if (!res.ok) throw new Error("Failed to update event");
//     return res.json();
// };

//second  
//export const updateEvent = async (id, payload) => {
//     const res = await authFetch(`${API_URL}/api/events/${id}`, {
//         method: "PUT",
//         body: JSON.stringify(payload)
//     });

//     if (!res.ok) throw new Error("Failed to update event");
//     return res.json();
// };

//third
export const updateEvent = async(id, payload) => {
  console.log("perasa apo do?")
    const res = await authFetch(`${API_URL}/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, // ✅ force JSON
        body: JSON.stringify(payload) // ✅ must be object, not number
    });

    if (!res.ok) throw new Error("Failed to update event");
    return res.json();
};


//USERS
// Get all users (ADMIN only)
export const fetchAllUsers = async () => {
    const res = await authFetch(`${API_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
};

// Soft delete (disable/enable) user
export const toggleUserEnabled = async (id) => {
    const res = await authFetch(`${API_URL}/users/${id}/toggle-enabled`, {
        method: "PUT"
    });
    if (!res.ok) throw new Error("Failed to toggle user");
    return res.json();
};

//ENTITIES
export const createEntity = async (type, data) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token, user might not be logged in");
  
  let endpoint = `${API_URL}/api/`; // base endpoint

  switch(type) {
    case "event": endpoint += "events"; break;
    case "volunteer": endpoint += "volunteers"; break;
    case "shop": endpoint += "shops"; break;
    case "dine": endpoint += "dine"; break;
    default: throw new Error("Unknown entity type");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create ${type}`);
  }

  return response.json();
};


// EVENTS
export const fetchApprovedEvents = async () => {
  const res = await fetch(`${API_URL}/api/events/approved`);
  if (!res.ok) throw new Error("Failed to fetch approved events");
  return res.json();
};

// VOLUNTEERS
export const fetchApprovedVolunteers = async () => {
  const res = await fetch(`${API_URL}/api/volunteers/approved`);
  if (!res.ok) throw new Error("Failed to fetch approved volunteers");
  return res.json();
};

export const fetchUnapprovedVolunteers = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/volunteers/unapproved`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch unapproved Volunteer");
  return res.json();
};

export const approveVolunteer = async (id) => {
  const res = await authFetch(`${API_URL}/api/volunteers/${id}/approve`, { method: "PUT" });
  if (!res.ok) throw new Error("Failed to approve volunteer");
  return res.json();
};

export const deleteVolunteer = async (id) => {
  const res = await authFetch(`${API_URL}/api/volunteers/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete volunteer");
};

export const updateVolunteer = async (id, payload) => {
  const res = await authFetch(`${API_URL}/api/volunteers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update volunteer");
  return res.json();
};

// SHOPS
export const fetchApprovedShops = async () => {
  const res = await authFetch(`${API_URL}/api/shops/approved`);
  if (!res.ok) throw new Error("Failed to fetch approved shops");
  return res.json();
};

export const fetchUnapprovedShops = async () => {
  const token = localStorage.getItem("token");
  const res = await authFetch(`${API_URL}/api/shops/unapproved`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch unapproved shops");
  return res.json();
};

export const approveShop = async (id) => {
  const res = await authFetch(`${API_URL}/api/shops/${id}/approve`, { method: "PUT" });
  if (!res.ok) throw new Error("Failed to approve shop");
  return res.json();
};

export const deleteShop = async (id) => {
  const res = await authFetch(`${API_URL}/api/shops/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete shop");
};

export const updateShop = async(id, payload) => {
  console.log("perasa apo do?")
    const res = await authFetch(`${API_URL}/api/shops/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, // ✅ force JSON
        body: JSON.stringify(payload) // ✅ must be object, not number
    });

    if (!res.ok) throw new Error("Failed to update shop");
    return res.json();
};

// DINING
export const fetchApprovedDine = async () => {
  const res = await authFetch(`${API_URL}/api/dine/approved`);
  if (!res.ok) throw new Error("Failed to fetch approved dine");
  return res.json();
};

export const fetchUnapprovedDine = async () => {
  const token = localStorage.getItem("token");
  const res = await authFetch(`${API_URL}/api/dine/unapproved`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch unapproved dining");
  return res.json();
};

export const approveDine = async (id) => {
  const res = await authFetch(`${API_URL}/api/dine/${id}/approve`, { method: "PUT" });
  if (!res.ok) throw new Error("Failed to approve dining entry");
};

export const deleteDine = async (id) => {
  const res = await authFetch(`${API_URL}/api/dine/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete dining entry");
};

export const updateDine = async (id, payload) => {
  // payload must be a JSON object with the fields of Dine
  const res = await fetch(`http://localhost:8080/api/dine/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`
    },
    body: JSON.stringify(payload) // <-- payload must be an object, not a number
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to update dining entry");
  }

  return res.json();
};



