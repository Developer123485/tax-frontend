"use client";
import { React, useState } from "react";
import { useEffect, useRef } from "react";
import HomeBanner from "../banner/home-banner";
import { AuthService } from "@/app/services/auth.service";
import { useRouter } from "next/navigation";
import "react-notifications/lib/notifications.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fontdiner_Swanky } from "next/font/google";

export default function VerificationForm() {
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneOtpLoading, setPhoneOtpLoading] = useState(false);
  const [emailOtpLoading, setEmailOtpLoading] = useState(false);
  const router = useRouter(null);

  const emailRegex =
    /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
  const [verificationDetails, setVerificationDetails] = useState({
    email: "",
    phoneNumber: "",
    emailOtp: "",
    phoneOtp: "",
    emailError: "",
    phoneNumberError: "",
    phoneOtpError: "",
    emailOtpError: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem("token_ukwes")) {
      const data = JSON.parse(sessionStorage.getItem("token_ukwes"));
      setVerificationDetails((prevState) => ({
        ...prevState,
        phoneNumber: data.phoneNumber,
        email: data.email,
      }));
    }
  }, []);

  useEffect(() => {
    validate();
  }, [
    verificationDetails.emailOtp,
    verificationDetails.email,
    verificationDetails.phoneOtp,
    verificationDetails.phoneNumber,
  ]);

  function submitOtpToEmail(e) {
    e.preventDefault();
    if (emailValidate()) {
      setEmailOtpLoading(true);
      AuthService.submitOtpToEmail(verificationDetails.email)
        .then((res) => {
          if (res) {
            setEmailOtpLoading(false);
            toast.success("OTP has been sent to your Email");
          }
        })
        .catch((e) => {
          setEmailOtpLoading(false);
          if (e?.response?.data) {
            toast.error(e?.response?.data);
          }
          else {
            toast.error(e?.message);
          }
        });
    }
  }

  function submitOtpToPhone(e) {
    e.preventDefault();
    if (phoneValidate()) {
      setPhoneOtpLoading(true);
      AuthService.submitOtpToPhone(verificationDetails.phoneNumber)
        .then((res) => {
          if (res) {
            setPhoneOtpLoading(false);
            toast.success("OTP has been sent to your Mobile");
          }
        })
        .catch((e) => {
          setPhoneOtpLoading(false);
          if (e?.response?.data) {
            toast.error(e?.response?.data);
          }
          else {
            toast.error(e?.message);
          }
        });
    }
  }

  function submitVerifyDetail(e) {
    e.preventDefault();
    setIsDirty(true);
    if (validate()) {
      setLoading(true);
      const model = {
        email: verificationDetails.email,
        phoneNumber: verificationDetails.phoneNumber,
        phoneOtp: verificationDetails.phoneOtp,
        EmailOtp: verificationDetails.emailOtp,
      };
      AuthService.submitVerifyDetail(model)
        .then((res) => {
          if (res) {
            toast.success("OTP verified on mobile and email");
            router.push("/login");
            setLoading(false);
          }
        })
        .catch((e) => {
          setLoading(false);
          if (e?.response?.data) {
            toast.error(e?.response?.data);
          }
          else {
            toast.error(e?.message);
          }
        });
    }
  }

  function goBack() {
    window.history.back();
  }

  function validate() {
    let phoneOtpError = "";
    let emailOtpError = "";
    if (!verificationDetails.phoneOtp) {
      phoneOtpError = "Mobile OTP is required";
    }
    if (!verificationDetails.emailOtp) {
      emailOtpError = "Email OTP is required";
    }
    if (
      verificationDetails.emailOtp &&
      verificationDetails.emailOtp.length !== 6
    ) {
      emailOtpError = "Email OTP should be must 6 digit";
    }
    if (
      verificationDetails.phoneOtp &&
      verificationDetails.phoneOtp.length !== 6
    ) {
      phoneOtpError = "Mobile OTP should be must 6 digit";
    }
    if (
      emailOtpError ||
      phoneOtpError ||
      !phoneValidate() ||
      !emailValidate()
    ) {
      setVerificationDetails((prevState) => ({
        ...prevState,
        phoneOtpError: phoneOtpError,
        emailOtpError: emailOtpError,
      }));
      return false;
    }
    setVerificationDetails((prevState) => ({
      ...prevState,
      phoneOtpError: "",
      emailOtpError: "",
    }));
    return true;
  }

  function phoneValidate() {
    let phoneNumberError = "";
    if (!verificationDetails.phoneNumber) {
      phoneNumberError = "Mobile number is required";
    }
    if (
      verificationDetails.phoneNumber &&
      verificationDetails.phoneNumber.length !== 10
    ) {
      phoneNumberError = "Mobile number should be must 10 digit";
    }
    if (phoneNumberError) {
      setVerificationDetails((prevState) => ({
        ...prevState,
        phoneNumberError: phoneNumberError,
      }));
      return false;
    }
    setVerificationDetails((prevState) => ({
      ...prevState,
      phoneNumberError: "",
    }));
    return true;
  }

  function emailValidate() {
    let emailError = "";
    if (!verificationDetails.email) {
      emailError = "Email is required";
    }
    if (verificationDetails.email) {
      const regx = String(verificationDetails.email)
        .toLowerCase()
        .match(emailRegex);
      if (!regx) {
        emailError = "Email is invalid";
      }
    }
    if (emailError) {
      setVerificationDetails((prevState) => ({
        ...prevState,
        emailError: emailError,
      }));
      return false;
    }
    setVerificationDetails((prevState) => ({
      ...prevState,
      emailError: "",
    }));
    return true;
  }

  return (
    <>
      <ToastContainer />
      <section className="vh-100">
        <div className="container-fluid bg-light-blue">
          <div className="row">
            <HomeBanner
              subheading="Hello,"
              heading={
                <>
                  Looks like <br /> you're new here!
                </>
              }
              paragraph="Join our group in few minutes! Sign up with your details to get started"
              backgroundImage="/images/signup_bg.jpg"
            ></HomeBanner>
            <div className="col-md-6 d-flex align-items-center form-sec">
              <div className="px-2 py-5 mx-md-4 px-md-4 py-md-4 bg-white content-box rounded-3">
                <h3 className="mb-0 mb-md-4">Verify your Details</h3>
                <form>
                  <div className="row g-3 d-flex align-items-start">
                    <div className="col-md-12">
                      <div className="row g-3">
                        <div className="col-md-8">
                          <label
                            htmlFor="inputYourEmail"
                            className="form-label"
                          >
                            <span>Your Email</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <div className="d-flex position-relative">
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmail"
                              placeholder=""
                              value={verificationDetails.email}
                              autoComplete="off"
                              maxLength={"30"}
                              // onChange={(e) => {
                              //   e.preventDefault();
                              //   setVerificationDetails((prevState) => ({
                              //     ...prevState,
                              //     email: e.target.value,
                              //   }));
                              // }}
                              readOnly={true}
                              disabled={true}
                            />
                            <button
                              className="btn btn-primary px-2 py-1 sendotp text-decoration-none position-absolute end-0"
                              disabled={emailOtpLoading}
                              onClick={(e) => {
                                submitOtpToEmail(e)
                              }}
                            >
                              Send OTP
                            </button>
                            {isDirty && verificationDetails.emailError && (
                              <span className="text-danger">
                                {verificationDetails.emailError}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="inputEmailOTP" className="form-label">
                            <span>Enter OTP</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="inputEmailOTP"
                            value={verificationDetails.emailOtp}
                            autoComplete="off"
                            maxLength={"6"}
                            onChange={(e) => {
                              e.preventDefault();
                              setVerificationDetails((prevState) => ({
                                ...prevState,
                                emailOtp: e.target.value,
                              }));
                            }}
                          />
                          {isDirty && verificationDetails.emailOtpError && (
                            <span className="text-danger">
                              {verificationDetails.emailOtpError}
                            </span>
                          )}
                        </div>
                        <div className="col-md-8 mob-num">
                          <label htmlFor="inputMobile" className="form-label">
                            <span>Your Mobile Number</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex position-relative">
                                {/* <PhoneInput
                                  country={"in"}
                                  value={verificationDetails.phoneCode}
                                  onChange={(e) => {
                                    setVerificationDetails((prevState) => ({
                                      ...prevState,
                                      phoneCode: e,
                                    }));
                                  }}
                                  readOnly={true}
                                  disabled={true}
                                  onKeyDown={(e) => {
                                    e.preventDefault();
                                  }}
                                /> */}
                                <input
                                  type="text"
                                  placeholder=""
                                  className="form-control"
                                  maxLength={"10"}
                                  autoComplete="off"
                                  value={verificationDetails.phoneNumber}
                                  // onChange={(e) => {
                                  //   e.preventDefault();
                                  //   setVerificationDetails((prevState) => ({
                                  //     ...prevState,
                                  //     phoneNumber: e.target.value,
                                  //   }));
                                  // }}
                                  readOnly={verificationDetails?.phoneNumber}
                                  disabled={verificationDetails?.phoneNumber}
                                />
                                <button
                                  className="btn btn-primary px-2 py-1 sendotp text-decoration-none position-absolute end-0"
                                  disabled={phoneOtpLoading}
                                  onClick={(e) => {
                                    submitOtpToPhone(e);
                                  }}
                                >
                                  Send OTP
                                </button>
                              </div>
                            </div>
                            {isDirty &&
                              verificationDetails.phoneNumberError && (
                                <span className="text-danger">
                                  {verificationDetails.phoneNumberError}
                                </span>
                              )}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="inputMobileOTP"
                            className="form-label"
                          >
                            <span>Enter OTP</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="inputMobileOTP"
                            value={verificationDetails.phoneOtp}
                            autoComplete="off"
                            maxLength={"6"}
                            onChange={(e) => {
                              e.preventDefault();
                              setVerificationDetails((prevState) => ({
                                ...prevState,
                                phoneOtp: e.target.value,
                              }));
                            }}
                          />
                          {isDirty && verificationDetails.phoneOtpError && (
                            <span className="text-danger">
                              {verificationDetails.phoneOtpError}
                            </span>
                          )}
                        </div>
                        <div className="col-md-12">
                          <button
                            type="button"
                            className="btn btn-pri-grd text-white w-100 mt-md-3"
                            onClick={(e) => submitVerifyDetail(e)}
                          >
                            {loading && (
                              <span
                                className="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            )}
                            Verify & Submit
                          </button>
                        </div>
                        <div className="col-md-12 text-center d-flex flex-column flex-md-row align-items-center justify-content-center">
                          <span>Back to</span>
                          <button
                            type="button"
                            className="btn btn-link py-0 px-1 text-decoration-none"
                            onClick={goBack}
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
