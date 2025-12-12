import api from "../utils/interceptors";

export const RemitteeService = {
    getRemittees,
    getRemittee,
    saveRemittee,
    deleteRemittee,
};

async function getRemittee(remitterId, id) {
    const result = await api.get(`remitee/${remitterId}/${id}`);
    return result;
}

async function deleteRemittee(id) {
    const result = await api.get(`remitee/delete/${id}`);
    return result;
}

async function getRemittees(model) {
    const result = await api.post("remitee/fetch", model);
    return result;
}

async function saveRemittee(model) {
    const result = await api.post("remitee/create", model);
    return result;
}
