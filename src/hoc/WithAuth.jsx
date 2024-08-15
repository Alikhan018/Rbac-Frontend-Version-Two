import React, { useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
const WithAuth = (WrappedComponent) => {
  return function AuthWrappedComponent(props) {
    const nav = useNavigate();
    const { token, loading } = React.useContext(AuthContext);

    useEffect(() => {
      console.log(token);
      if (!loading && !token) {
        nav("/");
      }
    }, [loading, token, nav]);
    if (loading) {
      return <div>Loading...</div>;
    }

    return token ? <WrappedComponent {...props} /> : null;
  };
};

export default WithAuth;
