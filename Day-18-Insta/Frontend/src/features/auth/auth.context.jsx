import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await getMe();
        setUser(response.user);
      } catch (error) {
        console.log("User not logged in");
      }
    };

    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};