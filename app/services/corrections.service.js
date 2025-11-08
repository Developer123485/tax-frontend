import api from "../utils/interceptors";
import { CommonService } from "./common.service";

export const CorrectionsService = {
    getCorrectionsStatement,
};

async function getCorrectionsStatement(model) {
    const result = await api.post(`correctionStatements/fetch`, model);
    return result;
}