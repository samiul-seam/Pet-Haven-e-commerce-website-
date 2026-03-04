import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return (
      <div className="min-h-screen bg-cyan-100 flex justify-center items-center">
        <span className="loading loading-dots loading-lg text-teal-600"></span>
      </div>
    );
  }
  return user ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
