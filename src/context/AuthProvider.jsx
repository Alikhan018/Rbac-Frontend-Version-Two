import React, { createContext, useState, useEffect, useMemo } from "react";
import UserServices from "../services/users.services";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const us = new UserServices();
      const response = await us.getUser(token);
      const userData = response.data;

      const userPermissions = userData.features.map((f) => f);
      userData.roles.forEach((role) => {
        role.features.forEach((feature) => userPermissions.push(feature));
      });

      userData.groups.forEach((group) => {
        group.features.forEach((feature) => userPermissions.push(feature));
      });

      setUser(userData);
      setPermissions(userPermissions);
      setLoading(false);
    };

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({ token, loading, user, permissions, setToken }),
    [token, loading, user, permissions]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
