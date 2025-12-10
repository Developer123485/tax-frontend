"use client";

import React, { useEffect, useState } from "react";
import HeaderList from "@/app/components/header/header-list";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import RemittanceDetail from "@/app/components/15ca-master-detail/remittance";
import { RemittanceService } from "@/app/services/remittance.service";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddRemittance({ params }) {

    const router = useRouter();
    const resolved = params;
    const remitterId = resolved.id;
    const search = useSearchParams();
    const id = search.get("id");

    const [model, setModel] = useState({});
    const [errors, setErrors] = useState({});
    const [remitteeList, setRemitteeList] = useState([]);
    const [bankList, setBankList] = useState([]);

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

    useEffect(() => {
        RemittanceService.getRemittees(remitterId).then((r) => setRemitteeList(r));
        RemittanceService.getBanks(remitterId).then((r) => setBankList(r));

        if (id) {
            RemittanceService.getRemittance(id).then((r) => setModel(r));
        }
    }, []);

    const breadcrumbs = [
        { name: "Remitters", href: "/remitters", isActive: false },
        { name: "Dashboard", href: `/remitters/${remitterId}/dashboard`, isActive: false },
        { name: "Remittance", href: `/remitters/${remitterId}/dashboard/remittance`, isActive: false },
        { name: "Remittance Detail", isActive: true }
    ];

    return (
        <>
            <ToastContainer />
            <HeaderList />
            <BreadcrumbList breadcrumbs={breadcrumbs} />

            <section className="container my-5">
                <RemittanceDetail
                    model={model}
                    errors={errors}
                    remitteeList={remitteeList}
                    bankList={bankList}
                    handleInput={handleInput}
                    handleSave={save}
                />
            </section>
        </>
    );
}
