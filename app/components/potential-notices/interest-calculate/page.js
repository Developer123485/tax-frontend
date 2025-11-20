"use client";
import React, { useState, use, useEffect } from "react";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import { CommonService } from "@/app/services/common.service";

export default function InterestList(props) {
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
            name: "Section Code",
            selector: (row) => row.sectionCode ?? "-",
        },
        {
            name: "Deductee Name",
            selector: (row) => row.deducteeName ?? "-",
        },
        {
            name: "Pan",
            selector: (row) => row.pan || "-",
        },
        {
            name: "Date Of Payment/Credit",
            selector: (row) =>
                row?.dateOfPaymentCredit
                    ? CommonService.dateFormat(row?.dateOfPaymentCredit)
                    : "-",
        },
        {
            name: "Date Of Deduction",
            selector: (row) =>
                row?.dateOfDeduction
                    ? CommonService.dateFormat(row?.dateOfDeduction)
                    : "-",
        },
        {
            name: "Date Of Deposit",
            selector: (row) =>
                row?.dateOfDeposit
                    ? CommonService.dateFormat(row?.dateOfDeposit)
                    : "-",
        },
        {
            name: "Due Date Of Deposit",
            selector: (row) =>
                row?.dueDateOfDeposit
                    ? CommonService.dateFormat(row?.dueDateOfDeposit)
                    : "-",
        },
        {
            name: "TDS Amount",
            selector: (row) => row?.tdsAmount.toFixed(2) ?? "-",
        },
        {
            name: "Amount",
            selector: (row) => row?.amount.toFixed(2) ?? "-",
        },
        {
            name: "Month Deducted",
            selector: (row) => row?.monthDeducted ?? "-",
        },
        {
            name: "Month Deposited",
            selector: (row) => row?.monthDeposited ?? "-",
        },
        {
            name: "Late Deduction Interest",
            selector: (row) => row?.lateDeductionInterest.toFixed(2) ?? "-",
        },
        {
            name: "Late Payment Interest",
            selector: (row) => row?.latePaymentInterest.toFixed(2) ?? "-",
        },
        {
            name: "Total Interest",
            selector: (row) => row?.totalInterestAmount.toFixed(2) ?? "-",
        },
        {
            name: "Challan No",
            selector: (row) => row?.challanNo ?? "-",
        },
    ];

    return (
        <>
            <div className="table-responsive">
                <div>
                    {props.response &&
                        props.response.interestCalculateReportList &&
                        props.response.interestCalculateReportList.length > 0 && (
                            <>
                                <DataTable
                                    fixedHeader
                                    fixedHeaderScrollHeight="340px"
                                    columns={columns}
                                    data={props.response.interestCalculateReportList}
                                    
                                    pagination={true}
                                    paginationServer
                                    customStyles={customStyles}
                                    paginationTotalRows={props.response.totalRows}
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
