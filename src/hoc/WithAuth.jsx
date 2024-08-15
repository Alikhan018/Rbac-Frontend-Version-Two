import React, { useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
const WithAuth = (WrappedComponent) => {
  return function AuthWrappedComponent(props) {
    const nav = useNavigate();
    const { token, loading } = React.useContext(AuthContext);

    useEffect(() => {
      if (!loading && !token) {
        nav("/");
      }
    }, [loading, token, nav]);
    if (loading) {
      return <Spinner />;
    }

    return token ? <WrappedComponent {...props} /> : null;
  };
};

export default WithAuth;
