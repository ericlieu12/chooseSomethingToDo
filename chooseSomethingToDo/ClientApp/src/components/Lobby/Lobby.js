import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useParams } from "react-router-dom";
const Lobby = (props) => {
    const [connection, setConnection] = useState(null);
    const [users, setUsers] = useState('');
    const [user, setUser] = useState('');

    const [message, setMessage] = useState('');
    let params = useParams();
    const getOrCreateUser = async () => {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [key, value] = el.split('=');
            cookie[key.trim()] = value;
        })

        if (cookie['userID']) {
            try {
                const response = await fetch("https://localhost:7226/api/users/" + cookie['userID'], {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'

                    }),


                });
                const data = await response.json();
                console.log(data);
                setUser(data)
            }
            catch (ex)
            {
                //error
            }
            
            
        }
        else {
            try {
                let user1 = prompt("Please enter your name", "Harry Potter");;
                const response = await fetch("https://localhost:7226/api/users/createuser", {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'

                    }),
                    body: JSON.stringify(user1)
                });
                const data = await response.json();
                console.log(data);
                setUser(data)
            }
            catch (ex) {
                //error
            }
        }
       
        
       
    };
    useEffect(() => {
       
        getOrCreateUser()
        
    }, []);
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5226/hubs/lobby')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, [user])
    useEffect(() => {

        if (connection) {
            connection.start()
                .then(result => {
                    
                    sendMessage();
                    console.log('Connected!');

                    connection.on('ReceiveMessage', message => {
                       console.log(message)
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async () => {
        console.log(user)
        const chatMessage = {
            UrlString: params.lobbyUrl,
            UserId: user.id,
        };

        if (connection._connectionStarted) {
            try {
                await connection.send('JoinLobby', chatMessage);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }
    return (
     
        <div>
            <button onClick={() => sendMessage()}> AA </button>
            Hello
            </div>
    )
};

export default Lobby;