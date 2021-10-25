import React, { useState, useEffect } from "react";
import SaveButton from './savebutton';
import MyInput from './myinput';
import NewButton from './newbutton';
import ResetButton from './resetbutton';

const Inp = MyInput;

const datadef = {data: [{_id: "123", name: 'Dokument1', html: 'Placeholder1'}, {_id: "234", name: 'Dokument2', html: 'Placeholder2'}, {_id: "345", name: 'Dokument3', html: 'Placeholder3'}]};

export default function Nav(props) {
    const [data, setData] = useState(datadef);
    const [activeId, setActiveId] = useState("");
    const [activeName, setActiveName] = useState("");
    // eslint-disable-next-line
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [error, setError] = useState(null);


    

    //GET DATABASE DOCS
    /* useEffect(() => {
        fetchData();
        sleep(300);
    }); */


    /* if (loading) return "Loading..."; */
    /* if (error) return error.message; */



    //FUNCTION FOR GETTING DATABASE DOCS
    useEffect(() => {
        let active = true;

        const fetchData2 = async () => {
            const response = await fetch("https://jsramverk-editor-joku17.azurewebsites.net/list");
            const newData = await response.json();
            if (active) {
                setData(newData);
            }
        };

        //call it
        fetchData2();
            return () => {
                active = false;
            };
    }, []);


    //FUNCTION FOR GETTING DATABASE DOCS
    const fetchData = () => {
        fetch("https://jsramverk-editor-joku17.azurewebsites.net/list")
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                //sleep(300);
                setData(oldData => data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(oldError => error);
            })
                .finally(() => {
                //setLoading(oldLoading => false);
                //console.log("data fetched");
            });
    };



    //FUNCTION FOR RESETING DATABASE
    const setupDB = () => {
        fetch("https://jsramverk-editor-joku17.azurewebsites.net/setup")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                //GET DATABASE DOCS
                //fetchData();
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(oldError => error);
            })
                /* .finally(() => {
                //setLoading(oldLoading => false);
            }) */;
    };


    //CREATE DATABASE DOC
    function createNew() {
        var delivery = {
            name: "New document",
            html: ""
        };

        fetch("https://jsramverk-editor-joku17.azurewebsites.net/create", {
            body: JSON.stringify(delivery),
            headers: {
                'content-type': 'application/json'
                },
                method: 'POST'
            })

            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                //GET DATABASE DOCS
                fetchData();
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
                .finally(() => {
                //setLoading(false);
                console.log("created ok")
            }) ;
    }


    //UPDATE DATABASE DOC
    function update() {
        console.log(props.editorHTML);
        var delivery = {
            filter: {activeId}.activeId,
            name: {activeName}.activeName,
            html: props.editorHTML
        };

        console.log(delivery);

        fetch("https://jsramverk-editor-joku17.azurewebsites.net/update", {
            body: JSON.stringify(delivery),
            headers: {
                'content-type': 'application/json'
                },
                method: 'POST'
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                //GET DATABASE DOCS
                fetchData();
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
                .finally(() => {
                /* setLoading(false); */
                console.log("update ok")
            });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //change handlers
    function inpChange(event) {
        setActiveName(event.target.value);
    }


    //click functions
    let {Component} = React;

    async function liClicked(_id, name, html) {
        //var element = document.querySelector("trix-editor")
        //var elementid = document.getElementById("trix-editor-id");
        //console.log(element);
        //console.log(elementid);

        setActiveId(_id); // OR custom on change listener. */
        setActiveName(name);

        //await sleep(300);

        var element = document.querySelector("trix-editor")
        element.editor.setSelectedRange([0, 999999999999999])
        element.editor.deleteInDirection("forward")
        element.editor.insertHTML(html);  // is a Trix.Editor instance
        console.log(element);

        //elementid.value = (html);
    }

    async function saveButtonClicked() {
        console.log({activeName});
        update();
        await sleep(300);
    }

    async function resetButtonClicked() {
        console.log("reset db button clicked");
        // setData(datadef);
        setupDB();
        await sleep(300);
        window.location.reload(false);
    }

    async function newButtonClicked() {
        // var elementid = document.getElementById("trix-editor-id");

        console.log("static console.log: new button clicked");
        createNew();

        await sleep(200);

        var element = document.querySelector("trix-editor");
        element.editor.setSelectedRange([0, 999999999999999]);
        element.editor.deleteInDirection("forward");
        element.editor.insertHTML("New document created, select it in the list above!");

        //elementid.value = ("New document created, select it in the list above!");
    }

/* console.log({data}); */


    //ul/li components
    class Ul extends Component {
        render() {
            return (
                <ul data-testid="myul">
                    {data?.data && data.data.map(item => <Li 
                        key={item._id}
                        id={item.name}
                        className={item.name}
                        item={item}
                        onClick={() => liClicked(item._id, item.name, item.html)}
                        />
                    )}
                </ul>
            );
        }
    }

    class Li extends Component {
        render() {
            return (
                <li data-testid={this.props.item.name}
                    onClick={this.props.onClick}
                >
                    {this.props.item.name}
                </li>
            );
        }
    }

    return (
        <>
            <div id="listdiv" key="div">
                <div key="div3">
                    <NewButton
                        onClick={newButtonClicked}
                        className={"new"}
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
                    <Inp
                        key="texta"
                        value={activeName}
                        onChange={inpChange}
                    >
                    </Inp>
                </div>
                <div key="div4">
                    <h3 id="dokument">Dokument:</h3>
                    <Ul
                        data={data}
                    />
                </div>
            </div>
        </>
    );
}
