"use client";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EnableExtensionModal(props) {
    const { deductorInfo, searchParams, form } = props;
    const handleStartEFiling = async () => {
        // const payload = {
        //     FinancialYear: searchParams.get("financial_year"),
        //     Quarter: searchParams.get("quarter"),
        //     DeductorName: deductorInfo.deductorName,
        //     CategoryId: parseInt(searchParams.get("categoryId")),
        //     Password: deductorInfo.tracesPassword,
        //     Tan: deductorInfo.deductorTan,
        // };
        const payload = {
            Tan: "PTLJ10787A",              // user TAN
            Password: "bansal@123", // password
            FinancialYear: "2024-25",
            Quarter: "Q2",                  // Q1 / Q2 / Q3 / Q4
            CategoryId: 4,                  // 1=24Q, 2=26Q, 4=27Q, 3=27EQ
            DeductorName: "ABC Pvt Ltd"
        };
        // Send the message to the Chrome extension content script
        window.postMessage(
            {
                type: "TV_START_EFILING",
                payload,
            },
            window.location.origin
        );
        console.log('📤 TV_START_EFILING sent to extension:', payload);
    };

    // optional listener for confirmation
    React.useEffect(() => {
        const listener = (event) => {
            if (event.data?.type === "TV_EFILING_TAB_OPENED") {
                console.log("✅ E-portal tab opened:", event.data.result);
            }
        };
        window.addEventListener("message", listener);
        return () => window.removeEventListener("message", listener);
    }, []);


    return (
        <>
            <ToastContainer />

            <Modal
                show={props.show}
                onHide={props.close}
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Enable Chrome Extension</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="mb-3">
                        To continue with <b>e-Filing</b>, please install and enable the
                        <b> TaxVahan E-Filing Assistant</b> Chrome extension.
                    </p>

                    <div className="d-flex flex-column gap-2">
                        <a
                            href="https://chromewebstore.google.com/detail/taxvahan-e-filing-assista/cldkfgelbiljjfemghhgcgiiaghbaehm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            Install Extension
                        </a>

                        <button
                            className="btn btn-outline-success"
                            onClick={handleStartEFiling}
                        >
                            Already Installed? Continue to e-Filing
                        </button>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={props.close}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

