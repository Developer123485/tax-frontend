"use client";

import React, { useState, useEffect } from "react";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useSearchParams } from "next/navigation";
import ProcessPopup from "@/app/components/modals/processing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderList from "@/app/components/header/header-list";
import DataTable from "react-data-table-component";
import { UsersService } from "@/app/services/users.services";
import { CommonService } from "@/app/services/common.service";

export default function Errors() {
    // Note: For Next.js App Router, you don’t use `use(params)`; `params` is passed as prop
    const [pageSize] = useState(100);
    const [showLoader, setShowLoader] = useState(false);
    const [errors, setErrors] = useState([]);

    const searchParams = useSearchParams();

    // Custom styles so that full content displays (wrapping, no truncation)
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
                border: "1px solid #F2F7FF",
                fontSize: "12px",
            },
        },
        cells: {
            style: {
                justifyContent: "start",
                border: "1px solid #FFFFFF",
                fontSize: "12px",
                whiteSpace: "normal",       // allow wrapping
                wordBreak: "break-word",    // break long strings
                overflow: "visible",
            },
        },
    };

    const columns = [
        {
            name: "SN",
            selector: (row, index) => (index + 1),
            grow: 1,
        },
        {
            name: "Message",
            selector: row => row.message ?? "-",
            wrap: true,
            grow: 2.5,
        },
        // {
        //     name: "Stack Trace",
        //     selector: row => row.stackTrace ?? "-",
        //     wrap: true,
        //     grow: 2.5,
        // },
        {
            name: "Source",
            selector: row => row.source ?? "-",
            wrap: true,
            grow: 2.5,
        },
        {
            name: "Path",
            selector: row => row.path ?? "-",
            wrap: true,
            grow: 2.5,
        },
        {
            name: "Query String",
            selector: row => row.queryString ?? "-",
            wrap: true,
            grow: 2.5,
        },
        {
            name: "Method",
            selector: row => row.method ?? "-",
            grow: 2,
        },
        {
            name: "StatusCode",
            selector: row => row.statusCode ?? "-",
            grow: 2,
        },
        {
            name: "Created At",
            selector: row => CommonService.dateFormat(row?.createdAt) ?? "-",
            grow: 1.5,
        },
    ];

    useEffect(() => {
        const uId = searchParams.get("userId");
        if (uId) {
            setShowLoader(true);
            getErrorsLogs(parseInt(uId, 10));
        }
    }, [searchParams]);

    function getErrorsLogs(id) {
        UsersService.getErrorLogByUsersAsync(id)
            .then(res => {
                if (res) {
                    setErrors(res);
                } else {
                    setErrors([]);
                }
            })
            .catch(e => {
                if (e?.response?.data?.errorMessage) {
                    toast.error(e.response.data.errorMessage);
                } else {
                    toast.error(e.message);
                }
            })
            .finally(() => {
                setShowLoader(false);
            });
    }

    return (
        <>
            <HeaderList />
            <BreadcrumbList
                breadcrumbs={[
                    { name: "Users", isActive: false, href: "/users?token=u85eddfes4edesw98548wswfe584478445545w5ss4d51sd55w" },
                    { name: "Errors", isActive: true },
                ]}
            />
            <section className="py-4 pb-md-0 bg-light-gray"></section>
            <section className="py-5 pt-md-0 pb-md-5 bg-light-gray">
                <div className="container">
                    <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
                        <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
                            <div className="col-sm-4 col-md-4">
                                <h4 className="fw-bold mb-0">Errors</h4>
                            </div>
                        </div>
                        <div
                            className="table-responsive"
                            style={{ overflowX: "auto" }}
                        >
                            {errors && errors.length > 0 ? (
                                <DataTable
                                    fixedHeaderScrollHeight="340px"
                                    columns={columns}
                                    data={errors}
                                    highlightOnHover
                                    customStyles={customStyles}
                                    paginationPerPage={pageSize}
                                />
                            ) : (
                                <p className="text-center p-3">No errors found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <ProcessPopup showLoader={showLoader} />
            <ToastContainer />
        </>
    );
}
