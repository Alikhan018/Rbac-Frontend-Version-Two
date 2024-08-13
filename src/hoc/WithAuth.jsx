import React from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const WithAuth = (WrappedComponent) => {
  return function AuthWrappedComponent(props) {
    const nav = useNavigate();
    const { token, loading } = React.useContext(AuthContext);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!token) {
      nav("/");
      return;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;
