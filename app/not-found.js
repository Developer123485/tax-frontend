"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  useEffect(() => { }, []);
  const router = useRouter(null);
  return (
    <>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
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
            </div>
            {/*             <div className="col-md-6 text-center">
              <Image
                className=""
                src="/images/page_not_found.jpg"
                alt="page_not_found"
                width={300}
                height={300}
              />
              <h4>
                We searched everywhere, but the requested URL could not be
                found.
              </h4>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
                className="btn btn-primary mt-4"
              >
                Go to Homepage
              </button>
            </div> */}
            <div className="col-md-3"></div>
          </div>
        </div>
      </section>
    </>
  );
}
