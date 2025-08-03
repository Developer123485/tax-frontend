import axios from "axios";
const baseUrl = "https://localhost:44319/api/";
export const apiRequest = axios.create({ baseURL: baseUrl });
export const apiUrl = "https://localhost:44319/api/";
