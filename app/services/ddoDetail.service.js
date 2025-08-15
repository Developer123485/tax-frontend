import api from "../utils/interceptors";
import { CommonService } from "./common.service";

export const DdoDetailService = {
    getDdoDetails,
    getDdoDetail,
    saveDdoDetail,
    deleteDdoDetail,
    deleteAllDdoDetail,
    deleteBulkDdoDetail,
    getDdoWiseDetails,
    getDdoWiseDetail,
    saveDdoWiseDetail,
    deleteDdoWiseDetail,
    deleteAllDdoWiseDetail,
    deleteBulkDdoWiseDetail,
    getDdoDropdowns
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

async function getDdoDropdowns(DeductorId) {
    const result = await api.get(`ddoDetails/ddoDropdowns/${DeductorId}`);
    return result;
}


async function saveDdoDetail(model) {
    const result = await api.post("ddoDetails/create", model);
    return result;
}

async function getDdoWiseDetails(model) {
    const result = await api.post(`ddoDetails/fetch/ddoWiseDetails`, model);
    return result;
}

async function deleteDdoWiseDetail(id) {
    const result = await api.get(`ddoDetails/delete/ddoWiseDetails/${id}`);
    return result;
}

async function deleteBulkDdoWiseDetail(model) {
    const result = await api.post(`ddoDetails/deleteBulk/ddoWiseDetails`, model);
    return result;
}

async function deleteAllDdoWiseDetail(ddoId, fy, month) {
    const result = await api.post(`ddoDetails/deleteAll/ddoWiseDetails/${ddoId}/${fy}/${month}`);
    return result;
}

async function getDdoWiseDetail(id) {
    const result = await api.get(`ddoDetails/ddoWiseDetails/${id}`);
    return result;
}

async function saveDdoWiseDetail(model) {
    const result = await api.post("ddoDetails/ddoWiseDetails/create", model);
    return result;
}

