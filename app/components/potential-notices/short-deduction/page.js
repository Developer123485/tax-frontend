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

export default function ShortDeductions(props) {
  const customStyles = {
    rows: {
      style: {
      
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
      name: "Date Of Payment/Credit",
      selector: (row) =>
        row?.dateOfPaymentCredit
          ? CommonService.dateFormat(row?.dateOfPaymentCredit)
          : "-",
    },
    {
      name: "Amount Paid Credited",
      selector: (row) => row?.amountPaidCredited.toFixed(2) ?? "-",
    },
    {
      name: "Applicable Rate",
      selector: (row) => row?.applicableRate.toFixed(2) ?? "-",
    },
    {
      name: "TDS to be Deducted",
      selector: (row) => row?.tdsToBeDeducted.toFixed(2) ?? "-",
    },
    {
      name: "Actiual Deduction",
      selector: (row) => row?.actualDecution.toFixed(2) ?? "-",
    },
    {
      name: "Short Deduction",
      selector: (row) => row?.shortDeduction.toFixed(2) ?? "-",
    },
  ];

  return (
    <>
      <div className="table-responsive">
        <div>
          {props.shortDeductionReports &&
            props.shortDeductionReports.shortDeductionsList &&
            props.shortDeductionReports.shortDeductionsList.length > 0 && (
              <>
                <DataTable
                  fixedHeader
                  fixedHeaderScrollHeight="340px"
                  columns={columns}
                  data={props.shortDeductionReports.shortDeductionsList}
                  
                  pagination={true}
                  paginationServer
                  customStyles={customStyles}
                  paginationTotalRows={props.shortDeductionReports.totalRows}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', fontWeight: 'bold', background: '#f2f2f2' }}>
                  <div>Total</div>
                  <div>{props.shortDeductionReports.subTotal}</div>
                </div>
              </>
            )}
        </div>
      </div>
    </>
  );
}
