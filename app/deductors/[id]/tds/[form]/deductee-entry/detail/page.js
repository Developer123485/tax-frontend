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
import DeducteeFormEntryDetail from "@/app/components/deductee-entry/form-deductee-detail";
import { DeducteeEntryService } from "@/app/services/deducteeEntry.service";
import HeaderList from "@/app/components/header/header-list";

export default function DeducteeEntryDetail({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const form = resolvedParams?.form;
  const router = useRouter(null);
  const searchParams = useSearchParams(null);
  const [challanDropdowns, setChallans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [deducteeDropdowns, setDeducteeDropdowns] = useState([]);
  const [enumList, setEnumList] = useState({});
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
      name: "Deductee Entry",
      isActive: false,
      href: `/deductors/${deductorId}/tds/${form}/deductee-entry?categoryId=${searchParams.get(
        "categoryId"
      )}&financial_year=${searchParams.get(
        "financial_year"
      )}&quarter=${searchParams.get("quarter")}`,
    },
    {
      name: "Deductee Detail",
      isActive: true,
    },
  ]);
  const [deducteeEntry, setDeducteeEntry] = useState({
    id: 0,
    dateOfPaymentCredit: "",
    dateOfDeduction: "",
    amountPaidCredited: "",
    tds: 0,
    incomeTax: 0,
    reasons: "",
    surcharge: 0,
    isTDSPerquisites: null,
    healthEducationCess: 0,
    secHigherEducationCess: 0,
    totalTaxDeducted: 0,
    totalTaxDeposited: 0,
    certificationNo: "",
    financialYear: "",
    quarter: "",
    noNResident: null,
    paymentCovered: null,
    challanNumber: null,
    challanDate: null,
    permanentlyEstablished: "",
    deducteeIdentificationNo: "",
    totalValueOfTheTransaction: null,
    serialNo: null,
    deducteeCode: "",
    panOfDeductee: "",
    nameOfDeductee: "",
    optingForRegime: "N",
    grossingUp: "",
    tdsRateAct: null,
    remettanceCode: "",
    acknowledgement: "",
    countryCode: "",
    email: "",
    contactNo: "",
    address: "",
    taxIdentificationNo: "",
    sectionCode: "",
    typeOfRentPayment: null,
    deducteeRef: "",
    amountExcess: null,
    rateAtWhichTax: null,
    fourNinteenA: null,
    fourNinteenB: null,
    fourNinteenC: null,
    fourNinteenD: null,
    fourNinteenE: null,
    fourNinteenF: null,
    dateOfFurnishingCertificate: "",
    deducteeId: null,
    challanId: null,
    createdDate: null,
    updatedDate: null,
    deductorId: "",
    categoryId: "",
    employeeId: null,
    tdsRate: 0,
    scRate: 0,
    hecRate: 0,
  });
  const [deducteeEntryErrors, setDeducteeEntryErrors] = useState({
    challanVoucherError: "",
    datePaymentError: "",
    dateDeductionError: "",
    sectionCodeError: "",
    amountCreditedError: "",
    nameError: "",
    certificateError: "",
    fourNinteenAError: "",
    fourNinteenBError: "",
    fourNinteenCError: "",
    fourNinteenDError: "",
    fourNinteenEError: "",
    fourNinteenFError: "",
    reasonsError: "",
  });
  useEffect(() => {
    EnumService.getEnumStatues().then((res) => {
      if (res) {
        setEnumList(res);
      }
    });
    DeducteeEntryService.getDeducteeDropdowns(deductorId, searchParams.get("categoryId")).then((res) => {
      if (res) {
        setDeducteeDropdowns(res);
      }
    });
    getChallansDropdown();
    getDeductryEntry();
  }, []);

  function getDeductryEntry() {
    if (searchParams.get("id")) {
      DeducteeEntryService.getDeducteeEntry(
        parseInt(searchParams.get("id"))
      ).then((res) => {
        if (res && res.id > 0) {
          setDeducteeEntry(res);
          setDeducteeEntry((prevState) => ({
            ...prevState,
            ["tdsRate"]: res?.rateAtWhichTax?.toFixed(2),
          }));
          if (searchParams.get("categoryId") == "1") {
            setDeducteeEntry((prevState) => ({
              ...prevState,
              ["deducteeId"]: res.employeeId,
            }))
          } else {
            setDeducteeEntry((prevState) => ({
              ...prevState,
              ["deducteeId"]: res.deducteeId,
            }))
          }
        }
      });
    }
    if (searchParams.get("challanId")) {
      setDeducteeEntry((prevState) => ({
        ...prevState,
        ["challanId"]: parseInt(searchParams.get("challanId")),
      }));
    }
  }

  useEffect(() => {
    setTotalTaxDeducted();
  }, [
    deducteeEntry.surcharge,
    deducteeEntry.healthEducationCess,
    deducteeEntry.tds,
  ]);

  useEffect(() => {
    validatededucteeEntry();
  }, [
    deducteeEntry.amountPaidCredited,
    deducteeEntry.dateOfPaymentCredit,
    deducteeEntry.challanId,
    deducteeEntry.deducteeId,
    deducteeEntry.sectionCode,
    deducteeEntry.totalTaxDeducted,
    deducteeEntry.certificationNo,
    deducteeEntry.fourNinteenA,
    deducteeEntry.fourNinteenB,
    deducteeEntry.fourNinteenC,
    deducteeEntry.fourNinteenD,
    deducteeEntry.fourNinteenE,
    deducteeEntry.fourNinteenF,
  ]);

  function setTotalTaxDeducted() {
    setIsDisable(false);
    let value = 0;
    if (deducteeEntry.surcharge) {
      value = value + parseFloat(deducteeEntry.surcharge);
    }
    if (deducteeEntry.healthEducationCess) {
      value = value + parseFloat(deducteeEntry.healthEducationCess);
    }
    if (deducteeEntry.tds) {
      value = value + parseFloat(deducteeEntry.tds);
    }
    setDeducteeEntry((prevState) => ({
      ...prevState,
      ["totalTaxDeducted"]: value,
      ["totalTaxDeposited"]: value,
    }));
    if (deducteeEntry.reasons == "B" && searchParams.get("categoryId") != "2") {
      setDeducteeEntry((prevState) => ({
        ...prevState,
        ["dateOfDeduction"]: "",
        ["totalTaxDeducted"]: 0,
        ["tds"]: 0,
        ["surcharge"]: 0,
        ["healthEducationCess"]: 0,
        ["totalTaxDeposited"]: 0,
      }));
      setIsDisable(true);
    }
    if ((deducteeEntry.reasons == "B" || deducteeEntry.reasons == "Y" || deducteeEntry.reasons == "Z" || deducteeEntry.reasons == "N" || deducteeEntry.reasons == "D" || deducteeEntry.reasons == "O" || deducteeEntry.reasons == "M" || deducteeEntry.reasons == "E" || deducteeEntry.reasons == "P" || deducteeEntry.reasons == "Q") && searchParams.get("categoryId") == "2") {
      setDeducteeEntry((prevState) => ({
        ...prevState,
        ["totalTaxDeducted"]: 0,
        ["dateOfDeduction"]: "",
        ["tds"]: 0,
        ["surcharge"]: 0,
        ["healthEducationCess"]: 0,
        ["totalTaxDeposited"]: 0,
      }));
      setIsDisable(true);
    }
  }

  function getChallansDropdown() {
    const model = {
      pageSize: 50,
      pageNumber: 1,
      financialYear: searchParams.get("financial_year"),
      quarter: searchParams.get("quarter"),
      deductorId: deductorId,
      categoryId: parseInt(searchParams.get("categoryId")),
    };
    ChallanService.getChallansDropdowns(model).then((res) => {
      if (res) {
        setChallans(res);
      }
    });
  }

  function handleInput(names, e) {
    setIsDisable(false);
    if (names === "dateOfPaymentCredit" || names === "dateOfDeduction") {
      setDeducteeEntry((prevState) => ({
        ...prevState,
        [names]: e,
      }));
    }
    else {
      setDeducteeEntry((prevState) => ({
        ...prevState,
        [names]: e.target.value,
      }));
    }
    if (names == "reasons" && e.target.value == "B" && searchParams.get("categoryId") != "2") {
      setIsDisable(true);
      setDeducteeEntry((prevState) => ({
        ...prevState,
        ["totalTaxDeducted"]: 0,
        ["tds"]: 0,
        ["surcharge"]: 0,
        ["healthEducationCess"]: 0,
        ["totalTaxDeposited"]: 0,
      }));
    }
    if (names == "reasons" && (e.target.value == "B" || e.target.value == "Y" || e.target.value == "Z" || e.target.value == "N" || e.target.value == "D" || e.target.value == "O" || e.target.value == "M" || e.target.value == "E" || e.target.value == "P" || e.target.value == "Q") && searchParams.get("categoryId") == "2") {
      setIsDisable(true);
      setDeducteeEntry((prevState) => ({
        ...prevState,
        ["totalTaxDeducted"]: 0,
        ["tds"]: 0,
        ["surcharge"]: 0,
        ["healthEducationCess"]: 0,
        ["totalTaxDeposited"]: 0,
      }));
    }
  }

  function saveDeductee(e) {
    e.preventDefault();
    setIsDirty(true);
    if (validatededucteeEntry()) {
      setLoading(true);
      let model = Object.assign({}, deducteeEntry);
      if (model.dateOfDeduction) {
        model.dateOfDeduction = CommonService.dateFormat(
          model.dateOfDeduction
        );
      }
      if (model.dateOfPaymentCredit) {
        model.dateOfPaymentCredit = CommonService.dateFormat(
          model.dateOfPaymentCredit
        );
      }
      if (model.challanDate) {
        model.challanDate = CommonService.dateFormat(
          model.challanDate
        );
      }
      model.amountPaidCredited = model.amountPaidCredited ? model.amountPaidCredited : 0;
      model.tds = model.tds ? model.tds : 0;
      model.surcharge = model.surcharge ? model.surcharge : 0;
      model.healthEducationCess = model.healthEducationCess ? model.healthEducationCess : 0;
      model.totalTaxDeducted = model.totalTaxDeducted ? model.totalTaxDeducted : 0;
      model.totalTaxDeposited = model.totalTaxDeposited ? model.totalTaxDeposited : 0;
      model.amountPaidCredited = model.amountPaidCredited ? model.amountPaidCredited : 0;
      model.rateAtWhichTax = model.rateAtWhichTax ? model.rateAtWhichTax : 0;
      model.financialYear = searchParams.get("financial_year");
      model.quarter = searchParams.get("quarter");
      model.categoryId = searchParams.get("categoryId");
      model.deductorId = deductorId;
      if (searchParams.get("categoryId") == "1") {
        model.employeeId = parseInt(model.deducteeId);
        model.deducteeId = null;
      } else {
        model.deducteeId = parseInt(model.deducteeId);
        model.employeeId = null;
      }
      DeducteeEntryService.saveDeducteeEntry(model)
        .then((res) => {
          if (res) {
            toast.success("Deductee Entry Created Successfully!");
            router.push(
              `/deductors/${deductorId}/tds/${form}/deductee-entry?categoryId=${searchParams.get("categoryId")}&financial_year=${searchParams.get("financial_year")}&quarter=${searchParams.get("quarter")}`
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

  function setRateApplicable(params) {
    setDeducteeEntry((prevState) => ({
      ...prevState,
      ["rateAtWhichTax"]: params,
    }));
  }

  function isDateInQuarter(dateStr, financialYearStart, quarter) {
    const date = new Date(dateStr);
    const fyStartYear = parseInt(financialYearStart);
    let quarterStart, quarterEnd;
    switch (quarter) {
      case 1:
        quarterStart = new Date(fyStartYear, 3, 1); // April 1
        quarterEnd = new Date(fyStartYear, 5, 30); // June 30
        break;
      case 2:
        quarterStart = new Date(fyStartYear, 6, 1); // July 1
        quarterEnd = new Date(fyStartYear, 8, 30); // September 30
        break;
      case 3:
        quarterStart = new Date(fyStartYear, 9, 1); // October 1
        quarterEnd = new Date(fyStartYear, 11, 31); // December 31
        break;
      case 4:
        quarterStart = new Date(fyStartYear + 1, 0, 1); // January 1 (next year)
        quarterEnd = new Date(fyStartYear + 1, 2, 31); // March 31
        break;
      default:
        return false;
    }

    return date >= quarterStart && date <= quarterEnd.setDate(date.getDate() + 1);
  }

  function validatededucteeEntry() {
    const financialYear = searchParams.get("financial_year");
    const startYear = parseInt(financialYear.split("-")[0]);
    let dateToCheck = "";
    let quarter = 0;
    if (searchParams.get("quarter") == "Q4") {
      quarter = 4;
    }
    if (searchParams.get("quarter") == "Q1") {
      quarter = 1;
    }
    if (searchParams.get("quarter") == "Q3") {
      quarter = 3;
    }
    if (searchParams.get("quarter") == "Q2") {
      quarter = 2;
    }
    let challanVoucherError = "";
    let datePaymentError = "";
    let dateDeductionError = "";
    let sectionCodeError = "";
    let amountCreditedError = "";
    let nameError = "";
    let certificateError = "";
    let reasonsError = "";
    let fourNinteenAError = "";
    let fourNinteenBError = "";
    let fourNinteenCError = "";
    let fourNinteenDError = "";
    let fourNinteenEError = "";
    let fourNinteenFError = "";

    if (deducteeEntry.amountPaidCredited && deducteeEntry.fourNinteenA && parseFloat(deducteeEntry.fourNinteenA) > parseFloat(deducteeEntry.amountPaidCredited)) {
      fourNinteenAError = "Value should be less then equal to AmountPaidCredited";
    }
    if (deducteeEntry.amountPaidCredited && deducteeEntry.fourNinteenB && parseFloat(deducteeEntry.fourNinteenB) > parseFloat(deducteeEntry.amountPaidCredited)) {
      fourNinteenBError = "Value should be less then equal to AmountPaidCredited";
    }
    if (deducteeEntry.amountPaidCredited && deducteeEntry.fourNinteenC && parseFloat(deducteeEntry.fourNinteenC) > parseFloat(deducteeEntry.amountPaidCredited)) {
      fourNinteenCError = "Value should be less then equal to AmountPaidCredited";
    }
    if (deducteeEntry.amountPaidCredited && deducteeEntry.fourNinteenD && parseFloat(deducteeEntry.fourNinteenD) > parseFloat(deducteeEntry.amountPaidCredited)) {
      fourNinteenDError = "Value should be less then equal to AmountPaidCredited";
    }
    if (deducteeEntry.amountPaidCredited && deducteeEntry.fourNinteenE && parseFloat(deducteeEntry.fourNinteenE) > parseFloat(deducteeEntry.amountPaidCredited)) {
      fourNinteenEError = "Value should be less then equal to AmountPaidCredited";
    }
    if (deducteeEntry.amountPaidCredited && deducteeEntry.fourNinteenF && parseFloat(deducteeEntry.fourNinteenF) > parseFloat(deducteeEntry.amountPaidCredited)) {
      fourNinteenFError = "Value should be less then equal to AmountPaidCredited";
    }
    if (!deducteeEntry.dateOfPaymentCredit) {
      datePaymentError = "Date Of Payment is required";
    }
    if (!deducteeEntry.dateOfDeduction && deducteeEntry.totalTaxDeducted > 0) {
      dateDeductionError = "Date Of Deduction is required";
    }
    if (!deducteeEntry.challanId) {
      challanVoucherError = "Challan no is required";
    }
    if (!deducteeEntry.sectionCode) {
      sectionCodeError = "Section code is required";
    }
    if (!deducteeEntry.deducteeId) {
      nameError = "Deductee detail is required";
    }
    if (deducteeEntry.sectionCode && (deducteeEntry.sectionCode == "MA" || deducteeEntry.sectionCode == "MB" || deducteeEntry.sectionCode == "MC" || deducteeEntry.sectionCode == "MD" || deducteeEntry.sectionCode == "ME" || deducteeEntry.sectionCode == "MF" || deducteeEntry.sectionCode == "MG" || deducteeEntry.sectionCode == "MH" || deducteeEntry.sectionCode == "MI" || deducteeEntry.sectionCode == "MJ") && startYear < 2025 && (deducteeEntry.reasons != "C" || deducteeEntry.reasons != "J")) {
      sectionCodeError = "Applicable remark values are C and J and to FY 2025-26 Q1 onwards.";
    }
    if (searchParams.get("categoryId") == "3" && deducteeEntry.sectionCode && (deducteeEntry.sectionCode == "D" || deducteeEntry.sectionCode == "R") && startYear < 2025) {
      sectionCodeError = "Applicable to FY 2025-26 Q1 onwards.";
    }
    if (searchParams.get("categoryId") == "4" && deducteeEntry.sectionCode && deducteeEntry.sectionCode == "94T" && startYear < 2025 && (deducteeEntry.reasons != "C" || deducteeEntry.reasons != "Y")) {
      sectionCodeError = "Applicable to FY 2025-26 Q1 onwards.";
    }
    if (searchParams.get("categoryId") == "2" && deducteeEntry.reasons == "U" && startYear < 2025) {
      reasonsError = "Applicable to FY 2025-26 Q1 onwards.";
    }
    if (searchParams.get("categoryId") == "4" && deducteeEntry.reasons == "J" && startYear < 2025) {
      reasonsError = "Applicable to FY 2025-26 Q1 onwards.";
    }
    if (searchParams.get("categoryId") == "3" && deducteeEntry.reasons == "I" && startYear < 2025) {
      reasonsError = "Applicable to FY 2025-26 Q1 onwards.";
    }
    if ((searchParams.get("categoryId") == "2" || searchParams.get("categoryId") == "4") && deducteeEntry.reasons == "Y" && (deducteeEntry.sectionCode == "94B" || deducteeEntry.sectionCode == "4BB") && startYear < 2025) {
      reasonsError = "Y reasons not allowed for section code 94B and 4BB and applicable to FY 2025-26 Q1 onwards "
    }
    if (!deducteeEntry.amountPaidCredited) {
      amountCreditedError = "Amount paid/credited is required";
    }
    if (deducteeEntry.dateOfPaymentCredit) {
      dateToCheck = CommonService.tdsDateFormat(new Date(deducteeEntry.dateOfPaymentCredit));
    }
    if ((deducteeEntry.reasons == "A" || deducteeEntry.reasons == "B") && !deducteeEntry.certificationNo) {
      certificateError = "Certificate no is required";
    }
    if (deducteeEntry.dateOfPaymentCredit && !isDateInQuarter(dateToCheck, searchParams.get("financial_year"), quarter)) {
      datePaymentError = "The date is NOT within that quarter";
    }
    if (
      challanVoucherError ||
      datePaymentError ||
      dateDeductionError ||
      sectionCodeError ||
      amountCreditedError ||
      nameError ||
      certificateError ||
      reasonsError ||
      fourNinteenAError ||
      fourNinteenBError ||
      fourNinteenCError ||
      fourNinteenDError ||
      fourNinteenEError ||
      fourNinteenFError
    ) {
      setDeducteeEntryErrors((prevState) => ({
        ...prevState,
        challanVoucherError,
        datePaymentError,
        dateDeductionError,
        sectionCodeError,
        amountCreditedError,
        nameError,
        certificateError,
        fourNinteenAError,
        fourNinteenBError,
        fourNinteenCError,
        fourNinteenDError,
        fourNinteenEError,
        fourNinteenFError,
        reasonsError
      }));
      return false;
    }
    setDeducteeEntryErrors((prevState) => ({
      ...prevState,
      challanVoucherError: "",
      datePaymentError: "",
      dateDeductionError: "",
      sectionCodeError: "",
      amountCreditedError: "",
      nameError: "",
      certificateError: "",
      fourNinteenAError: "",
      fourNinteenBError: "",
      fourNinteenCError: "",
      fourNinteenDError: "",
      fourNinteenEError: "",
      fourNinteenFError: "",
      reasonsError: ""
    }));
    return true;
  }
  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="py-5">
        <div className="container">
          <div className="row bg-light-gray px-3 py-4 px-md-2 py-md-3 rounded-3 mb-5 g-3">
            <div className="row mb-3">
              <div className="col-md-12">
                <h5 className="text-blue fw-bold">
                  {" "}
                  {searchParams.get("financial_year")},{" "}
                  {searchParams.get("quarter")}, Deductee Detail
                </h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {enumList && enumList.sections26Q && enumList.sections26Q.length > 0 && (
                  <DeducteeFormEntryDetail
                    deducteeEntry={deducteeEntry}
                    challanDropdowns={challanDropdowns}
                    deducteeDropdowns={deducteeDropdowns}
                    enumList={enumList}
                    handleInput={handleInput}
                    isDisable={isDisable}
                    form={form}
                    saveDeductee={saveDeductee}
                    setDeducteeId={(e) => setDeducteeEntry((prevState) => ({
                      ...prevState,
                      ["deducteeId"]: e ? parseInt(e) : null,
                    }))}
                    setReasons={(e) => {
                      setDeducteeEntry((prevState) => ({
                        ...prevState,
                        ["reasons"]: e,
                      }))
                    }}
                    setCountry={(e) => {
                      setDeducteeEntry((prevState) => ({
                        ...prevState,
                        ["countryCode"]: e,
                      }))
                    }}
                    setNatures={(e) => {
                      setDeducteeEntry((prevState) => ({
                        ...prevState,
                        ["remettanceCode"]: e,
                      }))
                    }}
                    setSectionCode={(e) => {
                      if (searchParams.get("categoryId") && e) {
                        DeducteeEntryService.getTdsRate(
                          e,
                          parseInt(searchParams.get("categoryId"))
                        ).then((res) => {
                          if (res) {
                            setDeducteeEntry((prevState) => ({
                              ...prevState,
                              ["rateAtWhichTax"]: res.applicableRate,
                              ["scRate"]: res.surchargeRate,
                              ["tdsRate"]: res.tdsRate,
                              ["hecRate"]: res.healthCessRate,
                            }));
                          }
                        });
                      }
                      setDeducteeEntry((prevState) => ({
                        ...prevState,
                        ["sectionCode"]: e,
                      }))
                    }}
                    setRateApplicable={(e) => setRateApplicable(e)}
                    deducteeEntryErrors={deducteeEntryErrors}
                    isDirty={isDirty}
                    deductorId={deductorId}
                  ></DeducteeFormEntryDetail>
                )}
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
}
