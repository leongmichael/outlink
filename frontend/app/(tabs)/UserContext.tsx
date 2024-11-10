// context/UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userId: string | null;
  userEmail: string | null;
  setUserId: (id: string) => void;
  setUserEmail: (email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, userEmail, setUserId, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
