"use client";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import React, { useState, use, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DeductorsService } from "@/app/services/deductors.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { TDSDashboardService } from "@/app/services/tdsDashboard.service";
import { ProgressBar } from "react-bootstrap";
import api from "@/app/utils/interceptors";
import ProcessPopup from "@/app/components/modals/processing";
import HeaderList from "@/app/components/header/header-list";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FormsService } from "@/app/services/forms.service";
import { saveAs } from "file-saver";

export default function TDSDashboard({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [deductorInfo, setDeductorInfo] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const deductorId = resolvedParams?.id;
    const [selectedFile, setSelectedFile] = useState(null);
    const [formsData, setFormsData] = useState(null);
    const [financialYear, setFinancialYear] = useState("");
    const [quarter, setQuarter] = useState("");
    const [fileName, setFileName] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [deducteeCount, setDeducteeCount] = useState(0);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const currentYear = new Date().getFullYear();
    const [financialYears, setFinancialYears] = useState([]);
    const [quarters, setQuarters] = useState(["Q1", "Q2", "Q3", "Q4"]);
    const [key, setKey] = useState("tds");
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
            name: "24G Form",
            isActive: true,
        },
    ]);
    useEffect(() => {
    }, []);

    return (
        <>
            <ToastContainer />
            <HeaderList></HeaderList>
            <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
            <section className="py-5 py-md-4 bg-light-gray tds-dash-tabs">
                <div className="container">
                    <div className="row pb-3 align-items-center">
                        <div className="col-md-8">
                            <h4 className="mb-4 mb-md-0 fw-bold text-capitalize">
                                24G Form
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="">
                        <div className="row">
                            <div className="col-md-8 border-end pe-md-4">
                                <div className="row g-3">
                                    <div
                                        className="col-md-3"
                                        onClick={(e) => {
                                            router.push(
                                                `/deductors/${deductorId}/tds/24g-form/ddo-details`
                                            );
                                        }}
                                    >
                                        <span className="d-flex flex-column justify-content-center align-items-center text-center py-2 py-md-2 px-2 px-md-2 border border-1 rounded-4 bg-light-blue countbox">
                                            <span
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                }}
                                                className="fs-6 rounded-4 fw-bold bg-dark-blue d-flex align-items-center justify-content-center"
                                            >
                                                DDO Details
                                            </span>
                                        </span>
                                    </div>
                                    <div
                                        className="col-md-3"
                                        onClick={(e) => {
                                            router.push(
                                                `/deductors/${deductorId}/tds/24g-form/ddo-wise-details`
                                            );
                                        }}
                                    >
                                        <span className="d-flex flex-column justify-content-center align-items-center text-center py-2 py-md-2 px-2 px-md-2 border border-1 rounded-4 bg-light-blue countbox">
                                            <span
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                }}
                                                className="fs-6 rounded-4 fw-bold bg-dark-blue d-flex align-items-center justify-content-center"
                                            >
                                                DDO Wise Details
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}
