import api from "../utils/interceptors";
import { CommonService } from "./common.service";

export const CorrectionsService = {
    getCorrectionsStatement,
    getCorrectionStatement,
    saveDeductor,
    getFormsDashboard,
    deleteCorrectionDeductor,
    getCorrectionChallans,
    getCorrectionChallan,
    saveCorrectionChallan,
    getCorrectionDeducteeEntries,
    deleteCorrectionDeducteeEntry,
    deleteCorrectionBulkDeducteeEntry,
    undoChallans,
    undoDeducteeEntrys,
    getCorrectionDeducteeEntry,
    getCorrectionDeducteeDropdowns,
    saveCorrectionDeducteeEntry,
    getChallansDropdowns,
    getCorrectionDeductees,
    getCorrectionEmployees,
    getCorrectionDeductee,
    getCorrectionEmployee,
    saveCorrectionEmployee,
    saveCorrectionDeductee,
    finalCorrectionReport,
    exportFormData
};

async function getCorrectionChallans(model) {
    const result = await api.post(`correctionStatements/challans/fetch`, model);
    return result;
}

async function deleteCorrectionDeducteeEntry(id) {
    const result = await api.get(`correctionStatements/deducteeEntry/delete/${id}`);
    return result;
}

async function undoChallans(model) {
    const result = await api.post(`correctionStatements/challans/undo`, model);
    return result;
}

async function undoDeducteeEntrys(model) {
    const result = await api.post(`correctionStatements/deducteeEntry/undo`, model);
    return result;
}

async function deleteCorrectionBulkDeducteeEntry(model) {
    const result = await api.post(`correctionStatements/deducteeEntry/deleteBulkEntry`, model);
    return result;
}

async function getCorrectionDeducteeEntries(model) {
    const result = await api.post(`correctionStatements/deducteeEntry/fetch`, model);
    return result;
}

async function getCorrectionDeducteeDropdowns(DeductorId, catId) {
    const result = await api.get(`correctionStatements/deducteeDropdowns/${DeductorId}/${catId}`);
    return result;
}


async function getCorrectionDeducteeEntry(id) {
    const result = await api.get(`correctionStatements/deducteeEntry/${id}`);
    return result;
}

async function saveCorrectionDeducteeEntry(model) {
    const result = await api.post("correctionStatements/deductee-entry", model);
    return result;
}

async function getChallansDropdowns(model) {
    const result = await api.post(`correctionStatements/challanDropdowns`, model);
    return result;
}

async function getCorrectionDeductees(model, deductorId) {
    const result = await api.post(`correctionStatements/deductees/fetch/${deductorId}`, model);
    return result;
}

async function exportFormData(model) {
    let axiosConfig = {
        responseType: "blob",
    };
    const result = await api.post(`correctionStatements/exportExcelFile`, model, axiosConfig);
    return result;
}

async function getCorrectionDeductee(deducteeId) {
    const result = await api.get(`correctionStatements/deductee/${deducteeId}`);
    return result;
}

async function getCorrectionEmployee(deducteeId) {
    const result = await api.get(`correctionStatements/employee/${deducteeId}`);
    return result;
}

async function saveCorrectionEmployee(model) {
    let obj = Object.assign({}, model);
    if (obj.dob)
        obj.dob = CommonService.dateFormat(obj.dob);
    const result = await api.post("correctionStatements/employees/create", obj);
    return result;
}

async function finalCorrectionReport(model) {
    const result = await api.post(`correctionStatements/finalCorrectionReport`, model);
    return result;
}

async function saveCorrectionDeductee(model) {
    const result = await api.post("correctionStatements/deductees/create", model);
    return result;
}

async function getCorrectionEmployees(model, deductorId) {
    const result = await api.post(`employees/fetch/${deductorId}`, model);
    return result;
}


async function getCorrectionChallan(id) {
    const result = await api.get(`correctionStatements/challans/${id}`);
    return result;
}

async function saveCorrectionChallan(model) {
    const result = await api.post("correctionStatements/challans/updateCorrectionChallan", model);
    return result;
}


async function getCorrectionsStatement(model) {
    const result = await api.post(`correctionStatements/fetch`, model);
    return result;
}

async function deleteCorrectionDeductor(id) {
    const result = await api.get(`correctionStatements/delete/${id}`);
    return result;
}

async function saveDeductor(model) {
    const result = await api.post("correctionStatements/saveDeductor", model);
    return result;
}

async function getCorrectionStatement(deductorId, id) {
    const result = await api.get(`correctionStatements/correctionStatementDetail/${deductorId}/${id}`);
    return result;
}

async function getFormsDashboard(model) {
    const result = await api.post(`correctionStatements/formDashbooard/fetch`, model);
    return result;
}