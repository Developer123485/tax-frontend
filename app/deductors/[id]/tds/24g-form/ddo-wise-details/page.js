"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { DdoDetailService } from "@/app/services/ddoDetail.service";
import { usePathname } from "next/navigation";
import DataTable from "react-data-table-component";
import CustomCheckbox from "@/app/components/deductee-entry/custom-checkbox";
import ProcessPopup from "@/app/components/modals/processing";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderList from "@/app/components/header/header-list";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FormConfirmation from "@/app/components/modals/form-confimation";
import { FormsService } from "@/app/services/forms.service";
import api from "@/app/utils/interceptors";
import { saveAs } from "file-saver";
import { FuvValidateReturnService } from "@/app/services/fuvValidateReturn.service";
import { DeductorsService } from "@/app/services/deductors.service";



export default function DdoWiseDetails({ params }) {
    const yearList = [];
    const currentYear1 = new Date().getFullYear();
    for (let i = 6; i >= 0; i--) {
        const start = currentYear1 - i;
        yearList.push(`${start}-${(start + 1).toString().slice(-2)}`);
    }

    const now = new Date();
    const currentMonth = now.getMonth(); // Jan = 0
    let startYear = now.getFullYear();
    if (currentMonth < 3) startYear -= 1;
    const fy = `${startYear}-${(startYear + 1).toString().slice(-2)}`;
    const resolvedParams = use(params);
    const deductorId = resolvedParams?.id;
    const ddoId = resolvedParams?.ddoId;
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsloading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [financialYear, setFinancialYear] = useState(fy);
    const [selectedMonth, setSelectedMonth] = useState(String(currentMonth + 1).padStart(2, "0"));
    const [deductorInfo, setDeductorInfo] = useState(null);
    const [ddoWiseDetails, setDdoWiseDetails] = useState(null);
    const [selectedData, setSelectedData] = useState(null);
    const [isDownloadLoading, setIsDownloadLoading] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const searchParams = useSearchParams(null);
    const [isDownloadFormConfirmation, setIsDownloadFormConfirmation] =
        useState(false);
    const [quarter, setQuarter] = useState("");
    const currentYear = new Date().getFullYear();
    const [financialYears, setFinancialYears] = useState(yearList);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    const monthsShort = [
        { value: '01', label: 'Jan' }, { value: '02', label: 'Feb' }, { value: '03', label: 'Mar' },
        { value: '04', label: 'Apr' }, { value: '05', label: 'May' }, { value: '06', label: 'Jun' },
        { value: '07', label: 'Jul' }, { value: '08', label: 'Aug' }, { value: '09', label: 'Sep' },
        { value: '10', label: 'Oct' }, { value: '11', label: 'Nov' }, { value: '12', label: 'Dec' }
    ];

    const breadcrumbs = [
        { name: "Deductors", isActive: false, href: "/deductors" },
        { name: "TDS Dashboard", isActive: false, href: `/deductors/${deductorId}/tds` },
        { name: "24G Details", isActive: false, href: `/deductors/${deductorId}/tds/24g-form` },
        { name: "DDO Wise Details", isActive: true }
    ];

    const customStyles = {
        rows: { style: { backgroundColor: "#FFFFFF", "&:hover": { backgroundColor: "#F2F7FF!important" }, minHeight: "45px" } },
        headCells: { style: { justifyContent: "start", border: "1px solid #F2F7FF", fontSize: "12px" } },
        cells: { style: { justifyContent: "start", border: "1px solid #FFFFFF", fontSize: "12px", textOverflow: "ellipsis", whiteSpace: "nowrap" } },
    };

    const columns = [
        { name: "Serial No", selector: (row, index) => (currentPage - 1) * pageSize + (index + 1) },
        { name: "DDO Name", selector: (row) => row.name || "-", grow: 3 },
        { name: "DDO Tan", selector: (row) => row.tan || "-", grow: 2 },
        { name: "Tax Amount", selector: (row) => row.taxAmount?.toFixed(2) || "-", grow: 1.5 },
        { name: "Total Tds", selector: (row) => row.totalTds?.toFixed(2) || "-", grow: 1.5 },
        { name: "Nature", selector: (row) => row.nature || "-", grow: 3 },
        {
            name: "Actions",
            button: true,
            selector: (row) => (
                <div className="d-flex justify-content-center">
                    <span>
                        <a onClick={() => router.push(`${pathname}/detail?ddoWiseId=${row.id}&financial_year=${financialYear}&month=${selectedMonth}`)}>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                                <Image src="/images/dashboards/table_edit_icon.svg" alt="edit" width={16} height={16} />
                            </OverlayTrigger>
                        </a>
                    </span>
                    <span className="mx-2 opacity-50">|</span>
                    <span>
                        <a onClick={() => {
                            setConfirmTitle("Delete DDO Wise Detail");
                            setDeleteId(row.id);
                            setDeleteConfirm(true);
                        }}>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                                <Image src="/images/dashboards/table_delete_icon.svg" alt="delete" width={16} height={16} />
                            </OverlayTrigger>
                        </a>
                    </span>
                </div>
            ),
            style: { position: "sticky", right: 0, zIndex: 0, backgroundColor: "#fff" },
            grow: 2,
            width: "135px",
        }
    ];

    useEffect(() => {
        getDeductor(deductorId);
    }, []);

    function getDeductor(deductorId) {
        DeductorsService.getDeductor(deductorId).then(
            (res) => {
                if (res) {
                    setDeductorInfo(res);
                }
            })
    }

    useEffect(() => {
        fetchDdoWiseDetails();
    }, [currentPage, pageSize, selectedMonth, financialYear]);

    const fetchDdoWiseDetails = () => {
        setShowLoader(true);
        setDdoWiseDetails(null);
        DdoDetailService.getDdoWiseDetails({
            pageSize,
            pageNumber: currentPage,
            deductorId,
            financialYear,
            month: selectedMonth
        })
            .then((res) => setDdoWiseDetails(res))
            .catch((e) => toast.error(e?.response?.data?.errorMessage || e.message))
            .finally(() => setTimeout(() => setShowLoader(false), 100));
    };

    const handleChange = (state) => setSelectedData(state.selectedRows);

    function download() {
        const url = "/static/pdf/24G_Excel_Template.xlsx";
        const link = document.createElement("a");
        link.href = url;
        link.download = "24G_Excel_Template.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const fileSelectHandler = (e) => handleFileChange(e.target.files[0]);

    const handleFileChange = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        try {
            setIsLoading(true);
            const res = await api.post(
                `ddoDetails/uploadDDODetailExcelFile/${deductorId}/2/true/${financialYear}/${selectedMonth}`,
                formData,
                config
            );
            if (res) {
                toast.success("File uploaded successfully");
                fetchDdoWiseDetails();
            } else {
                toast.error("File upload failed");
            }
        } catch (e) {
            toast.error(e?.response?.data?.errorMessage || e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const generateFuv = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await FuvValidateReturnService.generate24GFVU({ financialYear, deductorId, month: selectedMonth });
            toast.success("FVU generated successfully");
        } catch (e) {
            toast.error(e?.response?.data?.errorMessage || e.message);
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await FormsService.final24GReport({ financialYear, deductorId, month: selectedMonth });
            const blob = new Blob([res], { type: "text/plain" });
            saveAs(blob, "24G.txt");
        } catch (e) {
            toast.error(e?.response?.data?.errorMessage || e.message);
        } finally {
            setIsLoading(false);
        }
    };

    async function downloadFvuFiles(e) {
        e.preventDefault();
        setIsDownloadLoading(true);
        const dedName = deductorInfo.deductorName.replace(/[^a-zA-Z0-9 ]/g, "").trim();
        const month = selectedMonth.toString();
        const monthName = new Date(2026, parseInt(month) - 1)
            .toLocaleString('en-US', { month: 'long' });

        try {
            const response = await fetch(`https://py-api.taxvahan.site/get-fvu24g-file?param1=${dedName}&param2=${financialYear}&param3=${monthName}`);
            if (!response.ok) {
                toast.error("Failed to download ZIP");
                return;
            }
            const contentType = response.headers.get("Content-Type");
            // If response is JSON instead of ZIP, it's likely an error message
            if (contentType && contentType.includes("application/json")) {
                toast.error("No file is available for download. Please click on 'Generate FVU'.");
                return;
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const fileName = deductorInfo.deductorName + "_" + financialYear + "_" + selectedMonth + ".zip";
            saveAs(url, fileName);
        } catch (error) {
            toast.error(error.message || "Download failed.");
        } finally {
            setIsDownloadLoading(false);
        }
    }

    return (
        <>
            <ToastContainer />
            <HeaderList />
            <BreadcrumbList breadcrumbs={breadcrumbs} />
            <section className="py-5 py-md-3">
                <div className="container">
                    <div className="row align-items-center deductors-sec">
                        <div className="col-md-4">
                            <h2 className="fw-bold">Simplify TDS Filing -</h2>
                            <p className="fs-18 mb-0">
                                Enter, Import, or Download <br />
                                Data Instantly for DDO Wise Details!
                            </p>
                        </div>
                        <div className="col-md-8">
                            <div className="row justify-content-between">
                                {/* Add DDO Entry */}
                                <div
                                    className="col-md-4 cursor-pointer"
                                    onClick={() =>
                                        router.push(
                                            `/deductors/${deductorId}/tds/24g-form/ddo-wise-details/detail?financial_year=${financialYear}&month=${selectedMonth}`
                                        )
                                    }
                                >
                                    <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <Image
                                                    className="img-fluid"
                                                    src="/images/dashboards/enter_data_manually_icon.svg"
                                                    alt="enter data manually icon"
                                                    width={121}
                                                    height={121}
                                                />
                                            </div>
                                            <div className="col-md-7">
                                                <h5 className="fw-bold text-capitalize mb-0">
                                                    Add DDO Wise <br /> Entry
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Import Excel */}
                                <div className="col-md-4">
                                    <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <Image
                                                    className="img-fluid"
                                                    src="/images/dashboards/import_excel_file_icon.svg"
                                                    alt="import excel file icon"
                                                    width={121}
                                                    height={121}
                                                />
                                            </div>
                                            <div className="col-md-7">
                                                <label className="w-100 text-capitalize cursor-pointer mb-0">
                                                    <input
                                                        type="file"
                                                        onChange={fileSelectHandler}
                                                        className="visually-hidden"
                                                        accept=".xlsx"
                                                    />
                                                    <h5 className="fw-bold mb-0">
                                                        {isloading ? 'Uploading...' : 'Import Excel File'}
                                                    </h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Download Excel */}
                                <div className="col-md-4 cursor-pointer" onClick={download}>
                                    <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <Image
                                                    className="img-fluid"
                                                    src="/images/dashboards/download_excel_file_icon.svg"
                                                    alt="download excel file icon"
                                                    width={121}
                                                    height={121}
                                                />
                                            </div>
                                            <div className="col-md-7">
                                                <h5 className="fw-bold text-capitalize mb-0">
                                                    Download <br /> Excel File
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5 py-md-4 bg-light-gray">
                <div className="container">
                    <div className="bg-white border border-1 rounded-3 pb-2">
                        <div className="row px-3 py-3 align-items-center datatable-header">
                            <div className="col-md-4">
                                <h4 className="mb-0">DDO Details</h4>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select" value={financialYear} onChange={(e) => setFinancialYear(e.target.value)}>
                                    {financialYears.map((fy, i) => <option key={i} value={fy}>{fy}</option>)}
                                </select>
                            </div>
                            <div className="col-md-1">
                                <select className="form-select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                                    {monthsShort.map((m, i) => <option key={i} value={m.value}>{m.label}</option>)}
                                </select>
                            </div>
                            <div className="col-md-5 d-flex align-items-center justify-content-end">
                                {/* <button className="btn btn-outline-primary me-3" onClick={downloadFile}>Download</button> */}
                                <button className="btn btn-outline-primary me-3" onClick={() => {
                                    setConfirmTitle("Bulk DDO Wise Details");
                                    setDeleteConfirm(true);
                                }} disabled={!selectedData?.length}>Bulk/Delete</button>
                                {/* <button className="btn btn-primary me-3" onClick={() => {
                                    setConfirmTitle("All DDO Wise Details");
                                    setDeleteConfirm(true);
                                }} disabled={!ddoWiseDetails?.ddoWiseDetailList?.length}>Delete All</button> */}
                                <button className="btn btn-primary me-3" onClick={generateFuv} disabled={loading || !ddoWiseDetails?.ddoWiseDetailList?.length}>
                                    {loading && (
                                        <span
                                            className="spinner-grow spinner-grow-sm"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                    )}Generate FVU</button>
                                <button type="button" disabled={isDownloadLoading || !ddoWiseDetails?.ddoWiseDetailList?.length} onClick={(e) => downloadFvuFiles(e)} className="btn btn-primary ">
                                    {isDownloadLoading && (
                                        <span
                                            className="spinner-grow spinner-grow-sm"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                    )}
                                    Download files
                                </button>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                {ddoWiseDetails?.ddoWiseDetailList?.length > 0 && (
                                    <DataTable
                                        fixedHeader
                                        fixedHeaderScrollHeight="340px"
                                        columns={columns}
                                        data={ddoWiseDetails.ddoWiseDetailList}

                                        pagination
                                        paginationServer
                                        paginationTotalRows={ddoWiseDetails.totalRows}
                                        paginationPerPage={pageSize}
                                        selectableRows
                                        selectableRowsNoSelectAll
                                        onSelectedRowsChange={handleChange}
                                        onChangePage={(page) => setCurrentPage(page)}
                                        customStyles={customStyles}
                                        customInput={<CustomCheckbox />}
                                        paginationComponentOptions={{ noRowsPerPage: true }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProcessPopup showLoader={showLoader}></ProcessPopup>
            <DeleteConfirmation
                show={deleteConfirm}
                name={confirmTitle}
                setDeleteConfirm={(e) => setDeleteConfirm(e)}
                delete={(e) => deleteEntry(e)}
            ></DeleteConfirmation>
            <FormConfirmation
                isFormConfirmation={isDownloadFormConfirmation}
                setIsFormConfirmation={setIsDownloadFormConfirmation}
                isLoading={isLoading}
                name={"Download Final Report for 24G"}
                submitForm={downloadFile}
            ></FormConfirmation>
        </>
    );
}
