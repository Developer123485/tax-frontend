import api from "../utils/interceptors";

export const FuvValidateReturnService = {
    validateReturn,
    getInterestAndfines,
    getCorrectionInterestAndfines,
    generateFVU,
    getAllFiles,
    deleteAllFiles,
    directEFiling,
    generate24GFVU,
    autoFill,
    validateCorrectionReturn
};

async function validateReturn(model) {
    const result = await api.post(`fuvValidateReturn/fetch/validateReturn`, model);
    return result;
}

async function validateCorrectionReturn(model) {
    const result = await api.post(`correctionStatements/fetch/validateReturn`, model);
    return result;
}


async function directEFiling(model) {
    const result = await api.post(`tracesActivities/e-filling`, model);
    return result;
}

async function autoFill(model) {
    const result = await api.post(`tracesActivities/auto-fill`, model);
    return result;
}

async function getInterestAndfines(model) {
    const result = await api.post(`fuvValidateReturn/fetch/interestAndfines`, model);
    return result;
}

async function getCorrectionInterestAndfines(model) {
    const result = await api.post(`correctionStatements/fetch/interestAndfines`, model);
    return result;
}

async function generateFVU(model) {
    const result = await api.post(`fuvValidateReturn/generatefvu`, model);
    return result;
}

async function generate24GFVU(model) {
    const result = await api.post(`fuvValidateReturn/generate-24g-fvu`, model);
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

