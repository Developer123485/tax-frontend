"use client";
import React from "react";
import SearchableDropdown from "@/app/components/deductors/searchable-dropdown";

export default function BankDetailForm(props) {
    const { bankDetail, errors, bankNames, handleInput, isDirty } = props;

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
                            Bank Code <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={bankDetail.code || ""}
                            maxLength={10}
                            onChange={(e) => {
                                e.target.value = e.target.value.trim().toUpperCase();
                                handleInput("code", e)
                            }
                            }
                        />
                        {isDirty && errors.code && (
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

                        {isDirty && errors.bankName && (
                            <span className="text-danger">{errors.bankName}</span>
                        )}
                    </div>

                    {bankDetail.bankName === "999" && (
                        <div className="col-md-4">
                            <label className="form-label">Other Bank Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control "
                                placeholder="Other Name"
                                maxLength={125}
                                value={bankDetail.description || ""}
                                onChange={(e) => handleInput("description", e)}
                            />
                            {isDirty && errors.description && <span className="text-danger">{errors.description}</span>}
                        </div>
                    )}

                    {/* BRANCH NAME */}
                    <div className="col-md-4">
                        <label className="form-label">
                            Branch Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            maxLength={100}
                            value={bankDetail.bankBranchName || ""}
                            onChange={(e) => handleInput("bankBranchName", e)}
                        />
                        {isDirty && errors.bankBranchName && (
                            <span className="text-danger">{errors.bankBranchName}</span>
                        )}
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">BSR Code</label>
                        <input
                            type="text"
                            className="form-control"
                            maxLength={7}
                            value={bankDetail.bsrCode || ""}
                            onChange={(e) => {
                                let value = e.target.value.toUpperCase();
                                const regex = /^(\d{0,3})([A-Z0-9]{0,4})$/i;
                                if (regex.test(value)) {
                                    handleInput("bsrCode", value);
                                }
                            }}
                        />
                        {isDirty && errors.bsrCode && (
                            <span className="text-danger">{errors.bsrCode}</span>
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
