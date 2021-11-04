import './App.css';

import Ul from './components/ul';
import Header from './components/header';
import SaveButton from './components/savebutton';
import MyInput from './components/myinput';
import NewButton from './components/newbutton';
import ResetButton from './components/resetbutton';
//import chat from './components/chat';

import { useState, useEffect } from "react";
// eslint-disable-next-line
import Trix from "trix";
// reactTrixRte
import { ReactTrixRTEInput } from "react-trix-rte";
import { update, createNew, setupDB, fetchData } from './functions/backend';
//import useSWR from 'swr';

//import io from "socket.io-client";
//import socketIOClient from "socket.io-client";
//import Address from 'ipaddr.js';
import { socket } from "./functions/socket";

export default function App(props) {
    //data = unmodified data from db
    const [data, setData] = useState([]);
    // const [activeId, setActiveId] = useState("");
    // const [activeName, setActiveName] = useState("");
    // const [activeHTML, setActiveHTML] = useState("");
    const [active, setActive] = useState(
        {
            _id: "default id",
            name: "",
            html: "default html"
        }
    );

    //for experimentation
    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    //FUNCTION FOR GETTING DATABASE DOCS
    const fetchedData = async () => {
        const response = await fetchData();
        setData(response.data);
    };
    //call it
    useEffect(() => {
        fetchedData();
    }, []);


    // let room;

    //input.io
    useEffect(() => {
        var element = document.querySelector("trix-editor");
        //var val = document.getElementById("trix-editor");

        // let activeMirror = {
        //     _id: active._id,
        //     name: active.name,
        //     html: active.html
        // };

        socket.on('connect', function() {
            // socket.emit("activeDoc", activeMirror._id);
            socket.emit("activeDoc", active._id);
            //room = active._id;
        });

        socket.on('docBodyUpdate', function (data) {
            console.log("data: ", data._id);
            console.log("active: ", active._id);
            if (data._id === active._id) {
                element.editor.setSelectedRange([0, 999999999999999]);
                element.editor.deleteInDirection("forward");
                element.editor.insertHTML(data.html);  // is a Trix.Editor instance

                //setActive( { _id: data._id, name: data.name, html: data.html } );
            }
        });

        return () => {
            console.log('useEffect cleanup 1');
        };
    });



    useEffect(() => {
        var element = document.querySelector("trix-editor");
        var val = document.getElementById("trix-editor");

        element.addEventListener("keyup", function (event) {
            socket.emit('docBodyUpdate', {_id: active._id, name: active.name, html: val.value});
        });
    
        return () => {
            console.log('useEffect cleanup 2');
            element.removeEventListener("keyup", function (event) {
                socket.emit('docBodyUpdate', {_id: active._id, name: active.name, html: val.value});
            });
        };
    });
    


//change handlers
    //handle editor input change
    function handleChange(event) {
        // setActiveHTML(newHtml); // OR custom on change listener.
        // setActive({...active, html: event.target.value}); // OR custom on change listener.
        //setActive({_id: active._id, name: active.name, html: event.target.value});
    }

    //handle active document text input change
    function inpChange(event) {
        // setActiveName(event.target.value);
        setActive({...active, name: event.target.value});
    }

    //input keyup
    // useEffect(() => {
    //     var tr = document.querySelector("trix-editor");
    //     if (tr != null) {
    //         tr.addEventListener("keyup", function (event) {
    //             console.log(tr.value);
    //         });
    //     };
    // }, []);




/* if (event.code === "Enter") {
            socket.emit('chat message', event.target.value);
            event.target.value = "";
        } */
//console.log(tr.value);

//button click functions
    //handle document link clicked
    async function liClicked(_id, name, html) {
        console.log(_id, " ", name, html);

        var element = document.querySelector("trix-editor");
        element.editor.setSelectedRange([0, 999999999999999]);
        element.editor.deleteInDirection("forward");
        element.editor.insertHTML(html);  // is a Trix.Editor instance

        await setActive( { _id: _id, name: name, html: html } );

        socket.emit("activeDoc", _id);

        // setActiveId(_id); // OR custom on change listener. */
        // setActiveName(name);
        // setActiveHTML(html);
    }

    //handle save button clicked
    async function saveButtonClicked() {
        // await update(activeId, activeName, activeHTML);
        await update(active._id, active.name, active.html);
        fetchedData();
    }

    //handle reset button clicked
    async function resetButtonClicked() {
        await setupDB();
        await fetchedData();
        window.location.reload(false);
    }

    //handle new button clicked
    async function newButtonClicked() {
        var element = document.querySelector("trix-editor");
        element.editor.setSelectedRange([0, 999999999999999]);
        element.editor.deleteInDirection("forward");
        element.editor.insertHTML("New document created, select it in the list above!");

        await createNew();
        fetchedData();
    }



    return (
        <div className="App">
            <header className="App-header">
                <Header />

                <div className="topcontrols">
                    <div id="listdiv" key="div">

                        <div key="div3">
                            <NewButton
                                onClick={newButtonClicked}
                                className={"new"}
                                id="NewButton"
                            />
                            <SaveButton
                                onClick={saveButtonClicked}
                                className={"save"}
                                // disabled={!activeId}
                                disabled={!active.name}
                            />
                            <ResetButton
                                onClick={resetButtonClicked}
                                className={"reset"}
                            />
                            <MyInput
                                id="active"
                                className="active"
                                name="active"
                                // value={activeName}
                                value={active.name}
                                onChange={inpChange}
                            >
                            </MyInput>
                        </div>

                        <div key="div4">
                            <h3 id="dokument">Documents:</h3>
                            <Ul
                                data={data}
                                onClick={liClicked} //funktion
                            />
                        </div>
                    </div>
                </div>

                <ReactTrixRTEInput
                    placeholder="Input your text here!"
                    onChange={handleChange}
                    id="trix-editor"
                    // defaultValue=""
                />

                {/* <chat id="chat" /> */}
                {/* <div id="chat" name="chat">
                    <h2>Messages:</h2>
                    <div id="all-messages" className="all-messages"></div>

                    <p><strong>Write new message:</strong></p>
                    <input id="new-message" className="new-message"/>
                </div> */}

                {/* writes out states */}
                <div id="diagnostics">
                    <p className="activeName state">
                        name: &nbsp;
                        {active.name}
                    </p>
                    <p className="activeId state">
                        id: &nbsp;
                        {active._id}
                    </p>
                    <p className="activeHTML state">
                        html: &nbsp;
                        {active.html}
                    </p>
                </div>

            </header>
        </div>
    )
}
