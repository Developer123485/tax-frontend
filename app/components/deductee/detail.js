"use client";
import { CommonService } from "@/app/services/common.service";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchableDropdown from "../deductors/searchable-dropdown";

export default function DeducteeDetail(props) {

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [isFocused5, setIsFocused5] = useState(false);
  const [isFocused6, setIsFocused6] = useState(false);

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

  const highlightStyle2 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused2 ? "#007bff" : "#ccc",
    boxShadow: isFocused2 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

  const highlightStyle3 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused3 ? "#007bff" : "#ccc",
    boxShadow: isFocused3 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

  const highlightStyle4 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused4 ? "#007bff" : "#ccc",
    boxShadow: isFocused4 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

  const highlightStyle5 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused5 ? "#007bff" : "#ccc",
    boxShadow: isFocused5 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };

  const highlightStyle6 = {
    padding: "8px",
    border: "1px solid",
    borderColor: isFocused6 ? "#007bff" : "#ccc",
    boxShadow: isFocused6 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };
  const {
    deducteeDetail,
    enumList,
    handleInputDeductee,
    deducteeErrors,
    isDeducteeDirty,
  } = props;

  function handleInput(name, e) {
    handleInputDeductee(name, e);
  }

  return (
    <>
      <div className="row align-items-start bg-light-gray px-3 py-4 px-md-2 pt-0 pb-md-3 rounded-3 mb-4 mt-0 g-3">
        <div className="col-md-3">
          <label htmlFor="inputName" className="form-label">
            <span>Name</span>
            <span className="text-danger"> *</span>
          </label>

          <input
            type="text"
            placeholder=""
            className="form-control"
            id="inputName"
            value={deducteeDetail.name}
            onChange={(e) => {
              if (CommonService.isAlphabet(e.target.value))
                handleInput("name", e);
            }}
          />
          {isDeducteeDirty && deducteeErrors.deducteeNameError && (
            <span className="text-danger">
              {deducteeErrors.deducteeNameError}
            </span>
          )}
        </div>
        <div className="col-md-3">
          <label htmlFor="inputPan" className="form-label">
            <span>PAN No.</span>
            <span className="text-danger"> *</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            id="inputPan"
            maxLength={10}
            value={
              deducteeDetail.panNumber
                ? deducteeDetail.panNumber.toUpperCase()
                : ""
            }
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase();
              handleInput("panNumber", e);
            }}
          />
          {isDeducteeDirty && deducteeErrors.deducteePanError && (
            <span className="text-danger">
              {deducteeErrors.deducteePanError}
            </span>
          )}
        </div>
        <div className="col-md-3">
          <label htmlFor="inputPANRefNo" className="form-label">
            <span>PAN Ref No.</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            id="inputPANRefNo"
            disabled={props?.type == "correction"}
            maxLength={9}
            value={deducteeDetail.panRefNo}
            onChange={(e) => handleInput("panRefNo", e)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputIdentificationNumber" className="form-label">
            <span>Identification Number</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            disabled={props?.type == "correction"}
            id="inputIdentificationNumber"
            value={deducteeDetail.identificationNo}
            onChange={(e) => handleInput("identificationNo", e)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputStatus" className="form-label">
            <span>Status</span>
            <span className="text-danger"> *</span>
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            style={highlightStyle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={deducteeDetail.status}
            onChange={(e) => handleInput("status", e)}
          >
            <option selected>Select Status</option>
            {enumList.deductee27EQAnd27Q?.map((option, index) => (
              <option key={index} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
          {isDeducteeDirty && deducteeErrors.deducteeStatusError && (
            <span className="text-danger">
              {deducteeErrors.deducteeStatusError}
            </span>
          )}
        </div>

        <div className="col-md-3">
          <label htmlFor="inputStatus" className="form-label">
            <span>Surcharge Applicable</span>
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            style={highlightStyle1}
            disabled={props?.type == "correction"}
            onFocus={() => setIsFocused1(true)}
            onBlur={() => setIsFocused1(false)}
            value={deducteeDetail.surchargeApplicable}
            onChange={(e) => handleInput("surchargeApplicable", e)}
          >
            <option selected>Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="inputStatus" className="form-label">
            <span>Residential Status</span>
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={deducteeDetail.residentialStatus}
            disabled={props?.type == "correction"}
            style={highlightStyle2}
            onFocus={() => setIsFocused2(true)}
            onBlur={() => setIsFocused2(false)}
            onChange={(e) => handleInput("residentialStatus", e)}
          >
            <option selected>Select</option>
            <option value="Resident">Resident</option>
            <option value="Non Resident">Non Resident</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="email" className="form-label">
            <span>Email</span>
          </label>
          <input
            type="text"
            placeholder=""
            disabled={props?.type == "correction"}
            className="form-control"
            id="email"
            value={deducteeDetail.email}
            onChange={(e) => handleInput("email", e)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="mobileNo" className="form-label">
            <span>Mobile No</span>
          </label>
          <input
            type="text"
            placeholder=""
            disabled={props?.type == "correction"}
            className="form-control"
            id="mobileNo"
            maxLength={10}
            value={deducteeDetail.mobileNo}
            onChange={(e) => {
              if (CommonService.isNumeric(e.target.value)) {
                handleInput("mobileNo", e)
              }
            }}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="stdCode" className="form-label">
            <span>STD Code</span>
          </label>
          <input
            disabled={props?.type == "correction"}
            type="text"
            placeholder=""
            className="form-control"
            id="stdCode"
            value={deducteeDetail.stdCode}
            onChange={(e) => handleInput("stdCode", e)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="phoneNo" className="form-label">
            <span>Phone Number</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            disabled={props?.type == "correction"}
            id="phoneNo"
            value={deducteeDetail.phoneNo}
            onChange={(e) => handleInput("phoneNo", e)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="principle" className="form-label">
            <span>Principal Place of Business</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            disabled={props?.type == "correction"}
            id="principle"
            value={deducteeDetail.principlePlacesBusiness}
            onChange={(e) => handleInput("principlePlacesBusiness", e)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="firmName" className="form-label">
            <span>Firm Name</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            disabled={props?.type == "correction"}
            id="firmName"
            value={deducteeDetail.firmName}
            onChange={(e) => handleInput("firmName", e)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="tinNo" className="form-label">
            <span>Tax Identification Number</span>
          </label>
          <input
            type="text"
            placeholder=""
            disabled={props?.type == "correction"}
            className="form-control"
            id="tinNo"
            value={deducteeDetail.tinNo}
            onChange={(e) => handleInput("tinNo", e)}
          />
          {isDeducteeDirty && deducteeErrors.tinError && (
            <span className="text-danger">
              {deducteeErrors.tinError}
            </span>
          )}
        </div>

        <div className="col-md-3">
          <label htmlFor="inputStatus" className="form-label">
            <span>Whether Transporter</span>
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={deducteeDetail.transporter}
            style={highlightStyle4}
            onFocus={() => setIsFocused4(true)}
            disabled={props?.type == "correction"}
            onBlur={() => setIsFocused4(false)}
            onChange={(e) => handleInput("transporter", e)}
          >
            <option selected>Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      {props?.type != "correction" &&
        <div className="row align-items-start bg-light-gray px-3 py-4 px-md-2 pt-0 pb-md-3 rounded-3 mb-4 mt-0 g-3">
          <div className="col-md-12">
            <h5 className="text-blue fw-bold">Address</h5>
          </div>
          <div className="col-md-3">
            <label htmlFor="inputCodeNo" className="form-label">
              <span>Flat/Block No.</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              id="inputFlatNo"
              value={deducteeDetail.flatNo}
              onChange={(e) => handleInput("flatNo", e)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputName" className="form-label">
              <span>Building Name</span>
            </label>

            <input
              type="text"
              placeholder=""
              className="form-control"
              id="inputBuildingName"
              value={deducteeDetail.buildingName}
              onChange={(e) => handleInput("buildingName", e)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputArea" className="form-label">
              <span>Area/Locality</span>
            </label>

            <input
              type="text"
              placeholder=""
              className="form-control"
              id="inputArea"
              value={deducteeDetail.areaLocality}
              onChange={(e) => handleInput("areaLocality", e)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputRoad" className="form-label">
              <span>Road/Street</span>
            </label>

            <input
              type="text"
              placeholder=""
              className="form-control"
              id="inputRoad"
              value={deducteeDetail.roadStreet}
              onChange={(e) => handleInput("roadStreet", e)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="postOffice" className="form-label">
              <span>Post Office</span>
            </label>

            <input
              type="text"
              placeholder=""
              className="form-control"
              id="postOffice"
              value={deducteeDetail.postOffice}
              onChange={(e) => handleInput("postOffice", e)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="locality" className="form-label">
              <span>Locality</span>
            </label>

            <input
              type="text"
              placeholder=""
              className="form-control"
              id="locality"
              value={deducteeDetail.locality}
              onChange={(e) => handleInput("locality", e)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputTown" className="form-label">
              <span>Town/City/District</span>
            </label>

            <input
              type="text"
              placeholder=""
              className="form-control"
              id="inputTown"
              value={deducteeDetail.town}
              onChange={(e) => handleInput("town", e)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputPincode" className="form-label">
              <span>Pincode</span>
            </label>

            <input
              type="text"
              placeholder=""
              className="form-control"
              id="inputPincode"
              value={deducteeDetail.pincode}
              onChange={(e) => handleInput("pincode", e)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="zipCode" className="form-label">
              <span>Zip Code</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              id="zipCode"
              value={deducteeDetail.zipCodeCase}
              onChange={(e) => handleInput("zipCodeCase", e)}
            />
            {isDeducteeDirty && deducteeErrors.zipError && (
              <span className="text-danger">
                {deducteeErrors.zipError}
              </span>
            )}
          </div>

          <div className="col-md-3 autowidth-dropdown">
            <label htmlFor="inputCountry" className="form-label">
              <span>Country</span>
            </label>
            {enumList.countries && enumList.countries.length > 0 && <SearchableDropdown
              setEventId={props.setCountry}
              id={props.country}
              options={enumList.countries}
            ></SearchableDropdown>}
            {/* <select
            className="form-select"
            aria-label="Default select example"
            value={deducteeDetail.country}
            style={highlightStyle5}
            onFocus={() => setIsFocused5(true)}
            onBlur={() => setIsFocused5(false)}
            onChange={(e) => handleInput("country", e)}
          >
            <option selected>Select</option>
            {enumList.countries?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.value}
              </option>
            ))}
          </select> */}
            {isDeducteeDirty && deducteeErrors.countryError && (
              <span className="text-danger">
                {deducteeErrors.countryError}
              </span>
            )}
          </div>

          <div className="col-md-3 autowidth-dropdown">
            <label htmlFor="inputState" className="form-label">
              <span>State</span>
            </label>
            {enumList.states && enumList.states.length > 0 && <SearchableDropdown
              setEventId={props.setState}
              id={props.state}
              options={enumList.states}
            ></SearchableDropdown>}
            {/* <select
            className="form-select"
            aria-label="Default select example"
            value={deducteeDetail.state}
            style={highlightStyle6}
            onFocus={() => setIsFocused6(true)}
            onBlur={() => setIsFocused6(false)}
            onChange={(e) => handleInput("state", e)}
          >
            <option selected>Select</option>
            {enumList.states?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.value}
              </option>
            ))}
          </select> */}
          </div>
        </div>
      }
      <div className="row">
        <div className="col-md-12 px-0 d-flex justify-content-start">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => props.handleSaveDeductee(e)}
          >
            Save Deductee
          </button>
        </div>
      </div>
    </>
  );
}
