import api from "../utils/interceptors";

export const TracesActivitiesService = {
    autoFillLogin,
    startLogin,
    submitFormRequest,
    verifyDeducteePans,
    verifyEmployeePans,
    getSaveLowerDeductions,
    startForgotLogin,
    resendCaptcha,
    submitCaptcha
};

async function autoFillLogin(model) {
    const result = await api.post(`tracesActivities/autoFillLogin`, model);
    return result;
}

async function startLogin(model) {
    const result = await api.post("tracesActivities/start-login", model);
    return result;
}

async function startForgotLogin(model) {
    const result = await api.post("tracesActivities/start-forgot-password", model);
    return result;
}

async function submitFormRequest(model, form, formType, quarter, downloadRow) {
    let result = null;
    if (form == "request-conso-file") {
        result = await api.post("tracesActivities/continueRequestConsoFile", model);
    }
    if (form == "request-justification-report") {
        result = await api.post("tracesActivities/justrepdwnld", model);
    }
    if (form == "request-for-online-correction") {
        result = await api.post("tracesActivities/continueRequestForOnlineCorrection", model);
    }
    if (form == "traces-login") {
        result = await api.post("tracesActivities/loginOnTraces", model);
    }
    if (form == "forgot-password") {
        result = await api.post("tracesActivities/forgotPasswordRequest", model);
    }
    if (form == "view-requested-downloads" && downloadRow == "download") {
        result = await api.post("tracesActivities/downloadbyRequest", model);
    }
    if (form == "view-requested-downloads" && downloadRow != "download") {
        result = await api.post("tracesActivities/getRequestsDownload", model);
    }
    if (form == "view-edit-profile") {
        result = await api.post("tracesActivities/view-edit-profile", model);
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

async function getSaveLowerDeductions(model) {
    let result = null;
    result = await api.post("tracesActivities/getSaveLowerDeductions", model);
    return result;
}

async function verifyEmployeePans(model) {
    let result = null;
    result = await api.post("tracesActivities/verifyEmployeePans", model);
    return result;
}

async function resendCaptcha(model) {
    const result = await api.post("tracesActivities/resend-captcha", model);
    return result;
}


async function submitCaptcha(model) {
    const result = await api.post("tracesActivities/submit-captcha", model);
    return result;
}



