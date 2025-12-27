import api from "../utils/interceptors";

let axiosConfig = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const BankDetailService = {
    getBankDetails,
    getBankDetail,
    saveBankDetail,
    deleteBankDetail,
    getBankNames
};

// Fetch list
async function getBankDetails(model) {
    return api
        .post(`/bankdetail/fetch`, model, axiosConfig)
        .then((result) => result)
        .catch((err) => Promise.reject(err));
}

// Fetch by ID
async function getBankDetail(id) {
    return api
        .get(`/bankdetail/${id}`, axiosConfig)
        .then((result) => result)
        .catch((err) => Promise.reject(err));
}

// Save (Add/Edit)
async function saveBankDetail(model) {
    return api
        .post(`/bankdetail/save`, model, axiosConfig)
        .then((result) => result)
        .catch((err) => Promise.reject(err));
}

// Delete
async function deleteBankDetail(id) {
    return api
        .get(`/bankdetail/delete/${id}`, axiosConfig)
        .then((result) => result)
        .catch((err) => Promise.reject(err));
}

// Fetch Bank Names for dropdown
async function getBankNames() {
    return api
        .get(`/bankdetail/bank-names`, axiosConfig)
        .then((result) => result)
        .catch((err) => Promise.reject(err));
}
