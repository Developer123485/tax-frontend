"use client";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { ChallanService } from "@/app/services/challan.service";
import { CommonService } from "@/app/services/common.service";
import { EnumService } from "@/app/services/enum.service";
import React, { useState, use, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HeaderList from "@/app/components/header/header-list";

export default function ChallanDetail({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const form = resolvedParams?.form;
  const router = useRouter(null);
  const searchParams = useSearchParams(null);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [enumList, setEnumList] = useState({});
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
      name: form,
      isActive: false,
      href: `/deductors/${deductorId}/tds/${form}?categoryId=${searchParams.get(
        "categoryId"
      )}&financial_year=${searchParams.get(
        "financial_year"
      )}&quarter=${searchParams.get("quarter")}`,
    },
    {
      name: "Challans",
      isActive: false,
      href: `/deductors/${deductorId}/tds/${form}/challans?categoryId=${searchParams.get(
        "categoryId"
      )}&financial_year=${searchParams.get(
        "financial_year"
      )}&quarter=${searchParams.get("quarter")}`,
    },
    {
      name: "Challan Detail",
      isActive: true,
    },
  ]);
  const [challanDetail, setChallanDetail] = useState({
    id: 0,
    challanVoucherNo: "",
    dateOfDeposit: "",
    bsrCode: "",
    tdsDepositByBook: "N",
    receiptNoOfForm: "",
    minorHeadChallan: "",
    healthAndEducationCess: 0,
    others: 0,
    totalTaxDeposit: 0,
    tdsAmount: 0,
    surchargeAmount: 0,
    eduCessAmount: 0,
    secHrEduCess: 0,
    interestAmount: 0,
    fee: 0,
    penaltyTotal: 0,
    deductorId: "",
    categoryId: "",
    financialYear: "",
    quarter: "",
  });

  const [challanErrors, setChallanErrors] = useState({
    challanVoucherError: "",
    dateOfDepositError: "",
    bsrCodeError: "",
    tdsAmountError: null,
    totalTaxError: null,
  });
  useEffect(() => {
    EnumService.getEnumStatues().then((res) => {
      if (res) {
        setEnumList(res);
      }
      getChallan();
    });
  }, []);

  useEffect(() => {
    validateChallanDetail();
  }, [
    challanDetail.bsrCode,
    challanDetail.totalTaxDeposit,
    challanDetail.dateOfDeposit,
    challanDetail.challanVoucherNo,
  ]);

  function getTotalTaxValue() {
    const totalValue =
      parseFloat(challanDetail.others || "0") +
      parseFloat(challanDetail.tdsAmount || "0") +
      parseFloat(challanDetail.fee || "0") +
      parseFloat(challanDetail.interestAmount || "0") +
      parseFloat(challanDetail.healthAndEducationCess || "0") +
      parseFloat(challanDetail.surchargeAmount || "0");
    return totalValue;
  }

  function handleInput(names, e) {
    if (names === "dateOfDeposit") {
      setChallanDetail((prevState) => ({
        ...prevState,
        [names]: new Date(e),
      }));
    } else {
      setChallanDetail((prevState) => ({
        ...prevState,
        [names]: e.target.value,
      }));
    }
  }

  function getChallan() {
    if (searchParams.get("id")) {
      ChallanService.getChallan(parseInt(searchParams.get("id"))).then(
        (res) => {
          if (res && res.id > 0) {
            setChallanDetail(res);
          }
        }
      );
    }
  }

  function saveChallan(e) {
    e.preventDefault();
    setIsDirty(true);
    if (validateChallanDetail()) {
      setLoading(true);
      challanDetail.financialYear = searchParams.get("financial_year");
      challanDetail.quarter = searchParams.get("quarter");
      challanDetail.categoryId = searchParams.get("categoryId");
      challanDetail.deductorId = deductorId;
      challanDetail.totalTaxDeposit = getTotalTaxValue();
      let model = Object.assign({}, challanDetail);
      if (challanDetail.tdsDepositByBook == "Y") {
        challanDetail.minorHeadChallan = "";
      }
      model.dateOfDeposit = CommonService.dateFormat(model.dateOfDeposit);
      ChallanService.saveChallan(model)
        .then((res) => {
          if (res) {
            toast.success("Challan Created Successfully!");
            router.push(
              `/deductors/${deductorId}/tds/${form}/challans?categoryId=${searchParams.get("categoryId")}&financial_year=${searchParams.get("financial_year")}&quarter=${searchParams.get("quarter")}`
            );
          } else {
            setLoading(false);
          }
        })
        .catch((e) => {
          if (e?.response?.data?.errorMessage) {
            toast.error(e?.response?.data?.errorMessage);
          }
          else {
            toast.error(e?.message);
          }
          setLoading(false);
        });
    }
  }

  function validateChallanDetail() {
    let bsrCodeError = "";
    let dateOfDepositError = "";
    let totalTaxError = null;
    let challanVoucherError = "";
    if (!challanDetail.bsrCode) {
      bsrCodeError = "BSRCode is required";
    }
    if (!challanDetail.challanVoucherNo) {
      challanVoucherError = "Challan Voucher no is required";
    }
    if (!challanDetail.dateOfDeposit) {
      dateOfDepositError = "Date Of Deposit is required";
    }
    if (bsrCodeError || dateOfDepositError || challanVoucherError) {
      setChallanErrors((prevState) => ({
        ...prevState,
        bsrCodeError,
        dateOfDepositError,
        challanVoucherError,
      }));
      return false;
    }
    setChallanErrors((prevState) => ({
      ...prevState,
      bsrCodeError: "",
      dateOfDepositError: "",
      challanVoucherError: "",
      totalTaxError: "",
    }));
    return true;
  }
  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="my-5 my-md-4">
        <div className="container">
          <div className="">
            <div>
              <div className="row bg-light-gray px-3 py-4 px-md-2 py-md-3 rounded-3 mb-4">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="text-blue fw-bold">
                      {searchParams.get("financial_year")},{" "}
                      {searchParams.get("quarter")}, Challan Detail
                    </h5>
                  </div>
                </div>

                <div className="row d-flex g-3 align-items-start mt-0">
                  <div className="col-md-3">
                    <label htmlFor="inputChallanNo" className="form-label">
                      <span>Challan/Voucher No</span>
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="inputChallanNo"
                      maxLength={5}
                      autoComplete="off"
                      value={challanDetail.challanVoucherNo}
                      onChange={(e) => {
                        if (CommonService.isNumeric(e.target.value)) {
                          handleInput("challanVoucherNo", e);
                        }
                      }}
                    />
                    {isDirty && challanErrors.challanVoucherError && (
                      <span className="text-danger">
                        {challanErrors.challanVoucherError}
                      </span>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="dateOfDoposit" className="form-label">
                      <span>Date Of Deposit</span>
                      <span className="text-danger"> *</span>
                    </label>
                    <div>
                      <DatePicker
                        autoComplete="off"
                        selected={challanDetail.dateOfDeposit}
                        id="dateOfDoposit"
                        className="form-control w-100"
                        onChange={(e) => {
                          handleInput("dateOfDeposit", e);
                        }}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/MM/yyyy"
                      />
                    </div>
                    {isDirty && challanErrors.dateOfDepositError && (
                      <span className="text-danger">
                        {challanErrors.dateOfDepositError}
                      </span>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="bsrCode" className="form-label">
                      <span>BSR Code/24G Reciept No</span>
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="bsrCode"
                      maxLength={7}
                      autoComplete="off"
                      value={challanDetail.bsrCode}
                      onChange={(e) => {
                        if (CommonService.isNumeric(e.target.value)) {
                          handleInput("bsrCode", e);
                        }
                      }}
                    />
                    {isDirty && challanErrors.bsrCodeError && (
                      <span className="text-danger">
                        {challanErrors.bsrCodeError}
                      </span>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputCountry" className="form-label">
                      <span>TDS Deposit By Book Entry</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      autoComplete="off"
                      value={challanDetail.tdsDepositByBook}
                      style={highlightStyle}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={(e) => handleInput("tdsDepositByBook", e)}
                    >
                      <option value="N">No</option>
                      <option value="Y">Yes</option>
                    </select>
                  </div>
                  {challanDetail.tdsDepositByBook === "N" && (
                    <div className="col-md-3">
                      <label htmlFor="inputCountry" className="form-label">
                        <span>Minor Head of Challan</span>
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        autoComplete="off"
                        style={highlightStyle1}
                        onFocus={() => setIsFocused1(true)}
                        onBlur={() => setIsFocused1(false)}
                        value={challanDetail.minorHeadChallan}
                        onChange={(e) => handleInput("minorHeadChallan", e)}
                      >
                        <option value={""}>Select Minor Head</option>
                        {form === "form-26Q" &&
                          enumList.minor26Q?.map((option, index) => (
                            <option key={index} value={option.key}>
                              {option.value}
                            </option>
                          ))}
                        {(form === "form-27EQ" || form === "form-24Q") &&
                          enumList.minor27EQ?.map((option, index) => (
                            <option key={index} value={option.key}>
                              {option.value}
                            </option>
                          ))}
                        {form === "form-27Q" &&
                          enumList.minor27Q?.map((option, index) => (
                            <option key={index} value={option.key}>
                              {option.value}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="row bg-light-gray px-3 py-4 px-md-2 py-md-3 rounded-3 mb-4">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="text-blue fw-bold">Amount Detail</h5>
                  </div>
                </div>

                <div className="row d-flex g-3 align-items-start mt-0">
                  <div className="col-md-3">
                    <label htmlFor="tdsAmount" className="form-label">
                      <span>TDS Amount</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="tdsAmount"
                      autoComplete="off"
                      maxLength={15}
                      value={challanDetail.tdsAmount}
                      onChange={(e) => {
                        if (CommonService.isNumeric(e.target.value)) {
                          handleInput("tdsAmount", e);
                        }
                      }}
                    />
                    {/* {isDirty && challanErrors.tdsAmountError && (
                  <span className="text-danger">
                    {challanErrors.tdsAmountError}
                  </span>
                )} */}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="surchargeAmount" className="form-label">
                      <span>Surcharge Amount</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="surchargeAmount"
                      autoComplete="off"
                      maxLength={15}
                      value={challanDetail.surchargeAmount}
                      onChange={(e) => {
                        if (CommonService.isNumeric(e.target.value)) {
                          handleInput("surchargeAmount", e);
                        }
                      }}
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="eduCessAmount" className="form-label">
                      <span>Health And Education Cess</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="eduCessAmount"
                      maxLength={15}
                      autoComplete="off"
                      value={challanDetail.healthAndEducationCess}
                      onChange={(e) => {
                        if (CommonService.isNumeric(e.target.value)) {
                          handleInput("healthAndEducationCess", e);
                        }
                      }}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="interestAmount" className="form-label">
                      <span>Interest Amount</span>
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="interestAmount"
                      maxLength={15}
                      autoComplete="off"
                      value={challanDetail.interestAmount}
                      onChange={(e) => {
                        if (CommonService.isNumeric(e.target.value)) {
                          handleInput("interestAmount", e);
                        }
                      }}
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="fee" className="form-label">
                      <span>Fee</span>
                    </label>

                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="fee"
                      maxLength={15}
                      autoComplete="off"
                      value={challanDetail.fee}
                      onChange={(e) => {
                        if (CommonService.isNumeric(e.target.value)) {
                          handleInput("fee", e);
                        }
                      }}
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="penalty" className="form-label">
                      <span>Penalty/Other Amount</span>
                    </label>

                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="penalty"
                      maxLength={15}
                      autoComplete="off"
                      value={challanDetail.others}
                      onChange={(e) => {
                        if (CommonService.isNumeric(e.target.value)) {
                          handleInput("others", e);
                        }
                      }}
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="total" className="form-label">
                      <span>Total</span>
                    </label>

                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      maxLength={15}
                      id="total"
                      autoComplete="off"
                      value={
                        parseInt(
                          parseFloat(challanDetail.others || "0") +
                          parseFloat(challanDetail.tdsAmount || "0") +
                          parseFloat(challanDetail.fee || "0") +
                          parseFloat(challanDetail.interestAmount || "0") +
                          parseFloat(
                            challanDetail.healthAndEducationCess || "0"
                          ) +
                          parseFloat(challanDetail.surchargeAmount || "0")
                        ) > 0
                          ? parseFloat(challanDetail.others || "0") +
                          parseFloat(challanDetail.tdsAmount || "0") +
                          parseFloat(challanDetail.fee || "0") +
                          parseFloat(challanDetail.interestAmount || "0") +
                          parseFloat(
                            challanDetail.healthAndEducationCess || "0"
                          ) +
                          parseFloat(challanDetail.surchargeAmount || "0")
                          : ""
                      }
                      disabled={true}
                    // onChange={(e) => {
                    //   if (CommonService.isNumeric(e.target.value)) {
                    //     handleInput("totalTaxDeposit", e);
                    //   }
                    // }}
                    />
                    {isDirty && challanErrors.totalTaxError && (
                      <span className="text-danger">
                        {challanErrors.totalTaxError}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 px-0 d-flex justify-content-start px-0">
                  <button
                    type="button"
                    onClick={(e) => saveChallan(e)}
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading && (
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Save Challan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
