"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import HomeBanner from "../banner/home-banner";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonService } from "@/app/services/common.service";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const router = useRouter(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRegex =
    /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;

  const [loginDetails, setLoginDetails] = useState({
    password: "",
    email: "",
    passwordError: "",
    emailError: "",
  });

  useEffect(() => {
    if (CommonService.isUserLogin()) {
      window.location.href = "/deductors";
    }
  }, []);

  useEffect(() => {
    validate();
  }, [loginDetails.userName, loginDetails.email]);

  function submitLoginDetail(e) {
    e.preventDefault();
    setIsDirty(true);
    if (validate()) {
      setLoading(true);
      const model = {
        email: loginDetails.email,
        Password: loginDetails.password,
      };

      AuthService.login(model)
        .then((res) => {
          if (res) {
            // To Next sprint
            // if (res.data && res.data.isDeductorList) {
            window.location.href = "/deductors";
            // } else {
            //   window.location.href = "/plans";
            // }
            setLoading(false);
          }
        })
        .catch((e) => {
          if (e?.title && e?.email && e?.phoneNumber) {
            const res = {
              email: e?.email,
              phoneNumber: e?.phoneNumber,
            };
            sessionStorage.setItem(
              "token_ukwes",
              Buffer.from(JSON.stringify(res).toString("base64"))
            );
            toast.error(e?.title);
            router.push("/verification");
          }
          else if (e?.response?.data) {
            toast.error(e?.response?.data);
          }
          else {
            toast.error(e?.message);
          }
          setLoading(false);
        });
    }
  }

  function togglePassword() {
    setPasswordVisible(!passwordVisible);
  }

  function validate() {
    let passwordError = "";
    let emailError = "";
    if (!loginDetails.password) {
      passwordError = "Password is required";
    }
    if (!loginDetails.email) {
      emailError = "Email is required";
    }
    if (loginDetails.email) {
      const regx = String(loginDetails.email).toLowerCase().match(emailRegex);
      if (!regx) {
        emailError = "Email is invalid";
      }
    }
    if (passwordError || emailError) {
      setLoginDetails((prevState) => ({
        ...prevState,
        passwordError: passwordError,
        emailError: emailError,
      }));
      return false;
    }
    setLoginDetails((prevState) => ({
      ...prevState,
      passwordError: "",
      emailError: "",
    }));
    return true;
  }

  return (
    <>
      <ToastContainer />
      <section className="">
        <div className="container-fluid bg-light-blue">
          <div className="row">
            <HomeBanner
              subheading="Welcome To"
              heading="TaxVahan"
              paragraph={
                <>
                  We're delighted to have you back! Access your account <br />{" "}
                  now by logging in to continue your journey with us.
                </>
              }
              backgroundImage="/images/signin_bg.jpg"
            ></HomeBanner>
            <div className="col-md-6 d-flex form-sec">
              <div className="px-2 py-5 mx-md-4 px-md-4 py-md-4 bg-white content-box border border-1 rounded-3">
                <h4 className="mb-0 mb-md-4 text-capitalize">Login</h4>
                <div>
                  <div className="content">
                    <form>
                      <div className="row g-3">
                        <div className="col-md-12">
                          <label htmlFor="inputemail" className="form-label">
                            <span>Email Address</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <div className="input-group mb-2">
                            <span className="input-group-text pe-0">
                              <span className="pe-2 border-end">
                                <Image
                                  className="pe-1"
                                  src="/images/icons/form_mail_icon.svg"
                                  alt="form_mail_icon"
                                  width={24}
                                  height={25}
                                />
                              </span>
                            </span>
                            <input
                              type="text"
                              placeholder=""
                              className="form-control"
                              id="inputemail"
                              autoComplete="off"
                              value={loginDetails.email}
                              onChange={(e) => {
                                e.preventDefault();
                                setLoginDetails((prevState) => ({
                                  ...prevState,
                                  email: e.target.value,
                                }));
                              }}
                            />
                          </div>
                          <div className="">
                            {isDirty && loginDetails.emailError && (
                              <span className="text-danger">
                                {loginDetails.emailError}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 password-container">
                          <label htmlFor="inputPassword" className="form-label">
                            <span>Password</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <div className="input-group mb-2">
                            <span className="input-group-text pe-0">
                              <span className="pe-2 border-end">
                                <Image
                                  className="pe-1"
                                  src="/images/icons/form_pass_icon.svg"
                                  alt="form_pass_icon"
                                  width={24}
                                  height={25}
                                />
                              </span>
                            </span>
                            <input
                              type={passwordVisible ? "text" : "password"}
                              placeholder=""
                              className="form-control"
                              id="inputPassword"
                              autoComplete="off"
                              value={loginDetails.password}
                              onChange={(e) => {
                                e.preventDefault();
                                setLoginDetails((prevState) => ({
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
                              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                            </button>
                          </div>
                          <div className="">
                            {isDirty && loginDetails.passwordError && (
                              <span className="text-danger">
                                {loginDetails.passwordError}
                              </span>
                            )}
                          </div>
                          <div className="mb-2 d-flex justify-content-between align-items-center">
                            <div className="form-check mb-0 d-flex align-items-center">
                              <input
                                className="form-check-input rem-me"
                                type="checkbox"
                                id="rememberMe"
                              />
                              <label
                                className="form-check-label mt-1 opacity-75"
                                for="rememberMe"
                              >
                                Remember me
                              </label>
                            </div>

                            <button
                              type="button"
                              className="btn btn-link py-0 mt-1 fs-12"
                              onClick={(e) => {
                                router.push("/forgot-password");
                              }}
                            >
                              Forgot password?
                            </button>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <button
                            type="button"
                            onClick={(e) => submitLoginDetail(e)}
                            className="btn btn-pri-grd text-white w-100 position-relative"
                          >
                            {loading && (
                              <span
                                className="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            )}
                            Log In
                            <Image
                              className="position-absolute top-50 end-0 me-2 translate-middle"
                              src="/images/icons/btn_arrow.svg"
                              alt="btn_arrow"
                              width={24}
                              height={25}
                            />
                          </button>
                        </div>
                        {/*                   <div className="text-center d-flex flex-md-row align-items-center justify-content-center">
                    <div className="col">
                      <hr />
                    </div>
                    <div className="col-1 text-center">
                      <span>or</span>
                    </div>
                    <div className="col">
                      <hr />
                    </div>
                  </div>
                  <div className="col-md-12 text-center">
                    <span>Sign-in with another account</span>
                  </div>
                  <div className="col-md-12 d-flex justify-content-center">
                    <Image
                      className="me-3 border border-1 rounded-pill p-2"
                      src="/images/icons/signin_google.svg"
                      alt="signin_google"
                      width={48}
                      height={48}
                    />
                    <Image
                      className="border border-1 rounded-pill p-2"
                      src="/images/icons/signin_fb.svg"
                      alt="signin_fb"
                      width={48}
                      height={48}
                    />
                  </div> */}
                        <div className="col-md-12 text-center d-flex flex-column flex-md-row align-items-center justify-content-center">
                          <span>Don't have an account?</span>
                          <button
                            className="btn btn-link px-1 py-0 text-decoration-none"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/signup");
                            }}
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
