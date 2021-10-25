import logo from '../logo.svg';
import React from "react";

export default function Header() {
    return (
        <div id="head">
            <img
                src={logo}
                className="App-logo"
                alt="logo" 
            />
            <h1>
                My little React/Trix text editor
            </h1>
        </div>
    )
}
