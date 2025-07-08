import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { IUser } from "../types/IUser";
import { IAuth } from "../types/IAuth";
import { IAuthContext } from "../types/IAuthContext";
import { AppRoutes } from "../AppRouter";

export const authContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: IAuth) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null);

  useEffect(() => {
    if (currentUser != null) localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  async function login(user: any) {
    const res = await authService.login(user);
    if (!res) return;
    console.log("Login successful:", res);
    setCurrentUser(res.user);
    localStorage.setItem("token", res.token);
    window.location.href = AppRoutes.DASHBOARD.path;
  }

  function logout() {
    setCurrentUser(null);
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <authContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </authContext.Provider>
  );
}