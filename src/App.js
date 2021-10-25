import './App.css';

import Ul from './components/ul';
import Header from './components/header';
import SaveButton from './components/savebutton';
import MyInput from './components/myinput';
import NewButton from './components/newbutton';
import ResetButton from './components/resetbutton';
import { useState, useEffect } from "react";
// eslint-disable-next-line
import Trix from "trix";
import { ReactTrixRTEInput } from "react-trix-rte";
import { update, createNew, setupDB, fetchData } from './functions/backend';
//import useSWR from 'swr';

export default function App(props) {
    const [data, setData] = useState([]);
    const [activeId, setActiveId] = useState("");
    const [activeName, setActiveName] = useState("");
    const [activeHTML, setActiveHTML] = useState("");

    //for experimentation
    /* function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    } */

    //FUNCTION FOR GETTING DATABASE DOCS
    const fetchedData = async () => {
        const response = await fetchData();
        setData(response.data);
    };
    //call it
    useEffect(() => {
        fetchedData();
    }, []);

//change handlers
    //handle editor input change
    function handleChange(event, newHtml) {
        setActiveHTML(newHtml); // OR custom on change listener.
    }

    //handle active document text input change
    function inpChange(event) {
        setActiveName(event.target.value);
    }



//button click functions
    //handle document link clicked
    function liClicked(_id, name, html) {
        setActiveId(_id); // OR custom on change listener. */
        setActiveName(name);
        setActiveHTML(html);

        var element = document.querySelector("trix-editor");
        element.editor.setSelectedRange([0, 999999999999999]);
        element.editor.deleteInDirection("forward");
        element.editor.insertHTML(html);  // is a Trix.Editor instance
    }

    //handle save button clicked
    function saveButtonClicked() {
        update(activeId, activeName, activeHTML);
        fetchedData();
    }

    //handle save button clicked
    function resetButtonClicked() {
        setupDB();
        fetchedData();
        window.location.reload(false);
    }

    //handle new button clicked
    function newButtonClicked() {
        createNew();
        fetchedData();

        var element = document.querySelector("trix-editor");
        element.editor.setSelectedRange([0, 999999999999999]);
        element.editor.deleteInDirection("forward");
        element.editor.insertHTML("New document created, select it in the list above!");
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
                                disabled={!activeId}
                            />
                            <ResetButton
                                onClick={resetButtonClicked}
                                className={"reset"}
                            />
                            <MyInput                                
                                id="active"
                                className="active"
                                name="active"
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
                />

                {/* writes out states */}
                <div id="diagnostics">
                    <p className="activeName state">
                        {activeName}
                    </p>
                    <p className="activeId state">
                        {activeId}
                    </p>
                    <p className="activeHTML state">
                        {activeHTML}
                    </p>
                </div>

            </header>
        </div>
    )
}
