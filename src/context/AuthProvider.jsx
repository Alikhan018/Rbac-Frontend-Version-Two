import React, {
  createContext,
  useState,
  useLayoutEffect,
  useMemo,
} from "react";

// Create AuthContext with a default value (optional)
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []); // Empty dependency array ensures this runs only once

  const contextValue = useMemo(
    () => ({ token, loading, setToken }),
    [token, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
