import axios from "axios";
const baseUrl = "http://65.20.78.78:5001/api/";
export const apiRequest = axios.create({ baseURL: baseUrl });
export const apiUrl = "http://65.20.78.78:5001/api/";