import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { hasPermission } from "../utils/permissions.utils";

const ProtectedRoute = ({ element, requiredPerms }) => {
  const { token, loading, permissions } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!hasPermission(permissions, requiredPerms)) {
    return <div>Access Denied</div>;
  }

  return element;
};

export default ProtectedRoute;
