"use client";

import React from "react";
import SearchableDropdown from "../deductors/searchable-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RemittanceDetailCA({
    model,
    errors,
    handleInput,
    handleSave,
    enums,
    dropdowns,
    isDirty,
    formType
}) {
    return (
        <form autoComplete="off">
            <div className="row bg-light-gray px-2 py-2 rounded-3 g-3 my-4">
                <h5 className="text-blue fw-bold">Remittance Details (CB)</h5>

                {/* REMITTEE */}
                <div className="col-md-4">
                    <label className="form-label">Remittee <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.remitteeId}
                        options={dropdowns.remittees}
                        setEventId={(e) => handleInput("remitteeId", e)}
                    />
                    {isDirty && errors.remitteeId && <span className="text-danger">{errors.remitteeId}</span>}
                </div>

                {/* BANK */}
                <div className="col-md-4">
                    <label className="form-label">Bank <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.bankDetailId}
                        options={dropdowns.banks}
                        setEventId={(e) => handleInput("bankDetailId", e)}
                    />
                    {isDirty && errors.bankDetailId && <span className="text-danger">{errors.bankDetailId}</span>}
                </div>

                {/* AO */}
                <div className="col-md-4">
                    <label className="form-label">AO Details <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.aoOrderDetailId}
                        options={dropdowns.aoDetails}
                        setEventId={(e) => handleInput("aoOrderDetailId", e)}
                    />
                    {isDirty && errors.aoOrderDetailId && <span className="text-danger">{errors.aoOrderDetailId}</span>}
                </div>

                {/* ACCOUNTANT */}
                <div className="col-md-4">
                    <label className="form-label">Accountant <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.accountantDetailId}
                        options={dropdowns.accountants}
                        setEventId={(e) => handleInput("accountantDetailId", e)}
                    />
                    {isDirty && errors.accountantDetailId && <span className="text-danger">{errors.accountantDetailId}</span>}
                </div>

                {/* CERTIFICATE */}
                <div className="col-md-4">
                    <label className="form-label">Certificate No <span className="text-danger">*</span></label>
                    <input
                        className="form-control"
                        value={model.certificateNo || ""}
                        maxLength={15}
                        onChange={(e) => handleInput("certificateNo", e)}
                    />
                    {isDirty && errors.certificateNo && <span className="text-danger">{errors.certificateNo}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Certificate Date <span className="text-danger">*</span></label>
                    <DatePicker
                        selected={model.certificateDate}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => handleInput("certificateDate", e)}
                    />
                    {isDirty && errors.certificateDate && <span className="text-danger">{errors.certificateDate}</span>}
                </div>

                {/* COUNTRY */}
                <div className="col-md-4">
                    <label className="form-label">Country <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.country}
                        options={enums.countryCodeRemitter}
                        setEventId={(e) => handleInput("country", e)}
                    />
                    {isDirty && errors.country && <span className="text-danger">{errors.country}</span>}
                </div>

                {model.country === "9999" && (
                    <div className="col-md-4">
                        <label className="form-label">Other Country <span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            value={model.countryOther || ""}
                            maxLength={125}
                            onChange={(e) => handleInput("countryOther", e)}
                        />
                        {isDirty && errors.countryOther && <span className="text-danger">{errors.countryOther}</span>}
                    </div>
                )}

                {/* CURRENCY */}
                <div className="col-md-4">
                    <label className="form-label">Currency <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.currency}
                        options={enums.currencies}
                        setEventId={(e) => handleInput("currency", e)}
                    />
                    {isDirty && errors.currency && <span className="text-danger">{errors.currency}</span>}
                </div>

                {model.currency === "99" && (
                    <div className="col-md-4">
                        <label className="form-label">Other Currency <span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            value={model.currencyOther || ""}
                            onChange={(e) => handleInput("currencyOther", e)}
                        />
                        {isDirty && errors.currencyOther && <span className="text-danger">{errors.currencyOther}</span>}
                    </div>
                )}

                {/* AMOUNTS */}
                <div className="col-md-4">
                    <label className="form-label">Amount Payable (INR) <span className="text-danger">*</span></label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.inIndian || ""}
                        onChange={(e) => handleInput("inIndian", e)}
                    />
                    {isDirty && errors.inIndian && <span className="text-danger">{errors.inIndian}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Amount Payable (Foreign) <span className="text-danger">*</span></label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.inForiegn || ""}
                        onChange={(e) => handleInput("inForiegn", e)}
                    />
                    {isDirty && errors.inForiegn && <span className="text-danger">{errors.inForiegn}</span>}
                </div>


                {/* PROPOSED DATE */}
                <div className="col-md-4">
                    <label className="form-label">Proposed Date <span className="text-danger">*</span></label>
                    <DatePicker
                        selected={model.proposedDate}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => handleInput("proposedDate", e)}
                    />
                    {isDirty && errors.proposedDate && <span className="text-danger">{errors.proposedDate}</span>}
                </div>


                {/* NATURE */}
                <div className="col-md-4">
                    <label className="form-label">Nature <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.nature}
                        options={enums.incomeNatureType}
                        setEventId={(e) => handleInput("nature", e)}
                    />
                    {isDirty && errors.nature && <span className="text-danger">{errors.nature}</span>}
                </div>

                {model.nature === "16.99" && (
                    <div className="col-md-4">
                        <label className="form-label">Other Nature <span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            value={model.otherNature || ""}
                            maxLength={255}
                            onChange={(e) => handleInput("otherNature", e)}
                        />
                        {isDirty && errors.otherNature && <span className="text-danger">{errors.otherNature}</span>}
                    </div>
                )}

                {/* PURPOSE CODE */}
                <div className="col-md-4">
                    <label className="form-label">Rev Pur Category <span className="text-danger">*</span></label>
                    <SearchableDropdown
                        id={model.purposeCode}
                        options={enums.revPurCategory}
                        setEventId={(e) => handleInput("purposeCode", e)}
                    />
                    {isDirty && errors.purposeCode && <span className="text-danger">{errors.purposeCode}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Rev Pur Code (Select before Rev Pur Category)*</label>
                    <SearchableDropdown
                        id={model.purposeCode1}
                        options={
                            model.purposeCode
                                ? enums.revPurCode.filter(x =>
                                    x.key.startsWith(model.purposeCode)
                                )
                                : []
                        }
                        setEventId={(e) => handleInput("purposeCode1", e)}
                    />
                    {isDirty && errors.purposeCode1 && <span className="text-danger">{errors.purposeCode1}</span>}
                </div>

                {/* GROSSED UP */}
                <div className="col-md-4">
                    <label className="form-label">Grossed Up <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.grossedUp || "N"}
                        onChange={(e) => handleInput("grossedUp", e)}
                    >
                        <option value="N">No</option>
                        <option value="Y">Yes</option>
                    </select>
                    {isDirty && errors.grossedUp && <span className="text-danger">{errors.grossedUp}</span>}
                </div>

                <div className="col-md-12">
                    <h5 className="fw-bold mt-3">I.T. Act</h5>
                </div>

                <div className="col-md-4">
                    <label className="form-label">IT Act Relevant Section</label>
                    <input
                        className="form-control"
                        value={model.itActRelevantSection || ""}
                        maxLength={30}
                        onChange={(e) => handleInput("itActRelevantSection", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Income Chargeable (IT Act)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.itActIncomeChargeable || ""}
                        maxLength={18}
                        onChange={(e) => handleInput("itActIncomeChargeable", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Tax Liability (IT Act)</label>
                    <input
                        type="number"
                        className="form-control"
                        maxLength={18}
                        value={model.itActTaxLiability || ""}
                        onChange={(e) => handleInput("itActTaxLiability", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Basis for Tax (IT Act)</label>
                    <input
                        className="form-control"
                        value={model.itActBasisForTax || ""}
                        onChange={(e) => handleInput("itActBasisForTax", e)}
                    />
                </div>

                <div className="col-md-12">
                    <h5 className="fw-bold mt-4">DTAA</h5>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Tax Residency Certificate <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.taxResidCert || ""}
                        onChange={(e) => handleInput("taxResidCert", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.taxResidCert && <span className="text-danger">{errors.taxResidCert}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Relevant DTAA</label>
                    <input
                        className="form-control"
                        value={model.relevantDtaa || ""}
                        onChange={(e) => handleInput("relevantDtaa", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Relevant Article (DTAA)</label>
                    <input
                        className="form-control"
                        value={model.relevantArtDtaa || ""}
                        onChange={(e) => handleInput("relevantArtDtaa", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Taxable Income (DTAA)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.taxIncDtaa || ""}
                        onChange={(e) => handleInput("taxIncDtaa", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Tax Liability (DTAA)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.taxLiablDtaa || ""}
                        onChange={(e) => handleInput("taxLiablDtaa", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Remittance for Royalty <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.remForRoyFlg || ""}
                        onChange={(e) => handleInput("remForRoyFlg", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.remForRoyFlg && <span className="text-danger">{errors.remForRoyFlg}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Art Dtaa
                        {model.remForRoyFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.artDtaa || ""}
                        disabled={model.remForRoyFlg == "N"}
                        onChange={(e) => handleInput("artDtaa", e)}
                    />
                    {isDirty && model.remForRoyFlg == "Y" && errors.artDtaa && <span className="text-danger">{errors.artDtaa}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">DTAA TDS Rate (%)
                        {model.remForRoyFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={model.rateTdsADtaa || ""}
                        disabled={model.remForRoyFlg == "N"}
                        onChange={(e) => handleInput("rateTdsADtaa", e)}
                    />
                    {isDirty && model.remForRoyFlg == "Y" && errors.rateTdsADtaa && <span className="text-danger">{errors.rateTdsADtaa}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Rem Acct Bus Inc Flg <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.remAcctBusIncFlg || ""}
                        onChange={(e) => handleInput("remAcctBusIncFlg", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.remAcctBusIncFlg && <span className="text-danger">{errors.remAcctBusIncFlg}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Amount to be Taxed in India
                        {model.remAcctBusIncFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amtToTaxInd || ""}
                        disabled={model.remAcctBusIncFlg == "N"}
                        onChange={(e) => handleInput("amtToTaxInd", e)}
                    />
                    {isDirty && model.remAcctBusIncFlg == "Y" && errors.amtToTaxInd && <span className="text-danger">{errors.amtToTaxInd}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Rate Dedn Dtaa
                        {errors.remAcctBusIncFlg == "N" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.rateDednDtaa || ""}
                        disabled={model.remAcctBusIncFlg == "Y"}
                        onChange={(e) => handleInput("rateDednDtaa", e)}
                    />
                    {isDirty && model.remAcctBusIncFlg == "N" && errors.rateDednDtaa && <span className="text-danger">{errors.rateDednDtaa}</span>}
                </div>


                <div className="col-md-4">
                    <label className="form-label">Rem On Cap Gain Flg <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.remOnCapGainFlg || ""}
                        onChange={(e) => handleInput("remOnCapGainFlg", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.remOnCapGainFlg && <span className="text-danger">{errors.remOnCapGainFlg}</span>}
                </div>


                <div className="col-md-4">
                    <label className="form-label">Long Term Capital Gain
                        {model.remOnCapGainFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amtLongTrm || ""}
                        disabled={model.remOnCapGainFlg == "N"}
                        onChange={(e) => handleInput("amtLongTrm", e)}
                    />
                    {isDirty && model.remOnCapGainFlg == "Y" && errors.amtLongTrm && <span className="text-danger">{errors.amtLongTrm}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Short Term Capital Gain
                        {model.remOnCapGainFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amtShortTrm || ""}
                        disabled={model.remOnCapGainFlg == "N"}
                        onChange={(e) => handleInput("amtShortTrm", e)}
                    />
                    {isDirty && model.remOnCapGainFlg == "Y" && errors.amtShortTrm && <span className="text-danger">{errors.amtShortTrm}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Basis Tax Inc Dtaa
                        {model.remOnCapGainFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.basisTaxIncDtaa || ""}
                        disabled={model.remOnCapGainFlg == "N"}
                        onChange={(e) => handleInput("basisTaxIncDtaa", e)}
                    />
                    {isDirty && model.remOnCapGainFlg == "Y" && errors.basisTaxIncDtaa && <span className="text-danger">{errors.basisTaxIncDtaa}</span>}
                </div>


                <div className="col-md-4">
                    <label className="form-label">Other Rem Dtaa <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.otherRemDtaa || ""}
                        onChange={(e) => handleInput("otherRemDtaa", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.otherRemDtaa && <span className="text-danger">{errors.otherRemDtaa}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Nature Rem Dtaa
                        {model.otherRemDtaa == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.natureRemDtaa || ""}
                        disabled={model.otherRemDtaa === "N"}
                        onChange={(e) => handleInput("natureRemDtaa", e)}
                    />
                    {isDirty && model.otherRemDtaa == "Y" && errors.natureRemDtaa && <span className="text-danger">{errors.natureRemDtaa}</span>}
                </div>


                <div className="col-md-4">
                    <label className="form-label">Tax Ind Dtaa Flg <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.taxIndDtaaFlg || ""}
                        onChange={(e) => handleInput("taxIndDtaaFlg", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                    {isDirty && errors.taxIndDtaaFlg && <span className="text-danger">{errors.taxIndDtaaFlg}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Rate Tds DDtaa
                        {model.taxIndDtaaFlg == "Y" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.rateTdsDDtaa || ""}
                        disabled={model.taxIndDtaaFlg === "N"}
                        maxLength={125}
                        onChange={(e) => handleInput("rateTdsDDtaa", e)}
                    />
                    {isDirty && model.taxIndDtaaFlg == "Y" && errors.rateTdsDDtaa && <span className="text-danger">{errors.rateTdsDDtaa}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Rel Art DetlD Dtaa
                        {model.taxIndDtaaFlg == "N" && <span className="text-danger">*</span>}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.relArtDetlDDtaa || ""}
                        disabled={model.taxIndDtaaFlg === "Y"}
                        maxLength={125}
                        onChange={(e) => handleInput("relArtDetlDDtaa", e)}
                    />
                    {isDirty && model.taxIndDtaaFlg == "N" && errors.relArtDetlDDtaa && <span className="text-danger">{errors.relArtDetlDDtaa}</span>}
                </div>


                <div className="col-md-12">
                    <h5 className="fw-bold mt-4">TDS</h5>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Amount Payable (Foreign)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amtPayForgnTds || ""}
                        onChange={(e) => handleInput("amtPayForgnTds", e)}
                    />
                    {isDirty && errors.amtPayForgnTds && <span className="text-danger">{errors.amtPayForgnTds}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Amount Payable (Indian)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amtPayIndianTds || ""}
                        onChange={(e) => handleInput("amtPayIndianTds", e)}
                    />
                    {isDirty && errors.amtPayIndianTds && <span className="text-danger">{errors.amtPayIndianTds}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Rate Tds Secb Flg</label>
                    <input
                        type="text"
                        className="form-control"
                        value={model.rateTdsSecbFlg || ""}
                        onChange={(e) => handleInput("rateTdsSecbFlg", e)}
                    />
                </div>


                <div className="col-md-4">
                    <label className="form-label">Rate Tds Sec B</label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.rateTdsSecB || ""}
                        onChange={(e) => handleInput("rateTdsSecB", e)}
                    />
                </div>


                <div className="col-md-4">
                    <label className="form-label">Actual TDS Amount (Foreign)
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.actlAmtTdsForgn || ""}
                        onChange={(e) => handleInput("actlAmtTdsForgn", e)}
                    />
                    {isDirty && errors.actlAmtTdsForgn && <span className="text-danger">{errors.actlAmtTdsForgn}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">TDS Deduction Date
                        <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                        selected={model.dednDateTds}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => handleInput("dednDateTds", e)}
                    />
                    {isDirty && errors.dednDateTds && <span className="text-danger">{errors.dednDateTds}</span>}
                </div>


                <div className="col-md-12">
                    <h5 className="fw-bold mt-4">Declaration</h5>
                </div>

                <div className="col-md-4">
                    <label className="form-label">I / We
                        <span className="text-danger">*</span>
                    </label>
                    <select
                        className="form-select"
                        value={model.i_We}
                        onChange={(e) => handleInput("i_We", e)}
                    >
                        <option value="I">I</option>
                        <option value="WE">WE</option>
                    </select>
                    {isDirty && errors.i_We && <span className="text-danger">{errors.i_We}</span>}
                </div>

                <div className="col-md-4">
                    <label className="form-label">Verification Date
                        <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                        selected={model.verificationDate}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => handleInput("verificationDate", e)}
                    />
                    {isDirty && errors.verificationDate && <span className="text-danger">{errors.verificationDate}</span>}
                </div>

                {/* <div className="col-md-4">
                    <label className="form-label">Designation
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control"
                        value={model.verDesignation || ""}
                        onChange={(e) => handleInput("verDesignation", e)}
                    />
                    {isDirty && errors.verDesignation && <span className="text-danger">{errors.verDesignation}</span>}
                </div> */}

                <div className="col-md-4">
                    <label className="form-label">Place
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control"
                        value={model.verificationPlace || ""}
                        onChange={(e) => handleInput("verificationPlace", e)}
                    />
                    {isDirty && errors.verificationPlace && <span className="text-danger">{errors.verificationPlace}</span>}

                </div>


                {/* TDS */}
                {/* <div className="col-md-4">
                    <label className="form-label">TDS Rate (%) <span className="text-danger">*</span></label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={model.rateOfTds || ""}
                        onChange={(e) => handleInput("rateOfTds", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Amount of TDS <span className="text-danger">*</span></label>
                    <input
                        type="number"
                        className="form-control"
                        value={model.amountOfTds || ""}
                        onChange={(e) => handleInput("amountOfTds", e)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Date of Deduction</label>
                    <DatePicker
                        selected={model.dateOfDeduction}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => handleInput("dateOfDeduction", e)}
                    />
                </div> */}

                {/* TAX PAYABLE */}
                {/* <div className="col-md-4">
                    <label className="form-label">Whether Tax Payable <span className="text-danger">*</span></label>
                    <select
                        className="form-select"
                        value={model.wheatherTaxPayable || ""}
                        onChange={(e) => handleInput("wheatherTaxPayable", e)}
                    >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                </div> */}

                {/* SAVE */}
                <div className="col-md-12 mt-3">
                    <button type="button" className="btn btn-primary" onClick={handleSave}>
                        Save Remittance
                    </button>
                </div>
            </div>
        </form>
    );
}
