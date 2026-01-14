"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderList from "@/app/components/header/header-list";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EnumService } from "@/app/services/enum.service";
import { RemitteeService } from "@/app/services/remittee.service";
import RemitteeDetail from "@/app/components/15ca-master-detail/remittee";

export default function AddRemittee({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const searchParams = useSearchParams();
    const remitterId = resolvedParams?.id;
    const [enumList, setEnumList] = useState({});
    const [isDirty, setIsDirty] = useState(false);

    // Validation Regex
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const emailRegex = /^\S+@\S+\.\S+$/;

    const [breadcrumbs] = useState([
        {
            name: "Remitters",
            isActive: false,
            href: "/remitters",
        },
        {
            name: "Dashboard",
            isActive: false,
            href: `/remitters/${remitterId}/dashboard`,
        },
        { name: "Remittees", isActive: false, href: `/remitters/${remitterId}/dashboard/remittees` },
        { name: "Remittee Detail", isActive: true }
    ]);

    // ⚡ State (mapped to your C# model)
    const [remittee, setRemittee] = useState({
        id: 0,
        remitteePan: "",
        name: "",
        remitteeFlat: "",
        remitteeBuilding: "",
        remitteeStreet: "",
        remitteeArea: "",
        remitteeCity: "",
        remitteeState: "",
        remitteeCountry: "",
        remitteePincode: "",
        remitteeEmail: "",
        remitteePhone: "",
        nature: "",
        countryRemMade: "",
        code: "",
        countryRemMadeDesc: "",
        princPlcBusRemtee: "",
        purposeCode: "",
        createdDate: null,
        updatedDate: null,
        createdBy: null,
        updatedBy: null,
        userId: 0,
        remitterId: 0,
        status: "",
        currency: "",
        currencyOther: "",
        beneficiaryHonorific: ""
    });

    const [errors, setErrors] = useState({});

    // Load enums + existing remittee (edit)
    useEffect(() => {
        EnumService.getEnumStatues().then((res) => {
            if (res) setEnumList(res);
        });

        loadRemittee();
    }, []);

    useEffect(() => {
        validate();
    }, [remittee.remitteeEmail, remittee.name, remittee.remitteePan, remittee.code,
    remittee.countryRemMade, remittee.countryRemMadeDesc, remittee.remitteeCountry,
    remittee.status, remittee.remitteeFlat, remittee.remitteeArea, remittee.remitteeCity, remittee.remitteePincode,
    remittee.princPlcBusRemtee,
    remittee.beneficiaryHonorific
    ]);

    function loadRemittee() {
        const id = searchParams.get("id");
        if (id) {
            RemitteeService.getRemittee(remitterId, parseInt(id)).then((res) => {
                if (res?.id > 0) setRemittee(res);
            });
        }
    }

    // ----------------------------------------------------
    //           HANDLE INPUT
    // ----------------------------------------------------
    function handleInput(field, e) {
        const value = e?.target?.value ?? e;

        setRemittee((prev) => ({
            ...prev,
            [field]: value
        }));

    }

    // ----------------------------------------------------
    //                VALIDATIONS
    // ----------------------------------------------------
    function validate() {
        let err = {};
        if (!remittee.name) err.name = "Name is required";
        if (!remittee.code) err.code = "Code is required";
        if (!remittee.remitteeFlat) err.remitteeFlat = "Flat is required";
        if (!remittee.remitteeCity) err.remitteeCity = "City is required";
        if (!remittee.remitteeArea) err.remitteeArea = "Area is required";
        if (!remittee.beneficiaryHonorific) err.beneficiaryHonorific = "Beneficiary Honorific is required";
        if (!remittee.remitteeCountry) err.remitteeCountry = "Country is required";
        if (!remittee.remitteePincode) err.remitteePincode = "Zip Code is required";
        if (!remittee.status) err.status = "status is required";
        if (!remittee.princPlcBusRemtee) err.princPlcBusRemtee = "PrincPlcBusRemtee is required";
        if (!remittee.countryRemMade) err.countryRemMade = "Country Remittance is required";
        if (!remittee.countryRemMadeDesc && remittee.countryRemMade == "9999") err.countryRemMadeDesc = "Other Country Remittance is required";
        if (remittee.remitteePan && !panRegex.test(remittee.remitteePan.toUpperCase()))
            err.remitteePan = "Invalid PAN format (ABCDE1234F)";
        if (remittee.remitteeEmail && !emailRegex.test(remittee.remitteeEmail))
            err.remitteeEmail = "Invalid email format";

        // if (remittee.remitteePincode && remittee.remitteePincode.length !== 6)
        //     err.remitteePincode = "Pincode must be 6 digits";

        setErrors(err);
        return Object.keys(err).length === 0;
    }

    // ----------------------------------------------------
    //            SAVE REMITTEE
    // ----------------------------------------------------
    function saveRemittee(e) {
        e.preventDefault();
        setIsDirty(true);
        if (!validate()) return;
        remittee.remitterId = remitterId;
        RemitteeService.saveRemittee(remittee)
            .then((res) => {
                toast.success("Remittee saved successfully");
                router.push(`/remitters/${remitterId}/dashboard/remittees`);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || "Error saving remittee");
            });
    }

    return (
        <>
            <ToastContainer />
            <HeaderList />
            <BreadcrumbList breadcrumbs={breadcrumbs} />

            <section className="my-5 my-md-4">
                <div className="container mt-5">
                    {enumList && enumList.banks && <RemitteeDetail
                        remittee={remittee}
                        remitteeErrors={errors}
                        enumList={enumList}
                        isDirty={isDirty}
                        handleInputRemitter={handleInput}
                        handleSave={saveRemittee}
                    />
                    }
                </div>
            </section>
        </>
    );
}
