import api from "../utils/interceptors";

export const TracesActivitiesService = {
    autoFillLogin,
    startLogin,
    continueRequestConsoFile,
    continueRequest27D,
    continueRequest16,
    continueRequest16A
};

async function autoFillLogin(model) {
    const result = await api.post(`tracesActivities/autoFillLogin`, model);
    return result;
}

async function startLogin(model) {
    const result = await api.post("tracesActivities/start-login", model);
    return result;
}

async function continueRequestConsoFile(model) {
    const result = await api.post("tracesActivities/continueRequestConsoFile", model);
    return result;
}

async function continueRequest16(model) {
    const result = await api.post("tracesActivities/continueRequest16", model);
    return result;
}

async function continueRequest16A(model) {
    const result = await api.post("tracesActivities/continueRequest16A", model);
    return result;
}

async function continueRequest27D(model) {
    const result = await api.post("tracesActivities/continueRequest27D", model);
    return result;
}


