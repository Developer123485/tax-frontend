import axios from "axios";
const baseUrl = "http://65.20.68.127:5008/api/";
export const apiRequest = axios.create({ baseURL: baseUrl });
export const apiUrl = "http://65.20.68.127:5008/api/";