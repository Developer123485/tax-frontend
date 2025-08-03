import api from "../utils/interceptors";

export const DeductorsService = {
  uploadDeductors,
  getDeductors,
  getDeductor,
  saveDeductor,
  deleteDeductor,
  getDeductorDropdownList,
  exportExcelFile,
  updateDeductorFvu,
  startLogin,
  submitCaptcha
};

async function uploadDeductors(formData) {
  const result = await api.post("deductor/uploadExcelFile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
}

async function getDeductor(id) {
  const result = await api.get(`deductor/${id}`);
  return result;
}

async function deleteDeductor(id) {
  const result = await api.get(`deductor/delete/${id}`);
  return result;
}

async function getDeductors(model) {
  const result = await api.post("deductor/fetch", model);
  return result;
}

async function startLogin(model) {
  const result = await api.post("deductor/start-login", model);
  return result;
}

async function submitCaptcha(model) {
  const result = await api.post("deductor/submit-captcha", model);
  return result;
}

async function updateDeductorFvu(model, deductorId) {
  const result = await api.post(`deductor/fuvUpdateDeductor/${deductorId}`, model);
  return result;
}

async function getDeductorDropdownList() {
  const result = await api.post("deductor/fetch/deductorDropdownList");
  return result;
}

async function exportExcelFile(id) {
  let axiosConfig = {
    responseType: "blob",
  };
  const result = await api.get(`deductor/exportExcelFile`, axiosConfig);
  return result;
}


async function saveDeductor(model) {
  const result = await api.post("deductor/saveDeductor", model);
  return result;
}
