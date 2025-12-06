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
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImportDeductorTXTPopup from "@/app/components/modals/import-deductor-txt-popup";
import { CorrectionsService } from "@/app/services/corrections.service";
import DataTable from "react-data-table-component";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";

export default function Dashboard({ params }) {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const resolvedParams = use(params);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(1);
    const remitterId = resolvedParams?.id;
    const [pageSize, setPageSize] = useState(50);
    const [deductorInfo, setDeductorInfo] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const deductorId = resolvedParams?.id;
    const [selectedFile, setSelectedFile] = useState(null);
    const [formsData, setFormsData] = useState(["Part A", "Part B", "Part C", "Part D"]);
    const [financialYear, setFinancialYear] = useState("");
    const [quarter, setQuarter] = useState("");
    const [fileName, setFileName] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deducteeCount, setDeducteeCount] = useState(0);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const currentYear = new Date().getFullYear();
    const [financialYears, setFinancialYears] = useState([]);
    const [correctionStatements, setCorrectionStatements] = useState([]);
    const [totalItems, setTotalItems] = useState(null);
    const [quarters, setQuarters] = useState(["Q1", "Q2", "Q3", "Q4"]);
    const [key, setKey] = useState("");
    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            name: "Remitters",
            isActive: false,
            href: "/remitters",
        },
        {
            name: "Dashboard",
            isActive: true,
        },
    ]);

    const fileSelectHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
        handleFileChange(event.target.files[0]);
    };

    function download() {
        const url = "/static/pdf/Deductee_Employee_Master_Template.xlsx";
        const link = document.createElement("a");
        link.href = url;
        link.download = "Deductee_Employee_Master_Template.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
            <ToastContainer />
            <HeaderList></HeaderList>
            <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
            <section className="py-3 bg-light-gray">
                <div className="container">
                    <div className="row">
                        {/* LEFT — 15CA Form */}
                        <div className="col-md-6 pe-md-4 border-end">
                            <h4 className="text-uppercase fw-bold mb-4">15CA Form</h4>
                            <div className="d-flex flex-column gap-3">
                                {/* Master List */}
                                <div className="sidebar-card" onClick={() => router.push("tds/deductees")}>
                                    <Image
                                        src="/images/dashboards/users_icon.svg"
                                        width={45}
                                        height={45}
                                        alt="Part A"
                                    />
                                    <div className="sidebar-card-content">
                                        <span className="title">Part A</span>
                                        <p className="description">
                                            Submit details of remittances where the remitter is not required to obtain a certificate from the Assessing Officer and the amount does not exceed ₹5 lakh during the financial year.
                                        </p>
                                    </div>
                                </div>

                                {/* Add Master Entry */}
                                <div
                                    className="sidebar-card"
                                    onClick={() => router.push(`/deductors/${deductorId}/tds/deductees/detail`)}
                                >
                                    <Image src="/images/dashboards/enter_data_manually_icon.svg" width={45} height={45} alt="" />
                                    <div className="sidebar-card-content">
                                        <span className="title">Part B</span>
                                        <p className="description">
                                            Submit information for remittances where the remitter has obtained a certificate from the Assessing Officer under Section 195(2) or 195(3) or 197
                                        </p>
                                    </div>
                                </div>

                                {/* Import Excel */}
                                <label className="sidebar-card pointer">
                                    <Image src="/images/dashboards/import_excel_file_icon.svg" width={45} height={45} alt="" />
                                    <div className="sidebar-card-content">
                                        <span className="title">Part C</span>
                                        <p className="description">
                                            Submit details where the remitter is required to obtain an order from the Assessing Officer for determining tax liability and the payment exceeds ₹5 lakh during the financial year.
                                        </p>
                                    </div>
                                </label>

                                {/* Download Excel Template */}
                                <div className="sidebar-card" onClick={download}>
                                    <Image src="/images/dashboards/download_excel_file_icon.svg" width={45} height={45} alt="" />
                                    <div className="sidebar-card-content">
                                        <span className="title">Part D</span>
                                        <p className="description">
                                            Submit details of remittances not chargeable to tax under the provisions of the Income-tax Act, 1961.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* RIGHT — Deductee Master */}
                        <div className="col-md-6 ps-md-4 mt-5 mt-md-0">
                            <h4 className="fw-bold text-uppercase mb-4">Master Details</h4>

                            <div className="d-flex flex-column gap-3">
                                {/* Master List */}
                                <div className="sidebar-card" onClick={() => router.push(`/remitters/${remitterId}/dashboard/remittee`)}>
                                    <Image src="/images/dashboards/users_icon.svg" width={45} height={45} alt="" />
                                    <div className="sidebar-card-content">
                                        <span className="title">Remittee List</span>
                                        <p className="description">
                                            Store and manage details of all foreign remittees for reuse in 15CA forms.
                                        </p>
                                    </div>
                                </div>

                                {/* Add Master Entry */}
                                <div
                                    className="sidebar-card"
                                    onClick={() => router.push(`/deductors/${deductorId}/tds/deductees/detail`)}
                                >
                                    <Image src="/images/dashboards/enter_data_manually_icon.svg" width={45} height={45} alt="" />
                                    <div className="sidebar-card-content">
                                        <span className="title">Accountant List</span>
                                        <p className="description">
                                            Maintain list of authorized Chartered Accountants for certification and document validation.
                                        </p>
                                    </div>
                                </div>

                                {/* Import Excel */}
                                <div
                                    className="sidebar-card"
                                    onClick={() => router.push(`/deductors/${deductorId}/tds/deductees/detail`)}
                                >
                                    <Image src="/images/dashboards/enter_data_manually_icon.svg" width={45} height={45} alt="" />
                                    <div className="sidebar-card-content">
                                        <span className="title">AO Order List</span>
                                        <p className="description">
                                            Record details of Assessing Officer orders or approvals issued under Section 195/197.
                                        </p>
                                    </div>
                                </div>

                                {/* Download Excel Template */}
                                <div
                                    className="sidebar-card"
                                    onClick={() => router.push(`/deductors/${deductorId}/tds/deductees/detail`)}
                                >
                                    <Image src="/images/dashboards/enter_data_manually_icon.svg" width={45} height={45} alt="" />
                                    <div className="sidebar-card-content">
                                        <span className="title">Bank List</span>
                                        <p className="description">
                                            Maintain bank and branch details used for processing foreign remittance transactions.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <DeleteConfirmation
                show={deleteConfirm}
                deleteLoading={deleteLoading}
                setDeleteConfirm={(e) => setDeleteConfirm(e)}
                delete={(e) => deleteCorrectionDeductor(e)}
            ></DeleteConfirmation>
            {showLoader && <ProcessPopup showLoader={showLoader}></ProcessPopup>}
            {show && <ImportDeductorTXTPopup fetchDeductors={fetchCorrectionStatements} show={show} deductorId={deductorId} financialYear={financialYear} quarter={quarter} setShow={(e) => setShow(e)}></ImportDeductorTXTPopup>}
        </>
    );
}
