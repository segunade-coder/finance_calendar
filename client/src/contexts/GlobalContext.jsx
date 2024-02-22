/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();
const GlobalContext = ({ children }) => {
  const [user, setUser] = useState(() => ({
    loggedIn: null,
    admin: null,
  }));
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default GlobalContext;
