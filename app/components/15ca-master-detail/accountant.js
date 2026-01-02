"use client";
import React from "react";
import ProcessPopup from "../modals/processing";
import SearchableDropdown from "../deductors/searchable-dropdown";

export default function AccountantDetailForm(props) {
    const { accountant, errors, handleInput, handleSave, enumList, isDirty } = props;

    return (
        <>
            <form autoComplete="off">
                <div className="row bg-light-gray px-3 py-4 rounded-3 g-3">
                    <h5 className="text-blue fw-bold mb-3">Accountant Details</h5>

                    {/* CODE */}
                    <div className="col-md-3">
                        <label className="form-label">
                            Accountant Code <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            maxLength={10}
                            className="form-control"
                            value={accountant.code || ""}
                            onChange={(e) => {
                                e.target.value = e.target.value.trim().toUpperCase();
                                handleInput("code", e)
                            }
                            }
                        />
                        {isDirty && errors.code && <span className="text-danger">{errors.code}</span>}
                    </div>

                    {/* NAME */}
                    <div className="col-md-3">
                        <label className="form-label">
                            Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.accountantName || ""}
                            onChange={(e) => handleInput("accountantName", e)}
                        />
                        {isDirty && errors.accountantName && (
                            <span className="text-danger">{errors.accountantName}</span>
                        )}
                    </div>



                    {/* FIRM */}
                    <div className="col-md-3">
                        <label className="form-label">Firm Name
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.accountantFirmName || ""}
                            onChange={(e) => handleInput("accountantFirmName", e)}
                        />
                        {isDirty && errors.accountantFirmName && <span className="text-danger">{errors.accountantFirmName}</span>}
                    </div>

                    {/* FLAT */}
                    <div className="col-md-3">
                        <label className="form-label">Flat / Door No.
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.flatDoorBlockNo || ""}
                            onChange={(e) => handleInput("flatDoorBlockNo", e)}
                        />
                        {isDirty && errors.flatDoorBlockNo && <span className="text-danger">{errors.flatDoorBlockNo}</span>}
                    </div>

                    {/* BUILDING */}
                    <div className="col-md-3">
                        <label className="form-label">Building / Village</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.premisesBuildingVillage || ""}
                            onChange={(e) => handleInput("premisesBuildingVillage", e)}
                        />
                    </div>

                    {/* STREET */}
                    <div className="col-md-3">
                        <label className="form-label">Street / PO</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.roadStreetPostOffice || ""}
                            onChange={(e) => handleInput("roadStreetPostOffice", e)}
                        />
                    </div>

                    {/* AREA */}
                    <div className="col-md-3">
                        <label className="form-label">Area / Locality
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.areaLocality || ""}
                            onChange={(e) => handleInput("areaLocality", e)}
                        />
                        {isDirty && errors.areaLocality && <span className="text-danger">{errors.areaLocality}</span>}
                    </div>

                    {/* CITY */}
                    <div className="col-md-3">
                        <label className="form-label">Town / City
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.townCityDistrict || ""}
                            onChange={(e) => handleInput("townCityDistrict", e)}
                        />
                        {isDirty && errors.townCityDistrict && <span className="text-danger">{errors.townCityDistrict}</span>}
                    </div>

                    {/* State */}
                    <div className="col-md-3">
                        <label htmlFor="inputCountry" className="form-label">
                            <span>State</span>
                        </label>
                        {enumList.states && enumList.states.length > 0 && <SearchableDropdown
                            setEventId={(e) => handleInput("state", e)}
                            id={accountant.state}
                            options={enumList.states}
                        ></SearchableDropdown>
                        }
                    </div>

                    {/* COUNTRY */}
                    <div className="col-md-3">
                        <label htmlFor="inputCountry" className="form-label">
                            <span>Country <span className="text-danger">*</span></span>
                        </label>
                        {enumList.countries && enumList.countries.length > 0 && <SearchableDropdown
                            setEventId={(e) => handleInput("country", e)}
                            id={accountant.country}
                            options={enumList.countries}
                        ></SearchableDropdown>

                        }
                        {isDirty && errors.country && <span className="text-danger">{errors.country}</span>}

                    </div>

                    {/* PINCODE */}
                    <div className="col-md-3">
                        <label className="form-label">Pincode</label>
                        <input
                            type="text"
                            maxLength={6}
                            className="form-control"
                            value={accountant.pinCode || ""}
                            onChange={(e) => handleInput("pinCode", e)}
                        />
                    </div>

                    {/* REG NO */}
                    <div className="col-md-3">
                        <label className="form-label">
                            Registration No <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.registrationNo || ""}
                            maxLength={8} // ensures no more than 8 digits
                            onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, ""); // remove non-digits
                                handleInput("registrationNo", value);
                            }}
                            onBlur={(e) => {
                                let value = e.target.value;
                                if (value) {
                                    // pad with leading zeros if less than 8 digits
                                    value = value.padStart(8, "0");
                                    handleInput("registrationNo", value);
                                }
                            }}
                        />
                        {isDirty && errors.registrationNo && (
                            <span className="text-danger">{errors.registrationNo}</span>
                        )}
                    </div>

                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            Save Accountant
                        </button>
                    </div>
                </div>

            </form>

            <ProcessPopup />
        </>
    );
}
