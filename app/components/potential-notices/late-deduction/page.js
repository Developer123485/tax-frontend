"use client";
import { CommonService } from "@/app/services/common.service";
import React, { useState, use, useEffect } from "react";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";

export default function LateDeductions(props) {
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
    // {
    //   name: "Serial No",
    //   selector: (row, index) => index + 1,
    // },
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
      name: "Amount Of Deduction",
      selector: (row) => row.amountOfDeduction || "-",
    },
    {
      name: "Date Of Payment/Credit",
      selector: (row) =>
        row?.dateOfPayment ? CommonService.dateFormat(row?.dateOfPayment) : "-",
    },
    {
      name: "Date Of Deduction",
      selector: (row) =>
        row?.dateOfPayment
          ? CommonService.dateFormat(row?.dateOfDeduction)
          : "-",
    },
    {
      name: "Due Date Of Deduction",
      selector: (row) =>
        row?.dueDateForDeduction
          ? CommonService.dateFormat(row?.dueDateForDeduction)
          : "-",
    },
    {
      name: "Delay in Days",
      selector: (row) => row?.delayInDays || "-",
    },
  ];

  return (
    <>
      <div className="table-responsive">
        <div>
          {props.lateDeductionReports?.lateDeductionsList &&
            props.lateDeductionReports?.lateDeductionsList?.length > 0 && (
              <DataTable
                fixedHeader
                fixedHeaderScrollHeight="340px"
                columns={columns}
                data={props.lateDeductionReports.lateDeductionsList}
                
                pagination={true}
                paginationServer
                customStyles={customStyles}
                paginationTotalRows={props.lateDeductionReports.totalRows}
                paginationPerPage={props.pageSize}
                paginationDefaultPage={props.currentPage}
                selectableRowsNoSelectAll={true}
                paginationComponentOptions={{
                  noRowsPerPage: true,
                }}
                onChangePage={(page) => {
                  if (props.currentPage !== page) {
                    props.setCurrentPage(page);
                  }
                }}
              />
            )}
        </div>
      </div>
    </>
  );
}
