import { useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authApiClient.get("/auth/users/");
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold">{error}</div>
    );
  }

  return (
    <div className="p-6 bg-cyan-50 rounded-xl shadow-md shadow-slate-400 border ">
      <h2 className="text-2xl font-bold text-slate-700 mb-6">All Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead className="text-white bg-orange-600">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover text-slate-600">
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>
                  {user.first_name || user.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : "—"}
                </td>
                <td>{user.phone_number || "—"}</td>
                <td>{user.address || "—"}</td>
                <td>
                  {user.is_staff ? (
                    <span className="badge badge-success">Admin</span>
                  ) : (
                    <span className="badge badge-ghost">User</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-slate-500 mt-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
