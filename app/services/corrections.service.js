import api from "../utils/interceptors";
import { CommonService } from "./common.service";

export const CorrectionsService = {
    getCorrectionsStatement,
    getCorrectionStatement
};

async function getCorrectionsStatement(model) {
    const result = await api.post(`correctionStatements/fetch`, model);
    return result;
}


async function getCorrectionStatement(deductorId, id) {
    const result = await api.get(`correctionStatements/correctionStatementDetail/${deductorId}/${id}`);
    return result;
}