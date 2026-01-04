"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderList from "@/app/components/header/header-list";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { ToastContainer, toast } from "react-toastify";
import { AoOrderService } from "@/app/services/ao-order.service";
import AoOrderDetailForm from "@/app/components/15ca-master-detail/ao-order";

export default function AddAoOrder({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const searchParams = useSearchParams();
    const [isDirty, setIsDirty] = useState(false);
    const remitterId = resolvedParams?.id;

    const [aoOrder, setAoOrder] = useState({
        id: 0,
        section: "",
        assessingOfficerName: "",
        assessingOfficerDesignation: "",
        orderDate: null,
        orderCertificateNumber: "",
        createdDate: null,
        updatedDate: null,
        createdBy: null,
        updatedBy: null,
        code: "",
        userId: 0,
        remitterId: remitterId
    });

    const [errors, setErrors] = useState({});

    const [breadcrumbs] = useState([
        { name: "Remitters", isActive: false, href: "/remitters" },
        { name: "Dashboard", isActive: false, href: `/remitters/${remitterId}/dashboard` },
        { name: "AO Order Details", isActive: false, href: `/remitters/${remitterId}/dashboard/ao-order` },
        { name: "AO Order Detail", isActive: true }
    ]);

    useEffect(() => loadAoOrder(), []);

    function loadAoOrder() {
        const id = searchParams.get("id");
        if (id) {
            AoOrderService.getAoOrder(parseInt(id)).then((res) => {
                if (res?.id > 0) setAoOrder(res);
            });
        }
    }

    function handleInput(field, e) {
        const value = e?.target?.value ?? e;
        setAoOrder((prev) => ({ ...prev, [field]: value }));
    }

    useEffect(() => {
        validate();
    }, [aoOrder.code, aoOrder.section, aoOrder.assessingOfficerName, aoOrder.assessingOfficerDesignation, aoOrder.orderCertificateNumber, aoOrder.orderDate]);

    function validate() {
        let err = {};
        if (!aoOrder.code) err.code = "Code is required";
        if (!aoOrder.section) err.section = "Section is required";
        if (!aoOrder.assessingOfficerName)
            err.assessingOfficerName = "Assessing Officer Name is required";
        if (!aoOrder.assessingOfficerDesignation)
            err.assessingOfficerDesignation = "Assessing Officer Designation is required";
        if (!aoOrder.orderCertificateNumber)
            err.orderCertificateNumber = "Order Certificate is required";
        if (!aoOrder.orderDate)
            err.orderDate = "Order Date is required";
        setErrors(err);
        return Object.keys(err).length === 0;
    }

    function saveAoOrder(e) {
        setIsDirty(true);
        e.preventDefault();
        if (!validate()) return;

        aoOrder.remitterId = remitterId;

        AoOrderService.saveAoOrder(aoOrder)
            .then(() => {
                toast.success("AO Order saved successfully");
                router.push(`/remitters/${remitterId}/dashboard/ao-order`);
            })
            .catch((err) =>
                toast.error(err?.response?.data?.message || "Error saving AO Order")
            );
    }

    return (
        <>
            <ToastContainer />
            <HeaderList />
            <BreadcrumbList breadcrumbs={breadcrumbs} />

            <section className="my-5">
                <div className="container">
                    <AoOrderDetailForm
                        aoOrder={aoOrder}
                        errors={errors}
                        isDirty={isDirty}
                        handleInput={handleInput}
                        handleSave={saveAoOrder}
                    />
                </div>
            </section>
        </>
    );
}
