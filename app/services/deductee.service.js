import api from "../utils/interceptors";

export const DeducteeService = {
  uploadDeductee,
  getDeductees,
  getDeductee,
  saveDeductee,
  updateDeductee,
  deleteDeductee,
  exportExcelFile
};

async function uploadDeductee(formData, deductorId) {
  const result = await api.post(
    `deductee/uploadExcelFile/${deductorId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return result;
}

async function deleteDeductee(id) {
  const result = await api.get(`deductee/delete/${id}`);
  return result;
}

async function exportExcelFile(id) {
  let axiosConfig = {
    responseType: "blob",
  };
  const result = await api.get(`deductee/exportExcelFile/${id}`, axiosConfig);
  return result;
}

async function getDeductees(model, deductorId) {
  const result = await api.post(`deductee/fetch/${deductorId}`, model);
  return result;
}

async function getDeductee(deducteeId) {
  const result = await api.get(`deductee/${deducteeId}`);
  return result;
}

async function saveDeductee(model) {
  const result = await api.post("deductee/createDeductee", model);
  return result;
}

async function updateDeductee(model) {
  const result = await api.put("deductee/updateDeductee", model);
  return result;
}
