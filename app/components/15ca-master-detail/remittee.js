"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProcessPopup from "../modals/processing";
import SearchableDropdown from "../deductors/searchable-dropdown";
import { CommonService } from "@/app/services/common.service";

export default function RemitteeDetail(props) {
    const router = useRouter(null);

    const {
        handleInputRemitter,
        remittee,
        remitteeErrors,
        enumList,
        isDirty
    } = props;

    function handleInput(name, e) {
        handleInputRemitter(name, e);
    }

    return (
        <>
            <form autoComplete="off">
                <div className="row d-flex g-3">

                    <div className="row bg-light-gray px-3 py-4 rounded-3 mb-4 g-3">
                        <div className="col-md-12 mt-0">
                            <h5 className="text-blue fw-bold">Remittee Details</h5>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">
                                Remittee Code <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={remittee.code || ""}
                                maxLength={10}
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim().toUpperCase();
                                    handleInput("code", e)
                                }
                                }
                            />
                            {isDirty && remitteeErrors.code && (
                                <span className="text-danger">
                                    {remitteeErrors.code}
                                </span>
                            )}
                        </div>

                        {/* === NAME === */}
                        <div className="col-md-3">
                            <label className="form-label">
                                Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={remittee.name || ""}
                                maxLength={125}
                                onChange={(e) => handleInput("name", e)}
                            />
                            {isDirty && remitteeErrors.name && (
                                <span className="text-danger">
                                    {remitteeErrors.name}
                                </span>
                            )}
                        </div>


                        {/* === PAN === */}
                        <div className="col-md-3">
                            <label className="form-label">
                                PAN
                            </label>
                            <input
                                type="text"
                                maxLength={10}
                                className="form-control"
                                value={
                                    remittee.remitteePan
                                        ? remittee.remitteePan.toUpperCase()
                                        : ""
                                }
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim().toUpperCase();
                                    handleInput("remitteePan", e);
                                }}
                            />
                            {isDirty && remitteeErrors.remitteePan && (
                                <span className="text-danger">
                                    {remitteeErrors.remitteePan}
                                </span>
                            )}
                        </div>




                        {/* === FLAT === */}
                        <div className="col-md-3">
                            <label className="form-label">Flat / Door No.
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                maxLength={50}
                                className="form-control"
                                value={remittee.remitteeFlat || ""}
                                onChange={(e) => handleInput("remitteeFlat", e)}
                            />
                            {isDirty && remitteeErrors.remitteeFlat && <span className="text-danger">{remitteeErrors.remitteeFlat}</span>}
                        </div>

                        {/* === BUILDING === */}
                        <div className="col-md-3">
                            <label className="form-label">Building Name</label>
                            <input
                                type="text"
                                maxLength={50}
                                className="form-control"
                                value={remittee.remitteeBuilding || ""}
                                onChange={(e) => handleInput("remitteeBuilding", e)}
                            />
                        </div>

                        {/* === STREET === */}
                        <div className="col-md-3">
                            <label className="form-label">Street
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                maxLength={50}
                                value={remittee.remitteeStreet || ""}
                                onChange={(e) => handleInput("remitteeStreet", e)}
                            />
                        </div>

                        {/* === AREA === */}
                        <div className="col-md-3">
                            <label className="form-label">Area
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                maxLength={50}
                                value={remittee.remitteeArea || ""}
                                onChange={(e) => handleInput("remitteeArea", e)}
                            />
                            {isDirty && remitteeErrors.remitteeArea && <span className="text-danger">{remitteeErrors.remitteeArea}</span>}
                        </div>

                        {/* === CITY === */}
                        <div className="col-md-3">
                            <label className="form-label">City
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                maxLength={50}
                                value={remittee.remitteeCity || ""}
                                onChange={(e) => handleInput("remitteeCity", e)}
                            />
                            {isDirty && remitteeErrors.remitteeCity && <span className="text-danger">{remitteeErrors.remitteeCity}</span>}
                        </div>

                        {/* === STATE === */}
                        <div className="col-md-3">
                            <label className="form-label">State</label>
                            <input
                                type="text"
                                className="form-control"
                                maxLength={75}
                                value={remittee.remitteeState || ""}
                                onChange={(e) => handleInput("remitteeState", e)}
                            />
                        </div>

                        {/* === COUNTRY === */}
                        <div className="col-md-3">
                            <label htmlFor="inputCountry" className="form-label">
                                <span>Country</span>
                                <span className="text-danger"> *</span>
                            </label>
                            {enumList.countries && enumList.countries.length > 0 && <SearchableDropdown
                                setEventId={(e) => handleInput("remitteeCountry", e)}
                                id={remittee.remitteeCountry}
                                options={enumList.countries}
                            ></SearchableDropdown>
                            }
                            {isDirty && remitteeErrors.remitteeCountry && (
                                <span className="text-danger">
                                    {remitteeErrors.remitteeCountry}
                                </span>
                            )}
                        </div>

                        {/* === PINCODE === */}
                        <div className="col-md-3">
                            <label className="form-label">
                                Zip Code
                                <span className="text-danger"> *</span>
                            </label>
                            <input
                                type="text"
                                maxLength={8}
                                className="form-control"
                                value={remittee.remitteePincode || ""}
                                onChange={(e) => handleInput("remitteePincode", e)}
                            />
                            {isDirty && remitteeErrors.remitteePincode && (
                                <span className="text-danger">
                                    {remitteeErrors.remitteePincode}
                                </span>
                            )}
                        </div>

                        {/* === EMAIL === */}
                        <div className="col-md-3">
                            <label className="form-label">Email Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                maxLength={125}
                                value={remittee.remitteeEmail || ""}
                                onChange={(e) => handleInput("remitteeEmail", e)}
                            />
                            {isDirty && remitteeErrors.remitteeEmail && (
                                <span className="text-danger">
                                    {remitteeErrors.remitteeEmail}
                                </span>
                            )}
                        </div>

                        {/* === PHONE === */}
                        <div className="col-md-3">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="text"
                                maxLength={10}
                                className="form-control"
                                value={remittee.remitteePhone || ""}
                                onChange={(e) => {
                                    if (CommonService.isNumeric(e.target.value))
                                        handleInput("remitteePhone", e)
                                }
                                }
                            />
                        </div>

                        {/* === PURPOSE CODE === */}
                        {/* <div className="col-md-3">
              <label className="form-label">Purpose Code</label>
              <input
                type="text"
                className="form-control"
                value={remittee.purposeCode || ""}
                onChange={(e) => handleInput("purposeCode", e)}
              />
            </div> */}

                        <div className="col-md-3">
                            <label htmlFor="inputCountry" className="form-label">
                                <span>Status Of Remittee</span>
                                <span className="text-danger"> *</span>
                            </label>
                            {enumList.status && enumList.status.length > 0 && <SearchableDropdown
                                setEventId={(e) => handleInput("status", e)}
                                id={remittee.status}
                                options={enumList.status}
                            ></SearchableDropdown>
                            }
                            {isDirty && remitteeErrors.status && (
                                <span className="text-danger">
                                    {remitteeErrors.status}
                                </span>
                            )}
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Currency </label>
                            <SearchableDropdown
                                id={remittee.currency}
                                options={enumList.currencies}
                                setEventId={(e) => handleInput("currency", e)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Other Currency </label>
                            <input
                                className="form-control"
                                disabled={remittee.currency !== "99"}
                                maxLength={50}
                                value={remittee.currencyOther || ""}
                                onChange={(e) => handleInput("currencyOther", e)}
                            />
                        </div>

                        {/* === COUNTRY REM MADE === */}
                        <div className="col-md-3">
                            <label htmlFor="inputCountry" className="form-label">
                                <span>Country Remittance Made
                                    <span className="text-danger">*</span>
                                </span>
                            </label>
                            {enumList.countryCodeRemitter && enumList.countryCodeRemitter.length > 0 && <SearchableDropdown
                                setEventId={(e) => handleInput("countryRemMade", e)}
                                id={remittee.countryRemMade}
                                options={enumList.countryCodeRemitter}
                            ></SearchableDropdown>
                            }
                            {isDirty && remitteeErrors.countryRemMade && (
                                <span className="text-danger">
                                    {remitteeErrors.countryRemMade}
                                </span>
                            )}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputCountry" className="form-label">
                                <span>Country Remittance Made Other
                                    {remittee.countryRemMade == "9999" && <span className="text-danger">*</span>}
                                </span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                maxLength={125}
                                disabled={remittee.countryRemMade != "9999"}
                                value={remittee.countryRemMadeDesc || ""}
                                onChange={(e) => handleInput("countryRemMadeDesc", e)}
                            />
                            {isDirty && remitteeErrors.countryRemMadeDesc && (
                                <span className="text-danger">
                                    {remitteeErrors.countryRemMadeDesc}
                                </span>
                            )}
                        </div>

                        {/* === PRINCIPAL PLACE OF BUSINESS === */}
                        <div className="col-md-3">
                            <label className="form-label">
                                Principal Place of Business
                                <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                maxLength={75}
                                className="form-control"
                                value={remittee.princPlcBusRemtee || ""}
                                onChange={(e) => handleInput("princPlcBusRemtee", e)}
                            />
                            {isDirty && remitteeErrors.princPlcBusRemtee && (
                                <span className="text-danger">
                                    {remitteeErrors.princPlcBusRemtee}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-12 px-0">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={(e) => props.handleSave(e)}
                            >
                                Save Remittee
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <ProcessPopup />
        </>
    );
}
