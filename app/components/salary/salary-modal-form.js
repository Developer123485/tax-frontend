"use client";
import { React } from "react";
import { Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SalaryModalForm(props) {
  const { handleInput, salaryDetail, salaryDetailErrors, isDirty } = props;
  return (
    <>
      <Modal
        className=""
        size="lg"
        centered
        keyboard={true}
        backdrop="static"
        show={props.totalSalary == "total salary"}
        onHide={() => props.setTotalSalary("")}
      >
        <Modal.Header className="border-0" closeButton>
          <h5 className="text-black fw-bold mb-0"> Total Amount of Salary</h5>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className=""></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => {
            props.setTotalSalary("")
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className=""
        size="lg"
        centered
        keyboard={true}
        backdrop="static"
        show={props.totalSalary == "exemption"}
        onHide={() => props.setTotalSalary("")}
      >
        <Modal.Header className="border-0" closeButton>
          <h5 className="text-black fw-bold mb-0">
            {" "}
            Total Amount of Exemption
          </h5>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="row g-3 d-flex align-items-start">
            <div className="col-md-6">
              <label htmlFor="travelConcession" className="form-label">
                <span>Travel concession or assistance Section 10(5)</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="travelConcession"
                autoComplete="off"
                disabled={salaryDetail.newRegime == "Y"}
                value={salaryDetail.travelConcession}
                onChange={(e) => handleInput("travelConcession", e, "float")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="deathCumRetirement" className="form-label">
                <span>Death-cum-retirement gratuity Section 10(10)</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="deathCumRetirement"
                autoComplete="off"
                value={salaryDetail.deathCumRetirement}
                onChange={(e) => handleInput("deathCumRetirement", e, "float")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="computedValue" className="form-label">
                <span>Commuted value of pension Section 10(10A)</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="computedValue"
                autoComplete="off"
                value={salaryDetail.computedValue}
                onChange={(e) => handleInput("computedValue", e, "float")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="cashEquivalent" className="form-label">
                <span>
                  Cash equivalent of leave salary encashment Section 10(10AA)
                </span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="cashEquivalent"
                autoComplete="off"
                value={salaryDetail.cashEquivalent}
                onChange={(e) => handleInput("cashEquivalent", e, "float")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="houseRent" className="form-label">
                <span>House rent allowance Section 10(13A)</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="houseRent"
                autoComplete="off"
                disabled={salaryDetail.newRegime == "Y"}
                value={salaryDetail.houseRent}
                onChange={(e) => handleInput("houseRent", e, "float")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="otherSpecial" className="form-label">
                <span>Other special allowances under section 10(14)</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="otherSpecial"
                autoComplete="off"
                value={salaryDetail.otherSpecial}
                onChange={(e) => handleInput("otherSpecial", e, "float")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="amountOfExemption" className="form-label">
                <span>Amount of exemption under section 10 Others</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="amountOfExemption"
                autoComplete="off"
                value={salaryDetail.amountOfExemption}
                onChange={(e) => handleInput("amountOfExemption", e, "float")}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => {
            props.setTotalSalary("")
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className=""
        size="xl"
        centered
        keyboard={true}
        backdrop="static"
        show={props.totalSalary == "deductionChapter"}
        onHide={() => props.setTotalSalary("")}
      >
        <Modal.Header className="border-0" closeButton>
          <h5 className="text-black fw-bold mb-0">
            {" "}
            Gross Total Deduction under chapter VIA
          </h5>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-12 px-0">
                <div className="table-responsive rounded border overflow-hidden popup-table">
                  <table className="table-bordered m-0">
                    <thead className="bg-light-blue">
                      <tr>
                        <th>Name</th>
                        <th>Gross</th>
                        <th>Qualifying</th>
                        <th>Deductible</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="bg-light-gray w-50">
                          Chapter-VIA Deductions Deduction in respect of life
                          insurance premia, contributions to provident fund etc.
                          under Section 80C
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionCGross"
                            autoComplete="off"
                            value={salaryDetail.eightySectionCGross}
                            onChange={(e) =>
                              handleInput("eightySectionCGross", e, "float")
                            }
                          />
                        </td>
                        <td>-</td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionCDeductiable"
                            autoComplete="off"
                            value={salaryDetail.eightySectionCDeductiable}
                            onChange={(e) =>
                              handleInput(
                                "eightySectionCDeductiable",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Chapter-VIA Deductions Deduction in respect of
                          contribution to certain pension funds under Section
                          80CCC
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionCCCGross"
                            autoComplete="off"
                            value={salaryDetail.eightySectionCCCGross}
                            onChange={(e) =>
                              handleInput("eightySectionCCCGross", e, "float")
                            }
                          />
                        </td>
                        <td>-</td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionCCCDeductiable"
                            autoComplete="off"
                            value={salaryDetail.eightySectionCCCDeductiable}
                            onChange={(e) =>
                              handleInput(
                                "eightySectionCCCDeductiable",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Chapter-VIA Deductions Deduction in respect of
                          contribution by taxpayer to notifiedpension scheme
                          under Section 80CCD(1)
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionCCD1Gross"
                            autoComplete="off"
                            value={salaryDetail.eightySectionCCD1Gross}
                            onChange={(e) =>
                              handleInput("eightySectionCCD1Gross", e, "float")
                            }
                          />
                        </td>
                        <td>-</td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionCCD1Deductiable"
                            autoComplete="off"
                            value={salaryDetail.eightySectionCCD1Deductiable}
                            onChange={(e) =>
                              handleInput(
                                "eightySectionCCD1Deductiable",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Chapter-VIA Deductions Deduction in respect of amount
                          paid or deposited under notified pension scheme under
                          Section 80CCD(1B)
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionCCD1BGross"
                            autoComplete="off"
                            value={salaryDetail.eightySectionCCD1BGross}
                            onChange={(e) =>
                              handleInput("eightySectionCCD1BGross", e, "float")
                            }
                          />
                        </td>
                        <td>-</td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionCCD1BDeductiable"
                            autoComplete="off"
                            value={salaryDetail.eightySectionCCD1BDeductiable}
                            onChange={(e) =>
                              handleInput(
                                "eightySectionCCD1BDeductiable",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                      </tr>
                      {salaryDetail.wheatherPensioner == "No" && (
                        <>
                          <tr>
                            <td className="bg-light-gray">
                              {" "}
                              Chapter-VIA Deductions Deduction in respect of
                              contribution by employer to notified pension
                              scheme under Section 80CCD(2)
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder=""
                                className="form-control"
                                id="eightySectionCCD2Gross"
                                autoComplete="off"
                                value={salaryDetail.eightySectionCCD2Gross}
                                onChange={(e) =>
                                  handleInput(
                                    "eightySectionCCD2Gross",
                                    e,
                                    "float"
                                  )
                                }
                              />
                            </td>
                            <td>-</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                placeholder=""
                                className="form-control"
                                id="eightySectionCCD2Deductiable"
                                autoComplete="off"
                                value={
                                  salaryDetail.eightySectionCCD2Deductiable
                                }
                                onChange={(e) =>
                                  handleInput(
                                    "eightySectionCCD2Deductiable",
                                    e,
                                    "float"
                                  )
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="bg-light-gray">
                              {" "}
                              Chapter-VIA Deductions Deduction inrespect of
                              contribution by the employee to Agnipath Scheme
                              under Section 80CCH
                            </td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                placeholder=""
                                className="form-control"
                                id="eightySectionCCDHGross"
                                autoComplete="off"
                                value={salaryDetail.eightySectionCCDHGross}
                                onChange={(e) =>
                                  handleInput(
                                    "eightySectionCCDHGross",
                                    e,
                                    "float"
                                  )
                                }
                              />
                            </td>
                            <td>-</td>
                            <td>
                              <input
                                type="text"
                                placeholder=""
                                className="form-control"
                                id="eightySectionCCDHDeductiable"
                                autoComplete="off"
                                value={
                                  salaryDetail.eightySectionCCDHDeductiable
                                }
                                onChange={(e) =>
                                  handleInput(
                                    "eightySectionCCDHDeductiable",
                                    e,
                                    "float"
                                  )
                                }
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="bg-light-gray">
                              Chapter-VIA Deductions Deduction in respect of
                              contribution by the Central Government to Agnipath
                              Scheme under Section 80CCH(1)
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder=""
                                className="form-control"
                                id="eightySectionCCDH2Gross"
                                autoComplete="off"
                                value={salaryDetail.eightySectionCCDH2Gross}
                                onChange={(e) =>
                                  handleInput(
                                    "eightySectionCCDH2Gross",
                                    e,
                                    "float"
                                  )
                                }
                              />
                            </td>
                            <td>-</td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                placeholder=""
                                className="form-control"
                                id="eightySectionCCDH2Deductiable"
                                autoComplete="off"
                                value={
                                  salaryDetail.eightySectionCCDH2Deductiable
                                }
                                onChange={(e) =>
                                  handleInput(
                                    "eightySectionCCDH2Deductiable",
                                    e,
                                    "float"
                                  )
                                }
                              />
                            </td>
                          </tr>
                        </>
                      )}
                      <tr>
                        <td className="bg-light-gray">
                          Free mealsChapter-VIA Deductions Deduction in respect
                          of health insurance premia under Section 80D
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionDGross"
                            autoComplete="off"
                            value={salaryDetail.eightySectionDGross}
                            onChange={(e) =>
                              handleInput("eightySectionDGross", e, "float")
                            }
                          />
                        </td>
                        <td>-</td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionDDeductiable"
                            autoComplete="off"
                            value={salaryDetail.eightySectionDDeductiable}
                            onChange={(e) =>
                              handleInput(
                                "eightySectionDDeductiable",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          {" "}
                          Chapter-VIA Deductions Deduction in respect of
                          interest on loan taken for higher education under
                          Section 80E
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionEGross"
                            autoComplete="off"
                            value={salaryDetail.eightySectionEGross}
                            onChange={(e) =>
                              handleInput("eightySectionEGross", e, "float")
                            }
                          />
                        </td>
                        <td>-</td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionEDeductiable"
                            autoComplete="off"
                            value={salaryDetail.eightySectionEDeductiable}
                            onChange={(e) =>
                              handleInput(
                                "eightySectionEDeductiable",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Chapter-VIA Deductions Total deduction in respect of
                          donations to certain funds, charitable institutions,
                          etc. under Section 80G
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionGGross"
                            autoComplete="off"
                            value={salaryDetail.eightySectionGGross}
                            onChange={(e) =>
                              handleInput("eightySectionGGross", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionGQualifying"
                            autoComplete="off"
                            value={salaryDetail.eightySectionGQualifying}
                            onChange={(e) =>
                              handleInput(
                                "eightySectionGQualifying",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionGDeductiable"
                            autoComplete="off"
                            value={salaryDetail.eightySectionGDeductiable}
                            onChange={(e) =>
                              handleInput(
                                "eightySectionGDeductiable",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Chapter-VIA Deductions Deduction in respect of
                          interest on deposits in savings account under Section
                          80TTA/80TTB
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySection80TTAGross"
                            autoComplete="off"
                            value={salaryDetail.eightySection80TTAGross}
                            onChange={(e) =>
                              handleInput("eightySection80TTAGross", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySection80TTAQualifying"
                            autoComplete="off"
                            value={salaryDetail.eightySection80TTAQualifying}
                            onChange={(e) =>
                              handleInput(
                                "eightySection80TTAQualifying",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySection80TTADeductiable"
                            autoComplete="off"
                            value={salaryDetail.eightySection80TTADeductiable}
                            onChange={(e) =>
                              handleInput(
                                "eightySection80TTADeductiable",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Chapter-VIA Deductions Amount deductible under any
                          other provision (s) of Chapter VI‐A
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionVIAGross"
                            autoComplete="off"
                            value={salaryDetail.eightySectionVIAGross}
                            onChange={(e) =>
                              handleInput("eightySectionVIAGross", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionVIAQualifying"
                            autoComplete="off"
                            value={salaryDetail.eightySectionVIAQualifying}
                            onChange={(e) =>
                              handleInput(
                                "eightySectionVIAQualifying",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="eightySectionVIADeductiable"
                            autoComplete="off"
                            value={salaryDetail.eightySectionVIADeductiable}
                            onChange={(e) =>
                              handleInput(
                                "eightySectionVIADeductiable",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => {
            props.setTotalSalary("")
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className=""
        size="lg"
        centered
        keyboard={true}
        backdrop="static"
        show={props.totalSalary == "landlord"}
        onHide={() => props.setTotalSalary("")}
      >
        <Modal.Header className="border-0" closeButton>
          <h5 className="text-black fw-bold mb-0">Landlord Details</h5>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="row g-3 d-flex align-items-start">
            <div className="col-md-6">
              <label htmlFor="panOfLandlord1" className="form-label">
                <span>PAN of landlord 1</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="panOfLandlord1"
                autoComplete="off"
                value={salaryDetail.panOfLandlord1}
                onChange={(e) => handleInput("panOfLandlord1", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="nameOfLandlord1" className="form-label">
                <span>Name of landlord 1</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="nameOfLandlord1"
                autoComplete="off"
                value={salaryDetail.nameOfLandlord1}
                onChange={(e) => handleInput("nameOfLandlord1", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="panOfLandlord2" className="form-label">
                <span>PAN of landlord 2</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="panOfLandlord2"
                autoComplete="off"
                value={salaryDetail.panOfLandlord2}
                onChange={(e) => handleInput("panOfLandlord2", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="nameOfLandlord2" className="form-label">
                <span>Name of landlord 2</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="nameOfLandlord2"
                autoComplete="off"
                value={salaryDetail.nameOfLandlord2}
                onChange={(e) => handleInput("nameOfLandlord2", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="panOfLandlord3" className="form-label">
                <span>PAN of landlord 3</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="panOfLandlord3"
                autoComplete="off"
                value={salaryDetail.panOfLandlord3}
                onChange={(e) => handleInput("panOfLandlord3", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="nameOfLandlord3" className="form-label">
                <span>Name of landlord 3</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="nameOfLandlord3"
                autoComplete="off"
                value={salaryDetail.nameOfLandlord3}
                onChange={(e) => handleInput("nameOfLandlord3", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="panOfLandlord4" className="form-label">
                <span>PAN of landlord 4</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="panOfLandlord4"
                autoComplete="off"
                value={salaryDetail.panOfLandlord4}
                onChange={(e) => handleInput("panOfLandlord4", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="nameOfLandlord4" className="form-label">
                <span>Name of landlord 4</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="nameOfLandlord4"
                autoComplete="off"
                value={salaryDetail.nameOfLandlord4}
                onChange={(e) => handleInput("nameOfLandlord4", e)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => {
            props.setTotalSalary("")
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className=""
        size="lg"
        centered
        keyboard={true}
        backdrop="static"
        show={props.totalSalary == "lender"}
        onHide={() => props.setTotalSalary("")}
      >
        <Modal.Header className="border-0" closeButton>
          <h5 className="text-black fw-bold mb-0">Lender Details</h5>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="row g-3 d-flex align-items-start">
            <div className="col-md-6">
              <label htmlFor="panOfLander1" className="form-label">
                <span>PAN of lander 1</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="panOfLander1"
                autoComplete="off"
                value={salaryDetail.panOfLander1}
                onChange={(e) => handleInput("panOfLander1", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="nameOfLander1" className="form-label">
                <span>Name of lander 1</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="nameOfLander1"
                autoComplete="off"
                value={salaryDetail.nameOfLander1}
                onChange={(e) => handleInput("nameOfLander1", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="panOfLander2" className="form-label">
                <span>PAN of lander 2</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="panOfLander2"
                autoComplete="off"
                value={salaryDetail.panOfLander2}
                onChange={(e) => handleInput("panOfLander2", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="nameOfLander2" className="form-label">
                <span>Name of Lander 2</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="nameOfLander2"
                autoComplete="off"
                value={salaryDetail.nameOfLander2}
                onChange={(e) => handleInput("nameOfLander2", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="panOfLander3" className="form-label">
                <span>PAN of lander 3</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="panOfLander3"
                autoComplete="off"
                value={salaryDetail.panOfLander3}
                onChange={(e) => handleInput("panOfLander3", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="nameOfLander3" className="form-label">
                <span>Name of lander 3</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="nameOfLander3"
                autoComplete="off"
                value={salaryDetail.nameOfLander3}
                onChange={(e) => handleInput("nameOfLander3", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="panOfLander4" className="form-label">
                <span>PAN of lander 4</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="panOfLander4"
                autoComplete="off"
                value={salaryDetail.panOfLander4}
                onChange={(e) => handleInput("panOfLander4", e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="nameOfLander4" className="form-label">
                <span>Name of lander 4</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="form-control"
                id="nameOfLander4"
                autoComplete="off"
                value={salaryDetail.nameOfLander4}
                onChange={(e) => handleInput("nameOfLander4", e)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => {
            props.setTotalSalary("")
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className=""
        size="xl"
        centered
        keyboard={true}
        backdrop="static"
        show={props.totalSalary == "perks"}
        onHide={() => {
          if (props.validateSalaryPerksDetail()) {
            props.setTotalSalary("")
          }
        }}
      >
        <Modal.Header className="border-0" closeButton>
          <h5 className="text-black fw-bold mb-0">Form 12BA</h5>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-12 px-0">
                <div className="table-responsive rounded border overflow-hidden popup-table">
                  <table className="table-bordered m-0">
                    <thead className="bg-light-blue">
                      <tr>
                        <th>Nature of perquisites (see rule 3)</th>
                        <th>Value of perquisite as per rules (Rs.)</th>
                        <th>
                          Amount, if any, recovered from the employee (Rs.)
                        </th>
                        <th>
                          Amount of perquisite chargeable to tax Col. (2) - Col.
                          (3) (Rs.)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="bg-light-gray">Accommodation</td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="accommodationValue"
                            autoComplete="off"
                            value={salaryDetail.accommodationValue}
                            onChange={(e) =>
                              handleInput("accommodationValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="accommodationAmount"
                            autoComplete="off"
                            value={salaryDetail.accommodationAmount}
                            onChange={(e) =>
                              handleInput("accommodationAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError1
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.accommodationAmount ||
                                salaryDetail.accommodationValue
                                ? parseInt(
                                  salaryDetail.accommodationValue
                                    ? salaryDetail.accommodationValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.accommodationAmount
                                    ? salaryDetail.accommodationAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">Cars/Other automotive</td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="carsValue"
                            autoComplete="off"
                            value={salaryDetail.carsValue}
                            onChange={(e) =>
                              handleInput("carsValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="carsAmount"
                            autoComplete="off"
                            value={salaryDetail.carsAmount}
                            onChange={(e) =>
                              handleInput("carsAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError2
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.carsValue || salaryDetail.carsAmount
                                ? parseInt(
                                  salaryDetail.carsValue
                                    ? salaryDetail.carsValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.carsAmount
                                    ? salaryDetail.carsAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Sweeper, gardener, watchman or personal attendant
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="sweeperValue"
                            autoComplete="off"
                            value={salaryDetail.sweeperValue}
                            onChange={(e) =>
                              handleInput("sweeperValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="sweeperAmount"
                            autoComplete="off"
                            value={salaryDetail.sweeperAmount}
                            onChange={(e) =>
                              handleInput("sweeperAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError3
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.sweeperValue ||
                                salaryDetail.sweeperAmount
                                ? parseInt(
                                  salaryDetail.sweeperValue
                                    ? salaryDetail.sweeperValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.sweeperAmount
                                    ? salaryDetail.sweeperAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Gas, electricity, water
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="gasValue"
                            autoComplete="off"
                            value={salaryDetail.gasValue}
                            onChange={(e) =>
                              handleInput("gasValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="gasAmount"
                            autoComplete="off"
                            value={salaryDetail.gasAmount}
                            onChange={(e) =>
                              handleInput("gasAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError4
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.gasValue || salaryDetail.gasAmount
                                ? parseInt(
                                  salaryDetail.gasValue
                                    ? salaryDetail.gasValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.gasAmount
                                    ? salaryDetail.gasAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Interest free or concessional loans
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="interestValue"
                            autoComplete="off"
                            value={salaryDetail.interestValue}
                            onChange={(e) =>
                              handleInput("interestValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="interestAmount"
                            autoComplete="off"
                            value={salaryDetail.interestAmount}
                            onChange={(e) =>
                              handleInput("interestAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            id="carsValue"
                            className={
                              salaryDetailErrors.perksError5
                                ? "form-control has-error"
                                : "form-control"
                            }
                            autoComplete="off"
                            value={
                              salaryDetail.interestValue ||
                                salaryDetail.interestAmount
                                ? parseInt(
                                  salaryDetail.interestValue
                                    ? salaryDetail.interestValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.interestAmount
                                    ? salaryDetail.interestAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">Holiday expenses</td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="holidayValue"
                            autoComplete="off"
                            value={salaryDetail.holidayValue}
                            onChange={(e) =>
                              handleInput("holidayValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="holidayAmount"
                            autoComplete="off"
                            value={salaryDetail.holidayAmount}
                            onChange={(e) =>
                              handleInput("holidayAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError6
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.holidayValue ||
                                salaryDetail.holidayAmount
                                ? parseInt(
                                  salaryDetail.holidayValue
                                    ? salaryDetail.holidayValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.holidayAmount
                                    ? salaryDetail.holidayAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Free or concessional travel
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="freeTravelValue"
                            autoComplete="off"
                            value={salaryDetail.freeTravelValue}
                            onChange={(e) =>
                              handleInput("freeTravelValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="freeTravelAmount"
                            autoComplete="off"
                            value={salaryDetail.freeTravelAmount}
                            onChange={(e) =>
                              handleInput("freeTravelAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError7
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.freeTravelValue ||
                                salaryDetail.freeTravelAmount
                                ? parseInt(
                                  salaryDetail.freeTravelValue
                                    ? salaryDetail.freeTravelValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.freeTravelAmount
                                    ? salaryDetail.freeTravelAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">Free meals</td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="freeMealsValue"
                            autoComplete="off"
                            value={salaryDetail.freeMealsValue}
                            onChange={(e) =>
                              handleInput("freeMealsValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="freeMealsAmount"
                            autoComplete="off"
                            value={salaryDetail.freeMealsAmount}
                            onChange={(e) =>
                              handleInput("freeMealsAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError8
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.freeMealsValue ||
                                salaryDetail.freeMealsAmount
                                ? parseInt(
                                  salaryDetail.freeMealsValue
                                    ? salaryDetail.freeMealsValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.freeMealsAmount
                                    ? salaryDetail.freeMealsAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">Free education</td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="freeEducationValue"
                            autoComplete="off"
                            value={salaryDetail.freeEducationValue}
                            onChange={(e) =>
                              handleInput("freeEducationValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="freeEducationAmount"
                            autoComplete="off"
                            value={salaryDetail.freeEducationAmount}
                            onChange={(e) =>
                              handleInput("freeEducationAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError9
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.freeEducationValue ||
                                salaryDetail.freeEducationAmount
                                ? parseInt(
                                  salaryDetail.freeEducationValue
                                    ? salaryDetail.freeEducationValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.freeEducationAmount
                                    ? salaryDetail.freeEducationAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">Gifts, vouchers, etc.</td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="giftsValue"
                            autoComplete="off"
                            value={salaryDetail.giftsValue}
                            onChange={(e) =>
                              handleInput("giftsValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="giftsAmount"
                            autoComplete="off"
                            value={salaryDetail.giftsAmount}
                            onChange={(e) =>
                              handleInput("giftsAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError10
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.giftsValue ||
                                salaryDetail.giftsAmount
                                ? parseInt(
                                  salaryDetail.giftsValue
                                    ? salaryDetail.giftsValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.giftsAmount
                                    ? salaryDetail.giftsAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">Credit card expenses</td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="creditCardValue"
                            autoComplete="off"
                            value={salaryDetail.creditCardValue}
                            onChange={(e) =>
                              handleInput("creditCardValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="creditCardAmount"
                            autoComplete="off"
                            value={salaryDetail.creditCardAmount}
                            onChange={(e) =>
                              handleInput("creditCardAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError11
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.creditCardValue ||
                                salaryDetail.creditCardAmount
                                ? parseInt(
                                  salaryDetail.creditCardValue
                                    ? salaryDetail.creditCardValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.creditCardAmount
                                    ? salaryDetail.creditCardAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">Club expenses</td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="clubValue"
                            autoComplete="off"
                            value={salaryDetail.clubValue}
                            onChange={(e) =>
                              handleInput("clubValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="clubAmount"
                            autoComplete="off"
                            value={salaryDetail.clubAmount}
                            onChange={(e) =>
                              handleInput("clubAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError12
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.clubValue || salaryDetail.clubAmount
                                ? parseInt(
                                  salaryDetail.clubValue
                                    ? salaryDetail.clubValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.clubAmount
                                    ? salaryDetail.clubAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">Use of Movable Assets</td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="useOfMoveableValue"
                            autoComplete="off"
                            value={salaryDetail.useOfMoveableValue}
                            onChange={(e) =>
                              handleInput("useOfMoveableValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="useOfMoveableAmount"
                            autoComplete="off"
                            value={salaryDetail.useOfMoveableAmount}
                            onChange={(e) =>
                              handleInput("useOfMoveableAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError13
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.useOfMoveableValue ||
                                salaryDetail.useOfMoveableAmount
                                ? parseInt(
                                  salaryDetail.useOfMoveableValue
                                    ? salaryDetail.useOfMoveableValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.useOfMoveableAmount
                                    ? salaryDetail.useOfMoveableAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Transfer of Assets to Employees
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="transferOfAssetValue"
                            autoComplete="off"
                            value={salaryDetail.transferOfAssetValue}
                            onChange={(e) =>
                              handleInput("transferOfAssetValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="transferOfAssetAmount"
                            autoComplete="off"
                            value={salaryDetail.transferOfAssetAmount}
                            onChange={(e) =>
                              handleInput("transferOfAssetAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError14
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.transferOfAssetValue ||
                                salaryDetail.transferOfAssetAmount
                                ? parseInt(
                                  salaryDetail.transferOfAssetValue
                                    ? salaryDetail.transferOfAssetValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.transferOfAssetAmount
                                    ? salaryDetail.transferOfAssetAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="bg-light-gray">
                          Value of any other benefit/amenity/service/privilege
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="valueOfAnyOtherValue"
                            autoComplete="off"
                            value={salaryDetail.valueOfAnyOtherValue}
                            onChange={(e) =>
                              handleInput("valueOfAnyOtherValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="valueOfAnyOtherAmount"
                            autoComplete="off"
                            value={salaryDetail.valueOfAnyOtherAmount}
                            onChange={(e) =>
                              handleInput("valueOfAnyOtherAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError15
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.valueOfAnyOtherValue ||
                                salaryDetail.valueOfAnyOtherAmount
                                ? parseInt(
                                  salaryDetail.valueOfAnyOtherValue
                                    ? salaryDetail.valueOfAnyOtherValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.valueOfAnyOtherAmount
                                    ? salaryDetail.valueOfAnyOtherAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="bg-light-gray">
                          Stock options allotted or transferred by employer
                          being an eligible start-up referred to in section
                          80-IAC
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="stock16IACValue"
                            autoComplete="off"
                            value={salaryDetail.stock16IACValue}
                            onChange={(e) =>
                              handleInput("stock16IACValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="stock16IACAmount"
                            autoComplete="off"
                            value={salaryDetail.stock16IACAmount}
                            onChange={(e) =>
                              handleInput("stock16IACAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError16
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.stock16IACValue ||
                                salaryDetail.stock16IACAmount
                                ? parseInt(
                                  salaryDetail.stock16IACValue
                                    ? salaryDetail.stock16IACValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.stock16IACAmount
                                    ? salaryDetail.stock16IACAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="bg-light-gray">
                          Stock options (non-qualified options) other than ESOP
                          in col 16 above
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="stockAboveValue"
                            autoComplete="off"
                            value={salaryDetail.stockAboveValue}
                            onChange={(e) =>
                              handleInput("stockAboveValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="stockAboveAmount"
                            autoComplete="off"
                            value={salaryDetail.stockAboveAmount}
                            onChange={(e) =>
                              handleInput("stockAboveAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError17
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.stockAboveValue ||
                                salaryDetail.stockAboveAmount
                                ? parseInt(
                                  salaryDetail.stockAboveValue
                                    ? salaryDetail.stockAboveValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.stockAboveAmount
                                    ? salaryDetail.stockAboveAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="bg-light-gray">
                          Contribution by employer to fund and scheme taxable
                          under section 17(2)(vii)
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="contributionValue"
                            autoComplete="off"
                            value={salaryDetail.contributionValue}
                            onChange={(e) =>
                              handleInput("contributionValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="contributionAmount"
                            autoComplete="off"
                            value={salaryDetail.contributionAmount}
                            onChange={(e) =>
                              handleInput("contributionAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError18
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.contributionValue ||
                                salaryDetail.contributionAmount
                                ? parseInt(
                                  salaryDetail.contributionValue
                                    ? salaryDetail.contributionValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.contributionAmount
                                    ? salaryDetail.contributionAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="bg-light-gray">
                          Annual accretion by way of interest, dividend etc. to
                          the balance at the credit of fund and scheme referred
                          to in section 17(2)(vii) and taxable under section
                          17(2)(viia)
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="annualValue"
                            autoComplete="off"
                            value={salaryDetail.annualValue}
                            onChange={(e) =>
                              handleInput("annualValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="annualAmount"
                            autoComplete="off"
                            value={salaryDetail.annualAmount}
                            onChange={(e) =>
                              handleInput("annualAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError19
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.annualValue ||
                                salaryDetail.annualAmount
                                ? parseInt(
                                  salaryDetail.annualValue
                                    ? salaryDetail.annualValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.annualAmount
                                    ? salaryDetail.annualAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Other benefits or amenities
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="otherValue"
                            autoComplete="off"
                            value={salaryDetail.otherValue}
                            onChange={(e) =>
                              handleInput("otherValue", e, "float")
                            }
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="otherAmount"
                            autoComplete="off"
                            value={salaryDetail.otherAmount}
                            onChange={(e) =>
                              handleInput("otherAmount", e, "float")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className={
                              salaryDetailErrors.perksError20
                                ? "form-control has-error"
                                : "form-control"
                            }
                            id="carsValue"
                            autoComplete="off"
                            value={
                              salaryDetail.otherValue ||
                                salaryDetail.otherAmount
                                ? parseInt(
                                  salaryDetail.otherValue
                                    ? salaryDetail.otherValue
                                    : 0
                                ) -
                                parseInt(
                                  salaryDetail.otherAmount
                                    ? salaryDetail.otherAmount
                                    : 0
                                )
                                : ""
                            }
                            disabled
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => {
            if (props.validateSalaryPerksDetail()) {
              props.setTotalSalary("")
            }
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className=""
        size="lg"
        centered
        keyboard={true}
        backdrop="static"
        show={props.totalSalary == "trustee"}
        onHide={() => props.setTotalSalary("")}
      >
        <Modal.Header className="border-0" closeButton>
          <h5 className="text-black fw-bold mb-0">Trustee Contribution</h5>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-12 px-0">
                <div className="table-responsive rounded border overflow-hidden popup-table">
                  <table className="table-bordered m-0">
                    <thead className="bg-light-blue">
                      <tr>
                        <th>Name</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="bg-light-gray w-50">
                          Name of the superannuation fund
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="nameOfTheSuperanuation"
                            autoComplete="off"
                            value={salaryDetail.nameOfTheSuperanuation}
                            onChange={(e) =>
                              handleInput("nameOfTheSuperanuation", e)
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Date from which the employee has contributed to the
                          superannuation fund
                        </td>
                        <td>
                          <DatePicker
                            autoComplete="off"
                            selected={salaryDetail.dateFromWhichtheEmployee}
                            id="dateFromWhichtheEmployee"
                            className="form-control w-100"
                            onChange={(e) =>
                              handleInput("dateFromWhichtheEmployee", e)
                            }
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/MM/yyyy"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Date to which the employee has contributed to the
                          superannuation fund
                        </td>
                        <td>
                          {" "}
                          <DatePicker
                            autoComplete="off"
                            selected={salaryDetail.dateToWhichtheEmployee}
                            id="dateToWhichtheEmployee"
                            className="form-control w-100"
                            onChange={(e) =>
                              handleInput("dateToWhichtheEmployee", e)
                            }
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/MM/yyyy"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          The amount of contribution repaid on account of
                          principal and interest from superannuation fund
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="theAmountOfContribution"
                            autoComplete="off"
                            value={salaryDetail.theAmountOfContribution}
                            onChange={(e) =>
                              handleInput("theAmountOfContribution", e, "float")
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          The average rate of deduction of tax during the
                          preceding three years
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="theAvarageRateOfDeduction"
                            autoComplete="off"
                            value={salaryDetail.theAvarageRateOfDeduction}
                            onChange={(e) =>
                              handleInput(
                                "theAvarageRateOfDeduction",
                                e,
                                "float"
                              )
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          The amount of tax deducted on repayment of
                          superannuation fund
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="theAmountOfTaxDeduction"
                            autoComplete="off"
                            value={salaryDetail.theAmountOfTaxDeduction}
                            onChange={(e) =>
                              handleInput("theAmountOfTaxDeduction", e, "float")
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray">
                          Gross Total Income (355-CS)
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder=""
                            className="form-control"
                            id="grossTotalIncomeCS"
                            autoComplete="off"
                            value={salaryDetail.grossTotalIncomeCS}
                            disabled
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => {
            props.setTotalSalary("")
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
