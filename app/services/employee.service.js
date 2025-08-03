import api from "../utils/interceptors";
import { CommonService } from "./common.service";

export const EmployeeService = {
  getEmployees,
  getEmployee,
  saveEmployee,
  deleteEmployee,
};

async function deleteEmployee(id) {
  const result = await api.get(`employees/delete/${id}`);
  return result;
}

async function getEmployees(model, deductorId) {
  const result = await api.post(`employees/fetch/${deductorId}`, model);
  return result;
}

async function getEmployee(employeeId) {
  const result = await api.get(`employees/${employeeId}`);
  return result;
}

async function saveEmployee(model) {
  let obj = Object.assign({}, model);
  if (obj.dob)
    obj.dob = CommonService.dateFormat(obj.dob);
  const result = await api.post("employees/createEmployee", obj);
  return result;
}
