"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DeductorsService } from "../services/deductors.service";
import "react-toastify/dist/ReactToastify.css";
import { saveAs } from "file-saver";
import { toast, ToastContainer } from "react-toastify";
import { ProgressBar } from "react-bootstrap";
import api from "@/app/utils/interceptors";
import HeaderList from "../components/header/header-list";

export default function dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [breadcrumbs, setBreadcrumbs] = useState([
    {
      name: "Deductors",
      isActive: false,
      href: "/deductors",
    },
    {
      name: "Import Deductor",
      isActive: true,
    },
  ]);

  const fileSelectHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const router = useRouter(null);
  async function handleFileChange(e) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(Math.round(percent));
        }
      },
    };
    try {
      setIsLoading(true);
      const result = await api.post(
        `deductor/uploadExcelFile`,
        formData,
        config
      );
      if (result === "Uploaded Deductor File successFully") {
        toast.success("Upload Excel file successfully!");
        router.push("/deductors");
      } else {
        toast.error(
          "Invalid File. check error in deductor errors text downloded file"
        );
      }
    } catch (error) {
      toast.error("Error during file upload");
    } finally {
      setIsLoading(false);
      setSelectedFile("");
      setFileName("");
    }
    // DeductorsService.uploadDeductors(formData)
    //   .then((res) => {
    //     if (res === "Uploaded Deductor File successFully") {
    //       toast.success("Upload Excel file successfully!");
    //       router.push("/deductors");
    //     } else {
    //       toast.error(
    //         "Invalid File. check error in deductor errors text downloded file"
    //       );
    //       let url = window.URL.createObjectURL(new Blob([res]));
    //       setIsLoading(false);
    //       setSelectedFile(null);
    //       saveAs(url, "DeductorFileErros" + ".txt");
    //     }
    //   })
    //   .catch((e) => {
    //     toast.error(e?.message);
    //     setIsLoading(false);
    //     setSelectedFile(null);
    //   });
  }

  function download() {
    const url = "/static/pdf/DEDUCTOR_MASTER-FINAL.xlsx";
    const link = document.createElement("a");
    link.href = url;
    link.download = "DEDUCTOR_MASTER-FINAL.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <HeaderList></HeaderList>
      <ToastContainer close={5000} />
      <section className="add-deductors-hero add-deductors-ban">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 text-white">
              <div className="py-5">
                <span className="fs-18">Hi, Developer</span>
                <h1 className="fw-bold mt-4 mt-md-2">
                  Currently, No Deductor has been added.
                  <br />
                  Please add one.
                </h1>
                <p>Import or enter details to create deductors</p>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center">

            </div>
          </div>
        </div>
      </section>
      <section className="bg-light-gray py-5 py-md-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-3 py-md-4 rounded-4">
                <div className="row align-items-center">
                  <div className="col-5 col-md-4">
                    <Image
                      className="img-fluid"
                      src="/images/dashboards/enter_data_manually_icon.svg"
                      alt="enter_data_manually_icon"
                      width={121}
                      height={121}
                    />
                  </div>
                  <div className="col-7 col-md-8">
                    <h5 className="fw-bold text-capitalize">
                      Enter data manually
                    </h5>
                    <p>
                      Manually enter deductor details, including deductor
                      information and responsible person details.
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={(e) => router.push("/deductors/deductor-detail")}
                    className="btn btn-primary w-100 text-capitalize"
                  >
                    Add Deductor
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-3 py-md-4 rounded-4">
                <div className="row align-items-center">
                  <div className="col-5 col-md-4">
                    <Image
                      className="img-fluid"
                      src="/images/dashboards/import_excel_file_icon.svg"
                      alt="import_excel_file_icon"
                      width={121}
                      height={121}
                    />
                  </div>
                  <div className="col-7 col-md-8">
                    <h5 className="fw-bold text-capitalize">
                      Import Excel File
                    </h5>
                    <p>
                      Import deductor details using .xlsx files to seamlessly
                      and automatically create deductors.
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  {fileName && <span className="text-danger">{fileName}</span>}
                  {!selectedFile && (
                    <label className="btn btn-primary w-100 text-capitalize">
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
                      {isloading ? "Uploading...." : "Upload"}
                    </button>
                  )}
                </div>
                {isloading && <div className="mt-3">
                  <ProgressBar animated now={uploadProgress} />
                </div>}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="content-box bg-white px-3 py-3 px-md-3 py-md-4 rounded-4">
                <div className="row align-items-center">
                  <div className="col-5 col-md-4">
                    <Image
                      className="img-fluid"
                      src="/images/dashboards/download_excel_file_icon.svg"
                      alt="download_excel_file_icon"
                      width={121}
                      height={121}
                    />
                  </div>
                  <div className="col-7 col-md-8">
                    <h5 className="fw-bold text-capitalize">Download excel</h5>
                    <p>
                      Download and complete data in the latest Excel templates
                      without altering column order or names.
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={(e) => download()}
                    className="btn btn-primary w-100 text-capitalize"
                  >
                    Download Template
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
