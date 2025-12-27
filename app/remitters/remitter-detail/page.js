"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EnumService } from "../../services/enum.service";
import BreadcrumbList from "../../components/breadcrumbs/page";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonService } from "@/app/services/common.service";
import HeaderList from "@/app/components/header/header-list";
import Modal from "react-bootstrap/Modal";
import { TracesActivitiesService } from "@/app/services/tracesActivities.service";
import { FuvValidateReturnService } from "@/app/services/fuvValidateReturn.service";
import { RemittersService } from "@/app/services/remitters.service";
import RemitterDetail from "@/app/components/remitters/detail/page";

export default function AddRemitter() {
    const [active, setActive] = useState(0);
    const [enumList, setEnumList] = useState({});
    const [confirmModal, setConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [isNextDirty, setIsNextDirty] = useState(false);
    const [itdLoginLoading, setItdLoginLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
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
            name: "Remitters",
            isActive: false,
            href: "/remitters",
        },
        {
            name: "Remitter Detail",
            isActive: true,
        },
    ]);
    const [remitterDetail, setRemitterDetail] = useState({
        id: 0,
        remitterTan: "",
        remitterPan: "",
        name: "",
        remitterFlat: "",
        remitterBuilding: "",
        remitterStreet: "",
        remitterArea: "",
        remitterCity: "",
        remitterState: "",
        remitterCountry: "", // since no field in UI
        remitterPincode: "",
        remitterEmail: "",
        remitterPhone: "",
        remitterStatus: "",        // no equivalent
        remitterResidential: "",   // no equivalent
        createdDate: null,
        updatedDate: null,
        createdBy: null,
        updatedBy: null,
        userId: 0,
        itdLogin: "",
        itdPassword: "",
        tanAckPartC: "",
        incTaxWard: "",
        princPlcBusRemter: "",
        domesticFlg: "",
        areaCode: "",
        rangeCode: "",
        aoType: "",
        aoNumber: "",
        responsibleName: "",
        fatherName: "",
        motherName: "",
        desgination: "",
        code: "",
    });
    const [remitterErrors, setRemitterErrors] = useState({
        remitterStateError: "",
        remitterPincodeError: "",
        remitterEmailIdError: "",
        remitterNameError: "",
        remitterTanError: "",
        remitterBranchError: "",
        remitterFlatNoError: "",
        remitterStreetError: "",
        remitterBuildingNameError: "",
        remitterAreaError: "",
        remitterCountryError: "",
        remitterDistrictError: "",
        remitterPanError: "",
        statusError: "",
        remitterResidentialError: "",
        codeError: "",
        princPlcBusRemterError: "",
    });
    useEffect(() => {
        EnumService.getEnumStatues().then((res) => {
            if (res) {
                setEnumList(res);
            }
        });
        getRemiter();
    }, []);

    useEffect(() => {
        validateRemitterDetail();
    }, [
        remitterDetail.name,
        remitterDetail.remitterTan,
        remitterDetail.remitterPan,
        remitterDetail.remitterEmail,
        remitterDetail.remitterFlat,
        remitterDetail.remitterState,
        remitterDetail.remitterPincode,
        remitterDetail.remitterBuilding,
        remitterDetail.remitterArea,
        remitterDetail.remitterStreet,
        remitterDetail.remitterCountry,
        remitterDetail.remitterResidential,
        remitterDetail.remitterStatus,
        remitterDetail.code
    ]);

    function getRemiter() {
        if (searchParams.get("id")) {
            RemittersService.getRemitter(parseInt(searchParams.get("id"))).then(
                (res) => {
                    if (res && res.id > 0) {
                        setRemitterDetail(res);
                    }
                }
            );
        }
    }

    function handleInputRemitter(names, e) {
        if (names == "remitterState" || names == "remitterCountry" || names == "remitterStatus" || names == "remitterResidential") {
            setRemitterDetail((prevState) => ({
                ...prevState,
                [names]: e,
            }));
        } else {
            setRemitterDetail((prevState) => ({
                ...prevState,
                [names]: e.target.value,
            }));
        }
    }

    function resendCaptcha(e) {
        setResendLoading(true);
        TracesActivitiesService.resendCaptcha().then(res => {
            if (res) {
                setCaptchaBase64(res.captcha);
            }
            setResendLoading(false);
        }).catch(e => {
            if (e?.response?.data?.errorMessage) {
                toast.error(e?.response?.data?.errorMessage);
            }
            else {
                toast.error(e?.message);
            }
            setResendLoading(false);
        })
    }


    function handleSubmit(params) {
        if (!inputCaptcha && inputCaptcha?.length !== 5) {
            toast.error("Please enter the 5-character captcha");
            return false;
        }
        setLoading(true);
        const model = {
            captcha: inputCaptcha,
            deductorId: remitterDetail.id
        }
        TracesActivitiesService.submitCaptcha(model).then(res => {
            if (res) {
                setInputCaptcha("");
                toast.success("User verified successfully");
                setConfirmModal(false);
                getRemiter();
            }
            setLoading(false);
        }).catch(e => {
            if (e?.response?.data?.errorMessage) {
                toast.error(e?.response?.data?.errorMessage);
            }
            else {
                toast.error(e?.message);
            }
        }).finally(e => {
            setConfirmModal(false);
            setCaptchaBase64("");
            setLoading(false);
            setCaptcha("");
        })
    }

    function validateRemitterDetail() {
        let remitterStateError = "";
        let remitterPincodeError = "";
        let remitterEmailIdError = "";
        let remitterNameError = "";
        let remitterTanError = "";
        let remitterBranchError = "";
        let remitterFlatNoError = "";
        let remitterStreetError = "";
        let remitterBuildingNameError = "";
        let remitterAreaError = "";
        let remitterDistrictError = "";
        let remitterPanError = "";
        let remitterResidentialError = "";
        let statusError = "";
        let codeError = "";
        let remitterCountryError = "";
        let princPlcBusRemterError = "";
        let regexs = /^[^a-zA-Z0-9]+$/;

        // STATE
        if (!remitterDetail.remitterState) {
            remitterStateError = "Remitter state is required";
        }

        if (!remitterDetail.code) {
            codeError = "Remitter Code is required";
        }

        if (!remitterDetail.remitterStatus) {
            statusError = "Remitter Status is required";
        }
        // debugger
        // if (!remitterDetail.princPlcBusRemter) {
        //     princPlcBusRemterError = "Remitter PrincPlcBusRemter is required";
        // }


        if (!remitterDetail.remitterCountry) {
            remitterCountryError = "Remitter Country is required";
        }

        if (!remitterDetail.remitterResidential) {
            remitterResidentialError = "Remitter Residential Status is required";
        }

        // PINCODE
        if (!remitterDetail.remitterPincode) {
            remitterPincodeError = "Remitter pincode is required";
        }
        if (
            remitterDetail.remitterPincode &&
            remitterDetail.remitterPincode.length !== 6
        ) {
            remitterPincodeError = "The remitter PIN code must be 6 digits.";
        }

        // EMAIL
        // if (!remitterDetail.remitterEmail) {
        //     remitterEmailIdError = "Remitter email is required";
        // }
        // if (remitterDetail.remitterEmail) {
        //     const regx = String(remitterDetail.remitterEmail)
        //         .toLowerCase()
        //         .match(emailRegex);
        //     if (!regx) {
        //         remitterEmailIdError = "Remitter email is invalid.";
        //     }
        // }

        // NAME
        if (!remitterDetail.name) {
            remitterNameError = "Remitter name is required";
        }
        if (
            remitterDetail.name &&
            regexs.test(remitterDetail.name)
        ) {
            remitterNameError = "Only special characters are not allowed";
        }

        // TAN
        // if (!remitterDetail.remitterTan) {
        //     remitterTanError = "Remitter TAN is required";
        // }
        // if (
        //     remitterDetail.remitterTan &&
        //     remitterDetail.remitterTan.length !== 10
        // ) {
        //     remitterTanError = "The remitter TAN must be 10 digits.";
        // }
        if (
            remitterDetail.remitterTan &&
            remitterDetail.remitterTan.length === 10
        ) {
            const regx = tanRegex.test(
                remitterDetail.remitterTan.toUpperCase()
            );
            if (!regx) {
                remitterTanError = "The remitter TAN is invalid.";
            }
        }

        // FLAT NO
        if (!remitterDetail.remitterFlat) {
            remitterFlatNoError = "Remitter flat no is required";
        }
        if (
            remitterDetail.remitterFlat &&
            regexs.test(remitterDetail.remitterFlat)
        ) {
            remitterFlatNoError = "Only special characters are not allowed";
        }

        // BUILDING NAME
        if (
            remitterDetail.remitterBuilding &&
            regexs.test(remitterDetail.remitterBuilding)
        ) {
            remitterBuildingNameError = "Only special characters are not allowed";
        }

        // STREET
        if (
            remitterDetail.remitterStreet &&
            regexs.test(remitterDetail.remitterStreet)
        ) {
            remitterStreetError = "Only special characters are not allowed";
        }

        // AREA
        if (
            remitterDetail.remitterArea &&
            regexs.test(remitterDetail.remitterArea)
        ) {
            remitterAreaError = "Only special characters are not allowed";
        }

        // PAN
        if (!remitterDetail.remitterPan) {
            remitterPanError = "Remitter PAN is required";
        }
        if (
            remitterDetail.remitterPan &&
            remitterDetail.remitterPan.length !== 10
        ) {
            remitterPanError = "The remitter PAN must be 10 characters.";
        }
        if (
            remitterDetail.remitterPan &&
            remitterDetail.remitterPan.length === 10 &&
            remitterDetail.remitterPan !== "PANNOTREQD"
        ) {
            const regx = panRegex.test(
                remitterDetail.remitterPan.toUpperCase()
            );
            if (!regx) {
                remitterPanError = "The remitter PAN is invalid.";
            }
        }

        // ERROR CHECK
        if (
            remitterStateError ||
            remitterPincodeError ||
            remitterEmailIdError ||
            remitterNameError ||
            remitterTanError ||
            remitterBranchError ||
            remitterFlatNoError ||
            remitterStreetError ||
            remitterBuildingNameError ||
            remitterAreaError ||
            remitterDistrictError ||
            remitterPanError ||
            codeError ||
            remitterResidentialError ||
            statusError ||
            princPlcBusRemterError
        ) {
            setRemitterErrors((prevState) => ({
                ...prevState,
                remitterStateError,
                remitterPincodeError,
                remitterEmailIdError,
                remitterNameError,
                remitterTanError,
                remitterBranchError,
                remitterFlatNoError,
                remitterStreetError,
                remitterBuildingNameError,
                remitterAreaError,
                remitterDistrictError,
                remitterPanError,
                codeError,
                remitterResidentialError,
                statusError,
                princPlcBusRemterError
            }));
            return false;
        }

        // CLEAR ERRORS
        setRemitterErrors((prevState) => ({
            ...prevState,
            remitterStateError: "",
            remitterPincodeError: "",
            remitterEmailIdError: "",
            remitterNameError: "",
            remitterTanError: "",
            remitterBranchError: "",
            remitterFlatNoError: "",
            remitterStreetError: "",
            remitterBuildingNameError: "",
            remitterAreaError: "",
            remitterDistrictError: "",
            remitterPanError: "",
            codeError: "",
            remitterResidentialError: "",
            statusError: "",
            princPlcBusRemterError: ""
        }));

        return true;
    }

    function saveRemitter(e) {
        e.preventDefault();
        setIsNextDirty(true);
        if (validateRemitterDetail()) {
            if (remitterDetail.itdLogin && (remitterDetail.itdLogin != remitterDetail.remitterTan)) {
                toast.error("Remitter tan and ITD login tan should be equal");
                return;
            }
            RemittersService.saveRemitter(remitterDetail)
                .then((res) => {
                    if (res && res > 0) {
                        toast.success("Remitter saved successfully");
                        router.push("/remitters");
                    }
                })
                .catch((res) => {
                    toast.error(res);
                });
        }
    }

    async function itdLogin(e) {
        const model = {
            password: remitterDetail.itdPassword,
            tan: remitterDetail.itdLogin,
            deductorId: remitterDetail.id
        };
        if (remitterDetail.itdLogin && remitterDetail.itdPassword && remitterDetail.id > 0) {
            setItdLoginLoading(true);
            FuvValidateReturnService.autoFill(model)
                .then((res) => {
                    if (res) {
                        toast.success(res);
                        getRemiter();
                    }
                }).catch(e => {
                    if (e?.response?.data?.errorMessage) {
                        toast.error(e?.response?.data?.errorMessage);
                    }
                    else {
                        toast.error(e?.message);
                    }
                    setItdLoginLoading(false);
                })
                .finally((f) => {
                    setItdLoginLoading(false);
                });
        } else {
            toast.error("ITD Username and password do not exist for the remitter");
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
                        {active === 0 && (
                            <RemitterDetail
                                setActive={(e) => setActive(e)}
                                enumList={enumList}
                                handleInputRemitter={handleInputRemitter}
                                type="regular"
                                remitterDetail={remitterDetail}
                                isNextDirty={isNextDirty}
                                itdLogin={itdLogin}
                                itdLoginLoading={itdLoginLoading}
                                remitterErrors={remitterErrors}
                                handleSaveRemitter={saveRemitter}
                            ></RemitterDetail>
                        )}
                    </div>
                    <Modal
                        className=""
                        size="sm"
                        centered
                        keyboard={false}
                        backdrop="static"
                        show={confirmModal}
                        onHide={() => {
                            setConfirmModal(false);
                            setCaptchaBase64("");
                            setLoading(false);
                            setCaptcha("");
                        }}
                    >
                        <Modal.Header className="border-0" closeButton></Modal.Header>
                        <Modal.Body>
                            <div className="container">
                                <div style={{ padding: 10 }}>
                                    {captchaBase64 && (
                                        <img src={captchaBase64} alt="CAPTCHA" style={{ marginBottom: 10 }} />
                                    )}
                                    <br />
                                    <input
                                        type="text"
                                        value={inputCaptcha}
                                        maxLength={5}
                                        onChange={(e) => setInputCaptcha(e.target.value)}
                                        style={{ padding: 10, fontSize: 16, marginBottom: 10 }}
                                    />
                                    <br />
                                    <button className="btn btn-primary" onClick={handleSubmit} style={{ padding: 8, fontSize: 14 }}>
                                        {loading && (
                                            <span
                                                className="spinner-grow spinner-grow-sm"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                        )}
                                        Submit
                                    </button>
                                    {captchaBase64 && <button className="btn btn-default" onClick={resendCaptcha} style={{ marginLeft: 14, padding: 8, fontSize: 14 }}>
                                        {resendLoading && (
                                            <span
                                                className="spinner-grow spinner-grow-sm"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                        )}
                                        Resend
                                    </button>}
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </section >
        </>
    );
}
