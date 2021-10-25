//GET DATABASE DOCS
const fetchData = () => {
    return fetch("https://jsramverk-editor-joku17.azurewebsites.net/list")
        .then(response => response.json());
};


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
