"use client";
import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ChallanService } from "@/app/services/challan.service";
import { usePathname } from "next/navigation";
import DataTable from "react-data-table-component";
import CustomCheckbox from "@/app/components/deductee-entry/custom-checkbox";
import ProcessPopup from "@/app/components/modals/processing";
import DeleteConfirmation from "@/app/components/modals/delete-confirmation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderList from "@/app/components/header/header-list";
import { CommonService } from "@/app/services/common.service";

export default function LateFeePayable(props) {
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
            name: "Due Date",
            selector: (row) => row?.dueDate
                ? CommonService.dateFormat(row?.dueDate)
                : "-",
        },
        {
            name: "Date Of Filing Return",
            selector: (row) => row?.dateOfFillingReturn
                ? CommonService.dateFormat(row?.dateOfFillingReturn)
                : "-",
        },
        {
            name: "No Of Delays",
            selector: (row) => row.noOfDelays || "-",
        },
        {
            name: "Late Fee",
            selector: (row) => row?.lateFee
        },
        {
            name: "Total Tax Deducted",
            selector: (row) => row?.totalTaxDeducted ?? "-",
        },
        {
            name: "Late Fee Payable Value",
            selector: (row) => row?.lateFeePayableValue ?? "-",
        },
        {
            name: "Late Fee Deposit",
            selector: (row) => row?.lateFeeDeposit ?? "-",
        },
        {
            name: "Balance",
            selector: (row) => row?.balance ?? "-",
        },
    ];

    return (
        <>
            <div className="table-responsive">
                <div>
                    {
                        props.response?.lateFeePayableList &&
                        props.response.lateFeePayableList.length > 0 && (
                            <>
                                <DataTable
                                    fixedHeader
                                    fixedHeaderScrollHeight="340px"
                                    columns={columns}
                                    data={props.response.lateFeePayableList}
                                    
                                    paginationServer
                                    customStyles={customStyles}
                                    pagination={true}
                                    paginationTotalRows={props.response.lateFeePayableList.totalRows}
                                    paginationPerPage={props.pageSize}
                                    paginationDefaultPage={props.currentPage}
                                    paginationComponentOptions={{
                                        noRowsPerPage: true,
                                    }}
                                    onChangePage={(page) => {
                                        if (props.currentPage !== page) {
                                            props.setCurrentPage(page);
                                        }
                                    }}
                                />
                            </>
                        )}
                </div>
            </div>
        </>
    );
}
