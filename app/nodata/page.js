"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import HeaderList from "../components/header/header-list";

export default function NotFound() {
  useEffect(() => {}, []);
  const router = useRouter(null);
  return (
    <>
      <ToastContainer />
      <HeaderList></HeaderList>
      <section className="py-5 py-md-3">
        <div className="container">
          <div className="row align-items-center deductors-sec">
          <div className="col-md-4">
              <h2 className="fw-bold">
              Simplify TDS Filing -
              </h2>
              <p className="fs-18 mb-0">
                Enter, Import, or Download <br/>
                Data Instantly for Deductors!
              </p>
            </div>
            <div className="col-md-8">
              <div className="row justify-content-between">
                <div className="col-md-4">
                  <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <Image
                          className="img-fluid"
                          src="/images/dashboards/enter_data_manually_icon.svg"
                          alt="enter_data_manually_icon"
                          width={121}
                          height={121}
                        />
                      </div>
                      <div className="col-md-7">
                        <h5 className="fw-bold text-capitalize mb-0">
                          Enter data
                          <br /> manually
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <Image
                          className="img-fluid"
                          src="/images/dashboards/import_excel_file_icon.svg"
                          alt="import_excel_file_icon"
                          width={121}
                          height={121}
                        />
                      </div>
                      <div className="col-md-7">
                        <h5 className="fw-bold text-capitalize mb-0">
                          Import
                          <br /> Excel File
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="content-box border border-1 px-1 py-2 px-md-3 py-md-3 rounded-3">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <Image
                          className="img-fluid"
                          src="/images/dashboards/download_excel_file_icon.svg"
                          alt="download_excel_file_icon"
                          width={121}
                          height={121}
                        />
                      </div>
                      <div className="col-md-7">
                        <h5 className="fw-bold text-capitalize mb-0">
                          Download
                          <br /> Excel File
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 py-md-4 bg-light-gray d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row py-md-5">
            <div className="col-md-3"></div>
            <div className="col-md-6 text-center">
              <Image
                className="img-fluid mb-4"
                src="/images/dashboards/no_data_found.svg"
                alt="no_data_found"
                width={500}
                height={500}
              />
              <h4 className="fw-bold text-capitalize">No data found</h4>
              {/*         <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
                className="btn btn-primary mt-4"
              >
                Go to Homepage
              </button> */}
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </section>
    </>
  );
}
