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
                        <label className="form-label">Flat / Door No.</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.flatDoorBlockNo || ""}
                            onChange={(e) => handleInput("flatDoorBlockNo", e)}
                        />
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
                        <label className="form-label">Area / Locality</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.areaLocality || ""}
                            onChange={(e) => handleInput("areaLocality", e)}
                        />
                    </div>

                    {/* CITY */}
                    <div className="col-md-3">
                        <label className="form-label">Town / City</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.townCityDistrict || ""}
                            onChange={(e) => handleInput("townCityDistrict", e)}
                        />
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
                        <label className="form-label">Registration No
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.registrationNo || ""}
                            onChange={(e) => handleInput("registrationNo", e)}
                        />
                        {isDirty && errors.registrationNo && <span className="text-danger">{errors.registrationNo}</span>}
                    </div>

                    {/* SAVE BUTTON */}
                    <div className="col-md-12 mt-3">
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
