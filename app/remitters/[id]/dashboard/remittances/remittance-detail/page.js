"use client";

import React, { useEffect, useState, use } from "react";
import HeaderList from "@/app/components/header/header-list";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import RemittanceDetailA from "@/app/components/remittances/remittance-detail-part-a";
import RemittanceDetailB from "@/app/components/remittances/remittance-detail-part-b";
import RemittanceDetailD from "@/app/components/remittances/remittance-detail-part-d";
import RemittanceDetailC from "@/app/components/remittances/remittance-detail-part-c";
import { RemittanceService } from "@/app/services/remittances.service";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { EnumService } from "@/app/services/enum.service";
import RemittanceDetailCA from "@/app/components/remittances/remittance-detail-part-ca";
import { RemitteeService } from "@/app/services/remittee.service";

export default function AddRemittance({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const remitterId = resolvedParams?.id;
    const search = useSearchParams();
    const id = search.get("id");

    // ---------------------------------------------------
    // FULL MODEL MATCHING SaveRemittanceModel (C#)
    // ---------------------------------------------------
    const [model, setModel] = useState({
        id: 0,

        // =====================
        // BASIC
        // =====================
        country: "",
        countryOther: null,

        aggregateAmount: null,
        amountPayable: null,
        amountOfTds: null,

        inForiegn: null,
        inIndian: null,
        grossedUp: null,

        otherNature: "",
        wheatherTaxPayable: "",

        currency: "",
        currencyOther: "",

        rateOfTds: null,
        dateOfDeduction: null,

        nameOfBank: "",
        nameOfBranch: "",
        bsrCode: "",

        proposedDate: null,
        nature: "",
        purposeCode: "",
        purposeCode1: "",

        certificateDate: null,
        certificateNo: "",
        formType: "",

        // =====================
        // IT ACT
        // =====================
        itActRelevantSection: "",
        itActIncomeChargeable: null,
        itActTaxLiability: null,
        itActBasisForTax: "",

        // =====================
        // DTAA
        // =====================
        taxResidCert: null,
        relevantDtaa: "",
        relevantArtDtaa: "",
        taxIncDtaa: null,
        taxLiablDtaa: null,

        remForRoyFlg: null,
        artDtaa: "",
        rateTdsADtaa: null,

        remAcctBusIncFlg: null,
        incLiabIndiaFlg: null,
        amtToTaxInd: null,
        arrAtRateDedTax: null,
        reasonofReleventArtDtaa: "",
        rateDednDtaa: "",

        remOnCapGainFlg: null,
        amtLongTrm: null,
        amtShortTrm: null,
        basisTaxIncDtaa: "",

        otherRemDtaa: null,
        natureRemDtaa: null,
        taxIndDtaaFlg: null,
        rateTdsDDtaa: null,
        relArtDetlDDtaa: null,

        // =====================
        // TDS
        // =====================
        amtPayForgnTds: null,
        amtPayIndianTds: null,
        rateTdsSecbFlg: null,
        rateTdsSecB: null,
        actlAmtTdsForgn: null,
        dednDateTds: null,

        // =====================
        // DECLARATION
        // =====================
        i_We: "I",
        verificationDate: null,
        verDesignation: "",
        verificationPlace: "",

        // =====================
        // AUDIT / LINKS
        // =====================
        createdDate: null,
        updatedDate: null,
        createdBy: null,
        updatedBy: null,
        userId: 0,
        remitterId: remitterId,
        remitteeId: null,
        bankDetailId: null,
        aoOrderDetailId: null,
        accountantDetailId: null
    });



    const breadcrumbs = [
        { name: "Remitters", href: "/remitters", isActive: false },
        { name: "Dashboard", href: `/remitters/${remitterId}/dashboard`, isActive: false },
        { name: "Remittance", href: search.get("partType") == "C" ? `/remitters/${remitterId}/dashboard/remittances?partType=${search.get("partType")}&formType=${search.get("formType")}` : `/remitters/${remitterId}/dashboard/remittances?partType=${search.get("partType")}`, isActive: false },
        { name: "Remittance Detail", isActive: true }
    ];

    const [errors, setErrors] = useState({});
    const [isDirty, setIsDirty] = useState(false);
    const [remitteeList, setRemitteeList] = useState([]);
    const [enums, setEnums] = useState([]);
    const [dropdowns, setDropdowns] = useState([]);

    useEffect(() => {
        EnumService.getEnumStatues().then((res) => {
            if (res) {
                setEnums(res || []);
            }
        });
        RemittanceService.getRemittanceDropdowns(remitterId).then((res) => {
            if (res) {
                setDropdowns(res || []);
            }
        });

        if (id) {
            RemittanceService.getRemittance(id).then((r) => setModel(r));
        }
    }, []);

    useEffect(() => {
        validate();
    }, [model.nature, model.otherNature, model.accountantDetailId,
    model.bankDetailId, model.aoOrderDetailId, model.remitterId, model.purposeCode, model.purposeCode1,
    model.amountOfTds, model.tdsRate, model.currency, model.currencyOther, model.country, model.countryOther,
    model.proposedDate,
    model.grossedUp,
    model.dtaaTaxResidencyAvailable,
    model.inForiegn,
    model.inIndian,
    model.remittanceForRoyality,
    model.remitteeId,
    model.i_We,
    model.verDesignation,
    model.verificationDate,
    model.verificationPlace,
    model.rateTdsADtaa,
    model.artDtaa,
    model.remForRoyFlg,
    model.taxResidCert,
    model.remAcctBusIncFlg,
    model.rateDednDtaa,
    model.amtToTaxInd,
    model.remOnCapGainFlg,
    model.amtShortTrm,
    model.amtLongTrm,
    model.otherRemDtaa,
    model.natureRemDtaa,
    model.taxIndDtaaFlg,
    model.relArtDetlDDtaa,
    model.rateTdsDDtaa,
    model.certificateDate,
    model.certificateDate,
    model.grossedUp,
    model.basisTaxIncDtaa,
    ]);


    function handleInput(field, e) {
        const value = e?.target?.value ?? e;
        setModel((p) => ({ ...p, [field]: value }));
        if (field == "remitteeId") {
            RemitteeService.getRemittee(e?.target?.value).then(res => {
                setModel((p) => ({ ...p, ["country"]: res.countryRemMade }));
                setModel((p) => ({ ...p, ["countryOther"]: res.countryRemMadeDesc }));
                setModel((p) => ({ ...p, ["currency"]: res.currency }));
                setModel((p) => ({ ...p, ["currencyOther"]: res.currencyOther }));
            })
        }
    }

    function validate() {
        let e = {};
        if (search.get("partType") == "A") {
            if (!model.nature) e.nature = "Nature is required";
            if (!model.remitteeId) e.remitteeId = "Select remittee";
            if (!model.bankDetailId) e.bankDetailId = "Select bank";
            if (!model.purposeCode) e.purposeCode = "required!";
            if (!model.otherNature && model.nature == "16.99") e.otherNature = "required!";
            if (!model.purposeCode1) e.purposeCode1 = "required!";
            if (!model.amountOfTds) e.amountOfTds = "required!";
            if (!model.tdsRate) e.tdsRate = "required!";
            if (!model.inIndian) e.inIndian = "required!";
            if (!model.proposedDate) e.proposedDate = "required!";
            if (!model.i_We) e.i_We = "required!";
            if (!model.verificationPlace) e.verificationPlace = "required!";
            if (!model.verificationDate) e.verificationDate = "required!";
            if (!model.country) e.country = "Select Country";
            if (!model.countryOther && model.country == "9999") e.countryOther = "Required";
            setErrors(e);
            return Object.keys(e).length === 0;
        }
        if (search.get("partType") == "B") {
            if (!model.nature) e.nature = "Nature is required";
            if (!model.remitteeId) e.remitteeId = "Select remittee";
            if (!model.bankDetailId) e.bankDetailId = "Select bank";
            if (!model.aoOrderDetailId) e.aoOrderDetailId = "Select AO Detail";
            if (!model.currency) e.currency = "Select Currency";
            if (!model.currencyOther && model.currency == "99") e.currencyOther = "Required";
            if (!model.country) e.country = "Select Country";
            if (!model.countryOther && model.country == "9999") e.countryOther = "Required";
            if (!model.purposeCode) e.purposeCode = "required!";
            if (!model.otherNature && model.nature == "16.99") e.otherNature = "required!";
            if (!model.purposeCode1) e.purposeCode1 = "required!";
            if (!model.amountOfTds) e.amountOfTds = "required!";
            if (!model.tdsRate) e.tdsRate = "required!";
            if (!model.inIndian) e.inIndian = "required!";
            if (!model.inForiegn) e.inForiegn = "required!";
            if (!model.proposedDate) e.proposedDate = "required!";
            if (!model.i_We) e.i_We = "required!";
            if (!model.verificationPlace) e.verificationPlace = "required!";
            if (!model.verificationDate) e.verificationDate = "required!";
            setErrors(e);
            return Object.keys(e).length === 0;
        }
        if (search.get("partType") == "D") {
            if (!model.nature) e.nature = "Nature is required";
            if (!model.remitteeId) e.remitteeId = "Select remittee";
            if (!model.bankDetailId) e.bankDetailId = "Select bank";
            if (!model.currency) e.currency = "Select Currency";
            if (!model.currencyOther && model.currency == "99") e.currencyOther = "Required";
            if (!model.purposeCode) e.purposeCode = "required!";
            if (!model.otherNature && model.nature == "16.99") e.otherNature = "required!";
            if (!model.purposeCode1) e.purposeCode1 = "required!";
            if (!model.inIndian) e.inIndian = "required!";
            if (!model.inForiegn) e.inForiegn = "required!";
            if (!model.proposedDate) e.proposedDate = "required!";
            if (!model.i_We) e.i_We = "required!";
            if (!model.country) e.country = "Select Country";
            if (!model.countryOther && model.country == "9999") e.countryOther = "Required";
            if (!model.verificationPlace) e.verificationPlace = "required!";
            if (!model.verificationDate) e.verificationDate = "required!";
            setErrors(e);
            return Object.keys(e).length === 0;
        }
        debugger
        if (search.get("partType") == "C" && search.get("formType") == "15CA") {
            if (!model.nature) e.nature = "Nature is required";
            if (!model.remitteeId) e.remitteeId = "Select remittee";
            if (!model.bankDetailId) e.bankDetailId = "Select bank";

            if (!model.aoOrderDetailId) e.aoOrderDetailId = "Select AO Detail";
            if (!model.accountantDetailId) e.accountantDetailId = "Select Account Detail";
            if (!model.currency) e.currency = "Select Currency";
            if (!model.grossedUp) e.grossedUp = "Required!";
            if (!model.currencyOther && model.currency == "99") e.currencyOther = "Required";
            if (!model.country) e.country = "Select Country";
            if (!model.countryOther && model.country == "9999") e.countryOther = "Required";
            if (!model.purposeCode) e.purposeCode = "required!";
            if (!model.otherNature && model.nature == "16.99") e.otherNature = "required!";
            if (!model.purposeCode1) e.purposeCode1 = "required!";
            if (!model.taxResidCert) e.taxResidCert = "required!";
            if (!model.remForRoyFlg) e.remForRoyFlg = "required!";
            if (model.remForRoyFlg == "Y" && !model.artDtaa) e.artDtaa = "required!";
            if (model.remForRoyFlg == "Y" && !model.rateTdsADtaa) e.rateTdsADtaa = "required!";
            if (model.remAcctBusIncFlg == "Y" && !model.amtToTaxInd) e.amtToTaxInd = "required!";
            if (model.remAcctBusIncFlg == "N" && !model.rateDednDtaa) e.rateDednDtaa = "required!";
            if (!model.inIndian) e.inIndian = "required!";
            if (!model.inForiegn) e.inForiegn = "required!";
            if (!model.proposedDate) e.proposedDate = "required!";
            if (!model.certificateNo) e.certificateNo = "required!";
            if (!model.certificateDate) e.certificateDate = "required!";
            if (!model.i_We) e.i_We = "required!";
            if (!model.verificationPlace) e.verificationPlace = "required!";
            if (!model.verificationDate) e.verificationDate = "required!";
            if (!model.remAcctBusIncFlg) e.remAcctBusIncFlg = "required!";
            if (!model.remOnCapGainFlg) e.remOnCapGainFlg = "required!";
            if (!model.otherRemDtaa) e.otherRemDtaa = "required!";
            if (!model.taxIndDtaaFlg) e.taxIndDtaaFlg = "required!";
            if (model.remOnCapGainFlg == "Y" && !model.amtLongTrm) e.amtLongTrm = "required!";
            if (model.remOnCapGainFlg == "Y" && !model.amtShortTrm) e.amtShortTrm = "required!";
            if (model.remOnCapGainFlg == "Y" && !model.basisTaxIncDtaa) e.basisTaxIncDtaa = "required!";
            if (model.otherRemDtaa == "Y" && !model.natureRemDtaa) e.natureRemDtaa = "required!";
            if (model.taxIndDtaaFlg == "N" && !model.relArtDetlDDtaa) e.relArtDetlDDtaa = "required!";
            if (model.taxIndDtaaFlg == "Y" && !model.rateTdsDDtaa) e.rateTdsDDtaa = "required!";
            if (!model.amtPayForgnTds) e.amtPayForgnTds = "required!";
            if (!model.amtPayIndianTds) e.amtPayIndianTds = "required!";
            if (!model.actlAmtTdsForgn) e.actlAmtTdsForgn = "required!";
            if (!model.dednDateTds) e.dednDateTds = "required!";

            setErrors(e);
            return Object.keys(e).length === 0;
        }
        if (search.get("partType") == "C" && search.get("formType") == "15CB") {
            if (!model.nature) e.nature = "Nature is required";
            if (!model.remitteeId) e.remitteeId = "Select remittee";
            if (!model.bankDetailId) e.bankDetailId = "Select bank";
            if (!model.aoOrderDetailId) e.aoOrderDetailId = "Select AO Detail";
            if (!model.accountantDetailId) e.accountantDetailId = "Select Account Detail";
            if (!model.currency) e.currency = "Select Currency";
            if (!model.grossedUp) e.grossedUp = "Required!";
            if (!model.currencyOther && model.currency == "99") e.currencyOther = "Required";
            if (!model.country) e.country = "Select Country";
            if (!model.countryOther && model.country == "9999") e.countryOther = "Required";
            if (!model.purposeCode) e.purposeCode = "required!";
            if (!model.otherNature && model.nature == "16.99") e.otherNature = "required!";
            if (!model.purposeCode1) e.purposeCode1 = "required!";
            if (!model.amountOfTds) e.amountOfTds = "required!";
            if (!model.tdsRate) e.tdsRate = "required!";
            if (!model.inIndian) e.inIndian = "required!";
            if (!model.inForiegn) e.inForiegn = "required!";
            if (!model.proposedDate) e.proposedDate = "required!";
            if (!model.dtaaTaxResidencyAvailable) e.dtaaTaxResidencyAvailable = "required!";
            if (!model.certificateNo) e.certificateNo = "required!";
            if (!model.certificateDate) e.certificateDate = "required!";
            if (!model.i_We) e.i_We = "required!";
            if (!model.verificationPlace) e.verificationPlace = "required!";
            if (!model.verificationDate) e.verificationDate = "required!";
            setErrors(e);
            return Object.keys(e).length === 0;
        }
    }

    function save(e) {
        e.preventDefault();
        setIsDirty(true);
        if (!validate()) return;
        model.remitterId = remitterId;
        model.formType = search.get("partType");
        if (search.get("partType") == "C")
            model.type = search.get("formType");
        RemittanceService.saveRemittance(model)
            .then((res) => {
                if (res) {
                    toast.success("Saved successfully");
                    if (search.get("partType") !== "C") {
                        router.push(`/remitters/${remitterId}/dashboard/remittances?partType=` + search.get("partType"));
                    } else {
                        router.push(`/remitters/${remitterId}/dashboard/remittances?partType=${search.get("partType")}&formType=${search.get("formType")}`);
                    }
                }
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || "Error saving")
            }
            );
    }


    return (
        <>
            <ToastContainer />
            <HeaderList />
            <BreadcrumbList breadcrumbs={breadcrumbs} />
            <section className="container my-5">
                {search.get("partType") == "A" && <RemittanceDetailA
                    model={model}
                    errors={errors}
                    enums={enums}
                    dropdowns={dropdowns}
                    isDirty={isDirty}
                    handleInput={handleInput}
                    partType={search.get("partType")}
                    handleSave={save}
                />
                }
                {search.get("partType") == "B" && <RemittanceDetailB
                    model={model}
                    errors={errors}
                    enums={enums}
                    dropdowns={dropdowns}
                    isDirty={isDirty}
                    handleInput={handleInput}
                    partType={search.get("partType")}
                    handleSave={save}
                />
                }
                {search.get("partType") == "D" && <RemittanceDetailD
                    model={model}
                    errors={errors}
                    enums={enums}
                    dropdowns={dropdowns}
                    isDirty={isDirty}
                    handleInput={handleInput}
                    partType={search.get("partType")}
                    handleSave={save}
                />
                }
                {search.get("partType") == "C" && search.get("formType") == "15CB" && <RemittanceDetailC
                    model={model}
                    errors={errors}
                    enums={enums}
                    dropdowns={dropdowns}
                    isDirty={isDirty}
                    handleInput={handleInput}
                    partType={search.get("partType")}
                    formType={search.get("formType")}
                    handleSave={save}
                />
                }
                {search.get("partType") == "C" && search.get("formType") == "15CA" && <RemittanceDetailCA
                    model={model}
                    errors={errors}
                    enums={enums}
                    dropdowns={dropdowns}
                    isDirty={isDirty}
                    handleInput={handleInput}
                    partType={search.get("partType")}
                    formType={search.get("formType")}
                    handleSave={save}
                />
                }
            </section>
        </>
    );
}
