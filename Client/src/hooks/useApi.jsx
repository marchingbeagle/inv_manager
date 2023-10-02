import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const useApi = () => ({
  validateToken: async (token) => {
    const response = await api.post("/validate", { token });
    return response.data;
  },
  signin: async (email, password) => {
    const response = await api.post("/signin", { email, password });
    return response.data;
  },
  signup: async (name, email, password, phoneNumber) => {
    const response = await api.post("/signup", {
      name,
      email,
      password,
      phoneNumber,
    });
    return response.data;
  },

  signout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
});
