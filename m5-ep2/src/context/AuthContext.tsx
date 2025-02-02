import React, { createContext, useContext, useState, useEffect } from "react";
import { encryptData, decryptData } from "../utils/encryption";
import {User} from "../objects/User";


interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  // ... other auth context properties
}

//const [user, setUser] = useState< IUser | null>(null);

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false, // Initialize to false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Use correct type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const decryptedUser = decryptData(storedUser);
      setUser(decryptedUser);
    }
    setLoading(false);
  }, []);

  const login = (user: User) => {
      setUser(user)
      const encryptedUser = encryptData(user); // Encriptación ya configurada
      localStorage.setItem("user", encryptedUser);
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = { user, login, logout, isAuthenticated: !!user };

  return (
    <AuthContext.Provider value={value}>
        {!loading ? children : <p>Cargando...</p>} {/* Or a better loading indicator */}
    </AuthContext.Provider>
);

};

export const useAuth = () => useContext(AuthContext);

export type { AuthContextType, User }; // Export types
