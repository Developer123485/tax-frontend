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
import { TracesLowerDeductionService } from "@/app/services/tracesLowerDeduction.service";
import { saveAs } from "file-saver";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import { CommonService } from "@/app/services/common.service";

export default function TDSReturn({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [showLoader, setShowLoader] = useState(false);
  const [list, setList] = useState(null);
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
      grow: 0.1,
    },
    {
      name: "Certificate No",
      selector: (row) => row.certificateNo ?? "-",
      grow: 2,
    },
    {
      name: "Financial Year",
      selector: (row) => row?.financialYear ?? "-",
      grow: 1.8,
    },
    {
      name: "Pan/Tan",
      selector: (row) => row?.tan ?? "-",
      grow: 2,
    },
    {
      name: "Name",
      selector: (row) => row?.name ?? "-",
      grow: 2.5,
    },

    {
      name: "Valid From",
      selector: (row) => row?.validFromDate ?? "-",
      grow: 1.5,
    },
    {
      name: "Cancel Date",
      selector: (row) => row?.validTillCancelDate ?? "-",
      grow: 1.4,
    },
    {
      name: "Valid To",
      selector: (row) => row?.validTillDate ?? "-",
      grow: 1.4,
    },
    {
      name: "Section Code",
      selector: (row) => row?.sectionCode || "-",
      grow: 1.6,
    },
    {
      name: "Nature",
      selector: (row) => row?.nature ?? "-",
      grow: 2,
    },
    {
      name: "Rate",
      selector: (row) => row?.certificateRate?.toFixed(2) ?? "-",
      grow: 1,
    },
    {
      name: "Certificate Limit",
      selector: (row) => row?.certificateLimit?.toFixed(2) ?? "-",
      grow: 1.5,
    },
    {
      name: "Amount Consumed",
      selector: (row) => row?.amountConsumed?.toFixed(2) ?? "-",
      grow: 1.5,
    },
    {
      name: "Date Of Issue",
      selector: (row) => row?.dateOfIssue ?? "-",
      grow: 1.5,
    },
    {
      name: "Created Date",
      selector: (row) => row.createdDate ? CommonService.dateAndTimeFormat(row.createdDate) : "-",
      grow: 1.6,
    },
    {
      name: "Updated Date",
      selector: (row) => row.updatedDate ? CommonService.dateAndTimeFormat(row.updatedDate) : "-",
      grow: 1.6,
    },
  ];
  const searchParams = useSearchParams(null);
  const [breadcrumbs, setBreadcrumbs] = useState([
    {
      name: "Deductors",
      isActive: false,
      href: "/deductors",
    },
    {
      name: "TDS Dashboard",
      isActive: false,
      href: `/deductors/${deductorId}/tds`,
    },
    {
      name: "Traces Lower Deduction",
      isActive: true,
    },
  ]);
  useEffect(() => {
    if (deductorId > 0) {
      setShowLoader(true);
      getLowerDeductions("", false);
    } else {
      router.push("/deductors");
    }
  }, [pageSize, currentPage]);

  function getLowerDeductions(searchValue, value) {
    const model = {
      pageSize: pageSize,
      pageNumber: currentPage,
      financialYear: "",
      quarter: "",
      deductorId: deductorId,
      categoryId: "1",
      search: searchValue,
    };
    TracesLowerDeductionService.fetchLowerDeduction(model)
      .then((res) => {
        if (value) {
          let fileName = "";
          fileName = "Traces_Lower_Deductions.xlsx";
          let url = window.URL.createObjectURL(new Blob([res]));
          toast.success("Export Data Successfully!");
          saveAs(url, fileName);
        } else {
          if (res) {
            setList(res);
          }
        }
      })
      .catch((e) => {
        if (e?.response?.data?.errorMessage) {
          toast.error(e?.response?.data?.errorMessage);
        }
        else {
          toast.error(e?.message);
        }
      })
      .finally((f) => {
        setShowLoader(false);
      });
  }

  return (
    <>
      <style jsx global>{`
        .rdt_TableHeadRow:last-of-type .rdt_TableCol:last-of-type {
          position: relative !important;
        }
      `}</style>
      <ToastContainer />
      <HeaderList></HeaderList>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <section className="py-4 pb-md-0 bg-light-gray"></section>
      <section className="py-5 pt-md-0 pb-md-5 bg-light-gray">
        <div className="container">
          <div className="bg-white pb-2 pb-md-0 border border-1 rounded-3">
            <div className="row px-3 py-3 px-md-3 py-md-2 align-items-center datatable-header">
              <div className="col-sm-6 col-md-6">
                <h4 className="fw-bold mb-0">Traces Lower Deductions</h4>
              </div>
              <>
                <div className="col-sm-6 col-md-6">
                  <div className="d-flex align-items-center">
                    {/* <button
                                            className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                                            type="button"
                                            onClick={(e) => {
                                                getSalaryReports("", true);
                                            }}
                                        >
                                            Download
                                        </button> */}
                    <div className="input-group searchbox">
                      <input
                        type="search"
                        placeholder="Search here"
                        className="form-control bg-light-gray border-end-0"
                        id="34a"
                        onChange={(e) => {
                          setTimeout(() => {
                            getLowerDeductions(e.target.value, false);
                          }, 600);
                        }}
                      />
                      <button
                        className="btn btn-outline-secondary border border-1 border-start-0 px-2 py-1"
                        type="button"
                      >
                        {" "}
                        <Image
                          className=""
                          src="/images/dashboards/search_icon.svg"
                          alt="search_icon"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            </div>
            <div className="table-responsive">
              <div>
                {list?.tracesLowerDeductionList &&
                  list?.tracesLowerDeductionList.length > 0 && (
                    <>
                      <DataTable
                        className="tax_table"
                        fixedHeader
                        fixedHeaderScrollHeight="340px"
                        columns={columns}
                        data={list?.tracesLowerDeductionList}
                        
                        pagination={true}
                        paginationServer
                        customStyles={customStyles}
                        paginationTotalRows={list?.totalRows}
                        paginationPerPage={pageSize}
                        paginationDefaultPage={currentPage}
                        paginationComponentOptions={{
                          noRowsPerPage: true,
                        }}
                        onChangePage={(page) => {
                          if (currentPage !== page) {
                            setCurrentPage(currentPage);
                          }
                        }}
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
