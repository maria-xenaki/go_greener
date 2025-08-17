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

// Get all unapproved events
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
export const updateEvent = async (id, updatedData) => {
    const res = await authFetch(`${API_URL}/api/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData)
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

