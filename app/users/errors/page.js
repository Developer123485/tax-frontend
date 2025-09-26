"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ProcessPopup from "@/app/components/modals/processing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderList from "@/app/components/header/header-list";
import { ReportingService } from "@/app/services/reporting.service";
import { saveAs } from "file-saver";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import { CommonService } from "@/app/services/common.service";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { UsersService } from "@/app/services/users.services";

export default function Errors({ params }) {
    const resolvedParams = use(params);
    const deductorId = resolvedParams?.id;
    const [isDirty, setIsDirty] = useState(false);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(0);
    const [pageSize, setPageSize] = useState(100);
    const [showLoader, setShowLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [openTdsReturn, setOpenTdsReturns] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const highlightStyle = {
        padding: "8px",
        border: "1px solid",
        borderColor: isFocused ? "#007bff" : "#ccc",
        boxShadow: isFocused ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
        outline: "none",
    };
    const highlightStyle1 = {
        padding: "8px",
        border: "1px solid",
        borderColor: isFocused1 ? "#007bff" : "#ccc",
        boxShadow: isFocused1 ? "0 0 3px 2px rgba(0, 123, 255, 0.5)" : "none",
        outline: "none",
    };

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
            name: "SN",
            selector: (row, index) => (currentPage - 1) * pageSize + (index + 1),
            grow: 1,
        },
        {
            name: "Message",
            selector: (row) => row.message ?? "-",
            grow: 1,
        },
        {
            name: "Stack Trace",
            selector: (row) => row?.stackTrace ?? "-",
            grow: 1,
        },
        {
            name: "Source",
            selector: (row) => row?.source ?? "-",
            grow: 1,
        },
        {
            name: "Path",
            selector: (row) => row?.path ?? "-",
            grow: 1,
        },
        {
            name: "Query String",
            selector: (row) => row?.queryString ?? "-",
            grow: 1,
        },
        {
            name: "Method",
            selector: (row) => row?.method ?? "-",
            grow: 2,
        },
        {
            name: "StatusCode",
            selector: (row) => row?.statusCode ?? "-",
            grow: 2,
        },
        {
            name: "Created At",
            selector: (row) => row?.createdAt ?? "-",
            grow: 1.5,
        },
    ];
    const searchParams = useSearchParams(null);
    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            name: "Users",
            isActive: false,
            href: "/users",
        },
        {
            name: "Erros",
            isActive: true,
        },
    ]);
    useEffect(() => {
        const uId = searchParams.get("userId");
        if (uId) {
            setShowLoader(true);
            getErrorsLogs(parseInt(uId));
        }
    }, []);


    function getErrorsLogs(id) {
        UsersService.getErrorLogByUsersAsync(id)
            .then((res) => {
                debugger
                if (res) {
                    setErrors(res)
                }
            })
            .catch((e) => {
                if (e?.response?.data?.errorMessage) {
                    toast.error(e?.response?.data?.errorMessage);
                } else {
                    toast.error(e?.message);
                }
            })
            .finally((f) => {
                setShowLoader(false);
            });
    }

    return (
        <>
            <HeaderList></HeaderList>
            <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
            <section className="py-4 pb-md-0 bg-light-gray"></section>
            <section className="py-5 pt-md-0 pb-md-5 bg-light-gray">
                <div className="container">
                    <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
                        <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
                            <div className="col-sm-4 col-md-4">
                                <h4 className="fw-bold mb-0">Errors</h4>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <div>
                                {errors?.errors &&
                                    errors?.errors.length > 0 && (
                                        <>
                                            <DataTable
                                                fixedHeader
                                                columns={columns}
                                                data={errors?.errors}
                                                highlightOnHover
                                                customStyles={customStyles}
                                                paginationPerPage={pageSize}
                                            />
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ProcessPopup showLoader={showLoader}></ProcessPopup>
        </>
    );
}
