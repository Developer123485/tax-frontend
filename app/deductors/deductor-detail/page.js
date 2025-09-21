"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeductorDetail from "../../components/deductors/deductor-detail/page";
import ResponsibleDetail from "../../components/deductors/responsible-detail/page";
import { EnumService } from "../../services/enum.service";
import { DeductorsService } from "../../services/deductors.service";
import BreadcrumbList from "../../components/breadcrumbs/page";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonService } from "@/app/services/common.service";
import HeaderList from "@/app/components/header/header-list";
import Modal from "react-bootstrap/Modal";

export default function AddDeductor() {
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
      name: "Deductor Detail",
      isActive: true,
    },
  ]);
  const [deductorDetail, setDeductorDetail] = useState({
    id: 0,
    deductorTan: "",
    deductorName: "",
    deductorBranch: "",
    itdLogin: "",
    itdPassword: "",
    tracesLogin: "",
    tracesPassword: "",
    deductorState: "",
    deductorStateValue: "",
    deductorPincode: "",
    deductorEmailId: "",
    deductorStdcode: "",
    deductorTelphone: "",
    deductorType: "",
    deductorTypeValue: "",
    responsibleName: "",
    responsibleDOB: "",
    responsibleDesignation: "",
    responsibleEmailId: "",
    sTDAlternate: "",
    phoneAlternate: "",
    emailAlternate: "",
    fatherName: "",
    responsibleState: "",
    responsibleStateValue: "",
    responsiblePincode: "",
    responsibleStdcode: "",
    responsibleTelephone: "",
    responsiblePan: "",
    responsibleFlatNo: "",
    responsibleAlternateSTD: "",
    responsibleAlternatePhone: "",
    responsibleAlternateEmail: "",
    responsibleBuildingName: "",
    responsibleDistrict: "",
    responsibleStreet: "",
    responsibleArea: "",
    responsibleCity: "",
    deductorFlatNo: "",
    deductorBuildingName: "",
    deductorStreet: "",
    deductorArea: "",
    deductorDistrict: "",
    deductorMobile: "",
    ddoCode: "",
    deductorCodeNo: "",
    deductorCategory: "",
    deductorPan: "",
    deductorGstNo: "",
    ministryName: "",
    ministryValue: "",
    goodsAndServiceTax: "",
    ddoRegistration: "",
    paoCode: "",
    paoRegistration: "",
    ministryNameOther: "",
    ainCode: "",
    identificationNumber: "",
    responsibleMobile: "",
    governmentType: "government",
    copyAddress: false,
    ministryState: "",
  });
  const [deductorErrors, setDeductorErrors] = useState({
    deductorStateError: "",
    deductorPincodeError: "",
    deductorEmailIdError: "",
    deductorNameError: "",
    deductorTanError: "",
    deductorBranchError: "",
    deductorTypeError: "",
    deductorFlatNoError: "",
    deductorStreetError: "",
    deductorBuildingNameError: "",
    deductorAreaError: "",
    deductorDistrictError: "",
    deductorPanError: "",
    responsibleNameError: "",
    responsibleDesignationError: "",
    responsibleEmailIdError: "",
    responsibleStateError: "",
    responsiblePincodeError: "",
    responsiblePanError: "",
    responsibleFlatNoError: "",
    responsibleMobileError: "",
    responsibleFlatNoError: "",
    responsibleStreetError: "",
    responsibleBuildingNameError: "",
    responsibleAreaError: "",
    responsibleDistrictError: "",
  });
  useEffect(() => {
    EnumService.getEnumStatues().then((res) => {
      if (res) {
        setEnumList(res);
      }
    });
    getDeductor();
  }, []);

  useEffect(() => {
    validateDeductorDetail();
  }, [
    deductorDetail.deductorName,
    deductorDetail.deductorType,
    deductorDetail.deductorTan,
    deductorDetail.deductorPan,
    deductorDetail.deductorBranch,
    deductorDetail.deductorEmailId,
    deductorDetail.deductorFlatNo,
    deductorDetail.deductorState,
    deductorDetail.deductorPincode,
    deductorDetail.deductorBuildingName,
    deductorDetail.deductorArea,
    deductorDetail.deductorDistrict,
    deductorDetail.deductorStreet,
  ]);

  useEffect(() => {
    validateResponsibleDetail();
  }, [
    deductorDetail.responsibleName,
    deductorDetail.responsiblePan,
    deductorDetail.responsibleDesignation,
    deductorDetail.responsibleEmailId,
    deductorDetail.responsibleMobile,
    deductorDetail.responsibleFlatNo,
    deductorDetail.responsibleState,
    deductorDetail.responsiblePincode,
    deductorDetail.responsibleBuildingName,
    deductorDetail.responsibleArea,
    deductorDetail.responsibleDistrict,
    deductorDetail.responsibleStreet,
  ]);

  function getDeductor() {
    if (searchParams.get("id")) {
      DeductorsService.getDeductor(parseInt(searchParams.get("id"))).then(
        (res) => {
          if (res && res.id > 0) {
            setDeductorDetail(res);
            if (res.ddoCode || res.ministryName || res.ministryState || res.paoCode || res.ainCode || res.paoRegistration || res.ministryNameOther || res.identificationNumber) {
              setDeductorDetail((prevState) => ({
                ...prevState,
                governmentType: "government",
              }));
            } else {
              setDeductorDetail((prevState) => ({
                ...prevState,
                governmentType: "other",
              }));
            }
          }
        }
      );
    }
  }

  function goToResponsibleDetail(e) {
    e.preventDefault();
    setIsNextDirty(true);
    if (validateDeductorDetail()) {
      setActive(1);
    }
  }

  function handleInputDeductor(names, e) {
    if (names === "responsibleDOB") {
      setDeductorDetail((prevState) => ({
        ...prevState,
        [names]: e,
      }));
    } else if (names === "copyAddress") {
      if (e.target.checked) {
        setDeductorDetail((prevState) => ({
          ...prevState,
          responsibleFlatNo: deductorDetail.deductorFlatNo,
          responsibleBuildingName: deductorDetail.deductorBuildingName,
          responsibleStreet: deductorDetail.deductorStreet,
          responsibleState: deductorDetail.deductorState,
          responsibleArea: deductorDetail.deductorArea,
          responsibleDistrict: deductorDetail.deductorDistrict,
          responsiblePincode: deductorDetail.deductorPincode,
          copyAddress: true,
        }));
      } else {
        setDeductorDetail((prevState) => ({
          ...prevState,
          responsibleFlatNo: "",
          responsibleBuildingName: "",
          responsibleStreet: "",
          responsibleState: "",
          responsibleArea: "",
          responsibleDistrict: "",
          responsiblePincode: "",
          copyAddress: false,
        }));
      }
    } else {
      setDeductorDetail((prevState) => ({
        ...prevState,
        [names]: e.target.value,
      }));
    }
  }

  function verify(e) {
    if (!deductorDetail.tracesLogin || !deductorDetail.tracesPassword || !deductorDetail.deductorTan) {
      toast.error("UserName/Password/TanNo is required");
      return false;
    }
    if (deductorDetail.deductorTan && deductorDetail.deductorTan.length != 10) {
      toast.error("The deductor tan must be 10 digits.");
      return false;
    }
    if (
      deductorDetail.deductorTan &&
      deductorDetail.deductorTan.length === 10
    ) {
      const regx = tanRegex.test(
        deductorDetail.deductorTan.toLocaleUpperCase()
      );
      if (!regx) {
        toast.error("The deductor tan is invalid.");
        return false;
      }
    }
    const model = {
      userName: deductorDetail.tracesLogin,
      password: deductorDetail.tracesPassword,
      tanNumber: deductorDetail.deductorTan
    }
    DeductorsService.startLogin(model).then(res => {
      if (res) {
        setCaptchaBase64(res.captcha);
        setConfirmModal(true);
      }
    });
  }


  function handleSubmit(params) {
    if (!inputCaptcha) {
      toast.error("Input Captcha is required");
      return false;
    }
    const model = {
      captcha: inputCaptcha,
    }
    DeductorsService.submitCaptcha(model).then(res => {
      if (res) {
        setInputCaptcha("");
        setConfirmModal(false);
      }
    }).catch(e => {
      if (e?.response?.data?.errorMessage) {
        toast.error(e?.response?.data?.errorMessage);
      }
      else {
        toast.error(e?.message);
      }
    })
  }


  function validateDeductorDetail() {
    let deductorStateError = "";
    let deductorPincodeError = "";
    let deductorEmailIdError = "";
    let deductorNameError = "";
    let deductorTanError = "";
    let deductorBranchError = "";
    let deductorTypeError = "";
    let deductorFlatNoError = "";
    let deductorPanError = "";
    let deductorStreetError = "";
    let deductorBuildingNameError = "";
    let deductorAreaError = "";
    let deductorDistrictError = "";
    let regexs = /^[^a-zA-Z0-9]+$/;
    if (!deductorDetail.deductorState) {
      deductorStateError = "Deductor state is required";
    }
    if (!deductorDetail.deductorPincode) {
      deductorPincodeError = "Deductor pincode is required";
    }
    if (
      deductorDetail.deductorPincode &&
      deductorDetail.deductorPincode.length != 6
    ) {
      deductorPincodeError = "The deductor PIN code must be 6 digits.";
    }
    if (!deductorDetail.deductorEmailId) {
      deductorEmailIdError = "Deductor email is required";
    }
    if (deductorDetail.deductorEmailId) {
      const regx = String(deductorDetail.deductorEmailId)
        .toLowerCase()
        .match(emailRegex);
      if (!regx) {
        deductorEmailIdError = "Deductor Email is invalid";
      }
    }
    if (!deductorDetail.deductorName) {
      deductorNameError = "Deductor name is required";
    }
    if (deductorDetail.deductorName && regexs.test(deductorDetail.deductorName)) {
      deductorNameError = "Only special characters are not allowed";
    }

    if (!deductorDetail.deductorTan) {
      deductorTanError = "Deductor tan is required";
    }
    if (deductorDetail.deductorTan && deductorDetail.deductorTan.length != 10) {
      deductorTanError = "The deductor tan must be 10 digits.";
    }
    if (
      deductorDetail.deductorTan &&
      deductorDetail.deductorTan.length === 10
    ) {
      const regx = tanRegex.test(
        deductorDetail.deductorTan.toLocaleUpperCase()
      );
      if (!regx) {
        deductorTanError = "The deductor tan is invalid.";
      }
    }
    if (!deductorDetail.deductorBranch) {
      deductorBranchError = "Deductor branch is required";
    }
    if (!deductorDetail.deductorType) {
      deductorTypeError = "Deductor type is required";
    }
    if (!deductorDetail.deductorFlatNo) {
      deductorFlatNoError = "Deductor flat no is required";
    }
    if (deductorDetail.deductorFlatNo && regexs.test(deductorDetail.deductorFlatNo)) {
      deductorFlatNoError = "Only special characters are not allowed";
    }
    if (deductorDetail.deductorBuildingName && regexs.test(deductorDetail.deductorBuildingName)) {
      deductorBuildingNameError = "Only special characters are not allowed";
    }
    if (deductorDetail.deductorStreet && regexs.test(deductorDetail.deductorStreet)) {
      deductorStreetError = "Only special characters are not allowed";
    }
    if (deductorDetail.deductorArea && regexs.test(deductorDetail.deductorArea)) {
      deductorAreaError = "Only special characters are not allowed";
    }
    if (deductorDetail.deductorDistrict && regexs.test(deductorDetail.deductorDistrict)) {
      deductorDistrictError = "Only special characters are not allowed";
    }
    if (!deductorDetail.deductorPan) {
      deductorPanError = "Deductor pan is required";
    }
    if (deductorDetail.deductorPan && deductorDetail.deductorPan.length != 10) {
      deductorPanError = "The deductor pan must be 10 digits.";
    }
    if (
      deductorDetail.deductorPan &&
      deductorDetail.deductorPan.length === 10 && deductorDetail.deductorPan != "PANNOTREQD"
    ) {
      const regx = panRegex.test(
        deductorDetail.deductorPan.toLocaleUpperCase()
      );
      if (!regx) {
        deductorPanError = "The deductor pan is invalid.";
      }
    }
    if (
      deductorStateError ||
      deductorPincodeError ||
      deductorEmailIdError ||
      deductorNameError ||
      deductorTanError ||
      deductorBranchError ||
      deductorTypeError ||
      deductorFlatNoError ||
      deductorPanError ||
      deductorBuildingNameError ||
      deductorAreaError ||
      deductorDistrictError ||
      deductorStreetError
    ) {
      setDeductorErrors((prevState) => ({
        ...prevState,
        deductorStateError,
        deductorPincodeError,
        deductorEmailIdError,
        deductorNameError,
        deductorTanError,
        deductorBranchError,
        deductorTypeError,
        deductorFlatNoError,
        deductorPanError,
        deductorBuildingNameError,
        deductorAreaError,
        deductorDistrictError,
        deductorStreetError
      }));
      return false;
    }
    setDeductorErrors((prevState) => ({
      ...prevState,
      deductorStateError: "",
      deductorPincodeError: "",
      deductorEmailIdError: "",
      deductorNameError: "",
      deductorTanError: "",
      deductorBranchError: "",
      deductorTypeError: "",
      deductorFlatNoError: "",
      deductorPanError: "",
      deductorBuildingNameError: "",
      deductorAreaError: "",
      deductorDistrictError: "",
      deductorStreetError: "",
    }));
    return true;
  }

  function validateResponsibleDetail() {
    let responsibleNameError = "";
    let responsibleDesignationError = "";
    let responsibleEmailIdError = "";
    let responsibleStateError = "";
    let responsiblePincodeError = "";
    let responsiblePanError = "";
    let responsibleFlatNoError = "";
    let responsibleStreetError = "";
    let responsibleBuildingNameError = "";
    let responsibleAreaError = "";
    let responsibleDistrictError = "";
    let responsibleMobileError = "";
    let regexs = /^[^a-zA-Z0-9]+$/;
    if (!deductorDetail.responsibleState) {
      responsibleStateError = "Responsible state is required";
    }
    if (deductorDetail.responsibleName && regexs.test(deductorDetail.responsibleName)) {
      responsibleNameError = "Only special characters are not allowed";
    }
    if (!deductorDetail.responsiblePincode) {
      responsiblePincodeError = "Responsible pincode is required";
    }
    if (
      deductorDetail.responsiblePincode &&
      deductorDetail.responsiblePincode.length != 6
    ) {
      responsiblePincodeError = "The Responsible PIN code must be 6 digits.";
    }
    if (!deductorDetail.responsibleEmailId) {
      responsibleEmailIdError = "Responsible email is required";
    }
    if (deductorDetail.responsibleEmailId) {
      const regx = String(deductorDetail.responsibleEmailId)
        .toLowerCase()
        .match(emailRegex);
      if (!regx) {
        responsibleEmailIdError = "Responsible Email is invalid";
      }
    }
    if (!deductorDetail.responsibleName) {
      responsibleNameError = "Responsible name is required";
    }
    if (!deductorDetail.responsibleDesignation) {
      responsibleDesignationError = "Responsible designation is required";
    }
    if (!deductorDetail.responsibleMobile) {
      responsibleMobileError = "Responsible mobile is required";
    }
    if (
      deductorDetail.responsibleMobile &&
      deductorDetail.responsibleMobile.length != 10
    ) {
      responsibleMobileError = "The responsible mobile must be 10 digits.";
    }
    if (!deductorDetail.responsibleFlatNo) {
      responsibleFlatNoError = "Responsible flat no is required";
    }
    if (deductorDetail.responsibleFlatNo && regexs.test(deductorDetail.responsibleFlatNo)) {
      responsibleFlatNoError = "Only special characters are not allowed";
    }
    if (deductorDetail.responsibleBuildingName && regexs.test(deductorDetail.responsibleBuildingName)) {
      responsibleBuildingNameError = "Only special characters are not allowed";
    }
    if (deductorDetail.responsibleStreet && regexs.test(deductorDetail.responsibleStreet)) {
      responsibleStreetError = "Only special characters are not allowed";
    }
    if (deductorDetail.responsibleArea && regexs.test(deductorDetail.responsibleArea)) {
      responsibleAreaError = "Only special characters are not allowed";
    }
    if (deductorDetail.responsibleDistrict && regexs.test(deductorDetail.responsibleDistrict)) {
      responsibleDistrictError = "Only special characters are not allowed";
    }
    if (!deductorDetail.responsiblePan) {
      responsiblePanError = "Responsible pan is required";
    }
    if (
      deductorDetail.responsiblePan &&
      deductorDetail.responsiblePan.length != 10
    ) {
      responsiblePanError = "The responsible pan must be 10 digits.";
    }
    if (
      deductorDetail.responsiblePan &&
      deductorDetail.responsiblePan.length === 10
    ) {
      const regx = panRegex.test(
        deductorDetail.responsiblePan.toLocaleUpperCase()
      );
      if (!regx) {
        responsiblePanError = "The responsible pan is invalid.";
      }
    }
    if (
      responsibleNameError ||
      responsibleDesignationError ||
      responsibleEmailIdError ||
      responsibleStateError ||
      responsiblePincodeError ||
      responsiblePanError ||
      responsibleFlatNoError ||
      responsibleMobileError ||
      responsibleStreetError ||
      responsibleBuildingNameError ||
      responsibleAreaError ||
      responsibleDistrictError
    ) {
      setDeductorErrors((prevState) => ({
        ...prevState,
        responsibleNameError,
        responsibleDesignationError,
        responsibleEmailIdError,
        responsibleStateError,
        responsiblePincodeError,
        responsiblePanError,
        responsibleFlatNoError,
        responsibleMobileError,
        responsibleStreetError,
        responsibleBuildingNameError,
        responsibleAreaError,
        responsibleDistrictError
      }));
      return false;
    }
    setDeductorErrors((prevState) => ({
      ...prevState,
      responsibleNameError: "",
      responsibleDesignationError: "",
      responsibleEmailIdError: "",
      responsibleStateError: "",
      responsiblePincodeError: "",
      responsiblePanError: "",
      responsibleFlatNoError: "",
      responsibleMobileError: "",
      responsibleStreetError: "",
      responsibleBuildingNameError: "",
      responsibleAreaError: "",
      responsibleDistrictError: "",
    }));
    return true;
  }

  function saveDeductor(e) {
    e.preventDefault();
    setIsDirty(true);
    if (validateResponsibleDetail()) {
      if (deductorDetail.itdLogin && (deductorDetail.itdLogin != deductorDetail.deductorTan)) {
        toast.error("Deductor tan and ITD login tan should be equal");
        return;
      }
      if (deductorDetail.responsibleDOB) {
        deductorDetail.responsibleDOB = CommonService.dateFormat(
          deductorDetail.responsibleDOB
        );
      }
      DeductorsService.saveDeductor(deductorDetail)
        .then((res) => {
          if (res && res > 0) {
            toast.success("Deductor saved successfully");
            router.push("/deductors");
          }
        })
        .catch((res) => {
          toast.error(res);
        });
    }
  }

  const steps = [
    { title: "Deductor Details" },
    { title: "Responsible Detail" },
  ];
  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="my-5 my-md-4">
        <div className="container mt-5">
          <div className="">
            {active === 0 && (
              <DeductorDetail
                setActive={(e) => setActive(e)}
                enumList={enumList}
                handleInputDeductor={handleInputDeductor}
                isNextDirty={isNextDirty}
                deductorDetail={deductorDetail}
                deductorErrors={deductorErrors}
                goToResponsibleDetail={(e) => goToResponsibleDetail(e)}
                verify={verify}
              ></DeductorDetail>
            )}
            {active === 1 && (
              <ResponsibleDetail
                setActive={(e) => setActive(e)}
                enumList={enumList}
                isDirty={isDirty}
                handleInputDeductor={handleInputDeductor}
                deductorDetail={deductorDetail}
                handleSaveDeductor={saveDeductor}
                deductorErrors={deductorErrors}
              ></ResponsibleDetail>
            )}
          </div>
          <Modal
            className=""
            size="sm"
            centered
            keyboard={false}
            backdrop="static"
            show={confirmModal}
          >
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
                    onChange={(e) => setInputCaptcha(e.target.value)}
                    style={{ padding: 10, fontSize: 16, marginBottom: 10 }}
                  />
                  <br />
                  <button className="btn btn-primary" onClick={handleSubmit} style={{ padding: 10, fontSize: 16 }}>
                    Submit
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </section>
    </>
  );
}
