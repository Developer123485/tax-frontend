"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProcessPopup from "../../modals/processing";
import { CommonService } from "@/app/services/common.service";

export default function RemitterDetail(props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

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

  const router = useRouter(null);
  const {
    enumList,
    handleInputRemitter,
    remitterDetail,
    remitterErrors,
    isNextDirty,
  } = props;

  function handleInput(name, e) {
    handleInputRemitter(name, e);
  }

  return (
    <>
      {enumList && (
        <form autoComplete="off">
          <div>
            <div className="row bg-light-gray px-3 py-4 px-md-2 py-md-3 rounded-3 mb-4 g-3">
              <div className="col-md-12 mt-0">
                <h5 className="text-blue fw-bold">Remitter Details</h5>
              </div>

              {/* TAN */}
              <div className="col-md-3">
                <label htmlFor="inputTANNo" className="form-label">
                  <span>TAN</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={10}
                  value={
                    remitterDetail.remitterTan
                      ? remitterDetail.remitterTan.toUpperCase()
                      : ""
                  }
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleInput("remitterTan", e);
                  }}
                />
                {isNextDirty && remitterErrors.remitterTanError && (
                  <span className="text-danger">
                    {remitterErrors.remitterTanError}
                  </span>
                )}
              </div>

              {/* PAN */}
              <div className="col-md-3">
                <label htmlFor="inputPANNo" className="form-label">
                  <span>PAN</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={10}
                  value={
                    remitterDetail.remitterPan
                      ? remitterDetail.remitterPan.toUpperCase()
                      : ""
                  }
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleInput("remitterPan", e);
                  }}
                />
                {isNextDirty && remitterErrors.remitterPanError && (
                  <span className="text-danger">
                    {remitterErrors.remitterPanError}
                  </span>
                )}
              </div>

              {/* Name */}
              <div className="col-md-3">
                <label className="form-label">
                  <span>Remitter Name</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={75}
                  value={remitterDetail.name}
                  onChange={(e) => handleInput("name", e)}
                />
                {isNextDirty && remitterErrors.remitterNameError && (
                  <span className="text-danger">
                    {remitterErrors.remitterNameError}
                  </span>
                )}
              </div>

              {/* Flat */}
              <div className="col-md-3">
                <label className="form-label">
                  <span>Flat/Block No.</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={25}
                  value={remitterDetail.remitterFlat}
                  onChange={(e) => handleInput("remitterFlat", e)}
                />
                {isNextDirty && remitterErrors.remitterFlatNoError && (
                  <span className="text-danger">
                    {remitterErrors.remitterFlatNoError}
                  </span>
                )}
              </div>

              {/* Building */}
              <div className="col-md-3">
                <label className="form-label">Building Name</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={25}
                  value={remitterDetail.remitterBuilding}
                  onChange={(e) =>
                    handleInput("remitterBuilding", e)
                  }
                />
                {isNextDirty && remitterErrors.remitterBuildingNameError && (
                  <span className="text-danger">
                    {remitterErrors.remitterBuildingNameError}
                  </span>
                )}
              </div>

              {/* Street */}
              <div className="col-md-3">
                <label className="form-label">Road/Street</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={25}
                  value={remitterDetail.remitterStreet}
                  onChange={(e) => handleInput("remitterStreet", e)}
                />
                {isNextDirty && remitterErrors.remitterStreetError && (
                  <span className="text-danger">
                    {remitterErrors.remitterStreetError}
                  </span>
                )}
              </div>

              {/* State */}
              <div className="col-md-3">
                <label className="form-label">
                  <span>State</span>
                  <span className="text-danger"> *</span>
                </label>
                <select
                  className="form-select"
                  style={highlightStyle1}
                  onFocus={() => setIsFocused1(true)}
                  onBlur={() => setIsFocused1(false)}
                  value={remitterDetail.remitterState}
                  onChange={(e) => handleInput("remitterState", e)}
                >
                  <option value={""}>Select State</option>
                  {enumList.states
                    ?.filter((p) => p.value !== "OVERSEAS")
                    ?.map((option, index) => (
                      <option key={index} value={option.key}>
                        {option.value}
                      </option>
                    ))}
                </select>
                {isNextDirty && remitterErrors.remitterStateError && (
                  <span className="text-danger">
                    {remitterErrors.remitterStateError}
                  </span>
                )}
              </div>

              {/* Area */}
              <div className="col-md-3">
                <label className="form-label">Area/Locality</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={25}
                  value={remitterDetail.remitterArea}
                  onChange={(e) => handleInput("remitterArea", e)}
                />
                {isNextDirty && remitterErrors.remitterAreaError && (
                  <span className="text-danger">
                    {remitterErrors.remitterAreaError}
                  </span>
                )}
              </div>

              {/* City */}
              <div className="col-md-3">
                <label className="form-label">Town/City/District</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={25}
                  value={remitterDetail.remitterCity}
                  onChange={(e) => handleInput("remitterCity", e)}
                />
                {isNextDirty && remitterErrors.remitterDistrictError && (
                  <span className="text-danger">
                    {remitterErrors.remitterDistrictError}
                  </span>
                )}
              </div>

              {/* Pincode */}
              <div className="col-md-3">
                <label className="form-label">
                  Pincode <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={6}
                  value={remitterDetail.remitterPincode}
                  onChange={(e) => {
                    if (CommonService.isNumeric(e.target.value))
                      handleInput("remitterPincode", e);
                  }}
                />
                {isNextDirty && remitterErrors.remitterPincodeError && (
                  <span className="text-danger">
                    {remitterErrors.remitterPincodeError}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="col-md-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  maxLength={50}
                  value={remitterDetail.remitterEmail}
                  onChange={(e) => handleInput("remitterEmail", e)}
                />
                {isNextDirty && remitterErrors.remitterEmailIdError && (
                  <span className="text-danger">
                    {remitterErrors.remitterEmailIdError}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="col-md-3">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={10}
                  value={remitterDetail.remitterPhone}
                  onChange={(e) => {
                    if (CommonService.isNumeric(e.target.value))
                      handleInput("remitterPhone", e);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 px-0 d-flex justify-content-start">
                {remitterDetail.id > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={() => router.back()}
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => props.handleSaveRemitter(e)}
                >
                  Save Remitter
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <ProcessPopup />
    </>
  );
}
