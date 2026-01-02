"use client";
import { CommonService } from "@/app/services/common.service";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchableDropdown from "../deductors/searchable-dropdown";

export default function EmployeeDetail(props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
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
  const {
    employeeDetail,
    handleInputEmployee,
    employeeErrors,
    isEmployeeDirty,
    enumList,
  } = props;

  function handleInput(name, e) {
    handleInputEmployee(name, e);
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
            value={employeeDetail.name}
            onChange={(e) => {
              if (CommonService.isAlphabet(e.target.value))
                handleInput("name", e);
            }}
          />
          {isEmployeeDirty && employeeErrors.employeeNameError && (
            <span className="text-danger">
              {employeeErrors.employeeNameError}
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
              employeeDetail.panNumber
                ? employeeDetail.panNumber.toUpperCase()
                : ""
            }
            onChange={(e) => {
              e.target.value = e.target.value.trim().toUpperCase();
              handleInput("panNumber", e);
            }}
          />{" "}
          {isEmployeeDirty && employeeErrors.employeePanError && (
            <span className="text-danger">
              {employeeErrors.employeePanError}
            </span>
          )}
        </div>
        <div className="col-md-3">
          <label htmlFor="employeeRef" className="form-label">
            <span>Employee Identification</span>
          </label>

          <input
            type="text"
            placeholder=""
            className="form-control"
            disabled={props?.type == "correction"}
            id="employeeRef"
            maxLength={9}
            value={employeeDetail.employeeRef}
            onChange={(e) => {
              if (CommonService.isNumeric(e.target.value))
                handleInput("employeeRef", e);
            }}
          />
          {isEmployeeDirty && employeeErrors.refError && (
            <span className="text-danger">
              {employeeErrors.refError}
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
            disabled={props?.type == "correction"}
            id="inputPANRefNo"
            value={employeeDetail.panRefNo}
            maxLength={10}
            onChange={(e) => {
              handleInput("panRefNo", e)
            }}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="fatherName" className="form-label">
            <span>Father Name</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            disabled={props?.type == "correction"}
            id="fatherName"
            value={employeeDetail.fatherName}
            onChange={(e) => handleInput("fatherName", e)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="email" className="form-label">
            <span>Email</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="form-control"
            disabled={props?.type == "correction"}
            id="email"
            value={employeeDetail.email}
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
            className="form-control"
            disabled={props?.type == "correction"}
            id="mobileNo"
            maxLength={10}
            value={employeeDetail.mobileNo}
            onChange={(e) => {
              if (CommonService.isNumeric(e.target.value)) {
                handleInput("mobileNo", e)
              }
            }
            }
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputInactiveYear" className="form-label">
            <span>DOB</span>
          </label>
          <DatePicker
            onKeyDown={(e) => e.preventDefault()}
            autoComplete="off"
            selected={employeeDetail.dob}
            id="inputDOB"
            disabled={props?.type == "correction"}
            className="form-control w-100"
            onChange={(e) => handleInput("dob", e)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/MM/yyyy"
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="sex" className="form-label">
            <span>Gender</span>
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={employeeDetail.sex}
            style={highlightStyle}
            disabled={props?.type == "correction"}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => handleInput("sex", e)}
          >
            <option selected>Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="sex" className="form-label">
            <span>Category</span>
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={employeeDetail.seniorCitizen}
            style={highlightStyle1}
            onFocus={() => setIsFocused1(true)}
            disabled={props?.type == "correction"}
            onBlur={() => setIsFocused1(false)}
            onChange={(e) => handleInput("seniorCitizen", e)}
          >
            <option selected>Select</option>
            {enumList.employeeCategory?.map((option, index) => (
              <option key={index} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="designation" className="form-label">
            <span>Designation</span>
          </label>

          <input
            type="text"
            placeholder=""
            disabled={props?.type == "correction"}
            className="form-control"
            id="designation"
            value={employeeDetail.designation}
            onChange={(e) => handleInput("designation", e)}
          />
        </div>
      </div>
      {props?.type != "correction" &&
        <div className="row bg-light-gray px-3 py-4 px-md-2 py-md-3 rounded-3 mb-4 g-3">
          <div className="col-md-12 mt-0">
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
              value={employeeDetail.flatNo}
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
              value={employeeDetail.buildingName}
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
              value={employeeDetail.areaLocality}
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
              value={employeeDetail.roadStreet}
              onChange={(e) => handleInput("roadStreet", e)}
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
              value={employeeDetail.town}
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
              value={employeeDetail.pincode}
              onChange={(e) => handleInput("pincode", e)}
            />
          </div>
          <div className="col-md-3 autowidth-dropdown">
            <label htmlFor="inputState" className="form-label">
              <span>State</span>
            </label>
            {/* <select
            className="form-select"
            aria-label="Default select example"
            value={employeeDetail.state}
            onChange={(e) => handleInput("state", e)}
            style={highlightStyle2}
            onFocus={() => setIsFocused2(true)}
            onBlur={() => setIsFocused2(false)}
          >
            <option selected>Select</option> */}
            {enumList.states && enumList.states.length > 0 && <SearchableDropdown
              setEventId={props.setState}
              id={props.state}
              options={enumList.states}
            ></SearchableDropdown>}
            {/* </select> */}
          </div>
        </div>
      }
      <div className="row">
        <div className="col-md-12 px-0 d-flex justify-content-start">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => props.handleSaveEmployee(e)}
          >
            Save Employee
          </button>
        </div>
      </div>
    </>
  );
}
