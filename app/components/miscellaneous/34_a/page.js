"use client";
import React, { useState, use, useEffect } from "react";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import { CommonService } from "@/app/services/common.service";

export default function Miscellaneous34A(props) {
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
            name: "Tan",
            selector: (row) => row.tan ?? "-",
        },
        {
            name: "Section Code",
            selector: (row) => row.sectionCode ?? "-",
        },
        {
            name: "Nature",
            selector: (row) => row.nature || "-",
            grow: 3,
        },
        {
            name: "TDS Amount",
            selector: (row) => row?.totalAmountOfPayment ?? "-",
        },
        {
            name: "Amount 1",
            selector: (row) => row?.totalAmountOnWhichTaxRequired ?? "-",
        },
        {
            name: "Amount 2",
            selector: (row) => row?.totalAmountOnWhichTaxDeducted ?? "-",
        },
        {
            name: "Amount 3",
            selector: (row) => row?.amountOfTaxDeductedOut ?? "-",
        },
        {
            name: "Amount 4",
            selector: (row) => row?.totalAmountOnWhichTaxDeductedII ?? "-",
        },
        {
            name: "Amount 5",
            selector: (row) => row?.amountOfTaxDeductedOn ?? "-",
        },
        {
            name: "Amount 6",
            selector: (row) => row?.amountOfTaxDeductedOrCollected ?? "-",
        },
    ];

    return (
        <>
            <div className="table-responsive">
                <div>
                    {props.response &&
                        props.response.miscellaneousAReportList &&
                        props.response.miscellaneousAReportList.length > 0 && (
                            <>
                                <DataTable
                                    fixedHeader
                                    fixedHeaderScrollHeight="340px"
                                    columns={columns}
                                    data={props.response.miscellaneousAReportList}
                                    
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
