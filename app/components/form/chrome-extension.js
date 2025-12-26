import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function EnableExtensionModal(props) {
    const { deductorInfo, searchParams, form } = props;
    const handleStartEFiling = async () => {
        const response = await fetch(`https://py-api.taxvahan.site/get-fvu-file?param1=${deductorInfo.deductorName}&param2=${searchParams.get("financial_year")}&param3=${searchParams.get("quarter")}&param4=${form.replace("form-", "")}`);
        if (!response.ok) {
            toast.error("Failed to download ZIP");
            return;
        }

        const contentType = response.headers.get("Content-Type");
        // If response is JSON instead of ZIP, it's likely an error message
        if (contentType && contentType.includes("application/json")) {
            toast.error("No file is available for download. Please click on 'Generate FVU'.");
            return;
        }
        const model = {
            financialYear: searchParams.get("financial_year"),
            quarter: searchParams.get("quarter"),
            deductorName: deductorInfo.deductorName,
            categoryId: parseInt(searchParams.get("categoryId")),
            password: deductorInfo.tracesPassword,
            tan: deductorInfo.deductorTan,
        };

        // Send the message to the Chrome extension content script
        window.postMessage(
            {
                type: "TV_START_EFILING",
                model,
            },
            window.location.origin
        );
        console.log('📤 TV_START_EFILING sent to extension:', model);
        props.close();
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
        <Modal show={props.show} centered backdrop="static" keyboard={false}>
            <Modal.Header>
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
                        If you have already installed the extension, you may proceed with e-Filing
                    </button>
                </div>
            </Modal.Body>
        </Modal>

    )
}

