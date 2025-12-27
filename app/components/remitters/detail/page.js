"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProcessPopup from "../../modals/processing";
import { CommonService } from "@/app/services/common.service";
import SearchableDropdown from "../../deductors/searchable-dropdown";

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
          <div className="row row d-flex g-3">
            <div className="row bg-light-gray px-3 py-4 px-md-2 py-md-3 rounded-3 mb-4 g-3">
              <div className="col-md-12 mt-0">
                <h5 className="text-blue fw-bold">Remitter Details</h5>
              </div>

              <div className="col-md-3">
                <label className="form-label">Remitter Code
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={remitterDetail.code}
                  maxLength={10}
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleInput("code", e)
                  }
                  }
                />
                {isNextDirty && remitterErrors.codeError && (
                  <span className="text-danger">
                    {remitterErrors.codeError}
                  </span>
                )}
              </div>

              {/* Name */}
              <div className="col-md-3">
                <label className="form-label">
                  <span>Name Of Remitter</span>
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


              {/* PAN */}
              <div className="col-md-3">
                <label htmlFor="inputPANNo" className="form-label">
                  <span>PAN Of the Remitter</span>
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

              {/* TAN */}
              <div className="col-md-3">
                <label htmlFor="inputTANNo" className="form-label">
                  <span>TAN Of the Remitter</span>
                  {/* <span className="text-danger"> *</span> */}
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
                {/* {isNextDirty && remitterErrors.remitterTanError && (
                  <span className="text-danger">
                    {remitterErrors.remitterTanError}
                  </span>
                )} */}
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

              {/* State */}
              <div className="col-md-3">
                <label htmlFor="inputCountry" className="form-label">
                  <span>State</span>
                  <span className="text-danger"> *</span>
                </label>
                {enumList.states && enumList.states.length > 0 && <SearchableDropdown
                  setEventId={(e) => handleInput("remitterState", e)}
                  id={remitterDetail.remitterState}
                  options={enumList.states}
                ></SearchableDropdown>
                }
                {isNextDirty && remitterErrors.remitterStateError && (
                  <span className="text-danger">
                    {remitterErrors.remitterStateError}
                  </span>
                )}
              </div>

              {/* Country */}
              <div className="col-md-3">
                <label htmlFor="inputCountry" className="form-label">
                  <span>Country</span>
                  <span className="text-danger"> *</span>
                </label>
                {enumList.countries && enumList.countries.length > 0 && <SearchableDropdown
                  setEventId={(e) => handleInput("remitterCountry", e)}
                  id={remitterDetail.remitterCountry}
                  options={enumList.countries}
                ></SearchableDropdown>
                }
                {/* <select
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
                </select> */}
                {isNextDirty && remitterErrors.remitterCountryError && (
                  <span className="text-danger">
                    {remitterErrors.remitterCountryError}
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
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  maxLength={50}
                  value={remitterDetail.remitterEmail}
                  onChange={(e) => handleInput("remitterEmail", e)}
                />
                {/* {isNextDirty && remitterErrors.remitterEmailIdError && (
                  <span className="text-danger">
                    {remitterErrors.remitterEmailIdError}
                  </span>
                )} */}
              </div>

              {/* Phone */}
              <div className="col-md-3">
                <label className="form-label">Phone Number</label>
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



              <div className="col-md-3">
                <label htmlFor="inputCountry" className="form-label">
                  <span>Status Of Remitter</span>
                  <span className="text-danger"> *</span>
                </label>
                {enumList.status && enumList.status.length > 0 && <SearchableDropdown
                  setEventId={(e) => handleInput("remitterStatus", e)}
                  id={remitterDetail.remitterStatus}
                  options={enumList.status}
                ></SearchableDropdown>
                }
                {isNextDirty && remitterErrors.statusError && (
                  <span className="text-danger">
                    {remitterErrors.statusError}
                  </span>
                )}
              </div>


              <div className="col-md-3">
                <label htmlFor="inputCountry" className="form-label">
                  <span>Resdential Status</span>
                  <span className="text-danger"> *</span>
                </label>
                {enumList.resdentialStatus && enumList.resdentialStatus.length > 0 && <SearchableDropdown
                  setEventId={(e) => handleInput("remitterResidential", e)}
                  id={remitterDetail.remitterResidential}
                  options={enumList.resdentialStatus}
                ></SearchableDropdown>
                }
                {isNextDirty && remitterErrors.remitterResidentialError && (
                  <span className="text-danger">
                    {remitterErrors.remitterResidentialError}
                  </span>
                )}
              </div>





              <div className="col-md-3">
                <label className="form-label">Responsible Person Name
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={remitterDetail.responsibleName}
                  onChange={(e) => handleInput("responsibleName", e)}
                />
                {isNextDirty && remitterErrors.responsibleNameError && (
                  <span className="text-danger">
                    {remitterErrors.responsibleNameError}
                  </span>
                )}
              </div>

              <div className="col-md-3">
                <label className="form-label">Father/Mother Name
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={remitterDetail.fatherName}
                  onChange={(e) => handleInput("fatherName", e)}
                />
                {isNextDirty && remitterErrors.fatherError && (
                  <span className="text-danger">
                    {remitterErrors.fatherError}
                  </span>
                )}
              </div>

              <div className="col-md-3">
                <label className="form-label">Designation
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={remitterDetail.desgination}
                  maxLength={75}
                  onChange={(e) => handleInput("desgination", e)}
                />
                {isNextDirty && remitterErrors.designationError && (
                  <span className="text-danger">
                    {remitterErrors.designationError}
                  </span>
                )}
              </div>




              {/* -------- below information for part C     ----------- */}


              {/* <div className="col-md-3">
                <label className="form-label">TAN ACK Part C</label>
                <input
                  type="text"
                  className="form-control"
                  value={remitterDetail.tanAckPartC}
                  onChange={(e) => handleInput("tanAckPartC", e)}
                />
              </div> */}

              {/* <div className="col-md-3">
                <label className="form-label">Income Tax Ward</label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    remitterDetail.incTaxWard
                      ? remitterDetail.incTaxWard.toUpperCase()
                      : ""
                  }
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleInput("incTaxWard", e);
                  }}
                />
              </div> */}

              {/* ===== PART C SECTION ===== */}
              <div className="row mt-4">
                <div className="col-md-12">
                  <h5 className="text-primary fw-bold mb-3">
                    Below Information Required for Part C
                  </h5>
                </div>

                {/* Row 1 */}
                <div className="col-md-3">
                  <label className="form-label">Area Code</label>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={3}
                    value={remitterDetail.areaCode || ""}
                    onChange={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                      handleInput("areaCode", e);
                    }}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">AO Type</label>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={2}
                    value={remitterDetail.aoType || ""}
                    onChange={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                      handleInput("aoType", e);
                    }}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Range Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={remitterDetail.rangeCode || ""}
                    onChange={(e) => handleInput("rangeCode", e)}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">AO Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={remitterDetail.aoNumber || ""}
                    onChange={(e) => handleInput("aoNumber", e)}
                  />
                </div>

                {/* Row 2 */}
                <div className="col-md-6 mt-3">
                  <label className="form-label">
                    Principal Place of Business
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={remitterDetail.princPlcBusRemter || ""}
                    onChange={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                      handleInput("princPlcBusRemter", e);
                    }}
                  />
                </div>
              </div>


              <div className="col-md-3">
                <label className="form-label">Domestic Flag</label>
                <input
                  type="text"
                  className="form-control"
                  value={remitterDetail.domesticFlg}
                  onChange={(e) => handleInput("domesticFlg", e)}
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
