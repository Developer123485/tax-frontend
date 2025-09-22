"use client";
import React from "react";
import Image from "next/image";
import Accordion from "react-bootstrap/Accordion";
import { useRouter } from "next/navigation";
import Header from "../components/header/header";

export default function ContactUs() {
  const router = useRouter(null);
  return (
    <>
      <Header></Header>
      <section className="py-5 contact-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 py-md-5 text-white">
              <span className="fs-18 text-uppercase">We're Tax Consultant</span>
              <h1 className="fw-bold mt-md-2 mt-4 mb-3">
                Help You To <br /> Manage Your Tax
              </h1>
              <span className="fs-18">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </span>
              <div className="mt-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/contact");
                  }}
                  className="btn btn-primary btn-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h6 className="">Welcome To Taxvahan</h6>
              <h1 className="fw-bold">
                We Will Provide Best Tax Service For Your Business.
              </h1>
              <p>
                Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                interdum tellus elit sed risus. Maecenas eget condimentum velit.{" "}
              </p>
              <div className="row mt-5 mt-md-5 align-items-center">
                <div className="col-sm-4 col-md-4 col-lg-5 text-center">
                  <Image
                    className="rounded-pill mb-3 img-fluid"
                    src="/images/review_user_thumbnail.png"
                    alt="contact_user"
                    width={160}
                    height={160}
                  />
                  <p className="mb-2">Mr. Kathy Jones</p>
                  <h6 className="fw-bold">
                    <a className="text-black" href="tel:+91-999-888-8888;">
                      +91-999-888-8888
                    </a>
                  </h6>
                </div>
                <div className="col-sm col-md col-lg-1">
                  <Image
                    className="d-none d-lg-block"
                    src="/images/con_vertical_border.svg"
                    alt="con_vertical_border"
                    width={1}
                    height={150}
                  />
                </div>
                <div className="col-sm-7 col-md-7 col-lg-6 mt-4 mt-md-0 text-center text-sm-start">
                  <h5 className="fw-bold">Address</h5>
                  <p>
                    123, Lorem epsum, Lorem epsum, Delhi - 123456, New Delhi,
                    India
                  </p>
                  <h5 className="fw-bold mt-md-4">Email</h5>
                  <p>
                    <a className="text-black" href="mailto:info.taxvahan@gmail.com">
                      info.taxvahan@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 ps-md-5">
              <div className="px-3 py-3 px-md-4 py-md-4 mt-4 mt-md-0 shadow rounded-3">
                <h3 className="fw-bold mb-4">Send us a message</h3>
                <form className="row g-3">
                  <div className="col-sm-6 col-lg-6">
                    <label
                      for="inputFistName"
                      className="form-label fs-14 opacity-50"
                    >
                      Fist Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputFistName"
                    />
                  </div>
                  <div className="col-sm-6 col-lg-6">
                    <label
                      for="inputLastName"
                      className="form-label fs-14 opacity-50"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLastName"
                    />
                  </div>
                  <div className="col-sm-6 col-lg-6">
                    <label for="inputPhone" className="form-label fs-14 opacity-50">
                      Phone Number
                    </label>
                    <input type="text" className="form-control" id="inputPhone" />
                  </div>
                  <div className="col-sm-6 col-lg-6">
                    <label for="inputEmail" className="form-label fs-14 opacity-50">
                      Customer Email ID
                    </label>
                    <input type="email" className="form-control" id="inputEmail" />
                  </div>
                  <div className="col-12">
                    <label
                      for="inputMessage"
                      className="form-label fs-14 opacity-50"
                    >
                      Message
                    </label>
                    <textarea className="form-control" id="inputMessage" rows="3" />
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-secondary">
                      Submit Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 about-steps">
        <div className="container">
          <div className="row mb-4 mb-md-5">
            <div className="col-md-1"></div>
            <div className="col-md-10 text-center">
              <h1 className="fw-bold">
                TaxVahan makes compliance simple, scalable, and reliable
              </h1>
            </div>
            <div className="col-md-1"></div>
          </div>
          <div className="row g-4 align-items-center">
            <div className="col-12 col-sm-3 col-md-3">
              <div className="text-center">
                <Image
                  className="mb-3 img-fluid w-100"
                  src="/images/steps/calculate_icon.svg"
                  alt="calculate_icon"
                  width={150}
                  height={150}
                />
                <p>
                  Instantly calculate accurate sales tax at checkout — even
                  during peak demand — using up-to-date rates and address
                  validation.
                </p>
              </div>
            </div>
            <div className="col col-md">
              <div className="text-center">
                <Image
                  className=""
                  src="/images/steps/steps_arrow.svg"
                  alt="steps_arrow"
                  width={52}
                  height={10}
                />
              </div>
            </div>
            <div className="col-12 col-sm-3 col-md-3">
              <div className="text-center">
                <Image
                  className="mb-3 img-fluid w-100"
                  src="/images/steps/report_icon.svg"
                  alt="report_icon"
                  width={150}
                  height={150}
                />
                <p>
                  Get detailed, up-to-date reports on sales and sales tax
                  collected or due by state and jurisdiction — all at your
                  fingertips.
                </p>
              </div>
            </div>
            <div className="col col-md">
              <div className="text-center">
                <Image
                  className=""
                  src="/images/steps/steps_arrow.svg"
                  alt="steps_arrow"
                  width={52}
                  height={10}
                />
              </div>
            </div>
            <div className="col-12 col-sm-3 col-md-3">
              <div className="text-center">
                <Image
                  className="mb-3 img-fluid w-100"
                  src="/images/steps/file_remit_icon.svg"
                  alt="file_remit_icon"
                  width={150}
                  height={150}
                />
                <p>
                  Save time and reduce errors by automatically submitting
                  returns and remittance to each jurisdiction. Never miss a
                  deadline again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
