import { useEffect, useState } from "react";
import { fetchAllUsers, toggleUserEnabled } from "../api";

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await fetchAllUsers();
            setUsers(data);
        } catch (error) {
            alert("Failed to load users");
        }
    };

    const handleToggleEnabled = async (id) => {
        try {
            const updatedUser = await toggleUserEnabled(id);
            setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
        } catch {
            alert("Failed to toggle user status");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Manage Existing Users</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.enabled ? "Enabled" : "Disabled"}</td>
                            <td>
                                <button onClick={() => handleToggleEnabled(user.id)} className="btn btn-sm btn-secondary">
                                    {user.enabled ? "Disable" : "Enable"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsersPage;
