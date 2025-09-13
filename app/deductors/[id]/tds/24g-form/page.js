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
            <section class="py-5 bg-light">
                <div class="container">
                    <div class="row mb-4">
                        <div class="col-md-8">
                            <h3 class="fw-bold text-capitalize">24G Form</h3>
                        </div>
                    </div>

                    <div class="row g-4">
                        <div class="col-12 col-sm-6 col-md-3">
                            <div class="card h-100 shadow-sm border-0" onClick={(e) => {
                                router.push(
                                    `/deductors/${deductorId}/tds/24g-form/ddo-details`
                                );
                            }} role="button">
                                <div class="card-body text-center">
                                    <span
                                        style={{
                                            width: 65,
                                            height: 65,
                                        }}
                                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                                    >
                                        DDO
                                    </span>
                                    <h6 class="fw-bold mb-2">DDO Details</h6>
                                    <p class="text-muted small">Enter or manage Drawing and Disbursing Officer (DDO) information for the selected deductor.</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-3">
                            <div class="card h-100 shadow-sm border-0"
                                onClick={(e) => {
                                    router.push(
                                        `/deductors/${deductorId}/tds/24g-form/ddo-wise-details`
                                    );
                                }}
                                role="button">
                                <div class="card-body text-center">
                                    <span
                                        style={{
                                            width: 65,
                                            height: 65,
                                        }}
                                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                                    >
                                        DDO
                                    </span>
                                    <h6 class="fw-bold mb-2">DDO Wise Details</h6>
                                    <p class="text-muted small">View and manage form data based on each DDO separately. Ideal for organizations with multiple DDOs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
