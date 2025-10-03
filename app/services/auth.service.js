import { apiRequest } from "../config";
import api from "../utils/interceptors";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const AuthService = {
  login,
  submitOtpToEmail,
  submitVerifyDetail,
  submitOtpToPhone,
  SendOtpForForgotPassword,
  forgotPassword,
  register
};



async function login(model) {
  return apiRequest
    .post("Auth/SignIn", model, axiosConfig)
    .then((result) => {
      if (result && result.data && result.data) {
        window.sessionStorage.setItem("token", result.data.token);
        window.sessionStorage.setItem(
          "userDetail",
          JSON.stringify(result.data)
        );
      }
      return result;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function register(model) {
  try {
    const response = await fetch("https://ipwho.is/");
    const ipInfo = await response.json();
    model.city = ipInfo.city;
    model.country = ipInfo.country;
    model.lat = ipInfo.lat;
    model.lon = ipInfo.lon;
    model.ipAddress = ipInfo.query;
    model.state = ipInfo.regionName;
    model.zipCode = ipInfo.zip;
    model.district = ipInfo.district;
  } catch (error) {
  }

  const result = await apiRequest.post(`Auth/signUp`, model, axiosConfig);
  return result;
}

async function submitOtpToEmail(email) {
  return apiRequest
    .get(`auth/sendOtpToEmail/${email}`, axiosConfig)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function SendOtpForForgotPassword(email) {
  return apiRequest
    .get(`auth/SendOtpForForgotPassword/${email}`, axiosConfig)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function forgotPassword(model) {
  return apiRequest
    .post(`auth/forgotPassword`, model, axiosConfig)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function submitOtpToPhone(phone) {
  return apiRequest
    .get(`auth/sendOtpToPhone/${phone}`, axiosConfig)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function submitVerifyDetail(model) {
  return apiRequest
    .post("auth/verifyMobileEmailOtpRegistraion", model, axiosConfig)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

// async function logOut() {
//   const result = await api.post(`Auth/SignOut`);
//   return result;
// }
