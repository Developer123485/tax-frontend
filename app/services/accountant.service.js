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
    return api
        .post(`/accountant/fetch`, model, axiosConfig)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

async function getAccountant(id) {
    return api
        .get(`/accountant/${id}`, axiosConfig)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

async function saveAccountant(model) {
    return api
        .post(`/accountant/save`, model, axiosConfig)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

async function deleteAccountant(id) {
    return api
        .delete(`/accountant/${id}`, axiosConfig)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
