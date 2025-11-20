"use client";
import React, { useState, use, useEffect } from "react";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";

export default function Miscellaneous34C(props) {
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
      name: "Amount Of Interest",
      selector: (row) => row.amount ?? "-",
    },
    {
      name: "Amount Paid",
      selector: (row) => row?.amountPaid ?? "-",
    },
    {
      name: "Date Of Payment",
      selector: (row) => row?.dateOfPayment ?? "-",
    },
  ];

  return (
    <>
      <div className="table-responsive">
        <div>
          {props.response &&
            props.response.miscellaneousCReportList &&
            props.response.miscellaneousCReportList.length > 0 && (
              <>
                <DataTable
                  fixedHeader
                  fixedHeaderScrollHeight="340px"
                  columns={columns}
                  data={props.response.miscellaneousCReportList}
                  
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
