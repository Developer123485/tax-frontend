import api from "../utils/interceptors";

export const DeducteeEntryService = {
  getDeducteeEntries,
  getDeducteeEntry,
  saveDeducteeEntry,
  deleteDeducteeEntry,
  deleteAllDeducteeEntry,
  deleteBulkDeducteeEntry,
  getTdsRate,
  getDeducteeDropdowns,
  getPanLists
};

async function deleteDeducteeEntry(id) {
  const result = await api.get(`deducteeEntry/delete/${id}`);
  return result;
}

async function getPanLists(model, val) {
  const result = await api.post(`deducteeEntry/getPanLists`, model);
  return result;
}

async function deleteBulkDeducteeEntry(model) {
  const result = await api.post(`deducteeEntry/deleteBulkEntry`, model);
  return result;
}

async function deleteAllDeducteeEntry(model) {
  const result = await api.post(`deducteeEntry/deleteAllEntry`, model);
  return result;
}

async function getDeducteeEntries(model) {
  const result = await api.post(`deducteeEntry/fetch`, model);
  return result;
}

async function getDeducteeDropdowns(DeductorId, catId) {
  const result = await api.get(`deducteeEntry/deducteeDropdowns/${DeductorId}/${catId}`);
  return result;
}


async function getDeducteeEntry(id) {
  const result = await api.get(`deducteeEntry/${id}`);
  return result;
}

async function getTdsRate(sectionCode, categoryId) {
  const result = await api.get(
    `deducteeEntry/tdsRate/${sectionCode}/${categoryId}`
  );
  return result;
}

async function saveDeducteeEntry(model) {
  const result = await api.post("deducteeEntry/deductee-entry", model);
  return result;
}
