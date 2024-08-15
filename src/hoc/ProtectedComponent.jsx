import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { hasPermission } from "../utils/permissions.utils";
import Spinner from "../components/Spinner/Spinner";
import DeniedAccess from "../components/DeniedAccess/DeniedAccess";

const ProtectedRoute = ({ element, requiredPerms }) => {
  const { token, loading, permissions } = useContext(AuthContext);

  if (loading) return <Spinner />;

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!hasPermission(permissions, requiredPerms)) {
    return <DeniedAccess />;
  }

  return element;
};

export default ProtectedRoute;
