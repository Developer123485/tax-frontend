import axios from "axios";
const baseUrl = "http://stage-api.taxvahan.site/api/";
export const apiRequest = axios.create({ baseURL: baseUrl });
export const apiUrl = "http://stage-api.taxvahan.site/api/";