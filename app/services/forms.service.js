import api from "../utils/interceptors";

export const FormsService = {
  getFormsDashboard,
  exportFormData,
  generateForm,
  finalReport,
  final24GReport,
  fetchTaxDeposits,
  fetchInterestCalculate,
  fetchShortDeductions,
  fetchLateDeductions,
  getUniquePannumbers,
  generateForm16,
  generateForm16A,
  generateForm27D,
  generateForm12BA,
  fetchLateFeePayable
};

async function exportFormData(model) {
  let axiosConfig = {
    responseType: "blob",
  };
  const result = await api.post(`forms/exportExcelFile`, model, axiosConfig);
  return result;
}

async function generateForm(model) {
  let axiosConfig = {
    responseType: "blob",
  };
  const result = await api.post(`forms/generatedocument`, model);
  return result;
}

async function generateForm16(model) {
  const result = await api.post(`forms/generate-form-16`, model);
  return result;
}

async function generateForm16A(model) {
  const result = await api.post(`forms/generate-form-16A`, model);
  return result;
}

async function generateForm27D(model) {
  const result = await api.post(`forms/generate-form-27D`, model);
  return result;
}

async function generateForm12BA(model) {
  const result = await api.post(`forms/generate-form-12BA`, model);
  return result;
}

async function getUniquePannumbers(deductorId, isEmployee) {
  const result = await api.post(`forms/uniquePannumbers/${deductorId}/${isEmployee}`);
  return result;
}

async function fetchLateDeductions(model, value) {
  let axiosConfig;
  if (value) {
    axiosConfig = {
      responseType: "blob",
    };
  }
  const result = await api.post(`forms/fetch/lateDeductionReports/${value}`, model, axiosConfig);
  return result;
}

async function fetchInterestCalculate(model, value) {
  let axiosConfig;
  if (value) {
    axiosConfig = {
      responseType: "blob",
    };
  }
  const result = await api.post(`forms/fetch/interestCalculateReports/${value}`, model, axiosConfig);
  return result;
}

async function fetchLateFeePayable(model, value) {
  let axiosConfig;
  if (value) {
    axiosConfig = {
      responseType: "blob",
    };
  }
  const result = await api.post(`forms/fetch/lateFeePayable/${value}`, model, axiosConfig);
  return result;
}

async function fetchShortDeductions(model, value) {
  let axiosConfig;
  if (value) {
    axiosConfig = {
      responseType: "blob",
    };
  }
  const result = await api.post(`forms/fetch/shortDeductionReports/${value}`, model, axiosConfig);
  return result;
}

async function fetchTaxDeposits(model, value) {
  let axiosConfig;
  if (value) {
    axiosConfig = {
      responseType: "blob",
    };
  }
  const result = await api.post(`forms/fetch/lateDepositReports/${value}`, model, axiosConfig);
  return result;
}

async function finalReport(model) {
  const result = await api.post(`forms/finalReport`, model, {
    responseType: "blob",
  });
  return result;
}

async function final24GReport(model) {
  const result = await api.post(`forms/final24GReport`, model, {
    responseType: "blob",
  });
  return result;
}


async function getFormsDashboard(model) {
  const result = await api.post(`forms/fetch`, model);
  return result;
}
