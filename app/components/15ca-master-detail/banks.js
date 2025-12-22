"use client";
import React from "react";
import SearchableDropdown from "@/app/components/deductors/searchable-dropdown";

export default function BankDetailForm(props) {
    const { bankDetail, errors, bankNames, handleInput } = props;

    return (
        <>
            <form autoComplete="off">
                <div className="row bg-light-gray px-3 py-4 rounded-3 mb-4 g-3">
                    <div className="col-md-12">
                        <h5 className="text-blue fw-bold">Bank Details</h5>
                    </div>

                    {/* CODE */}
                    <div className="col-md-3">
                        <label className="form-label">
                            Code <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={bankDetail.code || ""}
                            onChange={(e) => handleInput("code", e)}
                        />
                        {errors.code && (
                            <span className="text-danger">{errors.code}</span>
                        )}
                    </div>

                    {/* BANK NAME - DROPDOWN */}
                    <div className="col-md-5">
                        <label className="form-label">
                            Bank Name <span className="text-danger">*</span>
                        </label>

                        <SearchableDropdown
                            id={bankDetail.bankName}
                            setEventId={(e) => handleInput("bankName", e)}
                            options={bankNames}
                        />

                        {errors.bankName && (
                            <span className="text-danger">{errors.bankName}</span>
                        )}
                    </div>

                    {/* BRANCH NAME */}
                    <div className="col-md-4">
                        <label className="form-label">
                            Branch Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={bankDetail.bankBranchName || ""}
                            onChange={(e) => handleInput("bankBranchName", e)}
                        />
                        {errors.bankBranchName && (
                            <span className="text-danger">{errors.bankBranchName}</span>
                        )}
                    </div>

                    {/* BSR CODE */}
                    <div className="col-md-4">
                        <label className="form-label">BSR Code</label>
                        <input
                            type="text"
                            className="form-control"
                            value={bankDetail.bsrCode || ""}
                            onChange={(e) => handleInput("bsrCode", e)}
                        />
                        {errors.bsrCode && (
                            <span className="text-danger">{errors.bsrCode}</span>
                        )}
                    </div>
                    {/* BSR CODE */}
                    <div className="col-md-4">
                        <label className="form-label">Description</label>
                        <textarea
                            type="text"
                            className="form-control"
                            value={bankDetail.description || ""}
                            rows={2}
                            onChange={(e) => handleInput("description", e)}
                        />
                        {errors.description && (
                            <span className="text-danger">{errors.description}</span>
                        )}
                    </div>

                    <div className="col-md-12 mt-4">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={(e) => props.handleSave(e)}
                        >
                            Save Bank Detail
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
