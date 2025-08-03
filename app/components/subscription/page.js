"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Subscription() {
  const pathname = usePathname();
  const router = useRouter(null);

  return (
    <>
      <section
       className={
        pathname == "/plans"
          ? "bg-blue text-white"
          : "bg-white text-black"
      }>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3">
            {pathname === "/plans" && <Image
                className="img-fluid"
                src="/images/dashboards/plans_img1.svg"
                alt="plans_img1"
                width={300}
                height={300}
              />
            }
            </div>
            <div className="col-md-6 text-center py-4 py-md-4">
            {pathname === "/plans" && <span className="fs-18">Hi, Naresh</span> }
              <h1 className="fw-bold">Ready to start with TaxVahan</h1>
              <p>Choose The Package that suits you</p>
            </div>
            <div className="col-md-3">
            {pathname === "/plans" && <Image
                className="img-fluid"
                src="/images/dashboards/plans_img2.svg"
                alt="plans_img1"
                width={300}
                height={300}
              />
            }
            </div>
          </div>
        </div>
      </section>
      <section
      className={
        pathname == "/plans"
          ? "home-pricing-plans py-5"
          : "home-pricing-plans py-0"
      }>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="content-box border border-1 rounded-4 text-center">
                <div className="pricing-table-header px-3 pb-3 px-md-3 pb-md-3 rounded-top-4">
                  <h4 className="px-3 py-3">Basic</h4>
                  <div className="d-flex justify-content-center">
                    <h1 className="text-white mt-2">
                      ₹ 5,500<span className="fs-6">+ 18% GST</span>
                    </h1>
                  </div>
                </div>
                <div className="px-4 py-4 px-md-4 py-md-4">
                  <ul className="p-0 lh-lg">
                    <li>GST 18% Use upto 100 GSTIN</li>
                    <li>GST Returns Filing</li>
                    <li>GSTR-1, 2A, 3B, 7, 9, 9C</li>
                    <li>Quick Download GST Portal Data</li>
                    <li>Quick GST Ledgers Views</li>
                    <li>Intelligent GST Reports</li>
                    <li>-</li>
                    <li>-</li>
                    <li>-</li>
                  </ul>
                  <button
                    className="btn text-capitalize text-white w-100 border-0 rounded-3 py-3"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/deductors/dashboard");
                    }}
                  >
                    Request a Plan
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="content-box border border-1 rounded-4 text-center">
                <div className="pricing-table-header px-3 pb-3 px-md-3 pb-md-3 rounded-top-4">
                  <h4 className="px-3 py-3">Premium</h4>
                  <div className="d-flex justify-content-center">
                    <h1 className="text-white mt-2">
                      ₹ 7,500<span className="fs-6">+ 18% GST</span>
                    </h1>
                  </div>
                </div>
                <div className="px-4 py-4 px-md-4 py-md-4">
                  <ul className="p-0 lh-lg">
                    <li>Use upto 100 GSTIN</li>
                    <li>GST Returns Filing</li>
                    <li>GSTR-1, 2A, 3B, 7, 9, 9C</li>
                    <li>Quick Download GST Portal Data</li>
                    <li>Quick GST Ledgers View</li>
                    <li>Intelligent GST Report</li>
                    <li>GSTR-1 Reconcilation</li>
                    <li>GSTR-2A Reconcilation</li>
                    <li>Reconcile Up to 12,000 Invoices</li>
                  </ul>
                  <button
                    className="btn text-capitalize text-white w-100 border-0 rounded-3 py-3"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/deductors/dashboard");
                    }}
                  >
                    Request a Plan
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="content-box border border-1 rounded-4 text-center">
                <div className="pricing-table-header px-3 pb-3 px-md-3 pb-md-3 rounded-top-4">
                  <h4 className="px-3 py-3">Special</h4>
                  <div className="d-flex justify-content-center">
                    <h1 className="text-white mt-2">
                      ₹ 11,000<span className="fs-6">+ 18% GST</span>
                    </h1>
                  </div>
                </div>
                <div className="px-4 py-4 px-md-4 py-md-4">
                  <ul className="p-0 lh-lg">
                    <li>Use Unlimited GSTIN</li>
                    <li>GST Returns Filing</li>
                    <li>GSTR-1, 2A, 3B, 7, 9, 9C</li>
                    <li>Quick Download GST Portal Data</li>
                    <li>Quick GST Ledgers View</li>
                    <li>Intelligent GST Reports</li>
                    <li>GSTR-1 Reconcilation</li>
                    <li>GSTR-2A Reconcilation</li>
                    <li>Reconcile Up to 12,000 Invoices</li>
                  </ul>
                  <button
                    className="btn text-capitalize text-white w-100 border-0 rounded-3 py-3"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/deductors/dashboard");
                    }}
                  >
                    Request a Plan
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
