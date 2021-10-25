import React from "react";

const MyInput = ({
    value,
    onChange,
    name,
    className
}) => {
    return (
        <div key="div2">
            <h4>
                Active document: 
            </h4>
            <input
                id="texta"
                rows="1"
                placeholder="Create new doc above, or open from the list"
                value={value}
                onChange={onChange}
                name={name}
                className={className}
            >
            </input>
        </div>
    );
};

export default MyInput;
