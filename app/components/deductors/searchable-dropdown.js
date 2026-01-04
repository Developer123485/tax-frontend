import React, { useState } from 'react';
import { Dropdown, Form, InputGroup, Button } from 'react-bootstrap';
import { useRouter } from "next/navigation";

export default function SearchableDropdown(props) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredOptions = props?.options?.filter(option =>
        option?.value?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );

    const selectedValue =
        filteredOptions?.find(p => p.key === props.id)?.value || "Select";

    const handleSelect = (eventKey) => {
        props.setEventId(props?.url ? parseInt(eventKey) : eventKey);
        setSearchTerm('');
        setShowDropdown(false);
    };

    return (
        <Dropdown
            show={showDropdown}
            onToggle={() => setShowDropdown(!showDropdown)}
            onSelect={handleSelect}
        >
            {/* CUSTOM TOGGLE */}
            <Dropdown.Toggle
                as="div"
                className="form-control d-flex align-items-center justify-content-between cursor-pointer"
                style={{
                    cursor: "pointer"
                }}
            >
                {/* Selected Text */}
                <span
                    className="text-truncate"
                    style={{ maxWidth: "90%" }}
                >
                    {selectedValue}
                </span>

                {/* Close Icon */}
                {props.id && (
                    <span
                        className="ms-2 text-danger"
                        style={{ cursor: "pointer", flexShrink: 0 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setEventId("");
                        }}
                    >
                        <i className="fa-solid fa-circle-xmark"></i>
                    </span>
                )}
            </Dropdown.Toggle>

            {/* DROPDOWN MENU */}
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
                        onChange={(e) => {
                            debugger
                            setSearchTerm(e.target.value)
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />

                    {props?.url && (
                        <Button
                            variant="outline-primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(props.url);
                            }}
                        >
                            <i className="fa fa-plus"></i>
                        </Button>
                    )}

                    <Button
                        variant="outline-secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSearchTerm('');
                        }}
                    >
                        <i className="fa fa-times"></i>
                    </Button>
                </InputGroup>

                {filteredOptions?.length > 0 ? (
                    filteredOptions.map((option, index) => (
                        <Dropdown.Item
                            eventKey={option.key}
                            key={index}
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
