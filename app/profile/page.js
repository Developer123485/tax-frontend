"use client";
import { React, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { AuthService } from "@/app/services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeBanner from "../components/banner/home-banner";
import HeaderList from "../components/header/header-list";
import { UsersService } from "../services/users.services";

export default function Profile() {
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter(null);
  const emailRegex =
    /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
  const [userDetails, setUserDetails] = useState({
    id: 0,
    userName: "",
    email: "",
    phoneNumber: "",
    organization: "",
    phoneCode: "IN",
    firmType: "",
    userNameError: "",
    emailError: "",
    phoneNumberError: "",
    organizationNameError: "",
    firmTypeError: "",
  });

  useEffect(() => {
    validate();
  }, [
    userDetails.userName,
    userDetails.email,
    userDetails.organization,
    userDetails.phoneNumber,
    userDetails.firmType,
  ]);

  useEffect(() => {
    UsersService.getProfileUser().then(res => {
      if (res) {
        setUserDetails((prevState) => ({
          ...prevState,
          userName: res.userName,
          email: res.email,
          phoneNumber: res.phoneNumber,
          firmType: res.firmType,
          organization: res.organization,
          id: res.id,
        }));
      }
    }).catch((e) => {
      if (e?.response?.data?.errorMessage) {
        toast.error(e?.response?.data?.errorMessage);
      }
      else {
        toast.error(e?.message);
      }
    });
  }, []);

  function submitUserDetail(e) {
    e.preventDefault();
    setIsDirty(true);
    if (validate()) {
      setLoading(true);
      const model = {
        id: userDetails.id,
        userName: userDetails.userName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        organization: userDetails.organization,
        firmType: userDetails.firmType,
      };
      const res = {
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
      };
      sessionStorage.setItem(
        "token_ukwes",
        Buffer.from(JSON.stringify(res).toString("base64"))
      );
      UsersService.updateProfile(model)
        .then((res) => {
          if (res) {
            setLoading(false);
            // sessionStorage.clear();
            // router.push("/login");
            toast.success("User profile Updated!");
          }
        })
        .catch((e) => {
          setLoading(false);
          toast.error(e?.message);
        });
    }
  }

  function validate() {
    let userNameError = "";
    let firmTypeError = "";
    let organizationError = "";
    let emailError = "";
    let phoneNumberError = "";
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
    if (userDetails.phoneNumber && userDetails.phoneNumber.length !== 10) {
      phoneNumberError = "Mobile number should be must 10 digit";
    }
    if (
      userNameError ||
      firmTypeError ||
      phoneNumberError ||
      emailError
    ) {
      setUserDetails((prevState) => ({
        ...prevState,
        userNameError: userNameError,
        firmTypeError: firmTypeError,
        phoneNumberError: phoneNumberError,
        emailError: emailError,
      }));
      return false;
    }
    setUserDetails((prevState) => ({
      ...prevState,
      userNameError: "",
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
      <HeaderList></HeaderList>
      <section className="py-5 py-md-4 bg-light-gray update-profile">
        <div className="container">
          <div className="row">
            <div className="col-md"></div>
            <div className="col-md-6">
              <div className="px-2 py-5 mx-md-4 px-md-4 py-md-4 bg-white content-box rounded-4 shadow">
                <h3 className="mb-4 mb-md-3">Profile Setting</h3>
                <div>
                  <div className="content">
                    <form onSubmit={(e) => submitUserDetail(e)}>
                      <div className="row g-3">
                        <div className="col-md-12 py-3 pt-md-3">
                          <label htmlFor="inputFirmType" className="form-label">
                            <span>Firm Type</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <div className="row mt-1 mt-md-1 bg-light-blue d-flex align-items-center border border-1 rounded-1 mx-0 py-2 px-2">
                            <div className="col-md-6 border-end ps-2 pe-2">
                              <div className="form-check d-flex align-items-start">
                                <input
                                  className="form-check-input me-2"
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
                                  className="form-check-label fs-12"
                                  htmlFor="professional"
                                >
                                  I am a Professional and filing returns for
                                  Clients
                                  <br />
                                  <span className="opacity-50 fs-10">
                                    CA, Accountant, Tax Practitioner, GSTP
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-check d-flex align-items-start">
                                <input
                                  className="form-check-input me-2"
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
                                  className="form-check-label fs-12"
                                  htmlFor="business"
                                >
                                  I am a Business & filing returns for Business
                                  / Group Business
                                  <br />
                                  <span className="opacity-50 fs-10">
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
                        <div className="col-md-12 mt-2 mt-md-1">
                          <label htmlFor="userName" className="form-label">
                            <span>Full Name</span>
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
                            maxLength={"30"}
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
                        <div className="col-md-12 mt-2 mt-md-1">
                          <label htmlFor="inputEmail" className="form-label">
                            <span>Email</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="email"
                            placeholder=""
                            className="form-control"
                            maxLength={"30"}
                            disabled
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
                        <div className="col-md-12 mob-num">
                          <label className="form-label">
                            <span>Mobile Number</span>
                            <span className="text-danger"> *</span>
                          </label>
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex">
                                <input
                                  type="text"
                                  placeholder=""
                                  className="form-control react-phone"
                                  maxLength={"10"}
                                  autoComplete="off"
                                  disabled
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
                        <div className="col-md-12">
                          <label
                            htmlFor="inputOrganization"
                            className="form-label"
                          >
                            <span>Organization</span>
                            {/* <span className="text-danger"> *</span> */}
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
                        </div>
                        <div className="col-md-6 text-center">
                          <button
                            type="button"
                            className="btn btn-outline-primary w-100"
                            onClick={(e) => window.history.back()}
                          >
                            <span>Cancel</span>
                          </button>
                        </div>
                        <div className="col-md-6 text-center">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            {loading && (
                              <span
                                className="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            )}
                            <span>Update Profile</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md"></div>
          </div>
        </div>
      </section>
    </>
  );
}
