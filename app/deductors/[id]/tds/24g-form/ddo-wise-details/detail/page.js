"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EnumService } from "@/app/services/enum.service";
import { DdoDetailService } from "@/app/services/ddoDetail.service";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonService } from "@/app/services/common.service";
import HeaderList from "@/app/components/header/header-list";
import DDOWiseDetail from "@/app/components/ddo-wise-details/detail";

export default function AddDdoWiseDetail({ params }) {
    const resolvedParams = use(params);
    const deductorId = resolvedParams?.id;
    const ddoId = resolvedParams?.ddoId;
    const [active, setActive] = useState(0);
    const [confirmModal, setConfirmModal] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
    const searchParams = useSearchParams(null);
    const monthsShort = [
        { value: '01', label: 'Jan' },
        { value: '02', label: 'Feb' },
        { value: '03', label: 'Mar' },
        { value: '04', label: 'Apr' },
        { value: '05', label: 'May' },
        { value: '06', label: 'Jun' },
        { value: '07', label: 'Jul' },
        { value: '08', label: 'Aug' },
        { value: '09', label: 'Sep' },
        { value: '10', label: 'Oct' },
        { value: '11', label: 'Nov' },
        { value: '12', label: 'Dec' }
    ];
    const [captchaBase64, setCaptchaBase64] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState('');
    const emailRegex =
        /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
    const router = useRouter(null);
    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            name: "Deductors",
            isActive: false,
            href: "/deductors",
        },
        {
            name: "TDS Dashboard",
            isActive: false,
            href: `/deductors/${deductorId}/tds`,
        },
        {
            name: "24G Details",
            isActive: false,
            href: `/deductors/${deductorId}/tds/24g-form`,
        },
        {
            name: "DDO Wise Details",
            isActive: false,
            href: `/deductors/${deductorId}/tds/24g-form/ddo-wise-details`,
        },
        {
            name: "Details",
            isActive: true,
        },
    ]);
    const [ddoDetail, setDdoDetail] = useState({});
    const [ddoWiseDetail, setDdoWiseDetail] = useState({
        id: 0,
        taxAmount: 0,
        totalTds: 0,
        nature: "",
        assesmentYear: "",
        financialYear: "",
        month: "",
        userId: null,
        ddoDetailId: "",
    });
    const [ddoErrors, setDdoWiseErrors] = useState({
        totalTdsError: "",
        taxAmountError: "",
    });
    useEffect(() => {
        getDDODetail();
        getDDOWiseDetail();
    }, []);

    useEffect(() => {
        validateDetail();
    }, [
        ddoWiseDetail.totalTds,
        ddoWiseDetail.taxAmount,
    ]);


    function getDDODetail() {
        if (ddoId > 0) {
            DdoDetailService.getDdoDetail(ddoId).then(
                (res) => {
                    if (res && res.id > 0) {
                        setDdoDetail(res);
                    }
                }
            );
        }
    }

    function getDDOWiseDetail() {
        if (searchParams.get("ddoWiseId")) {
            DdoDetailService.getDdoWiseDetail(parseInt(searchParams.get("ddoWiseId"))).then(
                (res) => {
                    if (res && res.id > 0) {
                        setDdoWiseDetail(res);
                    }
                }
            );
        }
    }

    function handleInput(names, e) {
        setDdoWiseDetail((prevState) => ({
            ...prevState,
            [names]: e.target.value,
        }));
    }

    function validateDetail() {
        let totalTdsError = "";
        let taxAmountError = "";
        if (!ddoWiseDetail.totalTds) {
            totalTdsError = "Total Tds is required";
        }
        if (!ddoWiseDetail.taxAmount) {
            taxAmountError = "Tax Amount is required";
        }
        if (
            totalTdsError ||
            taxAmountError
        ) {
            setDdoWiseErrors((prevState) => ({
                ...prevState,
                totalTdsError,
                taxAmountError,
            }));
            return false;
        }
        setDdoWiseErrors((prevState) => ({
            ...prevState,
            totalTdsError,
            taxAmountError,
        }));
        return true;
    }

    function saveDdoWiseDetail(e) {
        e.preventDefault();
        setIsDirty(true);
        if (validateDetail()) {
            ddoWiseDetail.ddoDetailId = ddoId;
            ddoWiseDetail.month = searchParams.get("month");
            ddoWiseDetail.financialYear = searchParams.get("financial_year");
            DdoDetailService.saveDdoWiseDetail(ddoWiseDetail)
                .then((res) => {
                    if (res) {
                        toast.success("DDO Detail saved successfully");
                        window.location.href = `/deductors/${deductorId}/tds/ddo-details/${ddoId}/ddo-wise-details`;
                    }
                })
                .catch((res) => {
                    toast.error(res);
                });
        }
    }

    return (
        <>
            <ToastContainer />
            <HeaderList></HeaderList>
            <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
            <section className="my-5 my-md-4">
                <div className="container mt-5">
                    <div className="">
                        <div className="row bg-light-gray px-3 py-4 px-md-2 py-md-3 rounded-3 mb-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="text-blue fw-bold">
                                        Detail ({searchParams.get("financial_year")},{" "}
                                        {monthsShort.find(p => p.value == searchParams.get("month"))?.label})
                                    </h5>
                                </div>
                            </div>
                            <DDOWiseDetail
                                setActive={(e) => setActive(e)}
                                ddoDetail={ddoDetail}
                                ddoWiseDetail={ddoWiseDetail}
                                ddoErrors={ddoErrors}
                                isDirty={isDirty}
                                handleInput={handleInput}
                            ></DDOWiseDetail>
                        </div>
                        <div className="col-md-12 justify-content-start">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => saveDdoWiseDetail(e)}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
