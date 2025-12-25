import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

export default function SearchableDropdown(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const selectedOption = props.options?.find(o => o.key === props.id);

    const filteredOptions = props.options?.filter(option =>
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dropdown
            show={showDropdown}
            onToggle={() => setShowDropdown(!showDropdown)}
            className="w-100"
        >
            <Dropdown.Toggle
                className="bg-white text-dark border w-100 d-flex align-items-center justify-content-between"
                style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}
            >
                <span
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "90%",
                        display: "inline-block"
                    }}
                >
                    {selectedOption?.value || "Select"}
                </span>

                {props.id && (
                    <span
                        className="ms-2 text-danger"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setEventId("");
                        }}
                    >
                        <i className="fa-solid fa-circle-xmark"></i>
                    </span>
                )}
            </Dropdown.Toggle>

            <Dropdown.Menu
                className="w-100"
                style={{
                    maxHeight: "220px",
                    overflowY: "auto"
                }}
            >
                <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="m-2"
                    onClick={(e) => e.stopPropagation()}
                />

                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                        <Dropdown.Item
                            key={option.key}
                            eventKey={option.key}
                            active={props.id === option.key}
                            className="text-wrap"
                        >
                            {option.value}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>No results found</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}
