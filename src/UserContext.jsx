import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios
        .get("https://airbnb-backend-vra7.onrender.com/profile", {
          headers: {
            Authorization: "Bearer " + window.localStorage?.token,
          },
        })
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
