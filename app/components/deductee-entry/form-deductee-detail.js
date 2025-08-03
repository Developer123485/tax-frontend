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
import SearchableDropdown from "../deductors/searchable-dropdown";

export default function DeducteeFormEntryDetail(props) {
  const router = useRouter(null);
  const [sectionCodeList, setSectionCodeList] = useState([]);
  const [reasonsList, setReasonsList] = useState([]);

  const {
    challanDropdowns,
    deducteeEntry,
    enumList,
    deducteeEntryErrors,
    deducteeDropdowns,
    isDirty,
    form,
  } = props;

  useEffect(() => {
    getApplicableRate();
  }, [deducteeEntry.tdsRate, deducteeEntry.scRate, deducteeEntry.hecRate]);

  useEffect(() => {
    if (form == "form-26Q") {
      setSectionCodeList(enumList.sections26Q);
      setReasonsList(enumList.reasons26Q);
    }
    if (form == "form-27Q") {
      setSectionCodeList(enumList.sections27Q);
      setReasonsList(enumList.reasons27Q);
    }
    if (form == "form-27EQ") {
      setSectionCodeList(enumList.sections27EQ);
      setReasonsList(enumList.reasons27EQ);
    }
    if (form == "form-24Q") {
      setSectionCodeList(enumList.sections24Q);
      setReasonsList(enumList.reasons24Q);
    }
  }, []);

  function handleInput(name, e) {
    props.handleInput(name, e);
  }

  function getApplicableRate() {
    let value =
      deducteeEntry.tdsRate > 0 ? parseFloat(deducteeEntry.tdsRate) : 0;
    const surchargeRateValue =
      deducteeEntry.scRate > 0 ? parseFloat(deducteeEntry.scRate) : 0;
    const healthCessRateValue =
      deducteeEntry.hecRate > 0 ? parseFloat(deducteeEntry.hecRate) : 0;
    if (value > 0) {
      if (surchargeRateValue > 0) {
        value = (value * surchargeRateValue) / 100 + value;
      }
      if (healthCessRateValue > 0) {
        value = (value * healthCessRateValue) / 100 + value;
      }
    }
    props.setRateApplicable(value?.toFixed(4));
    return value;
  }

  return (
    <>
      <div className="row row d-flex g-3">
        <div className="col-md-6">
          <label htmlFor="inputCountry" className="form-label">
            <span>Section</span>
            <span className="text-danger"> *</span>
          </label>
          {sectionCodeList && sectionCodeList.length > 0 && <SearchableDropdown
            setEventId={props.setSectionCode}
            id={props.deducteeEntry.sectionCode}
            options={sectionCodeList}
          ></SearchableDropdown>
          }
          {isDirty && deducteeEntryErrors.sectionCodeError && (
            <span className="text-danger">
              {deducteeEntryErrors.sectionCodeError}
            </span>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCountry" className="form-label">
            <span>Challan Voucher/Amount/Challan Date</span>
            <span className="text-danger"> *</span>
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            autoComplete="off"
            value={deducteeEntry.challanId}
            onChange={(e) => handleInput("challanId", e)}
          >
            <option value={""}>Select Challan</option>
            {challanDropdowns &&
              challanDropdowns.map((res, index) => (
                <option key={index} value={res.id}>
                  {res.name}
                </option>
              ))}
          </select>
          {isDirty && deducteeEntryErrors.challanVoucherError && (
            <span className="text-danger">
              {deducteeEntryErrors.challanVoucherError}
            </span>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="inputCountry" className="form-label">
            <span>{form === "form-24Q" ? "Employee" : "Deductee"} Detail</span>
            <span className="text-danger"> *</span>
          </label>
          <div className="d-flex align-items-center">
            {deducteeDropdowns && deducteeDropdowns.length > 0 && <SearchableDropdown
              setEventId={props.setDeducteeId}
              id={props.deducteeEntry.deducteeId}
              options={deducteeDropdowns}
            ></SearchableDropdown>}
            <button
              type="button"
              className="btn btn-primary w-100 ms-3"
              onClick={(e) =>
                router.push(
                  `/deductors/${props.deductorId}/tds/deductees/detail`
                )
              }
            >
              Add
            </button>
          </div>
          <div className="">
            {isDirty && deducteeEntryErrors.nameError && (
              <span className="text-danger">
                {deducteeEntryErrors.nameError}
              </span>
            )}
          </div>
        </div>
        {/* <div className="col-md-3">
          <label htmlFor="inputDeductees" className="form-label">
            <span>Deductee Name</span>
            <span className="text-danger"> *</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            id="inputDeductees"
            maxLength={"50"}
            autoComplete="off"
            value={deducteeEntry.nameOfDeductee}
            onChange={(e) => handleInput("nameOfDeductee", e)}
          />
          {isDirty && deducteeEntryErrors.nameError && (
            <span className="text-danger">{deducteeEntryErrors.nameError}</span>
          )}
        </div>
        <div className="col-md-3">
          <label htmlFor="inputPANNo" className="form-label">
            <span>PAN No.</span>
            <span className="text-danger"> *</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            id="inputPANNo"
            maxLength={"10"}
            autoComplete="off"
            value={
              deducteeEntry.panOfDeductee
                ? deducteeEntry.panOfDeductee.toUpperCase()
                : ""
            }
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase();
              handleInput("panOfDeductee", e);
            }}
          />
          {isDirty && deducteeEntryErrors.panError && (
            <span className="text-danger">{deducteeEntryErrors.panError}</span>
          )}
        </div>
        <div className="col-md-3">
          <label htmlFor="deducteeRef" className="form-label">
            <span>Deductee Ref No.</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            id="deducteeRef"
            maxLength={"10"}
            autoComplete="off"
            value={deducteeEntry.deducteeRef}
            onChange={(e) => handleInput("deducteeRef", e)}
          />
        </div> */}
        <div className="col-md-6">
          <label htmlFor="inputReason" className="form-label">
            <span>Reason for Deductions</span>
          </label>
          {reasonsList && reasonsList.length > 0 && <SearchableDropdown
            setEventId={props.setReasons}
            id={props.deducteeEntry.reasons}
            options={reasonsList}
          ></SearchableDropdown>}
          {isDirty && deducteeEntryErrors.reasonsError && (
            <span className="text-danger">
              {deducteeEntryErrors.reasonsError}
            </span>
          )}
        </div>
        {(form === "form-27Q" || form === "form-27EQ") && (
          <div className="col-md-3">
            <label htmlFor="Opting" className="form-label">
              <span>Opting for regime u/s 115BAC(1A)</span>
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              autoComplete="off"
              value={deducteeEntry.optingForRegime}
              onChange={(e) => handleInput("optingForRegime", e)}
            >
              <option selected value={"No"}>
                No
              </option>
              <option value={"Yes"}>Yes</option>
            </select>
          </div>
        )}
        {(form === "form-27Q") && (
          <>
            <div className="col-md-3">
              <label htmlFor="Opting" className="form-label">
                <span>Grossing Up Indicator</span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                autoComplete="off"
                value={deducteeEntry.grossingUp}
                onChange={(e) => handleInput("grossingUp", e)}
              >
                <option selected value={"No"}>
                  No
                </option>
                <option value={"Yes"}>Yes</option>
              </select>
            </div>

            <div className="col-md-3">
              <label htmlFor="acknowledgement" className="form-label">
                <span>Acknowledgment</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="acknowledgement"
                maxLength={"20"}
                autoComplete="off"
                value={deducteeEntry.acknowledgement}
                onChange={(e) => handleInput("acknowledgement", e)}
              />
            </div>
          </>
        )}
        {form === "form-27EQ" && (
          <>
            <div className="col-md-3">
              <label htmlFor="noNResident" className="form-label">
                <span>Non-Resident</span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                autoComplete="off"
                value={deducteeEntry.noNResident}
                onChange={(e) => handleInput("noNResident", e)}
              >
                <option selected value={"No"}>
                  No
                </option>
                <option value={"Yes"}>Yes</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="permanentlyEstablished" className="form-label">
                <span>Permanently Established</span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                autoComplete="off"
                value={deducteeEntry.permanentlyEstablished}
                onChange={(e) => handleInput("permanentlyEstablished", e)}
              >
                <option selected value={"No"}>
                  No
                </option>
                <option value={"Yes"}>Yes</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="paymentCovered" className="form-label">
                <span>Payment Covered</span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                autoComplete="off"
                value={deducteeEntry.paymentCovered}
                onChange={(e) => handleInput("paymentCovered", e)}
              >
                <option selected value={"No"}>
                  No
                </option>
                <option value={"Yes"}>Yes</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="challanNumber" className="form-label">
                <span>Challan No.</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="challanNumber"
                maxLength={"50"}
                autoComplete="off"
                value={deducteeEntry.challanNumber}
                onChange={(e) => handleInput("challanNumber", e)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="challanDate" className="form-label">
                <span>Challan Date</span>
              </label>
              <div>
                <DatePicker
                  autoComplete="off"
                  selected={deducteeEntry.challanDate}
                  id="challanDate"
                  className="form-control w-100"
                  onChange={(e) => handleInput("challanDate", e)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                />
              </div>
            </div>
          </>
        )}

        {form === "form-27Q" && (
          <>
            <div className="col-md-6">
              <label htmlFor="remittance" className="form-label">
                <span>Remittance code</span>
              </label>
              {enumList.natures && enumList.natures.length > 0 && <SearchableDropdown
                setEventId={props.setNatures}
                id={props.deducteeEntry.remettanceCode}
                options={enumList.natures}
              ></SearchableDropdown>}
            </div>
            <div className="col-md-6">
              <label htmlFor="remittance" className="form-label">
                <span>Country</span>
              </label>
              {enumList.countries && enumList.countries.length > 0 && <SearchableDropdown
                setEventId={props.setCountry}
                id={props.deducteeEntry.countryCode}
                options={enumList.countries}
              ></SearchableDropdown>}
            </div>
            {/* <div className="col-md-3">
              <label htmlFor="email" className="form-label">
                <span>Email</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="email"
                maxLength={"50"}
                autoComplete="off"
                value={deducteeEntry.email}
                onChange={(e) => handleInput("email", e)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="contactNo" className="form-label">
                <span>Contact No.</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="contactNo"
                maxLength={"50"}
                autoComplete="off"
                value={deducteeEntry.contactNo}
                onChange={(e) => handleInput("contactNo", e)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="address" className="form-label">
                <span>Address</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="address"
                maxLength={"50"}
                autoComplete="off"
                value={deducteeEntry.address}
                onChange={(e) => handleInput("address", e)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="taxIdentificationNo" className="form-label">
                <span>Tax Identification No.</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="taxIdentificationNo"
                maxLength={"50"}
                autoComplete="off"
                value={deducteeEntry.taxIdentificationNo}
                onChange={(e) => handleInput("taxIdentificationNo", e)}
              />
            </div> */}
            <div className="col-md-3">
              <label htmlFor="tdsRateAct" className="form-label">
                <span>TDS Rate Act.</span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                autoComplete="off"
                value={deducteeEntry.tdsRateAct}
                onChange={(e) => handleInput("tdsRateAct", e)}
              >
                <option selected>Select TDS Rate</option>
                {enumList.tdsRates?.map((option, index) => (
                  <option key={index} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="col-md-3">
          <label htmlFor="inputDateofPayment" className="form-label">
            <span>Date of Payment/Credit</span>
            <span className="text-danger"> *</span>
          </label>
          <div>
            <DatePicker
              autoComplete="off"
              selected={deducteeEntry.dateOfPaymentCredit}
              id="inputDateofPayment"
              className="form-control w-100"
              onChange={(e) => handleInput("dateOfPaymentCredit", e)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/MM/yyyy"
            />
            {isDirty && deducteeEntryErrors.datePaymentError && (
              <span className="text-danger">
                {deducteeEntryErrors.datePaymentError}
              </span>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="inputDateofDeduction" className="form-label">
            <span>Date of Deduction</span>
          </label>
          <div>
            <DatePicker
              autoComplete="off"
              selected={deducteeEntry.dateOfDeduction}
              id="inputDateofDeduction"
              className="form-control w-100"
              disabled={props.isDisable}
              onChange={(e) => handleInput("dateOfDeduction", e)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/MM/yyyy"
            />
            {isDirty && deducteeEntryErrors.dateDeductionError && (
              <span className="text-danger">
                {deducteeEntryErrors.dateDeductionError}
              </span>
            )}
          </div>
        </div>

        <div className="col-md-3">
          <label htmlFor="inputLowerDeductionCert" className="form-label">
            <span>Certification No.</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            id="inputLowerDeductionCert"
            maxLength={"10"}
            autoComplete="off"
            value={deducteeEntry.certificationNo}
            onChange={(e) => handleInput("certificationNo", e)}
          />
          {isDirty && deducteeEntryErrors.certificateError && (
            <span className="text-danger">
              {deducteeEntryErrors.certificateError}
            </span>
          )}
        </div>
        <div className="col-md-3">
          <label htmlFor="inputAmountPaid" className="form-label">
            <span>Amount Paid/Credited</span>
            <span className="text-danger"> *</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            id="inputAmountPaid"
            value={deducteeEntry.amountPaidCredited}
            onChange={(e) => {
              if (CommonService.isNumeric(e.target.value)) {
                handleInput("amountPaidCredited", e);
              }
            }}
          />
          {isDirty && deducteeEntryErrors.amountCreditedError && (
            <span className="text-danger">
              {deducteeEntryErrors.amountCreditedError}
            </span>
          )}
        </div>
        {form === "27EQ" && (
          <div className="col-md-3">
            <label htmlFor="totalValueOfTheTransaction" className="form-label">
              <span>Total Value of the tranaction</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              id="totalValueOfTheTransaction"
              value={deducteeEntry.totalValueOfTheTransaction}
              onChange={(e) => {
                if (CommonService.isNumeric(e.target.value)) {

                  handleInput("totalValueOfTheTransaction", e);
                }
              }}
            />
          </div>
        )}
        <div className="col-md-3">
          <label htmlFor="tds" className="form-label">
            <span>TDS</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            id="tds"
            disabled={props.isDisable}
            value={deducteeEntry.tds}
            onChange={(e) => {
              if (CommonService.isNumeric(e.target.value)) {
                handleInput("tds", e);
              }
            }}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputSurcharge" className="form-label">
            <span>Surcharge</span>
          </label>

          <input
            type="text"
            placeholder=""
            className="form-control"
            disabled={props.isDisable}
            id="inputSurcharge"
            value={deducteeEntry.surcharge}
            onChange={(e) => {
              if (CommonService.isNumeric(e.target.value)) {
                handleInput("surcharge", e);
              }
            }}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputHealthEducationCess" className="form-label">
            <span>Health and Education Cess</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            id="inputHealthEducationCess"
            disabled={props.isDisable}
            value={deducteeEntry.healthEducationCess}
            onChange={(e) => {
              if (CommonService.isNumeric(e.target.value)) {
                handleInput("healthEducationCess", e);
              }
            }}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputTotalTaxDeducted" className="form-label">
            <span>Total Tax Deducted</span>
          </label>

          <input
            type="text"
            placeholder=""
            className="form-control"
            id="inputTotalTaxDeducted"
            value={deducteeEntry.totalTaxDeducted}
            disabled
            onChange={(e) => {
              if (CommonService.isNumeric(e.target.value)) {
                handleInput("totalTaxDeducted", e);
              }
            }}
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="inputTotalTaxDeposited" className="form-label">
            <span>Total Tax Deposited</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            id="inputTotalTaxDeposited"
            value={deducteeEntry.totalTaxDeposited}
            disabled
            onChange={(e) => {
              if (CommonService.isNumeric(e.target.value)) {
                handleInput("totalTaxDeposited", e);
              }
            }}
          />
        </div>
        {deducteeEntry.sectionCode === "94N" && (
          <div className="col-md-3">
            <label htmlFor="fourNinteenA" className="form-label">
              {form === "26Q" && <span>Amount Excess 1Cr - Sec194N(419A)</span>}
              {form === "27Q" && <span>Amount Excess 1Cr - Sec194N(720A)</span>}
            </label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              id="fourNinteenA"
              value={deducteeEntry.fourNinteenA}
              onChange={(e) => {
                if (CommonService.isNumeric(e.target.value)) {
                  handleInput("fourNinteenA", e);
                }
              }}
            />
            {isDirty && deducteeEntryErrors.fourNinteenAError && (
              <span className="text-danger">
                {deducteeEntryErrors.fourNinteenAError}
              </span>
            )}
          </div>
        )}
        {deducteeEntry.sectionCode === "4NF" && (
          <>
            <div className="col-md-3">
              <label htmlFor="fourNinteenB" className="form-label">
                <span>Cash Withdrawal in exc. Of Rs. 20L-1Cr</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="fourNinteenB"
                value={deducteeEntry.fourNinteenB}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value)) {
                    handleInput("fourNinteenB", e);
                  }
                }}
              />
              {isDirty && deducteeEntryErrors.fourNinteenBError && (
                <span className="text-danger">
                  {deducteeEntryErrors.fourNinteenBError}
                </span>
              )}
            </div>
            <div className="col-md-3">
              <label htmlFor="fourNinteenC" className="form-label">
                <span>Cash Withdrawal in exc. Of Rs. 1Cr</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="fourNinteenC"
                value={deducteeEntry.fourNinteenC}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value)) {
                    handleInput("fourNinteenC", e);
                  }
                }}
              />
              {isDirty && deducteeEntryErrors.fourNinteenCError && (
                <span className="text-danger">
                  {deducteeEntryErrors.fourNinteenCError}
                </span>
              )}
            </div>
          </>
        )}
        {deducteeEntry.sectionCode === "4NC" && (
          <div className="col-md-3">
            <label htmlFor="fourNinteenD" className="form-label">
              <span>Cash Withdrawal in exc. Of Rs. 3Cr</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              id="fourNinteenD"
              value={deducteeEntry.fourNinteenD}
              onChange={(e) => {
                if (CommonService.isNumeric(e.target.value)) {
                  handleInput("fourNinteenD", e);
                }
              }}
            />
            {isDirty && deducteeEntryErrors.fourNinteenDError && (
              <span className="text-danger">
                {deducteeEntryErrors.fourNinteenDError}
              </span>
            )}
          </div>
        )}
        {deducteeEntry.sectionCode === "9FT" && (
          <>
            <div className="col-md-3">
              <label htmlFor="fourNinteenE" className="form-label">
                <span>Cash Withdrawal in exc. Of Rs. 20L-3Cr</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="fourNinteenE"
                value={deducteeEntry.fourNinteenE}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value)) {
                    handleInput("fourNinteenE", e);
                  }
                }}
              />
              {isDirty && deducteeEntryErrors.fourNinteenEError && (
                <span className="text-danger">
                  {deducteeEntryErrors.fourNinteenEError}
                </span>
              )}
            </div>
            <div className="col-md-3">
              <label htmlFor="fourNinteenF" className="form-label">
                <span>Cash Withdrawal in exc. Of Rs. 3Cr</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="fourNinteenF"
                value={deducteeEntry.fourNinteenF}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value)) {
                    handleInput("fourNinteenF", e);
                  }
                }}
              />
              {isDirty && deducteeEntryErrors.fourNinteenFError && (
                <span className="text-danger">
                  {deducteeEntryErrors.fourNinteenFError}
                </span>
              )}
            </div>
          </>
        )}
        {form !== "form-24Q" &&
          <div className="row mt-3">
            <div className="col-md-3">
              <label htmlFor="tdsRate" className="form-label">
                <span>TDS Rate</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="tdsRate"
                value={deducteeEntry.tdsRate}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value)) {
                    handleInput("tdsRate", e);
                  }
                }}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="scRate" className="form-label">
                <span>SC Rate</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="scRate"
                value={deducteeEntry.scRate}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value)) {
                    handleInput("scRate", e);
                  }
                }}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="hecRate" className="form-label">
                <span>HEC Rate</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="hecRate"
                value={deducteeEntry.hecRate}
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value)) {
                    handleInput("hecRate", e);
                  }
                }}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="rateAtWhich" className="form-label">
                <span>Rate At which deducted</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="rateAtWhich"
                value={deducteeEntry.rateAtWhichTax}
                disabled
                onChange={(e) => {
                  if (CommonService.isNumeric(e.target.value)) {
                    handleInput("rateAtWhichTax", e);
                  }
                }}
              />
            </div>
          </div>}

        <div className="col-md-12 d-flex justify-content-start">
          <button
            type="button"
            className="btn btn-primary me-3"
            onClick={(e) => props.saveDeductee(e)}
          >
            Save
          </button>
          {/* <button type="button" className="btn btn-outline-primary">
            Cancel
          </button> */}
        </div>
      </div>
    </>
  );
}
