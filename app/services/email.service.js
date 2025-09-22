import { apiRequest } from "../config";
let axiosConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};
export const EmailService = {
    sendEmail,
};

async function sendEmail(model) {
    const result = await apiRequest.post(`Email/send-email`, model, axiosConfig);
    return result;
}
