"use client";
import React from "react";
import ProcessPopup from "../modals/processing";

export default function AoOrderDetailForm(props) {
    const { aoOrder, errors, handleInput, handleSave } = props;

    return (
        <>
            <form autoComplete="off">
                <div className="row bg-light-gray px-3 py-4 rounded-3 g-3">

                    <h5 className="text-blue fw-bold mb-3">AO Order Details</h5>

                    {/* Is AO Order Obtained */}
                    <div className="col-md-3">
                        <label className="form-label">AO Order Obtained</label>
                        <select
                            className="form-select"
                            value={aoOrder.isAoOrderObtained || "N"}
                            onChange={(e) => handleInput("isAoOrderObtained", e)}
                        >
                            <option value="N">No</option>
                            <option value="Y">Yes</option>
                        </select>
                    </div>

                    {/* Section */}
                    <div className="col-md-3">
                        <label className="form-label">
                            Section {aoOrder.isAoOrderObtained == "Y" && <span className="text-danger">*</span>}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={aoOrder.section || ""}
                            onChange={(e) => handleInput("section", e)}
                        />
                        {aoOrder.isAoOrderObtained == "Y" && errors.section && (
                            <span className="text-danger">{errors.section}</span>
                        )}
                    </div>

                    {/* Assessing Officer Name */}
                    <div className="col-md-3">
                        <label className="form-label">
                            Assessing Officer Name {aoOrder.isAoOrderObtained == "Y" && <span className="text-danger">*</span>}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={aoOrder.assessingOfficerName || ""}
                            onChange={(e) => handleInput("assessingOfficerName", e)}
                        />
                        {aoOrder.isAoOrderObtained == "Y" && errors.assessingOfficerName && (
                            <span className="text-danger">
                                {errors.assessingOfficerName}
                            </span>
                        )}
                    </div>

                    {/* Designation */}
                    <div className="col-md-3">
                        <label className="form-label">Designation
                            {aoOrder.isAoOrderObtained == "Y" && <span className="text-danger">*</span>}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={aoOrder.assessingOfficerDesignation || ""}
                            onChange={(e) => handleInput("assessingOfficerDesignation", e)}
                        />
                        {aoOrder.isAoOrderObtained == "Y" && errors.assessingOfficerDesignation && (
                            <span className="text-danger">
                                {errors.assessingOfficerDesignation}
                            </span>
                        )}
                    </div>

                    {/* Order Date */}
                    <div className="col-md-3">
                        <label className="form-label">Order Date
                            {aoOrder.isAoOrderObtained == "Y" && <span className="text-danger">*</span>}
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            value={aoOrder.orderDate || ""}
                            onChange={(e) => handleInput("orderDate", e)}
                        />
                        {aoOrder.isAoOrderObtained == "Y" && errors.orderDate && (
                            <span className="text-danger">
                                {errors.orderDate}
                            </span>
                        )}
                    </div>

                    {/* Certificate Number */}
                    <div className="col-md-3">
                        <label className="form-label">Order Certificate No
                            {aoOrder.isAoOrderObtained == "Y" && <span className="text-danger">*</span>}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={aoOrder.orderCertificateNumber || ""}
                            onChange={(e) => handleInput("orderCertificateNumber", e)}
                        />
                        {aoOrder.isAoOrderObtained == "Y" && errors.orderCertificateNumber && (
                            <span className="text-danger">
                                {errors.orderCertificateNumber}
                            </span>
                        )}
                    </div>

                    {/* Code */}
                    <div className="col-md-3">
                        <label className="form-label">Code
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={aoOrder.code || ""}
                            onChange={(e) => handleInput("code", e)}
                        />
                        {errors.code && (
                            <span className="text-danger">
                                {errors.code}
                            </span>
                        )}
                    </div>

                    {/* Save */}
                    <div className="col-md-12 mt-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            Save AO Order
                        </button>
                    </div>
                </div>
            </form>

            <ProcessPopup />
        </>
    );
}
