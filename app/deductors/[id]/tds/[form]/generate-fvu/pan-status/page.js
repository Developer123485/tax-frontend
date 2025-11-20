"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import DataTable from "react-data-table-component";
import ProcessPopup from "@/app/components/modals/processing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderList from "@/app/components/header/header-list";
import { saveAs } from "file-saver";
import { DeducteeEntryService } from "@/app/services/deducteeEntry.service";
import { TracesActivitiesService } from "@/app/services/tracesActivities.service";
import { Modal } from "react-bootstrap";
import { DeductorsService } from "@/app/services/deductors.service";

export default function PanStatus({ params }) {
    const resolvedParams = use(params);
    const [resendLoading, setResendLoading] = useState(false);
    const deductorId = resolvedParams?.id;
    const form = resolvedParams?.form;
    const pathname = usePathname();
    const [verifyType, setVerifyType] = useState("");
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [showLoader, setShowLoader] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [confirmModal, setConfirmModal] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [panStatusResponse, setPanStatusResponse] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [deductorInfo, setDeductorInfo] = useState(null);
    const [bulkLoading, setBulkLoading] = useState(false);
    const [allLoading, setAllLoading] = useState(false);
    const [exportLoading, setExportLoading] = useState(false);
    const [captchaBase64, setCaptchaBase64] = useState('');
    const [captcha, setCaptcha] = useState("");
    const searchParams = useSearchParams(null);
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
            href: `/deductors/${deductorId}/tds/${form}?categoryId=${searchParams.get("categoryId")}&financial_year=${searchParams.get("financial_year")}&quarter=${searchParams.get("quarter")}}`,
        },
        {
            name: "Generate-Fvu",
            isActive: false,
            href: `/deductors/${deductorId}/tds/${form}/generate-fvu?categoryId=${searchParams.get("categoryId")}&financial_year=${searchParams.get("financial_year")}&quarter=${searchParams.get("quarter")}`,
        },
        {
            name: "Late Fee Payable",
            isActive: true,
        },
    ]);

    const customStyles = {
        rows: {
            style: {
                backgroundColor: "#FFFFFF",
                "&:hover": {
                    backgroundColor: "#F2F7FF!important",
                },
                minHeight: "45px",
            },
        },
        headCells: {
            style: {
                justifyContent: "start",
                outline: "1px",
                border: "1px solid #F2F7FF",
                fontSize: "12px",
            },
        },
        cells: {
            style: {
                justifyContent: "start",
                outline: "1px",
                border: "1px solid #FFFFFF",
                fontSize: "12px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            },
        },
    };
    const columns = [
        {
            name: "Serial No",
            selector: (row, index) => (currentPage - 1) * pageSize + (index + 1),
        },
        {
            name: "Pan Number",
            selector: (row) => row?.panNumber || "-"
        },
        {
            name: "Name",
            selector: (row) => row.name || "-",
        },
        {
            name: "Pan Status",
            selector: (row) => row?.status || "-"
        },
        {
            name: "Verified Name",
            selector: (row) => row?.verifiedName ?? "-",
        },
        {
            name: "Last Verified On",
            selector: (row) => row?.verifiedDate ?? "-",
        },
    ];
    useEffect(() => {
        if (
            searchParams.get("financial_year") &&
            searchParams.get("quarter") &&
            searchParams.get("categoryId")
        ) {
            setShowLoader(true);
            fetchPanList(1, false);
        } else {
            router.push("/deductors");
        }
    }, [currentPage, pageSize, searchValue]);

    useEffect(() => {
        getDeductorDetail();
    }, []);

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

    function fetchPanList(pageNum, value) {
        const model = {
            pageSize: pageSize,
            pageNumber: pageNum,
            financialYear: searchParams.get("financial_year"),
            quarter: searchParams.get("quarter"),
            deductorId: deductorId,
            categoryId: parseInt(searchParams.get("categoryId")),
            type: searchParams.get("type") ? searchParams.get("type") : null,
            search: searchValue,
        };
        DeducteeEntryService.getPanLists(model, value)
            .then((res) => {
                if (value) {
                    let fileName = "";
                    fileName = "Interest-Calculation-Export-" + form + ".xlsx";
                    let url = window.URL.createObjectURL(new Blob([res]));
                    toast.success("Export Data Successfully!");
                    saveAs(url, fileName);
                } else {
                    if (res?.panLists && res?.panLists?.length > 0) {
                        setPanStatusResponse(res);
                    }
                }
            })
            .catch(e => {
                if (e?.response?.data?.errorMessage) {
                    toast.error(e?.response?.data?.errorMessage);
                }
                else {
                    toast.error(e?.message);
                }
            })
            .finally((f) => {
                setShowLoader(false);
                setExportLoading(false);
            });
    }

    function getDeductorDetail() {
        DeductorsService.getDeductor(deductorId)
            .then((res) => {
                if (res) {
                    setDeductorInfo(res);
                }
            })
            .catch((e) => {
                if (e?.response?.data?.errorMessage) {
                    toast.error(e?.response?.data?.errorMessage);
                }
                else {
                    toast.error(e?.message);
                }
            });
    }

    const handleChange = (state) => {
        setSelectedData(state.selectedRows);
    };

    function submitLogin(e) {
        setCaptcha("");
        if (deductorInfo.tracesLogin && deductorInfo.tracesPassword) {
            const model = {
                userName: deductorInfo.tracesLogin,
                password: deductorInfo.tracesPassword,
                tanNumber: deductorInfo?.deductorTan
            }
            TracesActivitiesService.startLogin(model).then(res => {
                if (res) {
                    setCaptchaBase64(res.captcha);
                    setConfirmModal(true);
                    setBulkLoading(false);
                    setAllLoading(false);
                }
            }).catch(e => {
                if (e?.response?.data?.errorMessage) {
                    toast.error(e?.response?.data?.errorMessage);
                }
                else {
                    toast.error(e?.message);
                }
                setBulkLoading(false);
                setAllLoading(false);
            })
        } else {
            setAllLoading(false);
            setBulkLoading(false);
            setCaptchaBase64("");
            setVerifyType("");
            setCaptcha("");
            toast.error("TRACES username and password do not exist for the deductor");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!captcha) {
            toast.error("Input Captcha is required");
            return false;
        }
        setSubmitLoading(true);
        const model = {
            captcha: captcha,
            deductorId: deductorId,
            ids: (verifyType == "all" ? [] : selectedData.map(p => p.id)),
        }
        searchParams.get("type") ? searchParams.get("type") : null
        if (searchParams.get("categoryId") != "1") {
            TracesActivitiesService.verifyDeducteePans(model).then(res => {
                if (res) {
                    setSelectedData([]);
                    toast.success(res);
                    fetchPanList(1, false);
                    setConfirmModal(false);
                    setVerifyType("");
                }
                setSubmitLoading(false);
                setCaptchaBase64("");
            }).catch(e => {
                if (e?.response?.data?.errorMessage) {
                    toast.error(e?.response?.data?.errorMessage);
                }
                else {
                    toast.error(e?.message);
                }
                setVerifyType("");
                setConfirmModal(false);
                setSubmitLoading(false);
                setSelectedData([]);
                setCaptchaBase64("");
            })
        } else {
            TracesActivitiesService.verifyEmployeePans(model).then(res => {
                if (res) {
                    setSelectedData([]);
                    fetchPanList(1, false);
                }
                toast.success(res);
                setConfirmModal(false);
                setVerifyType("");
                setSubmitLoading(false);
                setCaptchaBase64("");
            }).catch(e => {
                if (e?.response?.data?.errorMessage) {
                    toast.error(e?.response?.data?.errorMessage);
                }
                else {
                    toast.error(e?.message);
                }
                setVerifyType("");
                setConfirmModal(false);
                setSubmitLoading(false);
                setCaptchaBase64("");
            })
        }
    }

    return (
        <>
            <ToastContainer />
            <HeaderList></HeaderList>
            <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
            <section className="py-5 py-md-4 bg-light-gray">
                <div className="container">
                    <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
                        <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
                            <div className="col-sm-4 col-md-4">
                                <h5 className="mb-0">
                                    {searchParams.get("categoryId") == "1" ? "Employee " : "Dedcutee "} {searchParams.get("type") ? searchParams.get("type") : "Not Verified"}  Pan Status
                                </h5>
                            </div>
                            <>
                                <div className="col-md-5 d-flex align-items-center justify-content-end">
                                    <button type="button"
                                        disabled={selectedData?.length == 0 || bulkLoading}
                                        className="btn btn-primary me-3"
                                        onClick={(e) => {
                                            setBulkLoading(true);
                                            setVerifyType("bulk");
                                            submitLogin(e);
                                        }}
                                    >
                                        {bulkLoading && (
                                            <div className="spinner-border me-2" role="status"></div>
                                        )}
                                        Bulk PAN Verify
                                    </button>
                                    <button type="button"
                                        disabled={panStatusResponse?.panLists.length == 0 || allLoading}
                                        className="btn btn-primary me-3"
                                        onClick={(e) => {
                                            setAllLoading(true);
                                            setVerifyType("all");
                                            submitLogin(e)
                                        }}
                                    >
                                        {allLoading && (
                                            <span className="spinner-border me-2" role="status"></span>
                                        )}
                                        Verify All PANs
                                    </button>
                                    <button
                                        className="btn btn-primary me-3"
                                        type="button"
                                        onClick={(e) => {
                                            setExportLoading(true);
                                            fetchPanList(1, true);
                                        }}
                                        disabled={!panStatusResponse || exportLoading}
                                    >
                                        {exportLoading && (
                                            <span className="spinner-border me-2" role="status"></span>
                                        )}
                                        Export
                                    </button>
                                </div>
                                <div className="col-sm-3 col-md-3">
                                    <div className="d-flex align-items-center">
                                        <div className="input-group searchbox">
                                            <input
                                                type="search"
                                                placeholder="Search here"
                                                className="form-control bg-light-gray border-end-0"
                                                id="pan"
                                                onChange={(e) => {
                                                    setTimeout(() => {
                                                        setSearchValue(e.target.value);
                                                    }, 1000);
                                                }}
                                            />
                                            <button
                                                className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                                                type="button"
                                            >
                                                {" "}
                                                <Image
                                                    className=""
                                                    src="/images/dashboards/search_icon.svg"
                                                    alt="search_icon"
                                                    width={24}
                                                    height={24}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <div>
                                        {
                                            panStatusResponse?.panLists &&
                                            panStatusResponse.panLists.length > 0 && (
                                                <>
                                                    <DataTable
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="420px"
                                                        columns={columns}
                                                        data={panStatusResponse.panLists}
                                                        
                                                        paginationServer
                                                        paginationTotalRows={panStatusResponse.totalRows}
                                                        paginationPerPage={pageSize}
                                                        selectableRows={true}
                                                        selectableRowsNoSelectAll={true}
                                                        customStyles={customStyles}
                                                        onSelectedRowsChange={handleChange}
                                                        pagination={true}
                                                        paginationComponentOptions={{
                                                            noRowsPerPage: true,
                                                        }}
                                                        onChangePage={(page) => {
                                                            if (currentPage !== page) {
                                                                setCurrentPage(page);
                                                            }
                                                        }}
                                                    />
                                                </>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal
                className=""
                size="sm"
                centered
                keyboard={false}
                backdrop="static"
                show={confirmModal}
                onHide={() => {
                    setAllLoading(false);
                    setBulkLoading(false);
                    setCaptchaBase64("");
                    setVerifyType("");
                    setCaptcha("");
                    setConfirmModal(false)
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
                                maxLength={5}
                                value={captcha}
                                onChange={(e) => setCaptcha(
                                    e.target.value,
                                )}
                                style={{ padding: 10, fontSize: 16, marginBottom: 10 }}
                            />
                            <br />
                            <button
                                className="btn btn-primary"
                                disabled={submitLoading}
                                onClick={handleSubmit} style={{ padding: 10, fontSize: 16 }}>
                                {submitLoading && (
                                    <div className="spinner-border me-2" role="status"></div>
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
            <ProcessPopup showLoader={showLoader}></ProcessPopup>
        </>
    );
}
