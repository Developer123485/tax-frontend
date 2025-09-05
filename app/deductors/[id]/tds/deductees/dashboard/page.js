"use client";
import React, { useState, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DeducteeService } from "@/app/services/deductee.service";
import "react-toastify/dist/ReactToastify.css";
import { saveAs } from "file-saver";
import { toast, ToastContainer } from "react-toastify";
import BreadcrumbList from "@/app/components/breadcrumbs/page";
import { DeductorsService } from "@/app/services/deductors.service";

export default function ImportDeductee({ params }) {
  const resolvedParams = use(params);
  const deductorId = resolvedParams?.id;
  const [selectedFile, setSelectedFile] = useState(null);
  const [isloading, setIsloading] = useState(false);
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
      name: "Deductees",
      isActive: false,
      href: `/deductors/${deductorId}/tds/deductees`,
    },
    {
      name: "Dashboard",
      isActive: true,
    },
  ]);
  const fileSelectHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setPdfFile(URL.createObjectURL(file));
  };
  const router = useRouter(null);

  async function handleFileChange(e) {
    setIsloading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    DeductorsService.uploadDeductors(formData)
      .then((res) => {
        let url = window.URL.createObjectURL(new Blob([res]));
        if (res === "Uploded file has beed not success") {
          toast.error("Upload Excel file successfully!");
          router.push("/deductors");
        } else {
          toast.error(
            "Invalid File. check error in deductor errors text downloded file"
          );
          setIsloading(false);
          setSelectedFile(null);
          saveAs(url, "DeductorFileErros" + ".txt");
        }
      })
      .catch((e) => {
        toast.error(e?.message);
        setIsloading(false);
        setSelectedFile(null);
      });
  }

  function download() {
    const url = "/static/pdf/DEDUCTEE-EMPLOYEE-MASTER-FINAL.xlsx";
    const link = document.createElement("a");
    link.href = url;
    link.download = "DEDUCTEE-EMPLOYEE-MASTER-FINAL.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <BreadcrumbList breadcrumbs={breadcrumbs}></BreadcrumbList>
      <ToastContainer close={3500} />
      <section>
        <br />
        <div className="container py-2">
          <div className="row my-md-4">
            <div className="col-md-10">
              <div className="col-md-12">
                <h4>Select an option to add deductee master!</h4>
                <p>Import or enter details to create deductee master</p>
              </div>
              <div className="row g-3 gy-md-0 my-4 my-md-4 border border-1 rounded-1 px-3 py-3 px-md-3 py-md-3 align-items-center justify-content-center text-center text-md-start">
                <div className="col-12 col-md-1">
                  <Image
                    className="mb-2 bg-light-orange py-4 px-4"
                    src="/images/icons/enter_data_manually.png"
                    alt="form-icon"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="col-12 col-md-8">
                  <h6>Enter data manually</h6>
                  <span>
                    Enter deductee details such as deductee information,
                    responsible person
                    <br /> details etc manually
                  </span>
                </div>
                <div className="col-12 col-md-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/deductors/${deductorId}/tds/deductees/add`);
                    }}
                    className="btn btn-outline-primary w-100"
                  >
                    Add Deductee
                  </button>
                </div>
              </div>
              <div className="row g-3 gy-md-0 my-4 my-md-4 border border-1 rounded-1 px-3 py-3 px-md-3 py-md-3 align-items-center justify-content-center text-center text-md-start">
                <div className="col-12 col-md-1">
                  <Image
                    className="mb-2 bg-light-orange py-4 px-4"
                    src="/images/icons/import_excel_file.png"
                    alt="excel-import-icon"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="col-12 col-md-8">
                  <h6>Import Excel File</h6>
                  <span>
                    Import deductee details via. xlsx files to automatically
                    create deductees
                  </span>
                </div>
                <div className="col-12 col-md-3">
                  {!selectedFile && (
                    <label className="btn btn-outline-primary w-100">
                      <span className="fw-bold"> </span>
                      <input
                        type="file"
                        onChange={fileSelectHandler}
                        className="visually-hidden"
                        accept=".xlsx"
                      />
                      Import from Excel
                    </label>
                  )}
                  {selectedFile && (
                    <button
                      type="button"
                      className="btn btn-secondary w-100"
                      onClick={handleFileChange}
                      disabled={isloading}
                    >
                      {isloading && (
                        <span
                          classname="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Upload
                    </button>
                  )}
                </div>
              </div>
              <div className="row g-3 gy-md-0 my-4 my-md-4 border border-1 rounded-1 px-3 py-3 px-md-3 py-md-3 align-items-center justify-content-center text-center text-md-start">
                <div className="col-12 col-md-1">
                  <Image
                    className="mb-2 bg-light-orange py-4 px-4"
                    src="/images/icons/download_excel.png"
                    alt="form-icon"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="col-12 col-md-8">
                  <h6>Download excel template</h6>
                  <span>
                    Download and fill data in the latest version of our excel
                    templates below. Remember not to change
                    <br /> the column order and names in the sheet.
                  </span>
                </div>
                <div className="col-12 col-md-3">
                  <button
                    type="button"
                    onClick={(e) => download()}
                    className="btn btn-outline-primary w-100"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
