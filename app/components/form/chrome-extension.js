import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function EnableExtensionModal(props) {


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
                        onClick={props.close}
                    >
                        If you have already installed the extension, you may proceed with e-Filing
                    </button>
                </div>
            </Modal.Body>
        </Modal>

    )
}

