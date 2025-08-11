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
            name: "DDO Details",
            isActive: false,
            href: `/deductors/${deductorId}/tds/ddo-details`,
        },
        {
            name: "DDO Wise Details",
            isActive: false,
            href: `/deductors/${deductorId}/tds/ddo-details/${ddoId}/ddo-wise-details`,
        },
        {
            name: "Details",
            isActive: true,
        },
    ]);
    const [ddoDetail, setDdoDetail] = useState({});
    const [ddoWiseDetail, setDdoWiseDetail] = useState({
        id: 0,
        taxAmount: null,
        totalTds: null,
        nature: "",
        assesmentYear: "",
        financialYear: "",
        month: "",
        userId: null,
        ddoDetailId: "",
    });
    const [ddoErrors, setDdoErrors] = useState({
        nameError: "",
        tanError: "",
        address1Error: "",
        cityError: "",
        stateError: "",
        pincodeError: "",
    });
    useEffect(() => {
        getDDODetail();
        getDDOWiseDetail();
    }, []);

    // useEffect(() => {
    //     validateDetail();
    // }, [
    //     ddoDetail.name,
    //     ddoDetail.tan,
    //     ddoDetail.state,
    //     ddoDetail.address1,
    //     ddoDetail.pincode,
    //     ddoDetail.city,
    // ]);


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
        let nameError = "";
        let tanError = "";
        let address1Error = "";
        let cityError = "";
        let stateError = "";
        let pincodeError = "";
        if (!ddoDetail.name) {
            nameError = "DDO name is required";
        }
        if (!ddoDetail.tan) {
            tanError = "DDO tan is required";
        }
        if (!ddoDetail.state) {
            stateError = "DDO State is required";
        }
        if (!ddoDetail.city) {
            cityError = "DDO city is required";
        }
        if (!ddoDetail.address1) {
            address1Error = "Address 1 is required";
        }
        if (!ddoDetail.pincode) {
            pincodeError = "DDO pincode is required";
        }
        if (
            nameError ||
            tanError ||
            address1Error ||
            cityError ||
            stateError ||
            pincodeError
        ) {
            setDdoErrors((prevState) => ({
                ...prevState,
                nameError,
                tanError,
                address1Error,
                cityError,
                stateError,
                pincodeError
            }));
            return false;
        }
        setDdoErrors((prevState) => ({
            ...prevState,
            nameError,
            tanError,
            address1Error,
            cityError,
            stateError,
            pincodeError
        }));
        return true;
    }

    function saveDdoWiseDetail(e) {
        e.preventDefault();
        setIsDirty(true);
        // if (validateDetail()) {
        ddoDetail.ddoDetailId = ddoDetail;
        DdoDetailService.saveDdoWiseDetail(ddoDetail)
            .then((res) => {
                if (res && res > 0) {
                    toast.success("DDO Detail saved successfully");
                    router.push(`/deductors/${deductorId}/tds/ddo-details/${ddoId}/ddo-wise-details`);
                }
            })
            .catch((res) => {
                toast.error(res);
            });
        // }
    }

    return (
        <>
            <ToastContainer />
            <HeaderList></HeaderList>
            <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
            <section className="my-5 my-md-4">
                <div className="container mt-5">
                    <div className="">
                        <DDOWiseDetail
                            setActive={(e) => setActive(e)}
                            ddoDetail={ddoDetail}
                            ddoWiseDetail={ddoWiseDetail}
                            ddoErrors={ddoErrors}
                            isDirty={isDirty}
                            handleInput={handleInput}
                            handleSaveDDOWiseDetail={saveDdoWiseDetail}
                        ></DDOWiseDetail>
                    </div>
                </div>
            </section>
        </>
    );
}
