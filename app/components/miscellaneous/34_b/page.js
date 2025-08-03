"use client";
import React, { useState, use, useEffect } from "react";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";

export default function Miscellaneous34B(props) {
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
      name: "Type Of Form",
      selector: (row) => row.type ?? "-",
    },
    {
      name: "Date Of Funishing",
      selector: (row) => row?.dateOfFunishing ?? "-",
    },
    {
      name: "Date Of Funishing, If Furnished",
      selector: (row) => row?.dateOfFunishingII ?? "-",
    },
    {
      name: "Wheather Statement",
      selector: (row) => row?.wheatherStatement ?? "-",
    },
  ];

  return (
    <>
      <div className="table-responsive">
        <div>
          {props.response &&
            props.response.miscellaneousBReportList &&
            props.response.miscellaneousBReportList.length > 0 && (
              <>
                <DataTable
                  fixedHeader
                  fixedHeaderScrollHeight="340px"
                  columns={columns}
                  data={props.response.miscellaneousBReportList}
                  highlightOnHover
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
