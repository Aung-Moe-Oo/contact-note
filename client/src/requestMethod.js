import axios from "axios";

// const BASE_URL = "https://user-dashboard-mern-api.vercel.app/api/";
const BASE_URL = "http://localhost:5000/api/";

export const request = axios.create({
  baseURL: BASE_URL,
});
