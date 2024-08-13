import React from "react";
import { AuthContext } from "../context/AuthProvider";

const WithAuth = (WrappedComponent) => {
  return function AuthWrappedComponent(props) {
    const { token, loading } = React.useContext(AuthContext);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!token) {
      return <div>Please log in</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;
