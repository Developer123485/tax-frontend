import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

export default function SearchableDropdown(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const filteredOptions = props.options.filter(option =>
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSelect = (eventKey) => {
        props.setEventId(eventKey);
        setSearchTerm('');
        setShowDropdown(false);
    };

    return (
        <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)} onSelect={handleSelect}>
            <Dropdown.Toggle className='bg-white text-dark broder border-secondary border-1 w-100 text-start' style={{ minWidth: '450px' }}>
                {filteredOptions && filteredOptions.length > 0 && props.id && filteredOptions.find(p => p.key == props.id)?.value ? filteredOptions.find(p => p.key == props.id)?.value : "Select"}
                {props.id && <span className='ms-2' onClick={(e) => props.setEventId("")}><i className="fa-solid fa-circle-xmark"></i></span>}
            </Dropdown.Toggle>
            <Dropdown.Menu className='ps-2 pe-3 py-2 w-100' style={{ minWidth: '450px', maxHeight: '190px', overflowX: 'hidden', overflowY: 'scroll' }}>
                <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Prevent menu from closing on click
                    style={{ margin: '5px' }}
                />
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option, index) => (
                        <Dropdown.Item eventKey={option.key} key={index}>
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
