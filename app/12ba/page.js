"use client";
import React from "react";
import Header from "../components/header/header";

export default function popuptable() {
  return (
    <>
      <Header></Header>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 px-0">
              <div className="table-responsive rounded border overflow-hidden popup-table">
                <table className="table-bordered m-0">
                  <thead className="bg-light-blue">
                    <tr>
                      <th>Nature of perquisites (see rule 3)</th>
                      <th>Value of perquisite as per rules (Rs.)</th>
                      <th>Amount, if any, recovered from the employee (Rs.)</th>
                      <th>
                        Amount of perquisite chargeable to tax Col. (3) - Col.
                        (4) (Rs.)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bg-light-gray">Accommodation</td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                    <tr>
                      <td className="bg-light-gray">Cars/Other automotive</td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                    <tr>
                      <td className="bg-light-gray">
                        Sweeper, gardener, watchman or personal attendant
                      </td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                    <tr>
                      <td className="bg-light-gray">Gas, electricity, water</td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                    <tr>
                      <td className="bg-light-gray">
                        Interest free or concessional loans
                      </td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                    <tr>
                      <td className="bg-light-gray">Holiday expenses</td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                    <tr>
                      <td className="bg-light-gray">
                        Free or concessional travel
                      </td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                    <tr>
                      <td className="bg-light-gray">Free meals</td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                    <tr>
                      <td className="bg-light-gray">Free education</td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                    <tr>
                      <td className="bg-light-gray">Gifts, vouchers, etc.</td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                    <tr>
                      <td className="bg-light-gray">Credit card expenses</td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                    <tr>
                      <td className="bg-light-gray">Club expenses</td>
                      <td>Write here</td>
                      <td>Write here</td>
                      <td>Write here</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
