import axios from "axios";
const baseUrl = "http://139.84.175.29:5000/api/";
export const apiRequest = axios.create({ baseURL: baseUrl });
export const apiUrl = "http://139.84.175.29:5000/api/";
