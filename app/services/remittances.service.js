import api from "../utils/interceptors";

let axiosConfig = {
    headers: { "Content-Type": "application/json" }
};

export const RemittanceService = {
    fetchRemittances,
    getRemittance,
    saveRemittance,
    deleteRemittance,
    getRemittees,
    getBanks,
    getRemittanceDropdowns
};

async function fetchRemittances(model) {
    return api.post(`/remittance/fetch`, model, axiosConfig).then(r => r);
}

async function getRemittance(id) {
    return api.get(`/remittance/${id}`, axiosConfig).then(r => r);
}

async function getRemittanceDropdowns(remitterId) {
    return api.get(`/remittance/dropdownList/${remitterId}`, axiosConfig).then(r => r);
}


async function saveRemittance(model) {
    return api.post(`/remittance/create`, model, axiosConfig).then(r => r);
}

async function deleteRemittance(id) {
    return api.get(`/remittance/delete/${id}`, axiosConfig).then(r => r);
}

async function getRemittees(remitterId) {
    return api.get(`/remittee/list/${remitterId}`, axiosConfig).then(r => r);
}

async function getBanks(remitterId) {
    return api.get(`/bankdetail/list/${remitterId}`, axiosConfig).then(r => r);
}
