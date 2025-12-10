import api from "../utils/interceptors";

let axiosConfig = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const AoOrderService = {
    getAoOrders,
    getAoOrder,
    saveAoOrder,
    deleteAoOrder,
};

async function getAoOrders(model) {
    return api
        .post(`/AoOrderDetail/fetch`, model, axiosConfig)
        .then((result) => result)
        .catch((err) => Promise.reject(err));
}

async function getAoOrder(id) {
    return api
        .get(`/AoOrderDetail/${id}`, axiosConfig)
        .then((result) => result)
        .catch((err) => Promise.reject(err));
}

async function saveAoOrder(model) {
    return api
        .post(`/AoOrderDetail/save`, model, axiosConfig)
        .then((result) => result)
        .catch((err) => Promise.reject(err));
}

async function deleteAoOrder(id) {
    return api
        .delete(`/AoOrderDetail/${id}`, axiosConfig)
        .then((result) => result)
        .catch((err) => Promise.reject(err));
}
