"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CommonService } from "@/app/services/common.service";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter(null);
  const pathname = usePathname();
  return (
    <>
      <nav
        id="navbar_top"
        className="navbar header navbar-expand-lg navbar-light py-2 bg-white shadow fixed-top"
      >
        <div className="container">
          <div className="col-lg-3 col-md-4 col-sm-10 col-4 text-start d-flex">
            <a className="d-flex" onClick={(e) => router.push("/")}>
              <Image
                src="/images/header_logo.svg"
                alt="header_logo"
                width={190}
                height={54}
                className="img-fluid"
              />
            </a>
          </div>
          {pathname !== "/signup" &&
            pathname !== "/login" &&
            pathname !== "/forgot-password" &&
            pathname !== "/verification" && (
              <>
                <div
                  className={`${CommonService.isUserLogin()
                    ? "col-lg-6 col-md-1 col-sm-1 col-1 text-end order-2 order-md-2 order-lg-1"
                    : "col-lg-6 col-md-1 col-sm-1 col-1 text-end order-2 order-md-2 order-lg-1"
                    }`}
                >
                  <button
                    className="navbar-toggler nav-togg ms-2 ms-md-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#main_nav"
                    aria-controls="main_nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="navbar-collapse justify-content-end collapse"
                    id="main_nav"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a
                          className={
                            pathname == "/"
                              ? "active nav-link px-3"
                              : "nav-link px-3"
                          }
                          onClick={(e) => router.push("/")}
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={
                            pathname == "/about"
                              ? "active nav-link px-3"
                              : "nav-link px-3"
                          }
                          onClick={(e) => router.push("/about")}
                        >
                          About Us
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={
                            pathname == "/features"
                              ? "active nav-link px-3"
                              : "nav-link px-3"
                          }
                          onClick={(e) => router.push("/features")}
                        >
                          Features
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={
                            pathname == "/contact"
                              ? "active nav-link px-3"
                              : "nav-link px-3"
                          }
                          onClick={(e) => router.push("/contact")}
                        >
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`${CommonService.isUserLogin()
                    ? "col-lg-3 col-md-7 col-sm-1 col-7 d-flex justify-content-end order-1 order-md-1 order-lg-2"
                    : "col-lg-3 col-md-7 col-sm-1 col-7 d-flex justify-content-end order-1 order-md-1 order-lg-2"
                    }`}
                >
                  <>
                    <button
                      onClick={(e) => {
                        router.push("/signup");
                      }}
                      type="button"
                      className="btn btn-primary me-3 d-none d-md-block"
                    >
                      Sign up
                    </button>
                    <button
                      onClick={(e) => {
                        router.push("/login");
                      }}
                      type="button"
                      className="btn btn-outline-primary"
                    >
                      Login
                    </button>
                  </>
                </div>
              </>
            )}
        </div>
      </nav>
    </>
  );
}
