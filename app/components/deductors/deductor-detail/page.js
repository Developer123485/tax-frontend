"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProcessPopup from "../../modals/processing";
import { CommonService } from "@/app/services/common.service";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function DeductorDetail(props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTracesPassword, setShowTracesPassword] = useState(false);
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
    borderColor: isFocused3 ? "#007bff" : "#ccc",
    boxShadow: isFocused3 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
    outline: "none",
  };


  const router = useRouter(null);
  const {
    enumList,
    handleInputDeductor,
    deductorDetail,
    deductorErrors,
    isNextDirty,
  } = props;

  function handleInput(name, e) {
    handleInputDeductor(name, e);
  }

  return (
    <>
      {enumList && (
        <form autoComplete="off">
          <div>
            {!props.isCorrection && <div className="row bg-light-gray px-3 py-4 px-md-2 py-md-3 rounded-3 mb-5 g-3">
              <div className="row mb-2">
                <div className="col-md-6 d-flex align-items-center">
                  <h5 className="text-blue fw-bold mb-0">
                    ITD Login{" "}
                  </h5>
                  {deductorDetail.isITDStatus && deductorDetail.itdLogin && deductorDetail.itdPassword && <span className="badge bg-success ms-2 mt-0" style={{ fontSize: "0.85rem" }}>
                    Verified
                  </span>
                  }
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <h5 className="text-blue fw-bold mb-0">
                    Traces Login{" "}
                  </h5>
                  {deductorDetail.isTracesStatus && deductorDetail.tracesLogin && deductorDetail.tracesPassword && <span className="badge bg-success ms-2 mt-0" style={{ fontSize: "0.85rem" }}>
                    Verified
                  </span>
                  }
                </div>
              </div>
            </div>}
            <div className="row bg-light-gray px-3 py-4 px-md-2 py-md-3 rounded-3 mb-4 g-3">
              <div className="col-md-12 mt-0">
                <h5 className="text-blue fw-bold">Deductor Details</h5>
              </div>
              {props.type === "regular" &&
                <div className="col-md-3">
                  <label htmlFor="inputCodeNo" className="form-label">
                    <span>Code No</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="form-control"
                    id="inputCodeNo"
                    maxLength={10}
                    autoComplete="off"
                    value={deductorDetail.deductorCodeNo}
                    onChange={(e) => {
                      if (e.target.value) {
                        e.target.value = e.target.value.trim();
                      }
                      handleInput("deductorCodeNo", e)
                    }}
                  />
                </div>}
              <div className="col-md-3">
                <label htmlFor="inputName" className="form-label">
                  <span>Deductor Name</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="inputName"
                  maxLength={75}
                  autoComplete="off"
                  value={deductorDetail.deductorName}
                  onChange={(e) => {
                    handleInput("deductorName", e);
                  }}
                />{" "}
                {isNextDirty && deductorErrors.deductorNameError && (
                  <span className="text-danger">
                    {deductorErrors.deductorNameError}
                  </span>
                )}
              </div>
              <div className="col-md-3">
                <label htmlFor="inputCate" className="form-label">
                  <span>Category</span>
                  <span className="text-danger"> *</span>
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  style={highlightStyle}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={deductorDetail.deductorType}
                  onChange={(e) => handleInput("deductorType", e)}
                >
                  <option value={""}>Select Category</option>
                  {enumList.deductorTypes?.map((option, index) => (
                    <option key={index} value={option.key}>
                      {option.value}
                    </option>
                  ))}
                </select>
                {isNextDirty && deductorErrors.deductorTypeError && (
                  <span className="text-danger">
                    {deductorErrors.deductorTypeError}
                  </span>
                )}
              </div>
              <div className="col-md-3">
                <label htmlFor="inputTANNo" className="form-label">
                  <span>TAN</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  placeholder="ABCD10787A"
                  className="form-control"
                  id="inputTANNo"
                  autoComplete="off"
                  disabled={props.isCorrection}
                  maxLength={10}
                  value={
                    deductorDetail.deductorTan
                      ? deductorDetail.deductorTan.toUpperCase()
                      : ""
                  }
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleInput("deductorTan", e);
                  }}
                />{" "}
                {isNextDirty && deductorErrors.deductorTanError && (
                  <span className="text-danger">
                    {deductorErrors.deductorTanError}
                  </span>
                )}
              </div>
              <div className="col-md-3">
                <label htmlFor="inputPANNo" className="form-label">
                  <span>PAN</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  placeholder="ABCDE0787A"
                  className="form-control"
                  id="inputPANNo"
                  autoComplete="off"
                  maxLength={10}
                  value={
                    deductorDetail.deductorPan
                      ? deductorDetail.deductorPan.toUpperCase()
                      : ""
                  }
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleInput("deductorPan", e);
                  }}
                />{" "}
                {isNextDirty && deductorErrors.deductorPanError && (
                  <span className="text-danger">
                    {deductorErrors.deductorPanError}
                  </span>
                )}
              </div>
              <div className="col-md-3">
                <label htmlFor="inputGSTNo" className="form-label">
                  <span>GST No</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="inputGSTNo"
                  autoComplete="off"
                  maxLength={15}
                  value={deductorDetail.deductorGstNo}
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleInput("deductorGstNo", e);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputBranch" className="form-label">
                  <span>Branch/Division</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="inputBranch"
                  autoComplete="off"
                  maxLength={75}
                  value={deductorDetail.deductorBranch}
                  onChange={(e) => {
                    if (CommonService.isAlphabet(e.target.value))
                      handleInput("deductorBranch", e);
                  }}
                />{" "}
                {isNextDirty && deductorErrors.deductorBranchError && (
                  <span className="text-danger">
                    {deductorErrors.deductorBranchError}
                  </span>
                )}
              </div>
              <div className="col-md-3">
                <label htmlFor="inputEmail" className="form-label">
                  <span>Email</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="email"
                  placeholder=""
                  className="form-control"
                  id="inputEmail"
                  autoComplete="off"
                  maxLength={50}
                  value={deductorDetail.deductorEmailId}
                  onChange={(e) => handleInput("deductorEmailId", e)}
                />{" "}
                {isNextDirty && deductorErrors.deductorEmailIdError && (
                  <span className="text-danger">
                    {deductorErrors.deductorEmailIdError}
                  </span>
                )}
              </div>
              <div className="col-md-3">
                <label htmlFor="emailAlter" className="form-label">
                  <span>Alternate Email</span>
                </label>
                <input
                  type="emailAlter"
                  placeholder=""
                  className="form-control"
                  id="inputEmail"
                  autoComplete="off"
                  maxLength={50}
                  value={deductorDetail.emailAlternate}
                  onChange={(e) => handleInput("emailAlternate", e)}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputMobileNo" className="form-label">
                  <span>Mobile No</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="inputMobileNo"
                  autoComplete="off"
                  maxLength={10}
                  value={deductorDetail.deductorMobile}
                  onChange={(e) => {
                    if (CommonService.isNumeric(e.target.value))
                      handleInput("deductorMobile", e);
                  }}
                />
              </div>
              <div className="col-md-1">
                <label htmlFor="inputSTDCode" className="form-label">
                  <span>STD Code</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="inputSTDCode"
                  autoComplete="off"
                  maxLength={5}
                  value={deductorDetail.deductorStdcode}
                  onChange={(e) => {
                    if (CommonService.isNumeric(e.target.value))
                      handleInput("deductorStdcode", e);
                  }}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputTelephone" className="form-label">
                  <span>Telephone No.</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="inputTelephone"
                  autoComplete="off"
                  maxLength={10}
                  value={deductorDetail.deductorTelphone}
                  onChange={(e) => {
                    if (CommonService.isNumeric(e.target.value))
                      handleInput("deductorTelphone", e);
                  }}
                />
              </div>
              <div className="col-md-1">
                <label htmlFor="inputSTDCode" className="form-label">
                  <span>Alt STD</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="inputSTDCode"
                  autoComplete="off"
                  maxLength={5}
                  value={deductorDetail.stdAlternate}
                  onChange={(e) => {
                    if (CommonService.isNumeric(e.target.value))
                      handleInput("stdAlternate", e);
                  }}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputAlterTelephone" className="form-label">
                  <span>Alternate Telephone</span>
                </label>

                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="inputAlterTelephone"
                  autoComplete="off"
                  maxLength={10}
                  value={deductorDetail.phoneAlternate}
                  onChange={(e) => {
                    if (CommonService.isNumeric(e.target.value))
                      handleInput("phoneAlternate", e);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputCodeNo" className="form-label">
                  <span>Flat/Block No.</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="inputFlatNo"
                  autoComplete="off"
                  maxLength={25}
                  value={deductorDetail.deductorFlatNo}
                  onChange={(e) => {
                    handleInput("deductorFlatNo", e);
                  }}
                />{" "}
                {isNextDirty && deductorErrors.deductorFlatNoError && (
                  <span className="text-danger">
                    {deductorErrors.deductorFlatNoError}
                  </span>
                )}
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
                  autoComplete="off"
                  maxLength={25}
                  value={deductorDetail.deductorBuildingName}
                  onChange={(e) => {
                    handleInput("deductorBuildingName", e)
                  }
                  }
                />
                {isNextDirty && deductorErrors.deductorBuildingNameError && (
                  <span className="text-danger">
                    {deductorErrors.deductorBuildingNameError}
                  </span>
                )}
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
                  autoComplete="off"
                  maxLength={25}
                  value={deductorDetail.deductorStreet}
                  onChange={(e) => {
                    handleInput("deductorStreet", e);
                  }}
                />
                {isNextDirty && deductorErrors.deductorStreetError && (
                  <span className="text-danger">
                    {deductorErrors.deductorStreetError}
                  </span>
                )}
              </div>
              <div className="col-md-3">
                <label htmlFor="inputState" className="form-label">
                  <span>State</span>
                  <span className="text-danger"> *</span>
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  autoComplete="off"
                  value={deductorDetail.deductorState}
                  style={highlightStyle1}
                  onFocus={() => setIsFocused1(true)}
                  onBlur={() => setIsFocused1(false)}
                  onChange={(e) => handleInput("deductorState", e)}
                >
                  <option value={""}>Select State</option>
                  {enumList.states?.filter(p => p.value != "OVERSEAS")?.map((option, index) => (
                    <option key={index} value={option.key}>
                      {option.value}
                    </option>
                  ))}
                </select>
                {isNextDirty && deductorErrors.deductorStateError && (
                  <span className="text-danger">
                    {deductorErrors.deductorStateError}
                  </span>
                )}
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
                  autoComplete="off"
                  maxLength={25}
                  value={deductorDetail.deductorArea}
                  onChange={(e) => {
                    handleInput("deductorArea", e);
                  }}
                />
                {isNextDirty && deductorErrors.deductorAreaError && (
                  <span className="text-danger">
                    {deductorErrors.deductorAreaError}
                  </span>
                )}
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
                  autoComplete="off"
                  maxLength={25}
                  value={deductorDetail.deductorDistrict}
                  onChange={(e) => {
                    handleInput("deductorDistrict", e);
                  }}
                />
                {isNextDirty && deductorErrors.deductorDistrictError && (
                  <span className="text-danger">
                    {deductorErrors.deductorDistrictError}
                  </span>
                )}
              </div>
              <div className="col-md-3">
                <label htmlFor="inputPincode" className="form-label">
                  <span>Pincode</span>
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="form-control"
                  id="inputPincode"
                  autoComplete="off"
                  maxLength={6}
                  value={deductorDetail.deductorPincode}
                  onChange={(e) => {
                    if (CommonService.isNumeric(e.target.value))
                      handleInput("deductorPincode", e);
                  }}
                />{" "}
                {isNextDirty && deductorErrors.deductorPincodeError && (
                  <span className="text-danger">
                    {deductorErrors.deductorPincodeError}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 px-0 d-flex justify-content-start">
                {deductorDetail.id > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={(e) => router.back()}
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => props.handleSaveDeductor(e)}
                >
                  Save Deductor
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <ProcessPopup></ProcessPopup>
    </>
  );
}
