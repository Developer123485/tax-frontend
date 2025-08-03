import api from "../utils/interceptors";
import { CommonService } from "./common.service";

export const SalaryDetailservice = {
  getSalaryDetails,
  getSalaryDetail,
  saveSalaryDetail,
  deleteSalaryDetail,
  deleteAllSalaryDetail,
  deleteBulkSalaryDetail,
  getEmployeeDropdowns,
};

async function getSalaryDetails(model) {
  const result = await api.post(`salaryDetail/fetch`, model);
  return result;
}

async function deleteSalaryDetail(id) {
  const result = await api.get(`salaryDetail/delete/${id}`);
  return result;
}

async function deleteBulkSalaryDetail(model) {
  const result = await api.post(`salaryDetail/deleteBulkEntry`, model);
  return result;
}

async function deleteAllSalaryDetail(model) {
  const result = await api.post(`salaryDetail/deleteAllEntry`, model);
  return result;
}

async function getEmployeeDropdowns(id) {
  const result = await api.get(`salaryDetail/employeeDropdowns/${id}`);
  return result;
}

async function getSalaryDetail(id) {
  const result = await api.get(`salaryDetail/${id}`);
  return result;
}

async function saveSalaryDetail(salaryDetail) {
  let obj = Object.assign({}, salaryDetail);
  if (obj.dateOfBirth)
    obj.dateOfBirth = CommonService.dateFormat(obj.dateOfBirth);
  if (obj.periodOfFromDate)
    obj.periodOfFromDate = CommonService.dateFormat(obj.periodOfFromDate);
  if (obj.periodOfToDate)
    obj.periodOfToDate = CommonService.dateFormat(obj.periodOfToDate);
  if (obj.dateFromWhichtheEmployee) {
    obj.dateFromWhichtheEmployee = CommonService.dateFormat(
      obj.dateFromWhichtheEmployee
    );
  }
  if (obj.dateToWhichtheEmployee) {
    obj.dateToWhichtheEmployee = CommonService.dateFormat(
      obj.dateToWhichtheEmployee
    );
  }
  let result = null;
  // if (obj.id > 0) {
  //   result = await api.put("salaryDetail/updateSalaryDetail", obj);
  // } else {
  result = await api.post("salaryDetail/createUpdateSalaryDetail", obj);
  // }
  return result;
}
