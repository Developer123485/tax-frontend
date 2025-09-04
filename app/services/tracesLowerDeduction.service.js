import api from "../utils/interceptors";

export const TracesLowerDeductionService = {
    fetchLowerDeduction,
};

async function fetchLowerDeduction(model) {
    const result = await api.post(`tracesLowerDeduction/fetch`, model);
    return result;
}





