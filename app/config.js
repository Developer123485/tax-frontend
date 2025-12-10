import axios from "axios";
const baseUrl = "http://localhost:5008/api/";
export const apiRequest = axios.create({ baseURL: baseUrl });
export const apiUrl = "http://localhost:5008/api/";