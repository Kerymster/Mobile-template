import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  loginToken: string | null;
  setLoginToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  loginToken: null,
  setLoginToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginToken, setLoginToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ loginToken, setLoginToken }}>
      {children}
    </AuthContext.Provider>
  );
};
