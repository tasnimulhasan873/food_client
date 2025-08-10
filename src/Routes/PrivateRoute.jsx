import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router"; // <-- also fix: use 'react-router-dom'
import { AuthContext } from "../context/AuthC";
import PulsingDotLoader from "../components/PulsingDotLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // <-- FIXED: useContext
  const location = useLocation();

  if (loading) {
    return <PulsingDotLoader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
