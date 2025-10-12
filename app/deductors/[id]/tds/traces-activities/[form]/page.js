"use client";
import React, { useState, use, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderList from "@/app/components/header/header-list";
import "react-toastify/dist/ReactToastify.css";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import ProcessPopup from "@/app/components/modals/processing";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { DeductorsService } from "@/app/services/deductors.service";
import { TracesActivitiesService } from "@/app/services/tracesActivities.service";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";

export default function TracesActivities({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [financialYear, setFinancialYear] = useState("");
  const [downloadRow, setDownloadRow] = useState("");
  const [requestNumber, setRequestNumber] = useState("");
  const [quarter, setQuarter] = useState("Q1");
  const [formType, setFormType] = useState("27EQ");
  const [showLoader, setShowLoader] = useState(true);
  const [quarters, setQuarters] = useState(["Q1", "Q2", "Q3", "Q4"]);
  const currentYear = new Date().getFullYear();
  const [financialYears, setFinancialYears] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [requestDownloads, setRequestDownloads] = useState(null);
  const [requestResponseModal, setRequestResponseModal] = useState(false);
  const [requestResponseValue, setRequestResponseValue] = useState("");
  const [deductorInfo, setDeductorInfo] = useState(null);
  const [captchaBase64, setCaptchaBase64] = useState('');

  const form = resolvedParams?.form;
  const router = useRouter();
  const highlightStyle = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused ? "#007bff" : "#ccc",
    boxShadow: isFocused ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

  const highlightStyle1 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused1 ? "#007bff" : "#ccc",
    boxShadow: isFocused1 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };
  const [tracesActivity, setTracesActivity] = useState({
    userName: "",
    password: "",
    tan: "",
    validation_Mode: "without_dsc",
    token: "",
    isNullChallan: null,
    isBookAdjustment: null,
    isInvalidPan: null,
    financialYear: "",
    formType: "",
    quarter: "",
    captcha: "",
    requestNumber: "",
    deduction: {
      pan1: null,
      amount1: null,
      pan2: null,
      amount2: null,
      pan3: null,
      amount3: null,
    },
    challan: {
      bsr: null,
      date: null,
      challanSrNo: null,
      amount: null,
      cdRecordNo: null,
    },
  });
  const highlightStyle2 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused2 ? "#007bff" : "#ccc",
    boxShadow: isFocused2 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#F2F7FF!important",
        },
        minHeight: "45px",
      },
    },
    headCells: {
      style: {
        justifyContent: "start",
        outline: "1px",
        border: "1px solid #F2F7FF",
        fontSize: "12px",
      },
    },
    cells: {
      style: {
        justifyContent: "start",
        outline: "1px",
        border: "1px solid #FFFFFF",
        fontSize: "12px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
  };
  const columns = [
    {
      name: "Request Date",
      selector: (row) => row.requestDate ?? "-",
      grow: 1,
    },
    {
      name: "Request Number",
      selector: (row) => row.requestNumber ?? "-",
      grow: 1,
    },
    {
      name: "Financial Year",
      selector: (row) => row?.financialYear ?? "-",
      grow: 1,
    },
    {
      name: "Quarter",
      selector: (row) => row?.quarter ?? "-",
      grow: 1,
    },
    {
      name: "Form Type",
      selector: (row) => row?.formType ?? "-",
      grow: 1,
    },
    {
      name: "File Processed",
      selector: (row) => row?.fileProcessed ?? "-",
      grow: 2,
    },
    {
      name: "Status",
      selector: (row) => row?.status ?? "-",
      grow: 2,
    },
    {
      name: "Remarks",
      selector: (row) => row?.remarks ?? "-",
      grow: 1.5,
    },
    {
      name: "Actions",
      button: true,
      selector: (row) => (
        <>
          {" "}
          <div className="d-flex justify-content-center">
            <span style={{ fontSize: "15px" }}>
              {" "}
              {row.status == "Available" &&
                <a
                  href="Javascript:void(0)"
                  onClick={(e) => {
                    setRequestNumber(row.requestNumber)
                    submitLogin(e, true, "download");
                  }}
                >
                  Download
                </a>}
            </span>
          </div>
        </>
      ),
      style: {
        position: "sticky",
        right: 0,
        zIndex: 1,
        backgroundColor: "#fff",
      },
      grow: 2,
      width: "135px",
    },
  ];

  const [tracesError, setTracesError] = useState({
    userNameError: "",
    passwordError: "",
    tokenError: "",
  });

  const [breadcrumbs, setBreadcrumbs] = useState([
    {
      name: "Deductors",
      isActive: false,
      href: "/deductors",
    },
    {
      name: "TDS Dashboard",
      isActive: false,
      href: `/deductors/${deductorId}/tds`,
    },
    {
      name: "Traces Activities",
      isActive: false,
      href: `/deductors/${deductorId}/tds/traces-activities`,
    },
    {
      name: form.toUpperCase(),
      isActive: true,
    },
  ]);

  useEffect(() => {
    if (deductorId > 0) {
      getDeductorDetail();
      if (sessionStorage.getItem("requestedDownload")) {
        const reqData = JSON.parse(sessionStorage.getItem("requestedDownload"));
        setRequestDownloads(reqData);
      }
    } else {
      router.push("/deductors");
    }
  }, []);

  useEffect(() => {
    let array = [];
    const currentDate = new Date();
    for (let index = 6; index >= 0; index--) {
      const startYear = currentYear - index;
      const endYear = startYear + 1;
      const financialYear = `${startYear}-${endYear.toString().slice(-2)}`;
      array.push(financialYear);
    }
    const currentMonth = new Date().getMonth();
    setFinancialYears(array);
    let startYear = currentDate.getFullYear();
    if (currentMonth >= 6) {
      // If month is after March, it's in the current FY
      startYear = currentDate.getFullYear();
    } else {
      // If month is before April, it's in the previous FY
      startYear = currentDate.getFullYear() - 1;
    }
    const fy = sessionStorage.getItem("financialYear")
      ? sessionStorage.getItem("financialYear")
      : `${startYear}-${(startYear + 1).toString().slice(-2)}`;

    setFinancialYear(fy);
  }, []);

  function submitAutoFill(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("financialYear", financialYear);
    formData.append("quarter", quarter);
    formData.append("form", formType);
    formData.append("deductorId", deductorId);
    setAutoLoading(true);
    TracesActivitiesService.autoFillLogin(formData).then((res) => {
      if (res && res?.challan) {
        setTracesActivity(res);
      } else {
        toast.error("Auto-fill data not retrieved");
      }
      setAutoLoading(false);
    }).catch((e) => {
      setAutoLoading(false);
      if (e?.response?.data?.errorMessage) {
        toast.error(e?.response?.data?.errorMessage);
      }
      else {
        toast.error(e?.message);
      }
    });;
  }

  function getDeductorDetail() {
    DeductorsService.getDeductor(deductorId)
      .then((res) => {
        if (res) {
          setDeductorInfo(res);
          if (form == "traces-login" || form == "view-requested-downloads") {
            setTracesActivity((prevState) => ({
              ...prevState,
              ["userName"]: res.tracesLogin,
              ["password"]: res.tracesPassword,
            }));
          }
          setShowLoader(false);
        }
      })
      .catch((e) => {
        if (e?.response?.data?.errorMessage) {
          toast.error(e?.response?.data?.errorMessage);
        }
        else {
          toast.error(e?.message);
        }
      });
  }

  function handleInputTracesActivities(names, e) {
    setTracesActivity((prevState) => ({
      ...prevState,
      [names]: e.target.value,
    }));
  }

  function handleSubmit() {
    if (!tracesActivity.captcha) {
      toast.error("Input Captcha is required");
      return false;
    }
    setLoading(true);
    tracesActivity.tan = deductorInfo?.deductorTan;
    tracesActivity.requestNumber = requestNumber;
    TracesActivitiesService.submitFormRequest(tracesActivity, form, formType, quarter, downloadRow).then(res => {
      if (res) {
        if (downloadRow != "download") {
          if (form == "view-requested-downloads") {
            setRequestDownloads(res);
            sessionStorage.setItem("requestedDownload", JSON.stringify(res));
          } else {
            if (res == "true" || res == true) {
              toast.success("Login Successfully!");
              setTimeout(() => {
                router.push(`/deductors/${deductorId}/tds/traces-activities`);
              }, 3000);
            } else {
              setRequestResponseValue(res);
              setRequestResponseModal(true);
            }
          }
        } else {
          toast.success("File Successfully downloaded!");
        }
      }
      setLoading(false);
    }).catch(e => {
      if (e?.response?.data?.errorMessage) {
        toast.error(e?.response?.data?.errorMessage);
      }
      else {
        toast.error(e?.message);
      }
    }).finally(f => {
      setConfirmModal(false);
      setCaptchaBase64("");
      setLoading(false);
      setDownloadRow("");
      setSubmitLoading(false);
      setLoading(false);
    })
  }

  function resetForm() {
    setTracesActivity((prevState) => ({
      ...prevState,
      "userName": "",
      "password": "",
      "tan": "",
      "validation_Mode": "without_dsc",
      "token": "",
      "isNullChallan": null,
      "isBookAdjustment": null,
      "isInvalidPan": null,
      "financialYear": "",
      "formType": "",
      "quarter": "",
      "captcha": "",
    }));
    setTracesActivity((prev) => ({
      ...prev,
      challan: {
        ...prev.challan,
        "bsr": "",
        "date": "",
        "challanSrNo": "",
        "amount": "",
        "cdRecordNo": "",
      },
    }));
    setTracesActivity((prev) => ({
      ...prev,
      deduction: {
        ...prev.deduction,
        "pan1": "",
        "amount1": "",
        "pan2": "",
        "amount2": "",
        "pan3": "",
        "amount3": "",
      },
    }));
    setTracesError((prevState) => ({
      ...prevState,
      userNameError: "",
      passwordError: "",
      tokenError: ""
    }));
  }

  function validateTraces(params) {
    let userNameError = "";
    let passwordError = "";
    let tokenError = "";
    if (!tracesActivity.userName) {
      userNameError = "User name is required";
    }
    if (!tracesActivity.password) {
      passwordError = "Passwrod is required";
    }
    if (!tracesActivity.token) {
      tokenError = "Token is required";
    }
    if (userNameError || passwordError || tokenError) {
      setTracesError((prevState) => ({
        ...prevState,
        userNameError,
        passwordError,
        tokenError
      }));
      return false;
    }
    setTracesError((prevState) => ({
      ...prevState,
      userNameError,
      passwordError,
      tokenError
    }));
    return true;
  }
  function submitLogin(e, value = false, downl = null) {
    if (validateTraces() || value) {
      if (downl != "download") {
        setSubmitLoading(true);
      }
      if (tracesActivity.userName && tracesActivity.password && deductorInfo?.deductorTan) {
        const model = {
          userName: tracesActivity.userName,
          password: tracesActivity.password,
          tanNumber: deductorInfo?.deductorTan,
          token: tracesActivity.token
        }
        if (form != "forgot-password") {
          TracesActivitiesService.startLogin(model).then(res => {
            debugger
            if (downl == "download") {
              setDownloadRow("download")
            }
            if (res) {
              setSubmitLoading(false);
              setCaptchaBase64(res.captcha);
              setConfirmModal(true);
              setTracesActivity((prevState) => ({
                ...prevState,
                ["financialYear"]: financialYear,
                ["quarter"]: quarter,
                ["formType"]: formType,
                ["captcha"]: "",
              }));
            }
          }).catch(e => {
            if (e?.response?.data?.errorMessage) {
              toast.error(e?.response?.data?.errorMessage);
            }
            else {
              toast.error(e?.message);
            }
            setSubmitLoading(false);
          })
        } else {
          TracesActivitiesService.startForgotLogin(model).then(res => {

            if (res) {
              setSubmitLoading(false);
              setCaptchaBase64(res.captcha);
              setConfirmModal(true);
              setTracesActivity((prevState) => ({
                ...prevState,
                ["financialYear"]: financialYear,
                ["quarter"]: quarter,
                ["formType"]: formType,
                ["captcha"]: "",
              }));
            }
          }).catch(e => {
            if (e?.response?.data?.errorMessage) {
              toast.error(e?.response?.data?.errorMessage);
            }
            else {
              toast.error(e?.message);
            }
            setSubmitLoading(false);
          })
        }
      }
    }
  }

  function handleChallanInput(names, e) {
    setTracesActivity((prev) => ({
      ...prev,
      challan: {
        ...prev.challan,
        [names]: e.target.value,
      },
    }));
  }

  function handleDeductionInput(names, e) {
    setTracesActivity((prev) => ({
      ...prev,
      deduction: {
        ...prev.deduction,
        [names]: e.target.value,
      },
    }));
  }

  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="py-4 pb-md-0 bg-light-gray"></section>
      <section className="py-5 pt-md-0 pb-md-5 bg-light-gray">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 bg-white border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
              <div className="row g-3">
                <div className="col-md-7">
                  <span className="me-1">Deductor Name:</span>
                  <span className="fw-bold text-uppercase">
                    {deductorInfo?.deductorName}
                  </span>
                </div>
                <div className="col-md-3">
                  <span className="me-1">TAN:</span>
                  <span className="fw-bold text-uppercase">
                    {deductorInfo?.deductorTan}
                  </span>
                </div>
                <div className="col-md-2">
                  <span className="me-1">Pan:</span>
                  <span className="fw-bold text-uppercase">
                    {deductorInfo?.deductorPan}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {(form == "traces-login" || form == "view-requested-downloads") &&
            <>
              <div className="row mb-4">
                <div className="col-md-12 bg-white border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                  <div className="row g-3">
                    <div class="col-md-5">
                      <label for="username" class="form-label fw-semibold">User Name</label>
                      <input
                        type="text"
                        id="username"
                        class="form-control"
                        value={tracesActivity.userName}
                        disabled
                        onChange={(e) => handleInputTracesActivities("userName", e)}
                      />
                    </div>
                    <div class="col-md-5">
                      <label for="pwd" class="form-label fw-semibold">Password</label>
                      <input
                        id="pwd"
                        class="form-control"
                        type={showPassword ? "text" : "password"}
                        value={tracesActivity.password}
                        disabled
                        onChange={(e) => handleInputTracesActivities("password", e)}
                      />
                    </div>
                    <div class="col-md-2 d-flex align-items-end" style={{ marginTop: "43px" }}>
                      <button
                        type="submit"
                        class="btn btn-primary w-100"
                        disabled={submitLoading}
                        onClick={(e) => submitLogin(e, true)}
                      >
                        {submitLoading && (
                          <span
                            class="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {form == "view-requested-downloads" &&
                <div className="row mb-4">
                  <div className="col-md-12 border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                    <div className="row g-3">
                      <div className="table-responsive">
                        <div>
                          {requestDownloads &&
                            requestDownloads.length > 0 && (
                              <>
                                <DataTable
                                  className="tax_table"
                                  fixedHeader
                                  fixedHeaderScrollHeight="340px"
                                  columns={columns}
                                  data={requestDownloads}
                                  highlightOnHover
                                  customStyles={customStyles}
                                  paginationComponentOptions={{
                                    noRowsPerPage: true,
                                  }}
                                />
                              </>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </>
          }
          {form != "traces-login" && form != "view-requested-downloads" &&
            <div className="row mb-4">
              <div className="col-md-12 bg-white border border-1 px-3 py-2 rounded-3">
                <div className="row align-items-center justify-content-end">
                  <div className="col-md-12 d-flex align-items-center justify-content-end">
                    <span className="me-2">FY: </span>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      autoComplete="off"
                      value={financialYear}
                      style={highlightStyle}
                      onChange={(e) => {
                        setFinancialYear(e.target.value);
                        resetForm();
                      }}
                    >
                      {financialYears?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <span className="ms-3 me-2">Period:</span>
                    <select
                      className="form-select m-100"
                      aria-label="Default select example"
                      value={quarter}
                      style={highlightStyle1}
                      disabled={formType == "24Q"}
                      onChange={(e) => {
                        setQuarter(e.target.value);
                        resetForm();
                      }}
                    >
                      {quarters?.map((option, index) => (
                        <option value={option} key={index}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <span className="ms-3 me-2">Form: </span>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      autoComplete="off"
                      style={highlightStyle1}
                      value={formType}
                      onChange={(e) => {
                        setFormType(e.target.value);
                        resetForm();
                        if (e.target.value == "24Q") {
                          setQuarter("Q4");
                        }
                      }}
                    >
                      <option value={""} hidden>
                        Select
                      </option>
                      <option value={"26Q"}>26Q</option>
                      <option value={"27EQ"}>27EQ</option>
                      <option value={"27Q"}>27Q</option>
                      <option value={"24Q"}>24Q</option>
                    </select>
                    <button
                      className="btn btn-primary ms-3 w-100"
                      type="button"
                      onClick={submitAutoFill}
                    >
                      {autoLoading && (
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Auto Fill
                    </button>
                  </div>
                </div>
              </div>
            </div>}
          {form != "traces-login" && form != "view-requested-downloads" && <div className="row">
            <div className="col-md-12 bg-white border border-1 px-1  px-md-3 py-md-3 rounded-3">
              <div className="bg-light-gray border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                <div className="row">
                  <div className="col-md-2">
                    <label className="form-label">
                      Token Number of Regular Statement Filed
                    </label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      length={15}
                      value={tracesActivity?.token}
                      onChange={(e) => handleInputTracesActivities("token", e)}
                    />
                    {tracesError.tokenError && (
                      <span className="text-danger">
                        {tracesError.tokenError}
                      </span>
                    )}
                  </div>
                  <div className="col-md-6 mt-1 d-flex align-items-center">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="nilChallan"
                      />
                      <label className="form-check-label" htmlFor="nilChallan">
                        NIL Challan Statement
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="bookAdj"
                      />
                      <label className="form-check-label" htmlFor="bookAdj">
                        Book Adjustment
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="noValidPan"
                      />
                      <label className="form-check-label" htmlFor="noValidPan">
                        No Valid Pan
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <h6 className="mb-4">
                      Provide any one challan information of that return
                    </h6>
                    <div className="row mb-3">
                      <label htmlFor="" className="col-md-4 col-form-label">
                        CD Record Number
                      </label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          length={8}
                          value={tracesActivity?.challan?.challanSrNo}
                          onChange={(e) => handleChallanInput("challanSrNo", e)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="" className="col-md-4 col-form-label">
                        Challan Serial Number / DDO
                      </label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control "
                          value={tracesActivity?.challan?.cdRecordNo}
                          onChange={(e) => handleChallanInput("cdRecordNo", e)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="" className="col-md-4 col-form-label">
                        BSR Code / Receipt Numbers
                      </label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          length={9}
                          className="form-control "
                          value={tracesActivity?.challan?.bsr}
                          onChange={(e) => handleChallanInput("bsr", e)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="" className="col-md-4 col-form-label">
                        Date Of Tax Deposited
                      </label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          value={tracesActivity?.challan?.date}
                          onChange={(e) => handleChallanInput("date", e)}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="" className="col-md-4 col-form-label">
                        Challan Amount / Transfer Voucher
                      </label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          length={18}
                          value={tracesActivity?.challan?.amount}
                          onChange={(e) => handleChallanInput("amount", e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6 className="mb-4">
                      Provide any three Deductee record's PAN and it's Tax
                      Deducted
                    </h6>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Deductee PAN</label>
                        <input
                          type="text"
                          className="form-control"
                          length={10}
                          value={tracesActivity?.deduction?.pan1}
                          onChange={(e) => handleDeductionInput("pan1", e)}
                        />
                        <input
                          type="text"
                          className="form-control my-3"
                          length={10}
                          value={tracesActivity?.deduction?.pan2}
                          onChange={(e) => handleDeductionInput("pan2", e)}
                        />
                        <input
                          type="text"
                          className="form-control "
                          length={10}
                          value={tracesActivity?.deduction?.pan3}
                          onChange={(e) => handleDeductionInput("pan3", e)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">TDS Deducted</label>
                        <input
                          type="text"
                          className="form-control"
                          value={tracesActivity?.deduction?.amount1}
                          onChange={(e) => handleDeductionInput("amount1", e)}
                        />
                        <input
                          type="text"
                          className="form-control my-3"
                          value={tracesActivity?.deduction?.amount2}
                          onChange={(e) => handleDeductionInput("amount2", e)}
                        />
                        <input
                          type="text"
                          className="form-control "
                          value={tracesActivity?.deduction?.amount3}
                          onChange={(e) => handleDeductionInput("amount3", e)}
                        />
                      </div>
                      <div className="col-md-12 mt-4">
                        <div className="d-flex align-items-end">
                          <div className="me-4">
                            <label className="form-label">User Name</label>
                            <input type="text" className="form-control"
                              value={tracesActivity.userName}
                              onChange={(e) => handleInputTracesActivities("userName", e)}
                            />
                            {tracesError.userNameError && (
                              <span className="text-danger">
                                {tracesError.userNameError}
                              </span>
                            )}
                          </div>
                          <div className="me-4">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                              <input
                                className="form-control rounded-2"
                                type={showPassword ? "text" : "password"}
                                id="pwd"
                                value={tracesActivity.password}
                                onChange={(e) => handleInputTracesActivities("password", e)}
                              />

                              <button type="button" className="eye-icon"
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                              </button>

                            </div>
                            {tracesError.passwordError && (
                              <span className="text-danger">
                                {tracesError.passwordError}
                              </span>
                            )}
                          </div>
                          <div className="me-4">
                            <label className="form-label"> &nbsp;</label>
                            <button type="submit"
                              disabled={submitLoading}
                              className="btn btn-primary"
                              onClick={(e) => submitLogin(e)}
                            >
                              {submitLoading && (
                                <span
                                  className="spinner-grow spinner-grow-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              )}
                              Submit
                            </button>
                            {tracesError.passwordError && (
                              <span className="text-danger">
                                &nbsp;
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>}
          <Modal
            className=""
            size="sm"
            centered
            keyboard={false}
            backdrop="static"
            show={confirmModal}
            onHide={() => {
              setConfirmModal(false);
              setCaptchaBase64("");
              setLoading(false);
              setSubmitLoading(false);
            }}
          >
            <Modal.Header className="border-0" closeButton></Modal.Header>
            <Modal.Body>
              <div className="container">
                <div style={{ padding: 10 }}>
                  {captchaBase64 && (
                    <img src={captchaBase64} alt="CAPTCHA" style={{ marginBottom: 10 }} />
                  )}
                  <br />
                  <input
                    type="text"
                    maxLength={5}
                    value={tracesActivity.captcha}
                    onChange={(e) => setTracesActivity((prevState) => ({
                      ...prevState,
                      ["captcha"]: e.target.value,
                    }))}
                    style={{ padding: 10, fontSize: 16, marginBottom: 10 }}
                  />
                  <br />
                  <button className="btn btn-primary" disabled={loading} onClick={handleSubmit} style={{ padding: 10, fontSize: 16 }}>
                    {loading && (
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Submit
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal
            size="md"
            centered
            keyboard={false}
            backdrop="static"
            show={requestResponseModal}
          >
            <Modal.Body>
              <div className="container">
                <div className="row">
                  <b>{requestResponseValue}</b>
                  <br></br>
                </div>
                <div
                  className="row"
                  style={{ textAlign: "center" }}
                >
                  <a
                    href="Javascript:void(0)"
                    onClick={() => {
                      setRequestResponseModal(false);
                      resetForm();
                    }}
                  >
                    Ok
                  </a>
                </div>
              </div>

            </Modal.Body>
          </Modal>
        </div>
      </section>
    </>
  );
}
