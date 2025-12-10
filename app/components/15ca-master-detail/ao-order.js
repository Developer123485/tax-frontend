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
                        <input
                            type="text"
                            className="form-control"
                            value={aoOrder.isAoOrderObtained || ""}
                            onChange={(e) => handleInput("isAoOrderObtained", e)}
                        />
                    </div>

                    {/* Section */}
                    <div className="col-md-3">
                        <label className="form-label">
                            Section <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={aoOrder.section || ""}
                            onChange={(e) => handleInput("section", e)}
                        />
                        {errors.section && (
                            <span className="text-danger">{errors.section}</span>
                        )}
                    </div>

                    {/* Assessing Officer Name */}
                    <div className="col-md-3">
                        <label className="form-label">
                            Assessing Officer Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={aoOrder.assessingOfficerName || ""}
                            onChange={(e) => handleInput("assessingOfficerName", e)}
                        />
                        {errors.assessingOfficerName && (
                            <span className="text-danger">
                                {errors.assessingOfficerName}
                            </span>
                        )}
                    </div>

                    {/* Designation */}
                    <div className="col-md-3">
                        <label className="form-label">Designation</label>
                        <input
                            type="text"
                            className="form-control"
                            value={aoOrder.assessingOfficerDesignation || ""}
                            onChange={(e) => handleInput("assessingOfficerDesignation", e)}
                        />
                    </div>

                    {/* Order Date */}
                    <div className="col-md-3">
                        <label className="form-label">Order Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={aoOrder.orderDate || ""}
                            onChange={(e) => handleInput("orderDate", e)}
                        />
                    </div>

                    {/* Certificate Number */}
                    <div className="col-md-3">
                        <label className="form-label">Order Certificate No</label>
                        <input
                            type="text"
                            className="form-control"
                            value={aoOrder.orderCertificateNumber || ""}
                            onChange={(e) => handleInput("orderCertificateNumber", e)}
                        />
                    </div>

                    {/* Code */}
                    <div className="col-md-3">
                        <label className="form-label">Code</label>
                        <input
                            type="text"
                            className="form-control"
                            value={aoOrder.code || ""}
                            onChange={(e) => handleInput("code", e)}
                        />
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
