import React from "react";

const MyInput = ({
    value,
    onChange
}) => {
    return (
        <div key="div2">
            <h4>
                Active document: 
            </h4>
            <input
                key="texta"
                id="texta"
                rows="1"
                placeholder="Create new doc above, or open from the list"
                value={value}
                onChange={onChange}
            >
            </input>
        </div>
    );
};

export default MyInput;
