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
    const [activeId, setActiveId] = useState("default id");
    const [activeName, setActiveName] = useState("");
    const [activeHTML, setActiveHTML] = useState("");
    const [listen, setListen] = useState(false);
    
    // const [active, setActive] = useState(
    //     {
    //         _id: activeId,
    //         name: activeName,
    //         html: activeHTML
    //     }
    // );

    // useEffect(() => {
    //     setActive(
    //         {
    //             _id: activeId,
    //             name: activeName,
    //             html: activeHTML
    //         }
    //     );
    // }, [activeId, activeName, activeHTML]);
    

    // const [active, setActive] = useState(
    //     {
    //         _id: "default id",
    //         name: "",
    //         html: ""
    //     }
    // );

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


//input.io
    useEffect(() => {
        socket.on('connect', function() {
            // socket.emit("activeDoc", activeId);
            socket.emit("activeDoc", "default id");
        });
    }, []);



    useEffect(() => {
        var elementRec = document.querySelector("trix-editor");
        //var val = document.getElementById("trix-editor");

        socket.on('docBodyUpdate', function (data) {
            console.log("data._id: ", data._id);
            console.log("activeId: ", activeId);
            console.log("received html: ", data.html);
            console.log("received name: ", data.name);
            if (data._id === activeId) {
                // setActiveId(data._id);
                setActiveName(data.name);
                // setActiveHTML(data.html);
                elementRec.editor.setSelectedRange([0, 999999999999999]);
                elementRec.editor.deleteInDirection("forward");
                elementRec.editor.insertHTML(data.html);  // is a Trix.Editor instance
            }
        });

        return () => {
            console.log('useEffect cleanup 1');
            socket.off();
        };
    }, [activeId]);

    // useEffect(() => {
    //     var element = document.querySelector("trix-editor");
    //     element.editor.setSelectedRange([0, 999999999999999]);
    //     element.editor.deleteInDirection("forward");
    //     element.editor.insertHTML(activeHTML);  // is a Trix.Editor instance
    // }, [activeHTML]);


    //editor
    useEffect(() => {
        // if (listen) {
        //     return;
        // }

        function handleKeyUp(event) {
            console.log("sending html:", val.value);
            console.log("sending _id:", activeId);
            socket.emit('docBodyUpdate', {_id: activeId, name: texta.value, html: val.value});
            setListen(true);
        }

        var elementKey = document.querySelector("trix-editor");

        var val = document.getElementById("trix-editor");
        var texta = document.getElementById("texta");

        elementKey.addEventListener("keyup", handleKeyUp);

        return () => elementKey.removeEventListener("keyup", handleKeyUp);

        // elementKey.addEventListener("keyup", function (event) {
        //     console.log("sending html:", val.value);
        //     console.log("sending _id:", activeId);
        //     socket.emit('docBodyUpdate', {_id: activeId, name: texta.value, html: val.value});
        // });
    
        // return () => {
        //     console.log('useEffect cleanup 2');
        //     elementKey.addEventListener("keyup", function (event) {
        //         console.log("sending html:", val.value);
        //         console.log("sending _id:", activeId);
        //         //socket.emit('docBodyUpdate', {_id: activeId, name: texta.value, html: val.value});
        //     });
        // };
    }, [activeId, listen]);


    //activedoc
    useEffect(() => {
        var texta = document.getElementById("texta");
        //var element = document.querySelector("trix-editor");
        var val = document.getElementById("trix-editor");

        texta.addEventListener("keyup", function (event) {
            console.log("sending name:", texta.value);
            socket.emit('docBodyUpdate', {_id: activeId, name: texta.value, html: val.value});
        });
    
        return () => {
            console.log('useEffect cleanup 3');
            texta.removeEventListener("keyup", function (event) {
                socket.emit('docBodyUpdate', {_id: activeId, name: texta.value, html: val.value});
            });
        };
    }, [activeId]);
    


//change handlers
    //handle editor input change
    function handleChange(event) {
        // setActiveHTML(newHtml); // OR custom on change listener.
        // setActive({...active, html: event.target.value}); // OR custom on change listener.
        // setActive({...active, html: event.target.value});
        setActiveHTML(event.target.value);
    }

    //handle active document text input change
    function inpChange(event) {
        // setActiveName(event.target.value);
        // setActive({...active, name: event.target.value});
        setActiveName(event.target.value);
    }



//button click functions
    //handle document link clicked
    function liClicked(_id, name, html) {
        console.log("liClicked:", _id, " ", name, html);

        var elementLi = document.querySelector("trix-editor");
        elementLi.editor.setSelectedRange([0, 999999999999999]);
        elementLi.editor.deleteInDirection("forward");
        elementLi.editor.insertHTML(html);  // is a Trix.Editor instance

        // setActive( { _id: _id, name: name, html: html } );

        socket.emit("activeDoc", _id);

        setActiveId(_id);
        setActiveName(name);
        setActiveHTML(html);
    }

    //handle save button clicked
    async function saveButtonClicked() {
        await update(activeId, activeName, activeHTML);
        // await update(active._id, active.name, active.html);
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
        var elementNew = document.querySelector("trix-editor");
        elementNew.editor.setSelectedRange([0, 999999999999999]);
        elementNew.editor.deleteInDirection("forward");
        elementNew.editor.insertHTML("New document created, select it in the list above!");

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
                                disabled={!activeName}
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
                                value={activeName}
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
                    defaultValue={activeHTML}
                />

                {/* writes out states */}
                <div id="diagnostics">
                    <p className="activeName state">
                        name: &nbsp;
                        {/* {active.name} */}
                        {activeName}
                    </p>
                    <p className="activeId state">
                        id: &nbsp;
                        {/* {active._id} */}
                        {activeId}
                    </p>
                    <p className="activeHTML state">
                        html: &nbsp;
                        {/* {active.html} */}
                        {activeHTML}
                    </p>
                    <p className="listen state">
                        listen: &nbsp;
                        {/* {active.html} */}
                        {listen}
                    </p>
                </div>

            </header>
        </div>
    )
}
