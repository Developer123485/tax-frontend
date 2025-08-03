import api from "../utils/interceptors";

export const TracesActivitiesService = {
    autoFillLogin,
    startLogin,
    continueRequestConsoFile
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

