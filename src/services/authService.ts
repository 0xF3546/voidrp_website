import axios from "axios";
import { IAuthRequest } from "../types/IAuthRequest";

const authService = {
  login: async (user: any): Promise<IAuthRequest | null> => {
    try {
      const response = await axios.post("/auth/login", user);
      console.log("Login response:", response);
      if (response.status === 200) {
        return response.data as IAuthRequest;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
    return null;
  },
};

export default authService;
