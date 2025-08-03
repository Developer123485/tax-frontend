"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CommonService } from "@/app/services/common.service";
import { useRouter } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter(null);
  return (
    <>
      {(pathname === "/" || pathname == "/about" || pathname == "/blog" || pathname == "/blog/how-to-file-tds-returns-online-step-by-step-guide-2025" || pathname == "/features" || pathname == "/contact") &&
        pathname !== "/signup" &&
        (!CommonService.isUserLogin() ||
          CommonService.userDetail().role !== "SuperAdmin") ? (
        <section className="footer py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <a href="">
                  <Image
                    className="me-2 w-50 img-fluid"
                    src="/images/footer_logo.svg"
                    alt="footer_logo"
                    width={300}
                    height={300}
                  />
                </a>
                <div className="d-flex mt-md-4 mt-4">
                  <a href="">
                    <Image
                      className="me-3"
                      src="/images/social/facebook_icon.svg"
                      alt="facebook_icon"
                      width={32}
                      height={32}
                    />
                  </a>
                  <a href="">
                    <Image
                      className="me-3"
                      src="/images/social/twitter_icon.svg"
                      alt="twitter_icon"
                      width={32}
                      height={32}
                    />
                  </a>
                  <a href="">
                    <Image
                      className="me-3"
                      src="/images/social/instagram_icon.svg"
                      alt="instagram_icon"
                      width={32}
                      height={32}
                    />
                  </a>
                  <a href="">
                    <Image
                      className="me-3"
                      src="/images/social/youtube_icon.svg"
                      alt="youtube_icon"
                      width={32}
                      height={32}
                    />
                  </a>
                </div>
                <p className="mt-4 fs-14">
                  Copyright © 2025 taxvahan - All Rights Reserved.
                </p>
              </div>
              <div className="col-md-2">
                <h5>Company</h5>
                <ul className="">
                  <li>
                    <a onClick={(e) => router.push("/")}>Home</a>

                  </li>
                  <li>
                    <a onClick={(e) => router.push("/about")}>About us</a>
                  </li>
                  <li>
                    <a onClick={(e) => router.push("/blog")}>Blog</a>
                  </li>
                  <li>
                    <a onClick={(e) => router.push("/contact")}>Contact us</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2">
                <h5>Legal</h5>
                <ul className="">
                  <li>
                    <a href="">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="">Term of service</a>
                  </li>
                  <li>
                    <a href="">Terms and Conditions</a>
                  </li>
                </ul>
              </div>
              {/* <div className="col-md-3">
                <h5>Contact Details</h5>
                <p>
                  1st Floor, SCO 62 Madhya Marg, Sector 8C Chandigarh, 160009
                  India
                </p>
                <p>info@taxvahan.com</p>
              </div> */}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
