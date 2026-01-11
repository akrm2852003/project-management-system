/* eslint-disable react-refresh/only-export-components */
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { USERS_URL } from "../service/api.js";
import { axiosInstance } from "../service/urls.js";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [loginData, setLoginData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fullUserData, setFullUserData] = useState(null);

  const saveLoginData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        setLoginData(decoded);
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await axiosInstance.get(USERS_URL.GET_CURRENT_USER);
      setFullUserData(res.data);
    
      
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
      getCurrentUser();
    } else {
      setLoginData(null);
      setIsLoading(false);
    }
  }, []);

  const logOutUser = () => {
    localStorage.removeItem("token");
    saveLoginData();
    setFullUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loginData,
        setLoginData,
        saveLoginData,
        isLoading,
        setFullUserData,
        fullUserData,
        getCurrentUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
