"use client";
import React, { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderList from "@/app/components/header/header-list";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BankDetailService } from "@/app/services/bank.service";
import BankDetailForm from "@/app/components/15ca-master-detail/banks";
import { EnumService } from "@/app/services/enum.service";

export default function AddBankDetail({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const searchParams = useSearchParams();
    const remitterId = resolvedParams?.id;

    const [bankDetail, setBankDetail] = useState({
        id: 0,
        code: "",
        bankName: "",
        bankBranchName: "",
        bsrCode: "",
        description: "",
        remitterId: remitterId
    });

    const [bankNames, setBankNames] = useState([]);
    const [errors, setErrors] = useState({});

    const breadcrumbs = [
        { name: "Remitters", isActive: false, href: "/remitters" },
        { name: "Dashboard", isActive: false, href: `/remitters/${remitterId}/dashboard` },
        { name: "Banks", isActive: false, href: `/remitters/${remitterId}/dashboard/banks` },
        { name: "Bank Detail", isActive: true }
    ];

    useEffect(() => {
        EnumService.getEnumStatues().then((res) => {
            if (res) {
                setBankNames(res.banks || []);
            }
        });
        loadBankDetail();
    }, []);


    function loadBankDetail() {
        const id = searchParams.get("id");
        if (id) {
            BankDetailService.getBankDetail(parseInt(id)).then((res) => {
                setBankDetail(res);
            });
        }
    }

    function validate() {
        let err = {};

        if (!bankDetail.code) err.code = "Code is required";
        if (!bankDetail.bankName) err.bankName = "Bank Name is required";
        if (!bankDetail.bankBranchName) err.bankBranchName = "Branch Name is required";
        if (!bankDetail.description) err.description = "Description is required";
        if (!bankDetail.bsrCode) err.bsrCode = "Bsr Code is required";

        setErrors(err);
        return Object.keys(err).length === 0;
    }

    function handleInput(field, e) {
        const value = e?.target?.value ?? e;

        setBankDetail((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function saveBankDetail(e) {
        e.preventDefault();
        if (!validate()) return;

        bankDetail.remitterId = remitterId;

        BankDetailService.saveBankDetail(bankDetail)
            .then(() => {
                toast.success("Bank detail saved successfully");
                router.push(`/remitters/${remitterId}/dashboard/banks`);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || "Error saving record");
            });
    }

    return (
        <>
            <ToastContainer />
            <HeaderList />
            <BreadcrumbList breadcrumbs={breadcrumbs} />

            <section className="my-5 my-md-4">
                <div className="container mt-5">
                    <BankDetailForm
                        bankDetail={bankDetail}
                        errors={errors}
                        bankNames={bankNames}
                        handleInput={handleInput}
                        handleSave={saveBankDetail}
                    />
                </div>
            </section>
        </>
    );
}
