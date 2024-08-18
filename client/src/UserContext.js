import {createContext, useState} from "react";

// Create a new context for managing user information
export const UserContext = createContext({});

// UserContextProvider component to provide the UserContext to its children
export function UserContextProvider({children}) {
  // State hook to store user information
  const [userInfo, setUserInfo] = useState({});

  // Return the context provider component
  // It provides the userInfo and setUserInfo to all child components that consume this context
  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children} {/* Render any child components */}
    </UserContext.Provider>
  );
}
