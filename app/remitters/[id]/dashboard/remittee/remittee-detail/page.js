"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderList from "@/app/components/header/header-list";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EnumService } from "@/app/services/enum.service";
import { RemitteeService } from "@/app/services/remittee.service";
// import RemitteeDetail from "@/app/components/15ca-master-detail/remittee/page";

export default function AddRemittee() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [enumList, setEnumList] = useState({});
    const [isDirty, setIsDirty] = useState(false);

    // Validation Regex
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const emailRegex = /^\S+@\S+\.\S+$/;

    const [breadcrumbs] = useState([
        { name: "Remittees", isActive: false, href: "/remittees" },
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
        countryRemMadeDesc: "",
        princPlcBusRemtee: "",
        purposeCode: "",
        createdDate: null,
        updatedDate: null,
        createdBy: null,
        updatedBy: null,
        userId: 0,
        remitterId: 0
    });

    const [errors, setErrors] = useState({});

    // Load enums + existing remittee (edit)
    useEffect(() => {
        EnumService.getEnumStatues().then((res) => {
            if (res) setEnumList(res);
        });

        loadRemittee();
    }, []);

    function loadRemittee() {
        const id = searchParams.get("id");
        if (id) {
            RemitteeService.getRemittee(parseInt(id)).then((res) => {
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

        setIsDirty(true);
    }

    // ----------------------------------------------------
    //                VALIDATIONS
    // ----------------------------------------------------
    function validate() {
        let err = {};

        if (!remittee.name) err.name = "Name is required";

        if (!remittee.remitteePan) err.remitteePan = "PAN is required";
        else if (!panRegex.test(remittee.remitteePan.toUpperCase()))
            err.remitteePan = "Invalid PAN format (ABCDE1234F)";

        if (!remittee.remitteeEmail) err.remitteeEmail = "Email is required";
        else if (!emailRegex.test(remittee.remitteeEmail))
            err.remitteeEmail = "Invalid email format";

        if (remittee.remitteePincode && remittee.remitteePincode.length !== 6)
            err.remitteePincode = "Pincode must be 6 digits";

        setErrors(err);
        return Object.keys(err).length === 0;
    }

    // ----------------------------------------------------
    //            SAVE REMITTEE
    // ----------------------------------------------------
    function saveRemittee(e) {
        e.preventDefault();

        if (!validate()) return;

        RemitteesService.saveRemittee(remittee)
            .then((res) => {
                toast.success("Remittee saved successfully");
                router.push("/remittees");
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
                    {/* <RemitteeDetail
                        remittee={remittee}
                        errors={errors}
                        enumList={enumList}
                        handleInput={handleInput}
                        handleSave={saveRemittee}
                    /> */}
                </div>
            </section>
        </>
    );
}
