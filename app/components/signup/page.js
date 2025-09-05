"use client";
import { React, useEffect, useState } from "react";
import Image from "next/image";
import HomeBanner from "../banner/home-banner";
import StepperForm from "../stepper/page";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { AuthService } from "@/app/services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupForm() {
  const [isDirty, setIsDirty] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const router = useRouter(null);
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex =
    /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    organization: "",
    phoneCode: "IN",
    firmType: "",
    password: "",
    userNameError: "",
    emailError: "",
    phoneNumberError: "",
    organizationNameError: "",
    firmTypeError: "",
    passwordError: "",
  });

  useEffect(() => {
    validate();
  }, [
    userDetails.userName,
    userDetails.email,
    userDetails.organization,
    userDetails.phoneNumber,
    userDetails.firmType,
    userDetails.password,
  ]);

  function submitUserDetail(e) {
    e.preventDefault();
    setIsDirty(true);
    if (validate()) {
      setLoading(true);
      const model = {
        userName: userDetails.userName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        organization: userDetails.organization,
        firmType: userDetails.firmType,
        Password: userDetails.password,
      };
      const res = {
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
      };
      sessionStorage.setItem(
        "token_ukwes",
        Buffer.from(JSON.stringify(res).toString("base64"))
      );
      AuthService.register(model)
        .then((res) => {
          if (res) {
            router.push("/verification");
            setLoading(false);
          }
        })
        .catch((e) => {
          setLoading(false);
          toast.error(e?.response?.data);
        });
    }
  }

  function togglePassword() {
    setPasswordVisible(!passwordVisible);
  }

  function validate() {
    let userNameError = "";
    let firmTypeError = "";
    let passwordError = "";
    let organizationError = "";
    let emailError = "";
    let phoneNumberError = "";
    if (!userDetails.password) {
      passwordError = "Password is required";
    }
    if (!userDetails.userName) {
      userNameError = "Name is required";
    }
    if (!userDetails.email) {
      emailError = "Email is required";
    }
    if (!userDetails.firmType) {
      firmTypeError = "Firm type is required";
    }
    // if (!userDetails.organization) {
    //   organizationError = "Organization name is required";
    // }
    if (!userDetails.phoneNumber) {
      phoneNumberError = "Mobile number is required";
    }
    if (userDetails.email) {
      const regx = String(userDetails.email).toLowerCase().match(emailRegex);
      if (!regx) {
        emailError = "Email is invalid";
      }
    }
    if (userDetails.password && !passwordPattern.test(userDetails.password)) {
      passwordError =
        "Password must be at least 8 characters long and contain both letters and numbers.";
    }
    if (userDetails.phoneNumber && userDetails.phoneNumber.length !== 10) {
      phoneNumberError = "Mobile number should be must 10 digit";
    }
    if (
      userNameError ||
      passwordError ||
      firmTypeError ||
      phoneNumberError ||
      emailError
    ) {
      setUserDetails((prevState) => ({
        ...prevState,
        userNameError: userNameError,
        passwordError: passwordError,
        firmTypeError: firmTypeError,
        phoneNumberError: phoneNumberError,
        emailError: emailError,
      }));
      return false;
    }
    setUserDetails((prevState) => ({
      ...prevState,
      userNameError: "",
      passwordError: "",
      organizationNameError: "",
      firmTypeError: "",
      phoneNumberError: "",
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
              subheading="Hello,"
              heading={
                <>
                  Looks like <br /> you're new here!
                </>
              }
              paragraph="Join our group in few minutes! Sign up with your details to get started"
              backgroundImage="/images/signup_bg.jpg"
            ></HomeBanner>
            <div className="col-md-6 d-flex form-sec">
              <div className="px-2 py-5 mx-md-4 px-md-4 py-md-4 bg-white content-box border border-1 rounded-3">
                <h4 className="mb-md-3">Create Account</h4>
                <div>
                  <div className="content">
                    <form onSubmit={(e) => submitUserDetail(e)}>
                      <div className="row g-3">
                        <div className="col-md-12 py-2">
                          <label htmlFor="inputFirmType" className="form-label">
                            <span>Firm Type</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <div className="row mt-1 mt-md-1 bg-light-blue d-flex align-items-center border border-1 rounded-1 mx-0 py-2 px-2">
                            <div className="col-md-6 border-end ps-2 pe-0">
                              <div className="form-check d-flex align-items-start">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="professional"
                                  id="professional"
                                  checked={
                                    userDetails.firmType == "1" ? true : false
                                  }
                                  onChange={(e) => {
                                    setUserDetails((prevState) => ({
                                      ...prevState,
                                      firmType: "1",
                                    }));
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="professional"
                                >
                                  I am a Professional and filing returns for
                                  Clients
                                  <br />
                                  <span className="opacity-50">
                                    CA, Accountant, Tax Practitioner, GSTP
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-check d-flex align-items-start">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="business"
                                  id="business"
                                  checked={
                                    userDetails.firmType == "2" ? true : false
                                  }
                                  onChange={(e) => {
                                    setUserDetails((prevState) => ({
                                      ...prevState,
                                      firmType: "2",
                                    }));
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="business"
                                >
                                  I am a Business & filing returns for Business
                                  / Group Business
                                  <br />
                                  <span className="opacity-50">
                                    SME, Corporate, Enterprise
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            {isDirty && userDetails.firmTypeError && (
                              <span className="text-danger">
                                {userDetails.firmTypeError}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 mt-2 mt-md-1">
                          <label htmlFor="userName" className="form-label">
                            <span>First & Last Name</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            value={userDetails.userName}
                            id="userName"
                            autoComplete="off"
                            minLength={"2"}
                            maxLength={"40"}
                            onChange={(e) => {
                              e.preventDefault();
                              setUserDetails((prevState) => ({
                                ...prevState,
                                userName: e.target.value,
                              }));
                            }}
                          />
                          {isDirty && userDetails.userNameError && (
                            <span className="text-danger">
                              {userDetails.userNameError}
                            </span>
                          )}
                        </div>
                        <div className="col-md-6 mt-2 mt-md-1">
                          <label htmlFor="inputEmail" className="form-label">
                            <span>Email</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="email"
                            placeholder=""
                            className="form-control"
                            maxLength={"50"}
                            id="inputEmail"
                            autoComplete="off"
                            value={userDetails.email}
                            onChange={(e) => {
                              e.preventDefault();
                              setUserDetails((prevState) => ({
                                ...prevState,
                                email: e.target.value,
                              }));
                            }}
                          />
                          {isDirty && userDetails.emailError && (
                            <span className="text-danger">
                              {userDetails.emailError}
                            </span>
                          )}
                        </div>

                        <div className="col-md-6  mt-2 mt-md-1">
                          <label htmlFor="inputPassword" className="form-label">
                            <span>Password</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <div className="password-input">
                            <input
                              type={passwordVisible ? "text" : "password"}
                              placeholder=""
                              className="form-control"
                              maxLength={"25"}
                              id="inputPassword"
                              autoComplete="off"
                              value={userDetails.password}
                              onChange={(e) => {
                                e.preventDefault();
                                setUserDetails((prevState) => ({
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
                                  <Image
                                    className="pe-1"
                                    src="/images/icons/mail_eye_icon.svg"
                                    alt="mail_eye_icon"
                                    width={24}
                                    height={25}
                                  />
                                </span>
                              ) : (
                                <span role="img" aria-label="Show password">
                                  <Image
                                    className="pe-1"
                                    src="/images/icons/mail_eye_icon.svg"
                                    alt="mail_eye_icon"
                                    width={24}
                                    height={25}
                                  />
                                </span>
                              )}
                            </button>
                          </div>
                          {isDirty && userDetails.passwordError && (
                            <span className="text-danger">
                              {userDetails.passwordError}
                            </span>
                          )}
                        </div>
                        <div className="col-md-6  mt-2 mt-md-1">
                          <label className="form-label">
                            <span>Mobile Number</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex">
                                {/* <PhoneInput
                                  country={"in"}
                                  disabled
                                  value={userDetails.phoneCode}
                                /> */}
                                <input
                                  type="text"
                                  placeholder=""
                                  className="form-control "
                                  maxLength={"10"}
                                  autoComplete="off"
                                  value={userDetails.phoneNumber}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    setUserDetails((prevState) => ({
                                      ...prevState,
                                      phoneNumber: e.target.value,
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                            {isDirty && userDetails.phoneNumberError && (
                              <span className="text-danger">
                                {userDetails.phoneNumberError}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12  mt-2 mt-md-1">
                          <label
                            htmlFor="inputOrganization"
                            className="form-label"
                          >
                            <span>Organization</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputOrganization"
                            autoComplete="off"
                            maxLength={"50"}
                            placeholder=""
                            value={userDetails.organization}
                            onChange={(e) => {
                              e.preventDefault();
                              setUserDetails((prevState) => ({
                                ...prevState,
                                organization: e.target.value,
                              }));
                            }}
                          />
                          {/* {isDirty && userDetails.organizationNameError && (
    <span className="text-danger">
      {userDetails.organizationNameError}
    </span>
  )} */}
                        </div>

                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="btn btn-pri-grd text-white w-100"
                          >
                            {loading && (
                              <span
                                className="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            )}
                            <span>Sign Up</span>
                          </button>
                        </div>

                        {/*                         <div className="col-md-12">
                          <button
                            type="submit"
                            className="btn btn-dark w-100 d-flex justify-content-center align-items-center"
                          >
                            <Image
                              className="me-2"
                              src="/images/google_icon.png"
                              alt="google_icon"
                              width={24}
                              height={25}
                            />{" "}
                            Sign up with Google
                          </button>
                        </div> */}
                        <div className="col-md-12 text-center d-flex flex-column flex-md-row align-items-center justify-content-center">
                          <span>Already have an account?</span>{" "}
                          <button
                            type="button"
                            className="btn btn-link py-0 text-decoration-none"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/login");
                            }}
                          >
                            Sign in
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
