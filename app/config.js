import axios from "axios";
const baseUrl = "https://stage-api-tax.skycloudops.in/api/";
export const apiRequest = axios.create({ baseURL: baseUrl });
export const apiUrl = "https://stage-api-tax.skycloudops.in/api/";