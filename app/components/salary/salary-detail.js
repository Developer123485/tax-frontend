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
import SalaryModalForm from "./salary-modal-form";
import Image from "next/image";

export default function SalaryDetail(props) {
  const [totalAmountofExamption, setTotalAmountofExamption] = useState(false);
  const [grossTotalDeduction, setGrossTotalDeduction] = useState(false);
  const [wheatherRent, setWheatherRent] = useState(false);
  const [wheatherInterest, setWheatherInterest] = useState(false);

  const {
    challanDropdowns,
    salaryDetail,
    enumList,
    salaryDetailErrors,
    isDirty,
    form,
  } = props;

  function handleInput(name, e, type) {
    props.handleInput(name, e, type);
  }

  return (
    <>
      <div className="row bg-light-gray border border-1 rounded-3 mb-4 g-3">
        <div className="col-md-12 bg-light-gray px-3 py-4 px-md-3 py-md-3 mt-md-0">
          <div className="row">
            <div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">Basic Details</h6>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="employeeId">
                  Employee Detail
                </span>
                <select
                  className={
                    isDirty && salaryDetailErrors.nameError
                      ? "form-select has-error"
                      : "form-select"
                  }
                  aria-label="Default select example"
                  autoComplete="off"
                  value={salaryDetail.employeeId}
                  onChange={(e) => handleInput("employeeId", e)}
                >
                  <option value={""} hidden>
                    Select
                  </option>
                  {props.employeeDropdowns &&
                    props.employeeDropdowns?.map((res, index) => (
                      <option key={index} value={res.id}>
                        {res.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="newRegime">
                  New Regime
                </span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={salaryDetail.newRegime}
                  onChange={(e) => handleInput("newRegime", e)}
                >
                  <option selected value={"N"}>
                    No
                  </option>
                  <option value={"Y"}>Yes</option>
                </select>
              </div>
              {/* <div className="input-group mb-3">
                <span className="input-group-text w-50" id="PAN">
                  PAN
                </span>
                <input
                  type="text"
                  placeholder=""
                  className={
                    isDirty && salaryDetailErrors.panError
                      ? "form-control has-error"
                      : "form-control"
                  }
                  id="panOfEmployee"
                  maxLength={"50"}
                  autoComplete="off"
                  value={
                    salaryDetail.panOfEmployee
                      ? salaryDetail.panOfEmployee.toUpperCase()
                      : ""
                  }
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleInput("panOfEmployee", e);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="inputEmployeeRef">
                  Employee Ref.
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="inputEmployeeRef"
                  maxLength={"15"}
                  autoComplete="off"
                  value={salaryDetail.employeeRef}
                  onChange={(e) => handleInput("employeeRef", e)}
                />
              </div> */}
            </div>
            <div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">&nbsp;</h6>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="inputEmployeeRef">
                  Employment From
                </span>
                <span className="salary-dates-wrap">
                  <DatePicker
                    autoComplete="off"
                    selected={salaryDetail.periodOfFromDate}
                    id="periodOfFromDate"
                    className={
                      isDirty && salaryDetailErrors.periodFromError
                        ? "form-control rounded-start-0 has-error"
                        : "form-control rounded-start-0"
                    }
                    onChange={(e) => handleInput("periodOfFromDate", e)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/MM/yyyy"
                  />
                </span>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="inputEmployeeRef">
                  Employment To
                </span>
                <span className="salary-dates-wrap">
                  <DatePicker
                    autoComplete="off"
                    selected={salaryDetail.periodOfToDate}
                    id="periodOfToDate"
                    className={
                      isDirty && salaryDetailErrors.periodToError
                        ? "form-control rounded-start-0 has-error"
                        : "form-control rounded-start-0"
                    }
                    onChange={(e) => handleInput("periodOfToDate", e)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/MM/yyyy"
                  />
                </span>
              </div>
            </div>
            {/* DeductionUSII/h6> */}
            {/* <div className="input-group mb-3">
                <span className="input-group-text w-50" id="inputEmployeeRef">
                  Designation
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="desitnation"
                  maxLength={"10"}
                  autoComplete="off"
                  value={salaryDetail.desitnation}
                  onChange={(e) => {
                    handleInput("desitnation", e);
                  }}
                />
              </div> */}
            {/* <div className="input-group mb-3">
                <span className="input-group-text w-50" id="inputEmployeeRef">
                  Category
                </span>
                <select
                  className={
                    isDirty && salaryDetailErrors.categoryError
                      ? "form-select has-error"
                      : "form-select"
                  }
                  aria-label="Default select example"
                  autoComplete="off"
                  value={salaryDetail.categoryEmployee}
                  onChange={(e) => handleInput("categoryEmployee", e)}
                >
                  <option value={""} hidden>
                    Select
                  </option>
                  {props.enumList &&
                    props.enumList?.employeeCategory?.map((res, index) => (
                      <option key={index} value={res.key}>
                        {res.value}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="inputEmployeeRef">
                  DOB
                </span>
                <span className="salary-dates-wrap">
                  <DatePicker
                    autoComplete="off"
                    selected={salaryDetail.dateOfBirth}
                    className="form-control rounded-start-0"
                    onChange={(e) => handleInput("dateOfBirth", e)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/MM/yyyy"
                  />
                </span>
              </div> */}
            {/* </div> */}
            {/* <div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">&nbsp;</h6>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="inputEmployeeRef">
                  Employment From
                </span>
                <span className="salary-dates-wrap">
                  <DatePicker
                    autoComplete="off"
                    selected={salaryDetail.periodOfFromDate}
                    id="periodOfFromDate"
                    className={
                      isDirty && salaryDetailErrors.periodFromError
                        ? "form-control rounded-start-0 has-error"
                        : "form-control rounded-start-0"
                    }
                    onChange={(e) => handleInput("periodOfFromDate", e)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/MM/yyyy"
                  />
                </span>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="inputEmployeeRef">
                  Employment To
                </span>
                <span className="salary-dates-wrap">
                  <DatePicker
                    autoComplete="off"
                    selected={salaryDetail.periodOfToDate}
                    id="periodOfToDate"
                    className={
                      isDirty && salaryDetailErrors.periodToError
                        ? "form-control rounded-start-0 has-error"
                        : "form-control rounded-start-0"
                    }
                    onChange={(e) => handleInput("periodOfToDate", e)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/MM/yyyy"
                  />
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="row bg-light-gray border border-1 rounded-3 mb-4 mt-4 g-3">
        <div className="col-md-12 bg-light-gray px-3 py-4 px-md-3 py-md-3 mt-md-0">
          <div className="row">
            <div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">Salary Details</h6>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="Salaryu/s17(1)">
                  Salary u/s 17(1)
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="grossSalary"
                  maxLength={"15"}
                  autoComplete="off"
                  value={salaryDetail.grossSalary}
                  onChange={(e) => {
                    handleInput("grossSalary", e, "float");
                  }}
                />
              </div>
              {salaryDetail.wheatherPensioner == "No" && (
                <><div className="input-group mb-3">
                  <span className="input-group-text w-50" id="Salaryu/s17(2)">
                    Salary u/s 17(2)
                  </span>
                  <input
                    type="text"
                    placeholder=""
                    className="form-control"
                    id="valueOfPerquisites"
                    maxLength={"15"}
                    autoComplete="off"
                    value={salaryDetail.valueOfPerquisites}
                    disabled={
                      salaryDetail.isValueOfPerquisites &&
                      salaryDetail.isValueOfPerquisites > 0
                    }
                    onChange={(e) =>
                      handleInput("valueOfPerquisites", e, "float")
                    }
                  />
                  <button
                    className="btn btn-primary"
                    disabled={props.hideButton == true}
                    type="button"
                    onClick={(e) => props.setTotalSalary("perks")}
                  >
                    <Image
                      className=""
                      src="/images/dashboards/plus_white_icon.svg"
                      alt="plus_white_icon"
                      width={8}
                      height={16}
                    />
                  </button>
                </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text w-50" id="Salaryu/s17(3)">
                      Salary u/s 17(3)
                    </span>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="profitsInLieuOf"
                      maxLength={"10"}
                      autoComplete="off"
                      value={salaryDetail.profitsInLieuOf}
                      onChange={(e) => handleInput("profitsInLieuOf", e, "float")}
                    />
                  </div>
                </>)}
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="taxableAmount">
                  Taxable Amount
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="taxableAmount"
                  maxLength={"15"}
                  autoComplete="off"
                  value={salaryDetail.taxableAmount}
                  disabled
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="incomeChargeable">
                  Taxable Salary
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="incomeChargeable"
                  maxLength={"15"}
                  autoComplete="off"
                  disabled
                  value={salaryDetail.incomeChargeable}
                />
              </div>
            </div>
            <div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">&nbsp;</h6>
              {salaryDetail.wheatherPensioner == "No" && (
                <div className="input-group mb-3">
                  <span
                    className="input-group-text w-50"
                    id="reportedTaxableAmount"
                  >
                    Reported Taxable
                  </span>
                  <input
                    type="text"
                    placeholder=""
                    className="form-control"
                    id="reportedTaxableAmount"
                    maxLength={"15"}
                    autoComplete="off"
                    value={salaryDetail.reportedTaxableAmount}
                    onChange={(e) =>
                      handleInput("reportedTaxableAmount", e, "float")
                    }
                  />
                </div>
              )}
              <div className="input-group mb-3">
                <span
                  className="input-group-text w-50"
                  id="reportedTaxableAmount"
                >
                  Total Amount
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="totalAmount"
                  maxLength={"15"}
                  autoComplete="off"
                  value={salaryDetail.totalAmount}
                  disabled
                />
              </div>
              {salaryDetail.wheatherPensioner == "No" && (
                <>
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text w-50"
                      id="totalAmountOfExemption"
                    >
                      Exemption u/s 10
                    </span>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="totalAmountOfExemption"
                      maxLength={"15"}
                      autoComplete="off"
                      disabled
                      value={salaryDetail.totalAmountOfExemption}
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => props.setTotalSalary("exemption")}
                    >
                      <Image
                        className=""
                        src="/images/dashboards/plus_white_icon.svg"
                        alt="plus_white_icon"
                        width={8}
                        height={16}
                      />
                    </button>
                  </div>
                </>
              )}
              <div className="input-group mb-3">
                <span
                  className="input-group-text w-50"
                  id="standardDeductionMannualEdit"
                >
                  Std. Deduction(Y/N)
                </span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={salaryDetail.standardDeductionMannualEdit}
                  onChange={(e) =>
                    handleInput("standardDeductionMannualEdit", e)
                  }
                >
                  <option selected value={"N"}>
                    No
                  </option>
                  <option value={"Y"}>Yes</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">&nbsp;</h6>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="standardDeduction">
                  Std. Deduction
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="standardDeduction"
                  maxLength={"15"}
                  autoComplete="off"
                  value={salaryDetail.standardDeduction}
                  onChange={(e) => handleInput("standardDeduction", e, "float")}
                />
              </div>
              {salaryDetail.wheatherPensioner == "No" && (
                <div className="input-group mb-3">
                  <span className="input-group-text w-50" id="deductionUSII">
                    Deduction 16(ii)
                  </span>
                  <input
                    type="text"
                    placeholder=""
                    className="form-control"
                    id="deductionUSII"
                    disabled={salaryDetail.newRegime == "Y"}
                    maxLength={"15"}
                    autoComplete="off"
                    value={salaryDetail.deductionUSII}
                    onChange={(e) => handleInput("deductionUSII", e, "float")}
                  />
                </div>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="deductionUSIII">
                  Deduction 16(iii)
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  disabled={salaryDetail.newRegime == "Y"}
                  id="deductionUSIII"
                  maxLength={"15"}
                  autoComplete="off"
                  value={salaryDetail.deductionUSIII}
                  onChange={(e) => handleInput("deductionUSIII", e, "float")}
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text w-50"
                  id="grossTotalDeduction"
                >
                  Total Deduction
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="grossTotalDeduction"
                  maxLength={"15"}
                  autoComplete="off"
                  disabled
                  value={salaryDetail.grossTotalDeduction}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row bg-light-gray border border-1 rounded-3 mb-4 mt-4 g-3">
        <div className="col-md-12 bg-light-gray px-3 py-4 px-md-3 py-md-3 mt-md-0">
          <div className="row">
            <div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">Deduction Details</h6>
              {salaryDetail.wheatherPensioner == "No" && (
                <div className="input-group mb-3">
                  <span className="input-group-text w-50" id="incomeOrLoss">
                    HP Income/Loss
                  </span>
                  <input
                    type="text"
                    placeholder=""
                    className={
                      isDirty && salaryDetailErrors.incomeLossError
                        ? "form-control has-error"
                        : "form-control"
                    }
                    id="incomeOrLoss"
                    maxLength={"15"}
                    autoComplete="off"
                    value={salaryDetail.incomeOrLoss}
                    onChange={(e) => handleInput("incomeOrLoss", e, "float")}
                  />
                </div>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="incomeOtherSources">
                  Other Income
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="incomeOtherSources"
                  maxLength={"15"}
                  autoComplete="off"
                  value={salaryDetail.incomeOtherSources}
                  onChange={(e) =>
                    handleInput("incomeOtherSources", e, "float")
                  }
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="grossTotalIncome">
                  Gross Total Income
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="grossTotalIncome"
                  maxLength={"15"}
                  autoComplete="off"
                  value={salaryDetail.grossTotalIncome}
                  disabled
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text w-50"
                  id="grossTotalDeductionUnderVIA"
                >
                  Deductions Chapter VIA
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="grossTotalDeductionUnderVIA"
                  autoComplete="off"
                  value={salaryDetail.grossTotalDeductionUnderVIA}
                  disabled
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => props.setTotalSalary("deductionChapter")}
                >
                  <Image
                    className=""
                    src="/images/dashboards/plus_white_icon.svg"
                    alt="plus_white_icon"
                    width={8}
                    height={16}
                  />
                </button>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="totalTaxableIncome">
                  Aggregate amount
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="aggregateAmountOfDeductions"
                  autoComplete="off"
                  disabled
                  value={salaryDetail.aggregateAmountOfDeductions}
                />
              </div>
            </div>
            <div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">&nbsp;</h6>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="totalTaxableIncome">
                  Taxable Income
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="totalTaxableIncome"
                  autoComplete="off"
                  value={salaryDetail.totalTaxableIncome}
                  disabled
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text w-50"
                  id="incomeTaxOnTotalIncomeMannualEdit"
                >
                  Income Tax (Y/N)
                </span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={salaryDetail.incomeTaxOnTotalIncomeMannualEdit}
                  onChange={(e) =>
                    handleInput("incomeTaxOnTotalIncomeMannualEdit", e)
                  }
                >
                  <option selected value={"N"}>
                    No
                  </option>
                  <option value={"Y"}>Yes</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text w-50"
                  id="incomeTaxOnTotalIncome"
                >
                  Income Tax
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="incomeTaxOnTotalIncome"
                  autoComplete="off"
                  value={salaryDetail.incomeTaxOnTotalIncome}
                  onChange={(e) =>
                    handleInput("incomeTaxOnTotalIncome", e, "float")
                  }
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="grossTotalIncome">
                  Rebate 87A (Y/N)
                </span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={salaryDetail.rebate87AMannualEdit}
                  onChange={(e) => handleInput("rebate87AMannualEdit", e)}
                >
                  <option selected value={"N"}>
                    No
                  </option>
                  <option value={"Y"}>Yes</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text w-50"
                  id="incomeTaxOnTotalIncome"
                >
                  Rebate 87A
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="rebate87A"
                  autoComplete="off"
                  value={salaryDetail.rebate87A}
                  onChange={(e) => handleInput("rebate87A", e, "float")}
                />
              </div>
            </div>
            <div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">&nbsp;</h6>
              <div className="input-group mb-3">
                <span
                  className="input-group-text w-50"
                  id="incomeTaxOnTotalIncomeAfterRebate87A"
                >
                  Tax After Rebate
                </span>
                <input
                  type="text"
                  placeholder=""
                  className={
                    salaryDetailErrors.perksError22
                      ? "form-control has-error"
                      : "form-control"
                  }
                  id="incomeTaxOnTotalIncomeAfterRebate87A"
                  autoComplete="off"
                  value={salaryDetail.incomeTaxOnTotalIncomeAfterRebate87A}
                  disabled
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="surcharge">
                  Surcharge
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="surcharge"
                  autoComplete="off"
                  value={salaryDetail.surcharge}
                  onChange={(e) => handleInput("surcharge", e, "float")}
                />
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text w-50"
                  id="healthAndEducationCess"
                >
                  Health & Edu.
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="healthAndEducationCess"
                  autoComplete="off"
                  value={salaryDetail.healthAndEducationCess}
                  onChange={(e) =>
                    handleInput("healthAndEducationCess", e, "float")
                  }
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="totalPayable">
                  Total Tax Payable
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="totalPayable"
                  autoComplete="off"
                  value={salaryDetail.totalPayable}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row bg-light-gray border border-1 rounded-3 mb-4 mt-4 g-3">
        <div className="col-md-12 bg-light-gray px-3 py-4 px-md-3 py-md-3 mt-md-0">
          <div className="row">
            <div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">
                Taxable Income & Tax Details
              </h6>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="Name">
                  Relief u/s 89
                </span>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="incomeTaxReliefUnderSection89"
                  autoComplete="off"
                  value={salaryDetail.incomeTaxReliefUnderSection89}
                  onChange={(e) =>
                    handleInput("incomeTaxReliefUnderSection89", e, "float")
                  }
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="PAN">
                  Net Tax Payable
                </span>
                <input
                  type="text"
                  placeholder=""
                  className={
                    salaryDetailErrors.perksError21
                      ? "form-control has-error"
                      : "form-control"
                  }
                  id="netTaxPayable"
                  autoComplete="off"
                  value={salaryDetail.netTaxPayable}
                  disabled
                />
              </div>
              {salaryDetail.wheatherPensioner == "No" && (
                <>
                  <div className="input-group mb-3">
                    <span className="input-group-text w-50" id="RefNo">
                      TDS(Current Emp)
                    </span>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="totalAmountofTaxDeducted"
                      autoComplete="off"
                      value={salaryDetail.totalAmountofTaxDeducted}
                      onChange={(e) =>
                        handleInput("totalAmountofTaxDeducted", e, "float")
                      }
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text w-50" id="RefNo">
                      Reported TDS/TCS
                    </span>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="reportedAmountOfTax"
                      autoComplete="off"
                      value={salaryDetail.reportedAmountOfTax}
                      onChange={(e) =>
                        handleInput("reportedAmountOfTax", e, "float")
                      }
                    />
                  </div>
                </>
              )}
            </div>
            <div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">&nbsp;</h6>
              {salaryDetail.wheatherPensioner == "No" && (
                <>
                  <div className="input-group mb-3">
                    <span className="input-group-text w-50" id="amountReported">
                      Amount Reported
                    </span>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="amountReported"
                      autoComplete="off"
                      value={salaryDetail.amountReported}
                      onChange={(e) =>
                        handleInput("amountReported", e, "float")
                      }
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text w-50" id="totalTDS">
                      Total TDS/TCS
                    </span>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="totalTDS"
                      autoComplete="off"
                      value={salaryDetail.totalTDS}
                      disabled
                    />
                  </div>
                </>
              )}

              {salaryDetail.wheatherPensioner == "No" && (
                <>
                  <div className="input-group mb-3">
                    <span className="input-group-text w-50" id="totalTDS">
                      Shortfall/Excess
                    </span>
                    <input
                      type="text"
                      placeholder=""
                      className="form-control"
                      id="shortfallExcess"
                      autoComplete="off"
                      value={salaryDetail.shortfallExcess}
                      onChange={(e) => handleInput("shortfallExcess", e, "float")}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text w-50"
                      id="wheathertaxDeductedAt"
                    >
                      Higher TDS Flag
                    </span>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      autoComplete="off"
                      value={salaryDetail.wheathertaxDeductedAt}
                      onChange={(e) => handleInput("wheathertaxDeductedAt", e)}
                    >
                      <option selected value={"N"}>
                        No
                      </option>
                      <option value={"Y"}>Yes</option>
                    </select>
                  </div>
                </>
              )}

            </div>
            {salaryDetail.wheatherPensioner == "No" && (<div className="col-md-4">
              <h6 className="text-blue fw-bold mb-3">&nbsp;</h6>
              <div className="input-group mb-3">
                <span
                  className="input-group-text w-50"
                  id="wheathertaxDeductedAt"
                >
                  Rent Exceeds 1L
                </span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={salaryDetail.wheatherRentPayment}
                  onChange={(e) => handleInput("wheatherRentPayment", e)}
                >
                  <option selected value={"N"}>
                    No
                  </option>
                  <option value={"Y"}>Yes</option>
                </select>
                {salaryDetail.wheatherRentPayment == "Y" && (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={(e) => props.setTotalSalary("landlord")}
                  >
                    <Image
                      className=""
                      src="/images/dashboards/plus_white_icon.svg"
                      alt="plus_white_icon"
                      width={8}
                      height={16}
                    />
                  </button>
                )}
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text w-50" id="wheatherInterest">
                  Interest Paid
                </span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={salaryDetail.wheatherInterest}
                  onChange={(e) => handleInput("wheatherInterest", e)}
                >
                  <option selected value={"N"}>
                    No
                  </option>
                  <option value={"Y"}>Yes</option>
                </select>
                {salaryDetail.wheatherInterest == "Y" && (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={(e) => props.setTotalSalary("lender")}
                  >
                    <Image
                      className=""
                      src="/images/dashboards/plus_white_icon.svg"
                      alt="plus_white_icon"
                      width={8}
                      height={16}
                    />
                  </button>
                )}
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text w-50"
                  id="wheatherContributions"
                >
                  Trustee Contribution
                </span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={salaryDetail.wheatherContributions}
                  onChange={(e) => handleInput("wheatherContributions", e)}
                >
                  <option selected value={"N"}>
                    No
                  </option>
                  <option value={"Y"}>Yes</option>
                </select>
                {salaryDetail.wheatherContributions == "Y" && (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={(e) => props.setTotalSalary("trustee")}
                  >
                    <Image
                      className=""
                      src="/images/dashboards/plus_white_icon.svg"
                      alt="plus_white_icon"
                      width={8}
                      height={16}
                    />
                  </button>
                )}
              </div>
            </div>)}
          </div>
        </div>
      </div>
      <SalaryModalForm
        totalSalary={props.totalSalary}
        setTotalSalary={(e) => props.setTotalSalary(e)}
        handleInput={handleInput}
        isDirty={isDirty}
        salaryDetail={salaryDetail}
        salaryDetailErrors={salaryDetailErrors}
        validateSalaryPerksDetail={props.validateSalaryPerksDetail}
      ></SalaryModalForm>
    </>
  );
}
