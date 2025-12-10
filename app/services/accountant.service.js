import { apiRequest } from "../config";
import api from "../utils/interceptors";

let axiosConfig = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const AccountantService = {
    getAccountants,
    getAccountant,
    saveAccountant,
    deleteAccountant,
};

async function getAccountants(model) {
    return apiRequest
        .post(`/accountant/fetch`, model, axiosConfig)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

async function getAccountant(id) {
    return apiRequest
        .get(`/accountant/${id}`, axiosConfig)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

async function saveAccountant(model) {
    return apiRequest
        .post(`/accountant/save`, model, axiosConfig)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

async function deleteAccountant(id) {
    return apiRequest
        .delete(`/accountant/${id}`, axiosConfig)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
