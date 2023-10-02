import { createContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const api = useApi();

  const setToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  useEffect(() => {
    const validateUser = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const data = await api.validateToken(token);
        if (data.user) {
          setUser(data.user);
        }
      }
    };

    validateUser();
  }, [api]);

  const signin = async (email, password) => {
    const data = await api.signin(email, password);
    if (data && data.token) {
      setUser(data.name);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const signup = async (name, email, password, phoneNumber) => {
    const data = await api.signup(name, email, password, phoneNumber);
    if (!data) {
      return false;
    } else return true;
  };

  const signout = async () => {
    setUser(null);
    setToken("");
    api.signout();
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
