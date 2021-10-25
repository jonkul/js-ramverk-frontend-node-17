import React from "react";

const NewButton = ({
    className,
    onClick,
    id
}) => {
    return (
        <button 
            className={className + "-button"}
            data-testid="newbutton"
            id={id}
            onClick={onClick}
        >
            <i className="fa fa-file"></i>
            <span> New</span>
        </button>
    );
};

export default NewButton;
