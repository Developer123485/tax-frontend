import api from "../utils/interceptors";
import { CommonService } from "./common.service";

export const ChallanService = {
  getChallans,
  getChallan,
  saveChallan,
  updateChallan,
  getChallansDropdowns,
  deleteChallan,
  deleteAllChallan,
  deleteBulkChallan,
};

async function getChallans(model) {
  const result = await api.post(`challan/fetch`, model);
  return result;
}

async function deleteChallan(id) {
  const result = await api.get(`challan/delete/${id}`);
  return result;
}

async function deleteBulkChallan(model) {
  const result = await api.post(`challan/deleteBulkChallans`, model);
  return result;
}

async function deleteAllChallan(model) {
  const result = await api.post(`challan/deleteAllChallans`, model);
  return result;
}

async function getChallansDropdowns(model) {
  const result = await api.post(`deducteeEntry/challanDropdowns`, model);
  return result;
}

async function getChallan(id) {
  const result = await api.get(`challan/${id}`);
  return result;
}

async function saveChallan(model) {
  const result = await api.post("challan/createChallan", model);
  return result;
}

async function updateChallan(model) {
  const result = await api.put("challan/updateChallan", model);
  return result;
}
