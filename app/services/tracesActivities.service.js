import api from "../utils/interceptors";

export const TracesActivitiesService = {
    autoFillLogin,
    startLogin,
    submitFormRequest,
    verifyDeducteePans
};

async function autoFillLogin(model) {
    const result = await api.post(`tracesActivities/autoFillLogin`, model);
    return result;
}

async function startLogin(model) {
    const result = await api.post("tracesActivities/start-login", model);
    return result;
}

async function submitFormRequest(model, form, formType, quarter) {
    let result = null;
    if (form == "request-conso-file") {
        result = await api.post("tracesActivities/continueRequestConsoFile", model);
    }
    if (form == "request-justification-report") {
        result = await api.post("tracesActivities/justrepdwnld", model);
    }
    if (form == "request-form-16-16a-27d") {
        if (formType == "24Q" && quarter == "Q4") {
            result = await api.post("tracesActivities/continueRequest16", model);
        }
        if (formType == "27EQ") {
            result = await api.post("tracesActivities/continueRequest27D", model);
        }
        if (formType == "27Q" || formType == "26Q") {
            result = await api.post("tracesActivities/continueRequest16A", model);
        }
    }
    return result;
}

async function verifyDeducteePans(model) {
    let result = null;
    result = await api.post("tracesActivities/verifyDeducteePans", model);
    return result;
}


