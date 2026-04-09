import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router";
import preLoader from "../assets/images/preloader.gif"

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return (
      <div className="min-h-screen bg-cyan-100 flex justify-center items-center">
        <img src={preLoader} alt="Loading..." className="w-20 h-20" />
      </div>
    );
  } 
  return user ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
