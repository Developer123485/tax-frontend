import React, { useState } from 'react';
import { Dropdown, Form, InputGroup, Button } from 'react-bootstrap';

export default function SearchableDropdown(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const filteredOptions = props?.options?.filter(option =>
        option?.value?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
    const handleSelect = (eventKey) => {
        props.setEventId(eventKey);
        setSearchTerm('');
        setShowDropdown(false);
    };

    return (
        <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)} onSelect={handleSelect}>
            <Dropdown.Toggle
                className="bg-white text-dark border w-100 d-flex align-items-center justify-content-between"
                style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}
            >
                {filteredOptions && filteredOptions.length > 0 && props.id &&
                    filteredOptions.find(p => p.key == props.id)?.value
                    ? filteredOptions.find(p => p.key == props.id)?.value
                    : "Select"
                }

                {props.id && (
                    <span className="ms-2 text-danger" onClick={(e) => { e.stopPropagation(); props.setEventId(""); }}>
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

                <InputGroup className="mb-2">
                    <Form.Control
                        autoFocus
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />

                    <Button
                        variant="outline-secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSearchTerm('');
                        }}
                        title="Clear"
                    >
                        <i className="fa fa-times"></i>
                    </Button>
                </InputGroup>


                {filteredOptions?.length > 0 ? (
                    filteredOptions?.map((option, index) => (
                        <Dropdown.Item
                            eventKey={option.key}
                            key={index}
                            active={props.id === option.key}
                            className="text-wrap" // <-- highlight selected item
                        >
                            {option.value}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>No results found</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown >
    );
};
