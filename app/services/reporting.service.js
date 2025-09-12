import api from "../utils/interceptors";
export const ReportingService = {
  getTdsRates,
  saveTdsRate,
  getTdsRate,
  deleteTds,
  uploadTdsData,
  getTaxDeposits,
  saveTaxDeposit,
  getTaxDepositRate,
  deleteTaxDeposit,
  uploadtaxData,
  getFillingReturn,
  getFillingReturns,
  uploadFillingReturnData,
  saveFillingReturn,
  deleteFillingReturn,
  getMiscellaneousAReports,
  getMiscellaneousBReports,
  getMiscellaneousCReports,
  downloadReports,
  getTDSDeductedReports,
  getSalaryReports,
  deleteBulk,
  deleteTDSBulk,
  deleteTaxDepositBulk,
  getTdsReturns,
  submitTdsReturn
};
async function getTdsRates(model, categoryId) {
  const result = await api.post(
    `reporting/tdsRates/fetch/${categoryId}`,
    model
  );
  return result;
}

async function downloadReports(model) {
  let axiosConfig = {
    responseType: "blob",
  };
  const result = await api.post(
    `reporting/downloadMiscellaneous`,
    model,
    axiosConfig
  );
  return result;
}

async function getTdsRate(id) {
  const result = await api.get(`reporting/tdsRates/${id}`);
  return result;
}

async function uploadTdsData(file, categoryId) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const result = await api.post(
    `reporting/tdsRates/uploadExcelFile/${categoryId}`,
    file,
    config
  );
  return result;
}

async function saveTdsRate(model) {
  const result = await api.post("reporting/tdsRates/create", model);
  return result;
}

async function submitTdsReturn(model) {
  const result = await api.post("reporting/tdsReturn/create", model);
  return result;
}

async function deleteTds(id) {
  const result = await api.get(`reporting/tdsRates/delete/${id}`);
  return result;
}

async function getTaxDepositRate(id) {
  const result = await api.get(`reporting/taxDepositDueDates/${id}`);
  return result;
}

async function getTaxDeposits(model) {
  const result = await api.post(`reporting/taxDepositDueDates/fetch`, model);
  return result;
}

async function getMiscellaneousAReports(model) {
  const result = await api.post(`reporting/fetch/miscellaneousAReport`, model);
  return result;
}

async function getTDSDeductedReports(model, value) {
  let axiosConfig;
  if (value) {
    axiosConfig = {
      responseType: "blob",
    };
  }
  const result = await api.post(`reporting/fetch/tdsDeductedReports/${value}`, model, axiosConfig);
  return result;
}

async function getSalaryReports(model, value) {
  let axiosConfig;
  if (value) {
    axiosConfig = {
      responseType: "blob",
    };
  }
  const result = await api.post(`reporting/fetch/salaryReports/${value}`, model, axiosConfig);
  return result;
}

async function getTdsReturns(model, value) {
  let axiosConfig;
  if (value) {
    axiosConfig = {
      responseType: "blob",
    };
  }
  const result = await api.post(`reporting/tdsReturn/fetch`, model, axiosConfig);
  return result;
}


async function getMiscellaneousBReports(model) {
  const result = await api.post(`reporting/fetch/miscellaneousBReport`, model);
  return result;
}

async function getMiscellaneousCReports(model) {
  const result = await api.post(`reporting/fetch/miscellaneousCReport`, model);
  return result;
}

async function uploadtaxData(file) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const result = await api.post(
    `reporting/taxDepositDueDates/uploadExcelFile`,
    file,
    config
  );
  return result;
}

async function saveTaxDeposit(model) {
  const result = await api.post("reporting/taxDepositDueDates/create", model);
  return result;
}

async function deleteTaxDeposit(id) {
  const result = await api.get(`reporting/taxDepositDueDates/delete/${id}`);
  return result;
}

async function getFillingReturn(id) {
  const result = await api.get(`reporting/returnFillingDueDates/${id}`);
  return result;
}

async function getFillingReturns(model) {
  const result = await api.post(`reporting/returnFillingDueDates/fetch`, model);
  return result;
}

async function deleteBulk(model) {
  const result = await api.post(`reporting/deleteBulk`, model);
  return result;
}

async function deleteTDSBulk(model) {
  const result = await api.post(`reporting/deleteTdsBulk`, model);
  return result;
}

async function deleteTaxDepositBulk(model) {
  const result = await api.post(`reporting/deleteTaxDepositBulk`, model);
  return result;
}

async function uploadFillingReturnData(file) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const result = await api.post(
    `reporting/returnFillingDueDates/uploadExcelFile`,
    file,
    config
  );
  return result;
}

async function saveFillingReturn(model) {
  const result = await api.post(
    "reporting/returnFillingDueDates/create",
    model
  );
  return result;
}

async function deleteFillingReturn(id) {
  const result = await api.get(`reporting/returnFillingDueDates/delete/${id}`);
  return result;
}
