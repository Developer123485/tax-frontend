import api from "../utils/interceptors";
import { CommonService } from "./common.service";

export const DdoDetailService = {
    getDdoDetails,
    getDdoDetail,
    saveDdoDetail,
    deleteDdoDetail,
    deleteAllDdoDetail,
    deleteBulkDdoDetail,
};

async function getDdoDetails(model) {
    const result = await api.post(`ddoDetails/fetch`, model);
    return result;
}

async function deleteDdoDetail(id, deductorId) {
    const result = await api.get(`ddoDetails/delete/${id}/${deductorId}`);
    return result;
}

async function deleteBulkDdoDetail(model, deductorId) {
    const result = await api.post(`ddoDetails/deleteBulk/${deductorId}`, model);
    return result;
}

async function deleteAllDdoDetail(deductorId) {
    const result = await api.post(`ddoDetails/deleteAll/${deductorId}`);
    return result;
}

async function getDdoDetail(id) {
    const result = await api.get(`ddoDetails/${id}`);
    return result;
}

async function saveDdoDetail(model) {
    const result = await api.post("ddoDetails/create", model);
    return result;
}

