import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-green-500"></span>
      </div>
    );
  }
  
  if (user && user.email) {
    return children;
  }


  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
