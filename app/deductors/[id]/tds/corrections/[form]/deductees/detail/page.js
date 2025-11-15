"use client";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { EnumService } from "@/app/services/enum.service";
import React, { useState, use, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DeducteeDetail from "@/app/components/deductee/detail";
import EmployeeDetail from "@/app/components/employee/detail";
import { DeducteeService } from "@/app/services/deductee.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployeeService } from "@/app/services/employee.service";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { CommonService } from "@/app/services/common.service";
import HeaderList from "@/app/components/header/header-list";

export default function AddDeductee({ params }) {
  const resolvedParams = use(params);
  const router = useRouter(null);
  const deductorId = resolvedParams?.id;
  const [enumList, setEnumList] = useState({});
  const [deducteeType, setDeducteeType] = useState("deductee");
  const [isEmployeeDirty, setEmployeeDirty] = useState(false);
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const [isDeducteeDirty, setDeducteeDirty] = useState(false);
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
      name: "Deductees",
      isActive: false,
      href: `/deductors/${deductorId}/tds/deductees`,
    },
    {
      name: "Detail",
      isActive: true,
    },
  ]);
  const searchParams = useSearchParams(null);

  const [deducteeDetail, setDeducteeDetail] = useState({
    id: 0,
    namePrefix: "",
    paramsanNumber: "",
    panRefNo: "",
    identificationNo: "",
    deducteeCode: "",
    zipCodeCase: "",
    firmName: "",
    status: "",
    transporter: "",
    residentialStatus: "",
    email: "",
    mobileNo: "",
    tinNo: "",
    dob: "",
    inactiveYear: "",
    flatNo: "",
    buildingName: "",
    areaLocality: "",
    locality: "",
    roadStreet: "",
    town: "",
    pincode: "",
    postOffice: "",
    state: "",
    country: "",
    surchargeApplicable: "",
    principlePlacesBusiness: "",
    stdCode: "",
    phoneNo: "",
    deductorId: "",
    name: "",
  });

  const [employeeDetail, setEmployeeDetail] = useState({
    id: 0,
    name: "",
    panNumber: "",
    panRefNo: "",
    email: "",
    mobileNo: "",
    sex: "",
    thisinNo: "",
    dob: "",
    inactiveYear: "",
    seniorCitizen: "",
    verySeniorCitizen: "",
    flatNo: "",
    buildingName: "",
    areaLocality: "",
    roadStreet: "",
    town: "",
    fatherName: "",
    pincode: "",
    postOffice: "",
    employeeRef: "",
    state: "",
    designation: "",
    form12BA: "",
    applicableFormAY: "",
    verySenApplicableFormAY: "",
    deductorId: "",
  });

  useEffect(() => {
    validateDeducteeDetail();
  }, [
    deducteeDetail.name,
    deducteeDetail.panNumber,
    deducteeDetail.status,
    deducteeDetail.tinNo,
    deducteeDetail.zipCodeCase,
    deducteeDetail.country,
    deducteeDetail.residentialStatus,
  ]);

  useEffect(() => {
    validateEmployeeDetail();
  }, [employeeDetail.name, employeeDetail.panNumber]);

  const [deducteeErrors, setDeducteeErrors] = useState({
    deducteeStatusError: "",
    deducteeNameError: "",
    deducteePanError: "",
    tinError: "",
    zipError: "",
    countryError: "",
  });

  const [employeeErrors, setEmployeeErrors] = useState({
    employeeNameError: "",
    employeePanError: "",
    refError: "",
  });

  useEffect(() => {
    EnumService.getEnumStatues().then((res) => {
      if (res) {
        setEnumList(res);
      }
    });
    if (
      searchParams.get("id") &&
      searchParams.get("token") === "RW1wbG95ZWU="
    ) {
      getDeductee();
      setDeducteeType("deductee");
    }
    if (
      searchParams.get("id") &&
      searchParams.get("token") === "RGVkdWN0ZWU="
    ) {
      setDeducteeType("employee");
      getEmployee();
    }
  }, []);

  function getEmployee() {
    EmployeeService.getEmployee(parseInt(searchParams.get("id"))).then(
      (res) => {
        if (res && res.id > 0) {
          if (res.dob) {
            res.dob = new Date(res.dob);
          }
          setEmployeeDetail(res);
        }
      }
    );
  }

  function getDeductee() {
    DeducteeService.getDeductee(parseInt(searchParams.get("id"))).then(
      (res) => {
        if (res && res.id > 0) {
          setDeducteeDetail(res);
        }
      }
    );
  }

  function handleInputDeductee(names, e) {
    setDeducteeDetail((prevState) => ({
      ...prevState,
      [names]: e.target.value,
    }));
  }

  function handleInputEmployee(names, e) {
    if (
      names === "dob"
    ) {
      setEmployeeDetail((prevState) => ({
        ...prevState,
        [names]: e,
      }));
    } else {
      setEmployeeDetail((prevState) => ({
        ...prevState,
        [names]: e.target.value,
      }));
    }
  }

  function handleSaveDeductee(e) {
    e.preventDefault();
    setDeducteeDirty(true);
    if (validateDeducteeDetail()) {
      deducteeDetail.dob = CommonService.dateFormat(deducteeDetail.dob);
      deducteeDetail.deductorId = deductorId;
      DeducteeService.saveDeductee(deducteeDetail)
        .then((res) => {
          if (res && res > 0) {
            toast.success("Deductee saved successfully");
            router.push(`/deductors/${deductorId}/tds/deductees`);
          }
        })
        .catch((res) => {
          toast.error(res);
        });
    }
  }

  function handleSaveEmployee(e) {
    e.preventDefault();
    setEmployeeDirty(true);
    if (validateEmployeeDetail()) {
      employeeDetail.deductorId = deductorId;

      EmployeeService.saveEmployee(employeeDetail)
        .then((res) => {
          if (res && res > 0) {
            toast.success("Employee saved successfully");
            router.push(`/deductors/${deductorId}/tds/deductees`);
          }
        })
        .catch((res) => {
          toast.error(res);
        });
    }
  }

  function validateDeducteeDetail() {
    let deducteeNameError = "";
    let deducteeStatusError = "";
    let deducteePanError = "";
    let tinError = "";
    let zipError = "";
    let countryError = "";
    if (!deducteeDetail.status) {
      deducteeStatusError = "Deductee Status is required";
    }
    if (deducteeDetail.residentialStatus == "Non Resident" && !deducteeDetail.tinNo) {
      tinError = "Tin No is required";
    }
    if (deducteeDetail.residentialStatus == "Non Resident" && !deducteeDetail.zipCodeCase) {
      zipError = "Zip code is required";
    }
    if (deducteeDetail.residentialStatus == "Non Resident" && !deducteeDetail.country) {
      countryError = "Country is required";
    }
    if (!deducteeDetail.name) {
      deducteeNameError = "Deductee name is required";
    }
    if (!deducteeDetail.panNumber) {
      deducteePanError = "Deductee pan is required";
    }
    if (deducteeDetail.panNumber && deducteeDetail.panNumber.length != 10) {
      deducteePanError = "The deductee pan must be 10 digits.";
    }
    if (deducteeDetail.panNumber && deducteeDetail.panNumber.length === 10
      && deducteeDetail.panNumber != "PANNOTAVBL"
      && deducteeDetail.panNumber != "PANAPPLIED" &&
      deducteeDetail.panNumber != "PANINVALID"

    ) {
      const regx = panRegex.test(deducteeDetail.panNumber.toLocaleUpperCase());
      if (!regx) {
        deducteePanError = "The deductor pan is invalid.";
      }
    }
    if (deducteeStatusError || deducteePanError || deducteeNameError || tinError || zipError || countryError) {
      setDeducteeErrors((prevState) => ({
        ...prevState,
        deducteePanError,
        deducteeNameError,
        deducteeStatusError,
        tinError,
        zipError,
        countryError
      }));
      return false;
    }
    setDeducteeErrors((prevState) => ({
      ...prevState,
      deducteePanError: "",
      deducteeNameError: "",
      deducteeStatusError: "",
      tinError: "",
      zipError: "",
      countryError: "",
    }));
    return true;
  }

  function validateEmployeeDetail() {
    let employeeNameError = "";
    let employeePanError = "";
    let refError = "";
    if (!employeeDetail.name) {
      employeeNameError = "Employee name is required";
    }
    if (employeeDetail.panNumber && (employeeDetail.panNumber == "PANNOTREQD" || employeeDetail.panNumber == "PANNOTAVBL"
      || employeeDetail.panNumber == "PANAPPLIED" ||
      employeeDetail.panNumber == "PANINVALID") && !employeeDetail.employeeRef) {
      refError = "Employee Ref is required";
    }
    if (!employeeDetail.panNumber) {
      employeePanError = "Employee pan is required";
    }
    if (employeeDetail.panNumber && employeeDetail.panNumber.length != 10) {
      employeePanError = "The Employee pan must be 10 digits.";
    }
    if (employeeDetail.panNumber && employeeDetail.panNumber.length === 10 &&
      employeeDetail.panNumber != "PANNOTAVBL"
      && employeeDetail.panNumber != "PANAPPLIED" &&
      employeeDetail.panNumber != "PANINVALID" && employeeDetail.panNumber != "PANNOTREQD") {
      const regx = panRegex.test(employeeDetail.panNumber.toLocaleUpperCase());
      if (!regx) {
        employeePanError = "The Employee pan is invalid.";
      }
    }
    if (employeeNameError || employeePanError || refError) {
      setEmployeeErrors((prevState) => ({
        ...prevState,
        employeeNameError,
        employeePanError,
        refError
      }));
      return false;
    }
    setEmployeeErrors((prevState) => ({
      ...prevState,
      employeePanError: "",
      employeeNameError: "",
      refError: ""
    }));
    return true;
  }

  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="py-4 pb-md-5">
        <div className="container">
          <div className="">
            <div className="col-md-12">
              <div className="pb-3">
                {(searchParams.get("id") &&
                  searchParams.get("token") === "RW1wbG95ZWU=") ||
                  searchParams.get("token") === "RGVkdWN0ZWU=" ? (
                  <h3>
                    {deducteeType === "deductee" ? "Deductee" : "Employee"}
                  </h3>
                ) : (
                  <>
                    <div
                      className="form-check form-check-inline"
                      style={{ fontSize: "18px" }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="RadioDeductee"
                        id="inlineRadio1"
                        value="deductee"
                        checked={deducteeType === "deductee"}
                        onChange={(e) => setDeducteeType(e.target.value)}
                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="RadioDeductee"
                      >
                        Deductees
                      </label>
                    </div>
                    <div
                      className="form-check form-check-inline"
                      style={{ fontSize: "18px" }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="RadioEmployee"
                        id="inlineRadio2"
                        value="employee"
                        checked={deducteeType === "employee"}
                        onChange={(e) => setDeducteeType(e.target.value)}
                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="RadioEmployee"
                      >
                        Employees
                      </label>
                    </div>
                  </>
                )}
              </div>
              {deducteeType === "deductee" && (
                <DeducteeDetail
                  deducteeDetail={deducteeDetail}
                  handleInputDeductee={handleInputDeductee}
                  enumList={enumList}
                  deducteeErrors={deducteeErrors}
                  isDeducteeDirty={isDeducteeDirty}
                  setState={(e) => setDeducteeDetail((prevState) => ({
                    ...prevState,
                    ["state"]: e,
                  }))}
                  setCountry={(e) => setDeducteeDetail((prevState) => ({
                    ...prevState,
                    ["country"]: e,
                  }))}
                  state={deducteeDetail.state}
                  country={deducteeDetail.country}
                  handleSaveDeductee={handleSaveDeductee}
                ></DeducteeDetail>
              )}
              {deducteeType === "employee" && (
                <EmployeeDetail
                  employeeDetail={employeeDetail}
                  handleInputEmployee={handleInputEmployee}
                  employeeErrors={employeeErrors}
                  setState={(e) => setEmployeeDetail((prevState) => ({
                    ...prevState,
                    ["state"]: e,
                  }))}
                  state={employeeDetail.state}
                  isEmployeeDirty={isEmployeeDirty}
                  enumList={enumList}
                  handleSaveEmployee={handleSaveEmployee}
                ></EmployeeDetail>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
