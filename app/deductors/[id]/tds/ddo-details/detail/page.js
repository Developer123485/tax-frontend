"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DDODetail from "@/app/components/ddo-details/detail";
import { EnumService } from "@/app/services/enum.service";
import { DdoDetailService } from "@/app/services/ddoDetail.service";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonService } from "@/app/services/common.service";
import HeaderList from "@/app/components/header/header-list";

export default function AddDdoDetail({ params }) {
    const resolvedParams = use(params);
    const deductorId = resolvedParams?.id;
    const [active, setActive] = useState(0);
    const [enumList, setEnumList] = useState({});
    const [isNextDirty, setIsNextDirty] = useState(false);
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
            name: "DDO List",
            isActive: false,
            href: `/deductors/${deductorId}/tds/ddo-details`,
        },
        {
            name: "DDO Details",
            isActive: true,
        },
    ]);
    const [ddoDetail, setDdoDetail] = useState({
        id: 0,
        name: "",
        tan: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        city: "",
        state: "",
        pincode: "",
        emailID: "",
        ddoRegNo: "",
        ddoCode: "",
        userId: null,
        deductorId: "",
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
        EnumService.getEnumStatues().then((res) => {
            if (res) {
                setEnumList(res);
            }
        });
        getDDODetail();
    }, []);

    useEffect(() => {
        validateDetail();
    }, [
        ddoDetail.name,
        ddoDetail.tan,
        ddoDetail.state,
        ddoDetail.address1,
        ddoDetail.pincode,
        ddoDetail.city,
    ]);


    function getDDODetail() {
        if (searchParams.get("id")) {
            DdoDetailService.getDdoDetail(parseInt(searchParams.get("id"))).then(
                (res) => {
                    if (res && res.id > 0) {
                        setDdoDetail(res);
                    }
                }
            );
        }
    }

    function handleInput(names, e) {
        debugger
        setDdoDetail((prevState) => ({
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

    function saveDdoDetail(e) {
        e.preventDefault();
        setIsDirty(true);
        if (validateDetail()) {
            ddoDetail.deductorId = deductorId;
            DdoDetailService.saveDdoDetail(ddoDetail)
                .then((res) => {
                    if (res && res > 0) {
                        toast.success("DDO Detail saved successfully");
                        router.push(`/deductors/${deductorId}/tds/ddo-details`);
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
                        <DDODetail
                            setActive={(e) => setActive(e)}
                            enumList={enumList}
                            isNextDirty={isNextDirty}
                            ddoDetail={ddoDetail}
                            ddoErrors={ddoErrors}
                            isDirty={isDirty}
                            handleInput={handleInput}
                            handleSaveDDODetail={saveDdoDetail}
                        ></DDODetail>
                    </div>
                </div>
            </section>
        </>
    );
}
