import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  async function getUser() {
    const res = await fetch(`${API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data);
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
