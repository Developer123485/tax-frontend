"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderList from "@/app/components/header/header-list";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { ToastContainer, toast } from "react-toastify";
import { AccountantService } from "@/app/services/accountant.service";
import AccountantDetailForm from "@/app/components/15ca-master-detail/accountant";

export default function AddAccountant({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const searchParams = useSearchParams();
    const remitterId = resolvedParams?.id;

    const [accountant, setAccountant] = useState({
        id: 0,
        accountantName: "",
        accountantFirmName: "",
        flatDoorBlockNo: "",
        premisesBuildingVillage: "",
        roadStreetPostOffice: "",
        areaLocality: "",
        townCityDistrict: "",
        state: "",
        country: "",
        pinCode: "",
        registrationNo: "",
        certificateDate: null,
        certificateNo: "",
        code: "",
        createdDate: null,
        updatedDate: null,
        createdBy: null,
        updatedBy: null,
        userId: 0,
        remitterId: remitterId
    });

    const [errors, setErrors] = useState({});

    const [breadcrumbs] = useState([
        { name: "Remitters", isActive: false, href: "/remitters" },
        { name: "Dashboard", isActive: false, href: `/remitters/${remitterId}/dashboard` },
        { name: "Accountants", isActive: false, href: `/remitters/${remitterId}/dashboard/accountants` },
        { name: "Accountant Detail", isActive: true }
    ]);

    useEffect(() => loadAccountant(), []);

    function loadAccountant() {
        const id = searchParams.get("id");
        if (id) {
            AccountantService.getAccountant(parseInt(id)).then((res) => {
                if (res?.id > 0) setAccountant(res);
            });
        }
    }

    function handleInput(field, e) {
        const value = e?.target?.value ?? e;
        setAccountant((prev) => ({ ...prev, [field]: value }));
    }

    // VALIDATION
    function validate() {
        let err = {};
        if (!accountant.accountantName) err.accountantName = "Name is required";
        if (!accountant.code) err.code = "Code is required";
        setErrors(err);
        return Object.keys(err).length === 0;
    }

    function saveAccountant(e) {
        e.preventDefault();
        if (!validate()) return;

        accountant.remitterId = remitterId;

        AccountantService.saveAccountant(accountant)
            .then(() => {
                toast.success("Accountant saved successfully");
                router.push(`/remitters/${remitterId}/dashboard/accountants`);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || "Error saving accountant");
            });
    }

    return (
        <>
            <ToastContainer />
            <HeaderList />
            <BreadcrumbList breadcrumbs={breadcrumbs} />

            <section className="my-5">
                <div className="container">
                    <AccountantDetailForm
                        accountant={accountant}
                        errors={errors}
                        handleInput={handleInput}
                        handleSave={saveAccountant}
                    />
                </div>
            </section>
        </>
    );
}
