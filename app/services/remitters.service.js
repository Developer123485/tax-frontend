import api from "../utils/interceptors";

export const RemittersService = {
    getRemitters,
    getRemitter,
    saveRemitter,
    deleteRemitter,
};

async function getRemitter(id) {
    const result = await api.get(`remitter/${id}`);
    return result;
}

async function deleteRemitter(id) {
    const result = await api.get(`remitter/delete/${id}`);
    return result;
}

async function getRemitters(model) {
    const result = await api.post("remitter/fetch", model);
    return result;
}

async function saveRemitter(model) {
    const result = await api.post("remitter/create", model);
    return result;
}
