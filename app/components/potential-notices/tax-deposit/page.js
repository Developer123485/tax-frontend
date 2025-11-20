"use client";
import React, { useState, use, useEffect } from "react";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import { CommonService } from "@/app/services/common.service";

export default function TaxDepositList(props) {
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
            name: "TDS",
            selector: (row) => row.tds || "-",
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
            name: "Paid By Book Entry",
            selector: (row) => row?.paidByBook ?? "-",
        },
        {
            name: "Due Date Of Deposit",
            selector: (row) =>
                row?.dueDateOfDeposit
                    ? CommonService.dateFormat(row?.dueDateOfDeposit)
                    : "-",
        },
        {
            name: "Delay In Days",
            selector: (row) => row?.delayInDays ?? "-",
        },
    ];

    return (
        <>
            <div className="table-responsive">
                <div>
                    {props.response &&
                        props.response.lateDepositReportList &&
                        props.response.lateDepositReportList.length > 0 && (
                            <>
                                <DataTable
                                    fixedHeader
                                    fixedHeaderScrollHeight="340px"
                                    columns={columns}
                                    data={props.response.lateDepositReportList}
                                    
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
