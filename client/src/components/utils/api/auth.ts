import API from "./axios";
import { SignupForm, LoginForm } from "../types";
export const signup = (userData: SignupForm) =>
  API.post("/auth/signup", userData);
export const login = (credentials: LoginForm) =>
  API.post("/auth/login", credentials);
/* export const refresh = (refreshToken) =>
  API.post("/auth/refresh", { token: refreshToken });
 */
