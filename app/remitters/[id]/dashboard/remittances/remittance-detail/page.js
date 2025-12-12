"use client";

import React, { useEffect, useState, use } from "react";
import HeaderList from "@/app/components/header/header-list";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import RemittanceDetail from "@/app/components/remittances/remittance-detail";
import { RemittanceService } from "@/app/services/remittances.service";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { EnumService } from "@/app/services/enum.service";

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
        country: "",
        aggregateAmount: null,
        amountPayable: null,
        amountOfTds: null,
        inForiegn: null,
        inIndian: null,
        grossedUp: null,
        itActRelevantSection: "",
        itActIncomeChargeable: null,
        itActTaxLiability: null,
        itActBasisForTax: "",
        dtaaTaxResidencyAvailable: null,
        dtaaRelevant: "",
        dtaaRelevantArticle: "",
        dtaaTaxableIncomeAsPerDtaa: null,
        dtaaTaxLiabilityAsPerDtaa: null,
        dtaaArticleForRoyaltyOrFts: "",
        dtaaTdsRatePercentage: null,

        businessIncomeAmount: null,
        businessIncomeTaxBasis: "",
        capitalGainsLongTerm: null,
        capitalGainsShortTerm: null,
        capitalGainsTaxBasis: "",

        otherRemittanceNature: "",
        otherRemittanceTaxableAsPerDtaa: null,
        otherRemittanceTdsRate: null,
        otherRemittanceReasonIfNoTds: "",

        tdsAmountInForeignCurrency: null,
        tdsAmountInINR: null,
        tdsRate: null,

        actualRemittanceAfterTds: null,
        tdsDeductionDate: "",
        otherNature: "",
        wheatherTaxPayable: "",
        currency: "",
        currencyOther: "",
        rateOfTds: null,
        dateOfDeduction: "",
        nameOfBank: "",
        nameOfBranch: "",
        bsrCode: "",
        proposedDate: "",
        nature: "",
        purposeCode: "",
        createdDate: "",
        updatedDate: "",
        createdBy: null,
        updatedBy: null,
        userId: 0,
        remitterId: remitterId,
        formType: "",

        // Dropdowns (FK)
        remitteeId: "",
        bankDetailId: ""
    });


    const breadcrumbs = [
        { name: "Remitters", href: "/remitters", isActive: false },
        { name: "Dashboard", href: `/remitters/${remitterId}/dashboard`, isActive: false },
        { name: "Remittance", href: `/remitters/${remitterId}/dashboard/remittance`, isActive: false },
        { name: "Remittance Detail", isActive: true }
    ];

    const [errors, setErrors] = useState({});
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
            debugger
            if (res) {
                setDropdowns(res || []);
            }
        });

        if (id) {
            RemittanceService.getRemittance(id).then((r) => setModel(r));
        }
    }, []);


    function handleInput(field, e) {
        const value = e?.target?.value ?? e;
        setModel((p) => ({ ...p, [field]: value }));
    }

    function validate() {
        let e = {};

        if (!model.currency) e.currency = "Currency is required";
        if (!model.nature) e.nature = "Nature is required";
        if (!model.remitteeId) e.remitteeId = "Select remittee";
        if (!model.bankDetailId) e.bankDetailId = "Select bank";

        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function save(e) {
        e.preventDefault();
        if (!validate()) return;

        model.remitterId = remitterId;

        RemittanceService.saveRemittance(model)
            .then(() => {
                toast.success("Saved successfully");
                router.push(`/remitters/${remitterId}/dashboard/remittance`);
            })
            .catch((err) =>
                toast.error(err?.response?.data?.message || "Error saving")
            );
    }


    return (
        <>
            <ToastContainer />
            <HeaderList />
            <BreadcrumbList breadcrumbs={breadcrumbs} />
            <section className="container my-5">
                {enums && enums.banks?.length > 0 && dropdowns && dropdowns.remittees?.length > 0 && <RemittanceDetail
                    model={model}
                    errors={errors}
                    enums={enums}
                    dropdowns={dropdowns}
                    handleInput={handleInput}
                    handleSave={save}
                />
                }
            </section>
        </>
    );
}
