"use client";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { ChallanService } from "@/app/services/challan.service";
import { CommonService } from "@/app/services/common.service";
import { EnumService } from "@/app/services/enum.service";
import React, { useState, use, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalaryDetail from "@/app/components/salary/salary-detail";
import { SalaryDetailservice } from "@/app/services/salaryDetail.service";
import HeaderList from "@/app/components/header/header-list";

export default function Detail({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const [totalSalary, setTotalSalary] = useState("");
  const form = resolvedParams?.form;
  const router = useRouter(null);
  const searchParams = useSearchParams(null);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [hideButton, setIsHideButton] = useState(false);
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const [enumList, setEnumList] = useState({});
  const [employeeDropdowns, setEmployeeDropdowns] = useState([]);
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
      name: form,
      isActive: false,
      href: `/deductors/${deductorId}/tds/${form}${typeof window !== "undefined" ? window.location.search : ""
        }`,
    },
    {
      name: "Salary",
      isActive: false,
      href: `/deductors/${deductorId}/tds/${form}/salary/${typeof window !== "undefined" ? window.location.search : ""
        }`,
    },
    {
      name: "Detail",
      isActive: true,
    },
  ]);

  const [salaryDetail, setSalaryDetail] = useState({
    id: 0,
    employeeRef: null,
    panOfEmployee: null,
    nameOfEmploye: null,
    desitnation: null,
    categoryEmployee: null,
    dateOfBirth: "",
    periodOfFromDate: "",
    periodOfToDate: "",
    newRegime: "N",
    grossSalary: 0,
    valueOfPerquisites: 0,
    employeeId: null,
    isValueOfPerquisites: 0,
    profitsInLieuOf: 0,
    taxableAmount: 0,
    reportedTaxableAmount: 0,
    totalAmount: 0,
    travelConcession: 0,
    deathCumRetirement: 0,
    computedValue: 0,
    cashEquivalent: 0,
    houseRent: 0,
    otherSpecial: 0,
    amountOfExemption: 0,
    totalAmountOfExemption: 0,
    standardDeductionMannualEdit: null,
    standardDeduction: 0,
    deductionUSII: 0,
    deductionUSIII: 0,
    grossTotalDeduction: 0,
    incomeChargeable: 0,
    incomeOrLoss: 0,
    incomeOtherSources: 0,
    grossTotalIncome: 0,
    eightySectionCGross: 0,
    eightySectionCDeductiable: 0,
    eightySectionCCCGross: 0,
    eightySectionCCCDeductiable: 0,
    eightySectionCCD1Gross: 0,
    eightySectionCCD1Deductiable: 0,
    aggregateAmountOfDeductions: 0,
    eightySectionCCD1BGross: 0,
    eightySectionCCD1BDeductiable: 0,
    eightySectionCCD2Gross: 0,
    eightySectionCCD2Deductiable: 0,
    eightySectionCCDHGross: 0,
    eightySectionCCDHDeductiable: 0,
    eightySectionCCDH2Gross: 0,
    eightySectionCCDH2Deductiable: 0,
    eightySectionDGross: 0,
    eightySectionDDeductiable: 0,
    eightySectionEGross: 0,
    eightySectionEDeductiable: 0,
    eightySectionGGross: 0,
    eightySectionGQualifying: 0,
    eightySectionGDeductiable: 0,
    eightySection80TTAGross: 0,
    eightySection80TTAQualifying: 0,
    eightySection80TTADeductiable: 0,
    eightySectionVIAGross: 0,
    eightySectionVIAQualifying: 0,
    eightySectionVIADeductiable: 0,
    grossTotalDeductionUnderVIA: 0,
    totalTaxableIncome: 0,
    incomeTaxOnTotalIncomeMannualEdit: null,
    incomeTaxOnTotalIncome: 0,
    rebate87AMannualEdit: null,
    rebate87A: 0,
    incomeTaxOnTotalIncomeAfterRebate87A: 0,
    surcharge: 0,
    healthAndEducationCess: 0,
    totalPayable: 0,
    incomeTaxReliefUnderSection89: 0,
    netTaxPayable: 0,
    totalAmountofTaxDeducted: 0,
    reportedAmountOfTax: 0,
    amountReported: 0,
    totalTDS: 0,
    shortfallExcess: 0,
    wheathertaxDeductedAt: null,
    wheatherRentPayment: null,
    panOfLandlord1: null,
    nameOfLandlord1: null,
    panOfLandlord2: null,
    nameOfLandlord2: null,
    panOfLandlord3: null,
    nameOfLandlord3: null,
    panOfLandlord4: null,
    nameOfLandlord4: null,
    wheatherInterest: null,
    panOfLander1: null,
    nameOfLander1: null,
    panOfLander2: null,
    nameOfLander2: null,
    panOfLander3: null,
    nameOfLander3: null,
    panOfLander4: null,
    nameOfLander4: null,
    wheatherContributions: null,
    nameOfTheSuperanuation: null,
    dateFromWhichtheEmployee: null,
    dateToWhichtheEmployee: null,
    theAmountOfContribution: 0,
    theAvarageRateOfDeduction: 0,
    theAmountOfTaxDeduction: 0,
    grossTotalIncomeCS: 0,
    wheatherPensioner: "No",
    categoryId: null,
    userId: 0,
    deductorId: null,
    financialYear: null,
    quarter: null,
    accommodationValue: 0,
    accommodationAmount: 0,
    carsValue: 0,
    carsAmount: 0,
    sweeperValue: 0,
    sweeperAmount: 0,
    gasValue: 0,
    gasAmount: 0,
    interestValue: 0,
    interestAmount: 0,
    holidayValue: 0,
    holidayAmount: 0,
    freeTravelValue: 0,
    freeTravelAmount: 0,
    freeMealsValue: 0,
    freeMealsAmount: 0,
    freeEducationValue: 0,
    freeEducationAmount: 0,
    giftsValue: 0,
    giftsAmount: 0,
    creditCardValue: 0,
    creditCardAmount: 0,
    clubValue: 0,
    clubAmount: 0,
    useOfMoveableValue: 0,
    useOfMoveableAmount: 0,
    transferOfAssetValue: 0,
    transferOfAssetAmount: 0,
    valueOfAnyOtherValue: 0,
    valueOfAnyOtherAmount: 0,
    stock16IACValue: 0,
    stock16IACAmount: 0,
    stockAboveValue: 0,
    stockAboveAmount: 0,
    contributionValue: 0,
    contributionAmount: 0,
    annualValue: 0,
    annualAmount: 0,
    otherValue: 0,
    otherAmount: 0,
  });

  const [salaryDetailErrors, setSalaryDetailErrors] = useState({
    newRegimeError: "",
    periodFromError: "",
    periodToError: "",
    nameError: "",
    categoryError: "",
    incomeLossError: "",
    perksError1: "",
    perksError2: "",
    perksError3: "",
    perksError4: "",
    perksError5: "",
    perksError6: "",
    perksError7: "",
    perksError8: "",
    perksError9: "",
    perksError10: "",
    perksError11: "",
    perksError12: "",
    perksError13: "",
    perksError14: "",
    perksError15: "",
    perksError16: "",
    perksError17: "",
    perksError18: "",
    perksError19: "",
    perksError20: "",
    perksError21: "",
    perksError22: "",
  });
  useEffect(() => {
    EnumService.getEnumStatues().then((res) => {
      if (res) {
        setEnumList(res);
      }
    });
    SalaryDetailservice.getEmployeeDropdowns(deductorId).then((res) => {
      if (res) {
        setEmployeeDropdowns(res);
      }
    });
    getSalaryDetail();
  }, []);

  useEffect(() => {
    setTaxableAmount();
  }, [
    salaryDetail.grossSalary,
    salaryDetail.valueOfPerquisites,
    salaryDetail.profitsInLieuOf,
  ]);


  useEffect(() => {
    setGrossTotalContribution();
  }, [
    salaryDetail.theAmountOfContribution,
    salaryDetail.grossTotalIncome,
  ]);




  useEffect(() => {
    setGrossTotalDeduction();
  }, [
    salaryDetail.deductionUSIII,
    salaryDetail.deductionUSII,
    salaryDetail.standardDeduction,
  ]);

  useEffect(() => {
    setTotalAmountOfSalary();
  }, [salaryDetail.reportedTaxableAmount]);

  useEffect(() => {
    setTotalAmountOfExemption();
  }, [
    salaryDetail.travelConcession,
    salaryDetail.deathCumRetirement,
    salaryDetail.computedValue,
    salaryDetail.cashEquivalent,
    salaryDetail.houseRent,
    salaryDetail.otherSpecial,
    salaryDetail.amountOfExemption,
  ]);

  useEffect(() => {
    setIncomeChargeable();
  }, [
    salaryDetail.grossSalary,
    salaryDetail.grossTotalDeduction,
    salaryDetail.profitsInLieuOf,
    salaryDetail.totalAmountOfExemption,
    salaryDetail.totalAmount,
  ]);

  useEffect(() => {
    setGrossTotalIncome();
  }, [
    salaryDetail.incomeChargeable,
    salaryDetail.incomeOrLoss,
    salaryDetail.incomeOtherSources,
  ]);

  useEffect(() => {
    setIncomeTaxOnTotalIncomeAfterRebate87A();
  }, [
    salaryDetail.rebate87A,
    salaryDetail.incomeTaxOnTotalIncome,
  ]);

  useEffect(() => {
    setAggregateAmountOfDeductions();
  }, [
    salaryDetail.eightySectionCDeductiable,
    salaryDetail.eightySectionCCCDeductiable,
    salaryDetail.eightySectionCCD1Deductiable,
  ]);

  useEffect(() => {
    setGrossTotalDeductionUnderVIA();
  }, [
    salaryDetail.aggregateAmountOfDeductions,
    salaryDetail.eightySectionCCD1BDeductiable,
    salaryDetail.eightySectionCCD2Deductiable,
    salaryDetail.eightySectionCCDHDeductiable,
    salaryDetail.eightySectionCCDH2Deductiable,
    salaryDetail.eightySectionDDeductiable,
    salaryDetail.eightySectionEDeductiable,
    salaryDetail.eightySectionGDeductiable,
    salaryDetail.eightySection80TTADeductiable,
    salaryDetail.eightySectionVIADeductiable,
  ]);

  useEffect(() => {
    setTotalTaxableIncome();
  }, [salaryDetail.grossTotalDeductionUnderVIA, salaryDetail.grossTotalIncome]);

  useEffect(() => {
    setTaxableIncome();
  }, [
    salaryDetail.incomeTaxOnTotalIncomeAfterRebate87A,
    salaryDetail.surcharge,
    salaryDetail.healthAndEducationCess,
  ]);

  useEffect(() => {
    setNetTaxpayable();
  }, [salaryDetail.totalPayable, salaryDetail.incomeTaxReliefUnderSection89]);

  useEffect(() => {
    setTotalTDSDeducted();
  }, [
    salaryDetail.totalAmountofTaxDeducted,
    salaryDetail.reportedAmountOfTax,
    salaryDetail.amountReported,
  ]);

  useEffect(() => {
    setShortfallExcess();
  }, [salaryDetail.netTaxPayable, salaryDetail.totalTDS]);

  function setTaxableAmount() {
    let value = 0;
    if (salaryDetail.grossSalary) {
      value = value + salaryDetail.grossSalary;
    }
    if (salaryDetail.valueOfPerquisites) {
      value = value + salaryDetail.valueOfPerquisites;
    }
    if (salaryDetail.profitsInLieuOf) {
      value = value + salaryDetail.profitsInLieuOf;
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["taxableAmount"]: value,
    }));
  }

  function setGrossTotalContribution() {
    let value = 0;
    if (salaryDetail.grossTotalIncome) {
      value = value + salaryDetail.grossTotalIncome;
    }
    if (salaryDetail.theAmountOfContribution) {
      value = value + salaryDetail.theAmountOfContribution;
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["grossTotalIncomeCS"]: value,
    }));
  }

  function setTotalAmountOfSalary() {
    let value = 0;
    if (salaryDetail.reportedTaxableAmount) {
      value =
        value +
        salaryDetail.reportedTaxableAmount +
        (salaryDetail.taxableAmount ? salaryDetail.taxableAmount : 0);
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["totalAmount"]: value,
    }));
  }

  function setTotalAmountOfExemption() {
    let value = 0;
    if (salaryDetail.travelConcession) {
      value = value + salaryDetail.travelConcession;
    }
    if (salaryDetail.deathCumRetirement) {
      value = value + salaryDetail.deathCumRetirement;
    }
    if (salaryDetail.computedValue) {
      value = value + salaryDetail.computedValue;
    }
    if (salaryDetail.cashEquivalent) {
      value = value + salaryDetail.cashEquivalent;
    }
    if (salaryDetail.houseRent) {
      value = value + salaryDetail.houseRent;
    }
    if (salaryDetail.otherSpecial) {
      value = value + salaryDetail.otherSpecial;
    }
    if (salaryDetail.amountOfExemption) {
      value = value + salaryDetail.amountOfExemption;
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["totalAmountOfExemption"]: value,
    }));
  }

  function setGrossTotalDeduction() {
    let value = 0;
    if (salaryDetail.standardDeduction) {
      value = value + salaryDetail.standardDeduction;
    }
    if (salaryDetail.deductionUSII) {
      value = value + salaryDetail.deductionUSII;
    }
    if (salaryDetail.deductionUSIII) {
      value = value + salaryDetail.deductionUSIII;
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["grossTotalDeduction"]: value,
    }));
  }

  function setIncomeChargeable() {
    let value = 0;
    // ToDO
    // if (salaryDetail.wheatherPensioner == "yes") {
    //   if (salaryDetail.grossSalary && salaryDetail.grossTotalDeduction) {
    //     value = salaryDetail.grossSalary - salaryDetail.grossTotalDeduction;
    //   }
    //   if (salaryDetail.grossSalary && !salaryDetail.grossTotalDeduction) {
    //     value = salaryDetail.grossSalary;
    //   }
    //   if (!salaryDetail.grossSalary && salaryDetail.grossTotalDeduction) {
    //     value = salaryDetail.grossSalary;
    //   }
    // }
    // if (salaryDetail.wheatherPensioner == "No") {
    value =
      salaryDetail.totalAmount -
      (salaryDetail.totalAmountOfExemption +
        salaryDetail.grossTotalDeduction);
    // }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["incomeChargeable"]: value,
    }));
  }

  function setGrossTotalIncome() {
    let value = 0;
    if (salaryDetail.incomeChargeable) {
      value = value + salaryDetail.incomeChargeable;
    }
    if (salaryDetail.incomeOrLoss && salaryDetail.incomeOrLoss != "-") {
      value = value + salaryDetail.incomeOrLoss;
    }
    if (salaryDetail.incomeOtherSources) {
      value = value + salaryDetail.incomeOtherSources;
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["grossTotalIncome"]: value,
    }));
  }

  function setIncomeTaxOnTotalIncomeAfterRebate87A() {
    let value = 0;
    value = salaryDetail.incomeTaxOnTotalIncome - salaryDetail.rebate87A;
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["incomeTaxOnTotalIncomeAfterRebate87A"]: value,
    }));
  }

  function setAggregateAmountOfDeductions() {
    let value = 0;
    if (salaryDetail.eightySectionCDeductiable) {
      value = value + salaryDetail.eightySectionCDeductiable;
    }
    if (salaryDetail.eightySectionCCCDeductiable) {
      value = value + salaryDetail.eightySectionCCCDeductiable;
    }
    if (salaryDetail.eightySectionCCD1Deductiable) {
      value = value + salaryDetail.eightySectionCCD1Deductiable;
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["aggregateAmountOfDeductions"]: value,
    }));
  }

  function setGrossTotalDeductionUnderVIA() {
    let value = 0;
    if (salaryDetail.aggregateAmountOfDeductions) {
      value = value + salaryDetail.aggregateAmountOfDeductions;
    }
    if (salaryDetail.eightySectionCCD1BDeductiable) {
      value = value + salaryDetail.eightySectionCCD1BDeductiable;
    }
    if (salaryDetail.eightySectionCCD2Deductiable) {
      value = value + salaryDetail.eightySectionCCD2Deductiable;
    }
    if (salaryDetail.eightySectionCCDHDeductiable) {
      value = value + salaryDetail.eightySectionCCDHDeductiable;
    }
    if (salaryDetail.eightySectionCCDH2Deductiable) {
      value = value + salaryDetail.eightySectionCCDH2Deductiable;
    }
    if (salaryDetail.eightySectionDDeductiable) {
      value = value + salaryDetail.eightySectionDDeductiable;
    }
    if (salaryDetail.eightySectionEDeductiable) {
      value = value + salaryDetail.eightySectionEDeductiable;
    }
    if (salaryDetail.eightySectionGDeductiable) {
      value = value + salaryDetail.eightySectionGDeductiable;
    }
    if (salaryDetail.eightySection80TTADeductiable) {
      value = value + salaryDetail.eightySection80TTADeductiable;
    }
    if (salaryDetail.eightySectionVIADeductiable) {
      value = value + salaryDetail.eightySectionVIADeductiable;
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["grossTotalDeductionUnderVIA"]: value,
    }));
  }

  function setTotalTaxableIncome() {
    let value = 0;
    value = salaryDetail.grossTotalIncome - salaryDetail.grossTotalDeductionUnderVIA;
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["totalTaxableIncome"]: value,
    }));
  }

  function setTaxableIncome() {
    let value = 0;
    if (salaryDetail.incomeTaxOnTotalIncomeAfterRebate87A) {
      value = value + salaryDetail.incomeTaxOnTotalIncomeAfterRebate87A;
    }
    if (salaryDetail.surcharge) {
      value = value + salaryDetail.surcharge;
    }
    if (salaryDetail.healthAndEducationCess) {
      value = value + salaryDetail.healthAndEducationCess;
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["totalPayable"]: value,
    }));
  }

  function setNetTaxpayable() {
    let value = salaryDetail.totalPayable;
    if (salaryDetail.incomeTaxReliefUnderSection89) {
      value = value - salaryDetail.incomeTaxReliefUnderSection89;
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["netTaxPayable"]: value,
    }));
  }

  function setTotalTDSDeducted() {
    let value = 0;
    if (salaryDetail.totalAmountofTaxDeducted) {
      value = value + salaryDetail.totalAmountofTaxDeducted;
    }
    if (salaryDetail.reportedAmountOfTax) {
      value = value + salaryDetail.reportedAmountOfTax;
    }
    if (salaryDetail.amountReported) {
      value = value + salaryDetail.amountReported;
    }
    if (salaryDetail.theAmountOfTaxDeduction) {
      value = value + salaryDetail.theAmountOfTaxDeduction;
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["totalTDS"]: value,
    }));
  }

  function setShortfallExcess() {
    let value = salaryDetail.netTaxPayable;
    if (salaryDetail.totalTDS) {
      value = value - salaryDetail.totalTDS;
    }
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["shortfallExcess"]: value,
    }));
  }

  function getSalaryDetail() {
    if (searchParams.get("id")) {
      SalaryDetailservice.getSalaryDetail(
        parseInt(searchParams.get("id"))
      ).then((res) => {
        if (res && res.id > 0) {
          if (res.dateOfBirth) {
            res.dateOfBirth = new Date(res.dateOfBirth);
          }
          if (res.periodOfFromDate) {
            res.periodOfFromDate = new Date(res.periodOfFromDate);
          }
          if (res.periodOfToDate) {
            res.periodOfToDate = new Date(res.periodOfToDate);
          }
          if (res.dateFromWhichtheEmployee) {
            res.dateFromWhichtheEmployee = new Date(
              res.dateOfBirthateFromWhichtheEmployee
            );
          }
          if (res.dateToWhichtheEmployee) {
            res.dateToWhichtheEmployee = new Date(res.dateToWhichtheEmployee);
          }
          setSalaryDetail(res);
        }
      });
    }
  }

  useEffect(() => {
    validateSalaryDetail();
  }, [salaryDetail]);

  useEffect(() => {
    validateSalaryPerksDetail();
  }, [salaryDetail]);

  useEffect(() => {
    setPerksTotal();
  }, [totalSalary]);

  function setPerksTotal() {
    let value = 0;
    value =
      value + (salaryDetail.accommodationValue - salaryDetail.accommodationAmount);
    value =
      value + (salaryDetail.carsValue - salaryDetail.carsAmount);
    value =
      value + (salaryDetail.sweeperValue - salaryDetail.sweeperAmount);
    value =
      value + (salaryDetail.gasValue - salaryDetail.gasAmount);
    value =
      value + (salaryDetail.interestValue - salaryDetail.interestAmount);
    value =
      value + (salaryDetail.holidayValue - salaryDetail.holidayAmount);
    value =
      value + (salaryDetail.freeTravelValue - salaryDetail.freeTravelAmount);
    value =
      value + (salaryDetail.freeMealsValue - salaryDetail.freeMealsAmount);
    value =
      value + (salaryDetail.freeEducationValue - salaryDetail.freeEducationAmount);
    value =
      value + (salaryDetail.giftsValue - salaryDetail.giftsAmount);
    value =
      value + (salaryDetail.creditCardValue - salaryDetail.creditCardAmount);
    value =
      value + (salaryDetail.clubValue - salaryDetail.clubAmount);
    value =
      value + (salaryDetail.useOfMoveableValue - salaryDetail.useOfMoveableAmount);
    value =
      value + (salaryDetail.transferOfAssetValue - salaryDetail.transferOfAssetAmount);
    value =
      value + (salaryDetail.valueOfAnyOtherValue - salaryDetail.valueOfAnyOtherAmount);
    value =
      value + (salaryDetail.stock16IACValue - salaryDetail.stock16IACAmount);
    value =
      value + (salaryDetail.stockAboveValue - salaryDetail.stockAboveAmount);
    value =
      value + (salaryDetail.contributionValue - salaryDetail.contributionAmount);
    value =
      value + (salaryDetail.annualValue - salaryDetail.annualAmount);
    value =
      value + (salaryDetail.otherValue - salaryDetail.otherAmount);
    setSalaryDetail((prevState) => ({
      ...prevState,
      ["valueOfPerquisites"]: value,
      ["isValueOfPerquisites"]: value,
    }));
  }

  function handleInput(names, e, type) {
    if (
      names === "periodOfFromDate" ||
      names === "periodOfToDate" ||
      names === "dateOfBirth" ||
      names === "dateFromWhichtheEmployee" ||
      names === "dateToWhichtheEmployee"
    ) {
      setSalaryDetail((prevState) => ({
        ...prevState,
        [names]: e,
      }));
    } else if (names == "valueOfPerquisites" && type == "float") {
      let newValue = e.target.value;
      const re = /^[0-9.]*$/;
      if (re.test(newValue)) {
        setSalaryDetail((prevState) => ({
          ...prevState,
          [names]: newValue ? Number(newValue) : null,
          ["otherValue"]: newValue ? Number(newValue) : null,
        }));
        if (newValue && Number(newValue) > 0) {
          setIsHideButton(true);
        } else {
          setIsHideButton(false);
        }
      }
    } else if (names == "incomeOrLoss" && type == "float") {
      let newValue = e.target.value.replace("0-", "-");
      const re = /^[0-9.-]*$/;
      if (re.test(newValue)) {
        if (salaryDetail.newRegime == "N" && (newValue == "-" || Number(newValue) >= -200000)) {
          setSalaryDetail((prevState) => ({
            ...prevState,
            [names]: newValue == "-" ? newValue : newValue ? Number(newValue) : null,
          }));
        }
        else if (salaryDetail.newRegime == "Y" && Number(newValue) > 0) {
          setSalaryDetail((prevState) => ({
            ...prevState,
            [names]: parseFloat(newValue),
          }));
        } else {
          if (!newValue) {
            setSalaryDetail((prevState) => ({
              ...prevState,
              [names]: 0,
            }));
          }
        }
      }
    }
    else if (type === "float") {
      let newValue = e.target.value;
      const re = /^[0-9.]*$/;
      if (re.test(newValue)) {
        setSalaryDetail((prevState) => ({
          ...prevState,
          [names]: newValue ? Number(newValue) : 0,
        }));
      }
    } else {
      setSalaryDetail((prevState) => ({
        ...prevState,
        [names]: e.target.value,
      }));
    }
  }

  function saveSalaryDetail(e) {
    e.preventDefault();
    setIsDirty(true);
    if (validateSalaryDetail()) {
      setLoading(true);
      salaryDetail.financialYear = searchParams.get("financial_year");
      salaryDetail.quarter = searchParams.get("quarter");
      salaryDetail.categoryId = searchParams.get("categoryId");
      salaryDetail.deductorId = deductorId;
      SalaryDetailservice.saveSalaryDetail(salaryDetail)
        .then((res) => {
          if (res) {
            toast.success("Salary Detail Successfully!");
            router.push(
              `/deductors/${deductorId}/tds/${form}/salary/${window.location.search}`
            );
          } else {
            setLoading(false);
          }
        })
        .catch((e) => {
          if (e?.response?.data) {
                      toast.error(e?.response?.data);
                    }
                    else {
                      toast.error(e?.message);
                    }
          setLoading(false);
        });
    }
  }
  function validateSalaryDetail() {
    let newRegimeError = "";
    let periodFromError = "";
    let periodToError = "";
    let nameError = "";
    let categoryError = "";
    let incomeLossError = "";
    if (!salaryDetail.newRegime) {
      newRegimeError = "New Regime is required";
    }
    if (salaryDetail.newRegime == "Y" && salaryDetail.incomeOrLoss <= 0) {
      incomeLossError = "IncomeOrLoss should be greater then 0";
    }
    if (!salaryDetail.periodOfFromDate) {
      periodFromError = "Period From Date is required";
    }
    if (!salaryDetail.periodOfToDate) {
      periodToError = "Period To Date is required";
    }
    if (!salaryDetail.employeeId) {
      nameError = "Name of Employee is required";
    }
    // if (!salaryDetail.categoryEmployee) {
    //   categoryError = "Employee Category is required";
    // }

    if (
      newRegimeError ||
      periodToError ||
      periodFromError ||
      nameError ||
      incomeLossError
    ) {
      setSalaryDetailErrors((prevState) => ({
        ...prevState,
        newRegimeError,
        periodToError,
        periodFromError,
        nameError,
        incomeLossError
      }));
      return false;
    }
    setSalaryDetailErrors((prevState) => ({
      ...prevState,
      newRegimeError: "",
      periodToError: "",
      periodFromError: "",
      nameError: "",
      categoryError: "",
      incomeLossError: ""
    }));
    return true;
  }

  function validateSalaryPerksDetail() {
    let perksError1 = "";
    let perksError2 = "";
    let perksError3 = "";
    let perksError4 = "";
    let perksError5 = "";
    let perksError6 = "";
    let perksError7 = "";
    let perksError8 = "";
    let perksError9 = "";
    let perksError10 = "";
    let perksError11 = "";
    let perksError12 = "";
    let perksError13 = "";
    let perksError14 = "";
    let perksError15 = "";
    let perksError16 = "";
    let perksError17 = "";
    let perksError18 = "";
    let perksError19 = "";
    let perksError20 = "";
    let perksError21 = "";
    let perksError22 = "";
    if (salaryDetail.accommodationAmount > salaryDetail.accommodationValue) {
      perksError1 = "errors";
    }
    if (salaryDetail.carsAmount > salaryDetail.carsValue) {
      perksError2 = "errors";
    }
    if (salaryDetail.sweeperAmount > salaryDetail.sweeperValue) {
      perksError3 = "errors";
    }
    if (salaryDetail.gasAmount > salaryDetail.gasValue) {
      perksError4 = "errors";
    }
    if (salaryDetail.interestAmount > salaryDetail.interestValue) {
      perksError5 = "errors";
    }
    if (salaryDetail.holidayAmount > salaryDetail.holidayValue) {
      perksError6 = "errors";
    }
    if (salaryDetail.freeTravelAmount > salaryDetail.freeTravelValue) {
      perksError7 = "errors";
    }
    if (salaryDetail.freeMealsAmount > salaryDetail.freeMealsValue) {
      perksError8 = "errors";
    }
    if (salaryDetail.freeEducationAmount > salaryDetail.freeEducationValue) {
      perksError9 = "errors";
    }
    if (salaryDetail.giftsAmount > salaryDetail.giftsValue) {
      perksError10 = "errors";
    }
    if (salaryDetail.creditCardAmount > salaryDetail.creditCardValue) {
      perksError11 = "errors";
    }
    if (salaryDetail.clubAmount > salaryDetail.clubValue) {
      perksError12 = "errors";
    }
    if (salaryDetail.useOfMoveableAmount > salaryDetail.useOfMoveableValue) {
      perksError13 = "errors";
    }
    if (
      salaryDetail.transferOfAssetAmount > salaryDetail.transferOfAssetValue
    ) {
      perksError14 = "errors";
    }
    if (
      salaryDetail.valueOfAnyOtherAmount > salaryDetail.valueOfAnyOtherValue
    ) {
      perksError15 = "errors";
    }
    if (salaryDetail.stock16IACAmount > salaryDetail.stock16IACValue) {
      perksError16 = "errors";
    }
    if (salaryDetail.stockAboveAmount > salaryDetail.stockAboveValue) {
      perksError17 = "errors";
    }
    if (salaryDetail.contributionAmount > salaryDetail.contributionValue) {
      perksError18 = "errors";
    }
    if (salaryDetail.annualAmount > salaryDetail.annualValue) {
      perksError19 = "errors";
    }
    if (salaryDetail.otherAmount > salaryDetail.otherValue) {
      perksError20 = "errors";
    }
    if (salaryDetail.netTaxPayable < 0) {
      perksError21 = "errors";
    }

    if (salaryDetail.incomeTaxOnTotalIncomeAfterRebate87A < 0) {
      perksError22 = "errors";
    }

    if (
      perksError1 ||
      perksError2 ||
      perksError3 ||
      perksError4 ||
      perksError5 ||
      perksError6 ||
      perksError7 ||
      perksError8 ||
      perksError9 ||
      perksError10 ||
      perksError11 ||
      perksError12 ||
      perksError13 ||
      perksError14 ||
      perksError15 ||
      perksError16 ||
      perksError17 ||
      perksError18 ||
      perksError19 ||
      perksError20 ||
      perksError21 ||
      perksError22
    ) {
      setSalaryDetailErrors((prevState) => ({
        ...prevState,
        perksError1,
        perksError2,
        perksError3,
        perksError4,
        perksError5,
        perksError6,
        perksError7,
        perksError8,
        perksError9,
        perksError10,
        perksError11,
        perksError12,
        perksError13,
        perksError14,
        perksError15,
        perksError16,
        perksError17,
        perksError18,
        perksError19,
        perksError20,
        perksError21,
        perksError22
      }));
      return false;
    }
    setSalaryDetailErrors((prevState) => ({
      ...prevState,
      perksError1: "",
      perksError2: "",
      perksError3: "",
      perksError4: "",
      perksError5: "",
      perksError6: "",
      perksError7: "",
      perksError8: "",
      perksError9: "",
      perksError10: "",
      perksError11: "",
      perksError12: "",
      perksError13: "",
      perksError14: "",
      perksError15: "",
      perksError16: "",
      perksError17: "",
      perksError18: "",
      perksError19: "",
      perksError20: "",
      perksError21: "",
      perksError22: ""
    }));
    return true;
  }
  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="py-3 salary-details-wrap">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="form-check form-check-inline ps-0">
                <label className="form-check-label" for="wpinputYes">
                  Whether Pensioner
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="wpinputYes"
                  id="wpinputYes"
                  checked={salaryDetail.wheatherPensioner == "Yes"}
                  value="Yes"
                  onChange={(e) => handleInput("wheatherPensioner", e)}
                />
                <label className="form-check-label" for="wpinputYes">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="wpinputNo"
                  id="wpinputNo"
                  value="No"
                  checked={salaryDetail.wheatherPensioner == "No"}
                  onChange={(e) => handleInput("wheatherPensioner", e)}
                />
                <label className="form-check-label" for="wpinputNos">
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {enumList && (
                <SalaryDetail
                  salaryDetail={salaryDetail}
                  enumList={enumList}
                  handleInput={handleInput}
                  employeeDropdowns={employeeDropdowns}
                  form={form}
                  salaryDetailErrors={salaryDetailErrors}
                  totalSalary={totalSalary}
                  setTotalSalary={setTotalSalary}
                  hideButton={hideButton}
                  isDirty={isDirty}
                  validateSalaryPerksDetail={validateSalaryPerksDetail}
                ></SalaryDetail>
              )}
              <div className="row">
                <div className="col-md-12 px-0 d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={saveSalaryDetail}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
