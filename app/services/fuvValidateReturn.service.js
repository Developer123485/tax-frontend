import api from "../utils/interceptors";

export const FuvValidateReturnService = {
    validateReturn,
    getInterestAndfines,
    generateFVU,
    getAllFiles,
    deleteAllFiles,
};

async function validateReturn(model) {
    const result = await api.post(`fuvValidateReturn/fetch/validateReturn`, model);
    return result;
}

async function getInterestAndfines(model) {
    const result = await api.post(`fuvValidateReturn/fetch/interestAndfines`, model);
    return result;
}

async function generateFVU(model) {
    const result = await api.post(`fuvValidateReturn/generatefvu`, model);
    return result;
}

async function getAllFiles() {
    const result = await api.get(`fuvValidateReturn/get-fvu-all-files`);
    return result;
}

async function deleteAllFiles() {
    const result = await api.get(`fuvValidateReturn/deletefiles`);
    return result;
}

