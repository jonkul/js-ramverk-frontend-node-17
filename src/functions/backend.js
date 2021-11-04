//GET DATABASE DOCS
async function fetchData() {
    const res = await fetch("https://jsramverk-editor-joku17.azurewebsites.net/list");
    const data = await res.json();

    return data;
};



/* async function fetchData() {
    return fetch("https://jsramverk-editor-joku17.azurewebsites.net/list")
    .then(res => {
        return res.json()
    })
}; */


//GET DATABASE DOCS
/* const fetchData = () => {
    return fetch("https://jsramverk-editor-joku17.azurewebsites.net/list")
        .then(response => response.json());
}; */


//RESET DATABASE
const setupDB = () => {
    fetch("https://jsramverk-editor-joku17.azurewebsites.net/setup")
        .then(response => response.json())
        .finally(fetchData());
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
        .then(response => response.json())
        .then(fetchData());
}


//UPDATE DATABASE DOC
function update(activeId, activeName, activeHTML) {
    var delivery = {
        filter: {activeId}.activeId,
        name: {activeName}.activeName,
        html: {activeHTML}.activeHTML,
    };

    fetch("https://jsramverk-editor-joku17.azurewebsites.net/update", {
        body: JSON.stringify(delivery),
        headers: {
            'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(response => response.json())
        .finally(fetchData());
}


export { update, createNew, setupDB, fetchData };


/* import React, { useState, useEffect } from "react";

const useUserData = () => {
    const initialState = {
        data: {},
        error: null
    }
    const [state, setState] = useState(initialState);

    useEffect(() => {
        // clean up controller
        let isSubscribed = true;

        // Try to communicate with sever API
        fetch("https://jsramverk-editor-joku17.azurewebsites.net/list")
        .then(response => response.json())
        .then(data => isSubscribed ? setState(prevState => ({
            ...prevState, data: data
        })) : null)
        .catch(error => {
            if (isSubscribed) {
            setState(prevState => ({
                ...prevState,
                error
            }));
            }
        })

        // cancel subscription to useEffect
        return () => (isSubscribed = false)
    }, []);

    return state
} */
