import React from "react";

function ListItem(props) {
    return (
        <li
            onClick={() => props.onClick(props._id, props.name, props.html)}
        >
            {props.name}
        </li>)
    ;
}

export default function Ul(props) {
    const data = props.data;
    return (
        <ul>
            {data.map((mapped) =>
                <ListItem
                    key={mapped.name}
                    _id={mapped._id}
                    html={mapped.html}
                    name={mapped.name}
                    onClick={props.onClick}
                />
            )}
        </ul>
    );
}
