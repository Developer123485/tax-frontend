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
    saveCorrectionChallan
};

async function getCorrectionChallans(model) {
    const result = await api.post(`correctionStatements/challans/fetch`, model);
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