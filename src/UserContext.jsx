import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [noteData, setnoteData] = useState(new Map())
  const signIn = (newUsername) => {
    setUsername(newUsername);
  };
  const noteD = (newData)=>{
    setnoteData(newData);
  }
  const signOut = () => {
    setUsername(null);
  };

  return (
    <UserContext.Provider value={{ username, signIn, signOut,noteD,noteData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
