"use client";
import React, { useState, useEffect } from "react";
import HomeBanner from "../banner/home-banner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPasswordForm() {
  const router = useRouter(null);
  const [isDirty, setIsDirty] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isDirtyPassword, setIsDirtyPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmailSentOtp, setIsEmailSentOtp] = useState(false);
  const [email, setEmail] = useState("");
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isPasswordUpdate, setIsPasswordUpdate] = useState(false);
  const [emailError, setEmailError] = useState("");
  const emailRegex =
    /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;

  const [forgotPasswordDetails, setForgotPasswordDetails] = useState({
    emailOtp: "",
    emailOtpError: "",
    password: "",
    passwordError: "",
    confirmPassword: "",
    confirmPasswordError: "",
  });

  useEffect(() => {
    validate();
  }, [
    forgotPasswordDetails.emailOtp,
    forgotPasswordDetails.password,
    forgotPasswordDetails.confirmPassword,
  ]);

  useEffect(() => {
    emailValidate();
  }, [email]);

  function togglePassword() {
    setPasswordVisible(!passwordVisible);
  }

  function toggleConfirmPassword() {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  function submitOtpToEmail(e) {
    setIsDirty(true);
    e.preventDefault();
    if (emailValidate()) {
      setLoading(true);
      AuthService.SendOtpForForgotPassword(email)
        .then((res) => {
          if (res) {
            setIsEmailSentOtp(true);
            toast.success("OTP sent to your email");
            setIsChangePassword(true);
            setLoading(false);
          }
        })
        .catch((e) => {
          setLoading(false);
          if (e?.response?.data?.errorMessage) {
            toast.error(e?.response?.data?.errorMessage);
          }
          else {
            toast.error(e?.message);
          }
        });
    }
  }

  function forgotPassword(e) {
    setIsDirtyPassword(true);
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const model = {
        email: email,
        password: forgotPasswordDetails.password,
        emailOtp: forgotPasswordDetails.emailOtp,
      };
      AuthService.forgotPassword(model)
        .then((res) => {
          if (res) {
            setLoading(false);
            toast.success("Password changed successfully");
            setTimeout(() => {
              router.push("/login");
            }, 1000);
          }
        })
        .catch((e) => {
          setLoading(false);
          if (e?.response?.data?.errorMessage) {
            toast.error(e?.response?.data?.errorMessage);
          }
          else {
            toast.error(e?.message);
          }
        });
    }
  }

  function validate() {
    let emailOtpError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    if (!forgotPasswordDetails.password) {
      passwordError = "Password is required";
    }
    if (
      forgotPasswordDetails.password &&
      !passwordPattern.test(forgotPasswordDetails.password)
    ) {
      passwordError =
        "Password must be at least 8 characters long and contain both letters and numbers.";
    }
    if (!forgotPasswordDetails.emailOtp) {
      emailOtpError = "Email OTP is Required";
    }
    if (!forgotPasswordDetails.confirmPassword) {
      confirmPasswordError = "Confirm Password is required";
    }
    if (
      forgotPasswordDetails.confirmPassword &&
      forgotPasswordDetails.password !== forgotPasswordDetails.confirmPassword
    ) {
      confirmPasswordError = "Passwords do not match!";
    }
    if (
      forgotPasswordDetails.emailOtp &&
      forgotPasswordDetails.emailOtp.length !== 6
    ) {
      emailOtpError = "Email OTP should be must 6 digit";
    }
    if (emailOtpError || confirmPasswordError || passwordError) {
      setForgotPasswordDetails((prevState) => ({
        ...prevState,
        emailOtpError: emailOtpError,
        confirmPasswordError: confirmPasswordError,
        passwordError: passwordError,
      }));
      return false;
    }
    setForgotPasswordDetails((prevState) => ({
      ...prevState,
      emailOtpError: "",
      confirmPasswordError: "",
      passwordError: "",
    }));
    return true;
  }

  function emailValidate() {
    let emailError = "";
    if (!email) {
      emailError = "Email is required";
    }
    if (email) {
      const regx = String(email).toLowerCase().match(emailRegex);
      if (!regx) {
        emailError = "Email is invalid";
      }
    }
    if (emailError) {
      setEmailError(emailError);
      return false;
    }
    setEmailError("");
    return true;
  }

  function goBack() {
    window.history.back();
  }

  return (
    <>
      <ToastContainer />
      <section className="">
        <div className="container-fluid bg-light-blue">
          <div className="row">
            <HomeBanner
              subheading="Hello,"
              heading="Don't worry!"
              paragraph="We are here help you to recover your password."
              backgroundImage="/images/for_pass_bg.jpg"
            ></HomeBanner>
            <div className="col-md-6 d-flex align-items-center form-sec">

              {!isPasswordUpdate && !isChangePassword && (
                <div className="px-2 py-5 mx-md-4 px-md-4 py-md-4 bg-white content-box rounded-3">

                  <h4 className="mb-4 mb-md-4">Forgot your Password?</h4>
                  <p>
                    Provide the email address associated with your account to
                    recover your password.
                  </p>
                  <div className="row g-3">
                    <form
                      onSubmit={(e) => submitOtpToEmail(e)}
                    >
                      <div className="col-md-12">
                        <label htmlFor="inputEmail" className="form-label">
                          <span>Enter your Registered Email</span>
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder=""
                          className="form-control"
                          id="inputEmail"
                          autoComplete="off"
                          maxLength={35}
                          value={email}
                          onChange={(e) => {
                            e.preventDefault();
                            setEmail(e.target.value);
                          }}
                        />
                        {isDirty && emailError && (
                          <span className="text-danger">{emailError}</span>
                        )}
                      </div>
                      <br />
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="btn btn-pri-grd text-white w-100 position-relative"
                        >
                          {loading && (
                            <span
                              className="spinner-grow spinner-grow-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                          {isEmailSentOtp ? "Resend" : "Send"}
                          <Image
                            className="position-absolute top-50 end-0 me-2 translate-middle"
                            src="/images/icons/btn_arrow.svg"
                            alt="btn_arrow"
                            width={24}
                            height={25}
                          />
                        </button>
                      </div>
                    </form>
                    <div className="col-md-12 text-center d-flex flex-column flex-md-row align-items-center justify-content-center">
                      <span>Back to</span>
                      <button
                        type="button"
                        className="btn btn-link py-0 px-1 text-decoration-none"
                        onClick={goBack}
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {!isPasswordUpdate && isChangePassword && (
                <div className="px-2 py-5 mx-md-4 px-md-4 py-md-4 bg-white content-box rounded-3">
                  <h4 className="mb-3 mb-md-3">Change Password</h4>
                  <p className="mb-4 mb-md-4">
                    Create a new password. Make sure it is different from your previous passwords for security.
                  </p>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-12">
                        <label htmlFor="inputEmailOtp" className="form-label">
                          <span>Email OTP</span>
                          <span className="text-danger"> *</span>
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          className="form-control"
                          id="inputEmailOtp"
                          autoComplete="off"
                          maxLength={6}
                          value={forgotPasswordDetails.emailOtp}
                          onChange={(e) => {
                            setForgotPasswordDetails((prevState) => ({
                              ...prevState,
                              emailOtp: e.target.value,
                            }));
                          }}
                        />
                        {isDirtyPassword &&
                          forgotPasswordDetails.emailOtpError && (
                            <span className="text-danger">
                              {forgotPasswordDetails.emailOtpError}
                            </span>
                          )}
                      </div>
                      <div className="col-md-12 password-container">
                        <label htmlFor="inputPassword" className="form-label">
                          <span>Password</span>
                          <span className="text-danger"> *</span>
                        </label>
                        <div className="password-input">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder=""
                            className="form-control"
                            id="inputPassword"
                            autoComplete="off"
                            value={forgotPasswordDetails.password}
                            onChange={(e) => {
                              setForgotPasswordDetails((prevState) => ({
                                ...prevState,
                                password: e.target.value,
                              }));
                            }}
                          />
                          <button
                            type="button"
                            onClick={togglePassword}
                            className="eye-icon"
                          >
                            {passwordVisible ? (
                              <span role="img" aria-label="Hide password">
                                👁️
                              </span>
                            ) : (
                              <span role="img" aria-label="Show password">
                                👁️‍🗨️
                              </span>
                            )}
                          </button>
                        </div>
                        {isDirtyPassword &&
                          forgotPasswordDetails.passwordError && (
                            <span className="text-danger">
                              {forgotPasswordDetails.passwordError}
                            </span>
                          )}
                      </div>

                      <div className="col-md-12 password-container">
                        <label
                          htmlFor="inputConfirmPassword"
                          className="form-label"
                        >
                          <span>Confirm Password</span>
                          <span className="text-danger"> *</span>
                        </label>
                        <div className="password-input">
                          <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            placeholder=""
                            className="form-control"
                            id="inputConfirmPassword"
                            autoComplete="off"
                            value={forgotPasswordDetails.confirmPassword}
                            onChange={(e) => {
                              setForgotPasswordDetails((prevState) => ({
                                ...prevState,
                                confirmPassword: e.target.value,
                              }));
                            }}
                          />
                          <button
                            type="button"
                            onClick={toggleConfirmPassword}
                            className="eye-icon"
                          >
                            {confirmPasswordVisible ? (
                              <span role="img" aria-label="Hide password">
                                👁️
                              </span>
                            ) : (
                              <span role="img" aria-label="Show password">
                                👁️‍🗨️
                              </span>
                            )}
                          </button>
                        </div>
                        {isDirtyPassword &&
                          forgotPasswordDetails.confirmPasswordError && (
                            <span className="text-danger">
                              {forgotPasswordDetails.confirmPasswordError}
                            </span>
                          )}
                      </div>

                      <div className="col-md-12">
                        <button
                          type="button"
                          onClick={(e) => forgotPassword(e)}
                          className="btn btn-pri-grd text-white w-100 position-relative"
                        >
                          {loading && (
                            <span
                              className="spinner-grow spinner-grow-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                          Change Password
                          <Image
                            className="position-absolute top-50 end-0 me-2 translate-middle"
                            src="/images/icons/btn_arrow.svg"
                            alt="btn_arrow"
                            width={24}
                            height={25}
                          />
                        </button>
                      </div>
                      <div className="col-md-12 text-center d-flex flex-column flex-md-row align-items-center justify-content-center">
                        <span>Back to</span>
                        <button
                          type="button"
                          className="btn btn-link py-0 px-1 text-decoration-none"
                          onClick={goBack}
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {isPasswordUpdate && (
                <div className="px-2 py-5 mx-md-4 px-md-4 py-md-4 bg-white content-box rounded-3 text-center">
                  <Image
                    className="mb-4 mb-md-4"
                    src="/images/icons/success_icon.png"
                    alt="success_icon"
                    width={90}
                    height={90}
                  />
                  <h4 className="mb-4 mb-md-4">Successful</h4>
                  <p>
                    Congratulations! your password has been changed. Click login
                    to contiune.
                  </p>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btn-pri-grd text-white w-100 position-relative"
                        >
                          Login
                          <Image
                            className="position-absolute top-50 end-0 me-2 translate-middle"
                            src="/images/icons/btn_arrow.svg"
                            alt="btn_arrow"
                            width={24}
                            height={25}
                          />
                        </button>
                      </div>
                      <div className="col-md-12 text-center d-flex flex-column flex-md-row align-items-center justify-content-center">
                        <span>Back to</span>
                        <button
                          type="button"
                          className="btn btn-link py-0 px-1 text-decoration-none"
                          onClick={goBack}
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
