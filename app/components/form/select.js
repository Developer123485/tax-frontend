import React, { useState } from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    backgroundColor: state.isSelected ? "#e6f7ff" : "white",
    color: "black",
  }),
};

export default function CheckboxSelect(props) {
  return (
    <div className="col-md-12">
      <Select
        options={props.options}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option: ({ data, isSelected, innerRef, innerProps }) => (
            <div ref={innerRef} {...innerProps} style={{ padding: "8px" }}>
              <input
                type="checkbox"
                checked={isSelected}
                readOnly
                style={{ marginRight: 8 }}
              />
              {data.name} - {data.label}
            </div>
          ),
        }}
        onChange={props.setSelectedOptions}
        value={props.selectedOptions}
        styles={customStyles}
        placeholder="Select options..."
      />
    </div>
  );
}
