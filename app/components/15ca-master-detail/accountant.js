"use client";
import React from "react";
import ProcessPopup from "../modals/processing";

export default function AccountantDetailForm(props) {
    const { accountant, errors, handleInput, handleSave } = props;

    return (
        <>
            <form autoComplete="off">
                <div className="row bg-light-gray px-3 py-4 rounded-3 g-3">

                    <h5 className="text-blue fw-bold mb-3">Accountant Details</h5>

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
                        {errors.accountantName && (
                            <span className="text-danger">{errors.accountantName}</span>
                        )}
                    </div>

                    {/* CODE */}
                    <div className="col-md-3">
                        <label className="form-label">
                            Code <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            maxLength={10}
                            className="form-control"
                            value={accountant.code || ""}
                            onChange={(e) => handleInput("code", e)}
                        />
                        {errors.code && <span className="text-danger">{errors.code}</span>}
                    </div>

                    {/* FIRM */}
                    <div className="col-md-3">
                        <label className="form-label">Firm Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.accountantFirmName || ""}
                            onChange={(e) => handleInput("accountantFirmName", e)}
                        />
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

                    {/* STATE */}
                    <div className="col-md-3">
                        <label className="form-label">State</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.state || ""}
                            onChange={(e) => handleInput("state", e)}
                        />
                    </div>

                    {/* COUNTRY */}
                    <div className="col-md-3">
                        <label className="form-label">Country</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.country || ""}
                            onChange={(e) => handleInput("country", e)}
                        />
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
                        <label className="form-label">Registration No</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.registrationNo || ""}
                            onChange={(e) => handleInput("registrationNo", e)}
                        />
                    </div>

                    {/* CERTIFICATE NO */}
                    <div className="col-md-3">
                        <label className="form-label">Certificate No</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountant.certificateNo || ""}
                            onChange={(e) => handleInput("certificateNo", e)}
                        />
                    </div>

                    {/* CERTIFICATE DATE */}
                    <div className="col-md-3">
                        <label className="form-label">Certificate Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={accountant.certificateDate || ""}
                            onChange={(e) => handleInput("certificateDate", e)}
                        />
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
