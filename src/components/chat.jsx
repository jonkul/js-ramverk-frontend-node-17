import React from "react";
import io from 'socket.io-client';

const newMessage = document.getElementById("new-message");
const allMessages = document.getElementById("all-messages");

// const socket = io('https://socket-server.jsramverk.se');
const socket = io.connect('http://localhost');

function chatFunc(props) {
    return (<div>
        socket.on('connect', function() {
            socket.on('chat message', function (message) {
                let addedMessage = document.createElement("p");

                addedMessage.textContent = message;

                allMessages.appendChild(addedMessage);
            });

            newMessage.addEventListener("keyup", function (event) {
                if (event.code === "Enter") {
                    socket.emit('chat message', event.target.value);
                    event.target.value = "";
                }
            });

            socket.on('disconnect', function() {
                console.info("Disconnected");
            });
        })
        </div>
    );
}

export default function chat(props) {
    return (
        <div>
            <chatFunc
            />
        </div>
    );
}
