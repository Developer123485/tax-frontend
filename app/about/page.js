"use client";
import React from "react";
import Image from "next/image";
import Accordion from "react-bootstrap/Accordion";
import Header from "../components/header/header";

export default function AboutUs() {
  return (
    <>
      <Header></Header>
      <section className="py-5 subhero subhero-grd">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 py-md-5">
              <h1 className="fw-bold mt-4 mt-md-2">
                Simplifying <span className="text-blue">TDS Compliance</span>{" "}
                with Smart Automation
              </h1>
              <span className="fs-18">
                Powering CAs, corporates, and enterprises with a fast, accurate,
                and fully digital solution for effortless TDS return filing.
              </span>
            </div>
            <div className="col-md-5 d-flex justify-content-center">
              <Image
                className="w-100 img-fluid d-none d-md-block"
                src="/images/aboutus_banner.svg"
                alt="aboutus_banner"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 order-2">
              <Image
                className="w-100 img-fluid rounded-3 mt-3 mt-md-0"
                src="/images/whatwedo.webp"
                alt="whatwedo"
                width={500}
                height={500}
              />
            </div>
            <div className="col-md-6 ps-md-5 order-md-2">
              <h2 className="fw-bold">What We Do</h2>
              <p>
                At TaxVahan, we simplify the complex world of TDS return filing
                through intelligent automation and cloud-powered technology.
              </p>
              <p>
                {" "}
                Our platform helps CAs, tax professionals, corporates, and
                enterprises prepare, verify, and file TDS returns with speed and
                accuracy—no manual errors, no software dependencies.
              </p>
              <p>
                From bulk PAN verification to challan auto-fetching, FVU
                generation, and correction return management, we provide an
                all-in-one solution that works from anywhere, anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-0 py-md-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 pe-md-5">
              <h2 className="fw-bold">Who We Are</h2>
              <p>
                TaxVahan is a team of tax technology experts, developers, and
                compliance professionals committed to transforming the way India
                files TDS returns.
              </p>
              <p>
                We blend deep domain knowledge with powerful automation to build
                solutions trusted by CAs, enterprises, and tax consultants
                across the country.
              </p>
              <p>
                With a focus on accuracy, speed, and simplicity, we’re
                redefining tax compliance—one digital return at a time.
              </p>
            </div>
            <div className="col-md-6">
              <Image
                className="w-100 img-fluid rounded-3 mt-3 mt-md-0"
                src="/images/whoweare.webp"
                alt="whoweare"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 order-2">
              <Image
                className="w-100 img-fluid rounded-3 mt-3 mt-md-0"
                src="/images/ourpurpose.webp"
                alt="ourpurpose"
                width={500}
                height={500}
              />
            </div>
            <div className="col-md-6 ps-md-5 order-md-2">
              <h2 className="fw-bold">Our Purpose</h2>
              <p>
                At TaxVahan, our purpose is to make TDS compliance effortless,
                error-free, and accessible for every tax professional and
                enterprise in India.
              </p>
              <p>
                We aim to eliminate outdated, manual processes by delivering
                smart, scalable tools that simplify return filing, reduce
                compliance risk, and save valuable time.
              </p>
              <p>
                We’re here to empower professionals with technology that works
                as hard as they do.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="about-features bg-light-gray py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center features-list">
              <h1 className="fw-bold">What We Believe In</h1>
              <p>
                We believe that our clients’ success is our success. That’s why
                we go beyond just building software—we deliver dependable,
                secure, and intelligent solutions that simplify TDS compliance
                and empower growth.
              </p>
              <p>Our values guide every decision we make:</p>
              {/*         <ul className="list-group">
                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Client-Centric Innovation – Creating practical solutions for
                  real-world needs
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Integrity & Accuracy – Delivering reliable results every time
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Simplicity in Compliance – Making complex tax processes
                  effortless
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Security First – Ensuring your data is protected with
                  enterprise-grade safeguards
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <Image
                    className="me-2"
                    src="/images/icons/list_arrow.svg"
                    alt="list_arrow"
                    width={16}
                    height={16}
                  />
                  Continuous Improvement – Adapting and evolving with every
                  client and challenge
                </li>
              </ul>  */}
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row g-4">
            <div className="col col-md-4">
              <div className="content-box bg-white text-center px-3 py-3 px-md-3 py-md-3 border border-1 rounded-3 shadow">
                <Image
                  className="p-3 rounded-3 mb-2"
                  src="/images/homefeatures/client_centric_icon.svg"
                  alt="client_centric_icon"
                  width={150}
                  height={150}
                />
                <h4 className="fw-bold text-capitalize mb-3">
                  Client-Centric Innovation
                </h4>
                <p>Creating practical solutions for real-world needs</p>
              </div>
            </div>
            <div className="col col-md-4">
              <div className="content-box bg-white text-center px-3 py-3 px-md-3 py-md-3 border border-1 rounded-3 shadow">
                <Image
                  className="p-3 rounded-3 mb-2"
                  src="/images/homefeatures/quick_icon.svg"
                  alt="quick_icon"
                  width={150}
                  height={150}
                />
                <h4 className="fw-bold text-capitalize mb-3">
                  Integrity & Accuracy
                </h4>
                <p>Delivering reliable results every time</p>
              </div>
            </div>
            <div className="col col-md-4">
              <div className="content-box bg-white text-center px-3 py-3 px-md-3 py-md-3 border border-1 rounded-3 shadow">
                <Image
                  className="p-3 rounded-3 mb-2"
                  src="/images/homefeatures/transparent_icon.svg"
                  alt="transparent_icon"
                  width={150}
                  height={150}
                />
                <h4 className="fw-bold text-capitalize mb-3">
                  Simplicity in Compliance
                </h4>
                <p>Making complex tax processes effortless</p>
              </div>
            </div>
            <div className="col col-md-4">
              <div className="content-box bg-white text-center px-3 py-3 px-md-3 py-md-3 border border-1 rounded-3 shadow">
                <Image
                  className="p-3 rounded-3 mb-2"
                  src="/images/homefeatures/secure_icon.svg"
                  alt="secure_icon"
                  width={150}
                  height={150}
                />
                <h4 className="fw-bold text-capitalize mb-3">Security First</h4>
                <p>
                  Ensuring your data is protected with enterprise-grade
                  safeguardss
                </p>
              </div>
            </div>
            <div className="col col-md-4">
              <div className="content-box bg-white text-center px-3 py-3 px-md-3 py-md-3 border border-1 rounded-3 shadow">
                <Image
                  className="p-3 rounded-3 mb-2"
                  src="/images/homefeatures/innovative_icon.svg"
                  alt="innovative_icon"
                  width={150}
                  height={150}
                />
                <h4 className="fw-bold text-capitalize mb-3">
                  Continuous Improvement
                </h4>
                <p>Adapting and evolving with every client and challenge</p>
              </div>
            </div>
            {/*       <div className="col col-md-4">
              <div className="content-box bg-white text-center px-3 py-3 px-md-3 py-md-3 border border-1 rounded-3 shadow">
                <Image
                  className="p-3 rounded-3 mb-2"
                  src="/images/homefeatures/ethical_icon.svg"
                  alt="ethical_icon"
                  width={150}
                  height={150}
                />
                <h4 className="fw-bold text-capitalize mb-3">Ethical</h4>
                <p>
                  As a responsible organization, it is our moral duty to provide
                  our clients with tax solutions that have ethics and integrity
                  ingrained in them.
                </p>
              </div>
            </div> */}
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
      <section className="pb-5 home-faqs">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <h1 className="fw-bold">FAQs – About TaxVahan</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>1. What is TaxVahan?</Accordion.Header>
                  <Accordion.Body>
                    TaxVahan is a cloud-based TDS return filing software
                    designed to simplify tax compliance for CAs, corporates, tax
                    practitioners, and enterprises. It automates key processes
                    like PAN verification, challan mapping, FVU generation, and
                    correction filing.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>2. Who can use TaxVahan?</Accordion.Header>
                  <Accordion.Body>
                    Our platform is ideal for Chartered Accountants, tax
                    professionals, corporates handling bulk data, and
                    enterprises that require reliable, scalable, and automated
                    TDS compliance tools.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    3. What makes TaxVahan different from other TDS software?
                  </Accordion.Header>
                  <Accordion.Body>
                    Unlike traditional tools, TaxVahan is cloud-based, requires
                    no Java installation, auto-fetches challan data, performs
                    bulk PAN verification, and allows return preparation via a
                    single Excel file—all with minimal manual effort.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>4. Is TaxVahan secure?</Accordion.Header>
                  <Accordion.Body>
                    Yes. We prioritize data security with enterprise-grade
                    encryption, secure cloud infrastructure, and strict access
                    controls to protect your financial and client information.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    5. Where is TaxVahan based?
                  </Accordion.Header>
                  <Accordion.Body>
                    TaxVahan is headquartered in India and built by a team of
                    tax experts, developers, and compliance professionals who
                    understand the challenges of Indian tax filing systems.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    6. What is the mission of TaxVahan?
                  </Accordion.Header>
                  <Accordion.Body>
                    Our mission is to simplify TDS return filing through
                    intelligent automation, helping professionals save time,
                    reduce errors, and stay compliant—without the complexity.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                  <Accordion.Header>
                    7. Can TaxVahan handle large-scale enterprise filings?
                  </Accordion.Header>
                  <Accordion.Body>
                    Absolutely. TaxVahan is designed to process high volumes of
                    data efficiently, making it ideal for enterprises with large
                    payrolls or vendor bases.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
