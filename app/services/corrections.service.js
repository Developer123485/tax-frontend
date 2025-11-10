import api from "../utils/interceptors";
import { CommonService } from "./common.service";

export const CorrectionsService = {
    getCorrectionsStatement,
    getCorrectionStatement,
    saveDeductor,
    getFormsDashboard,
    deleteCorrectionDeductor
};

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