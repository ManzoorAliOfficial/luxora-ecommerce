import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setUser({ id: 1, name: "John Doe", email, role: "user", avatar: "JD" });
    setLoading(false);
  }, []);

  const loginAsAdmin = useCallback(() => {
    setUser({ id: 0, name: "Admin", email: "admin@luxora.com", role: "admin", avatar: "AD" });
  }, []);

  const logout  = useCallback(() => setUser(null), []);
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, loading, login, loginAsAdmin, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}