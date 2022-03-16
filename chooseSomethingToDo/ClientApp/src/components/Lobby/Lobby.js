import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import LobbyState0 from './LobbyState0';
import LobbyState2 from './LobbyState2';
import LobbyState3 from './LobbyState3';
import CircularProgress from '@mui/material/CircularProgress';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const Lobby = (props) => {
    const [connection, setConnection] = useState(null);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState('');

    
    const [listings, setListings] = useState([]);
    const [lobbyState, setLobbyState] = useState(0);
   
    let params = useParams();
     //0 = lobby fresh, no start yet
    //1 = lobby started, fetch data from api
    //2 = data ready from api
    const [chosen, setChosen] = useState('');

 

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5226/hubs/lobby')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, [])
    useEffect(() => {

        if (connection) {
            connection.start()
                .then(result => {

                    sendMessage();
                    console.log('Connected!');

                    connection.on('JoinedLobby', message => {
                        setUsers(message)
                        console.log(message)
                    });
                    connection.on('StartedLobby', message => {
                        if (message == "not ready") {
                            setLobbyState(1)
                        }
                    });
                    connection.on('ReadyLobby', message => {
                        
                        const shuffled = message.sort(() => Math.random() - 0.5)
                        setListings(shuffled);
                        setLobbyState(2);

                    });
                    connection.on('ChosenLocation', message => {
                        setChosen(message)
                        setLobbyState(3);
                        
                        

                    });
                    connection.on('UserCreated', message => {
                        setUser(message)

                    });
                    connection.on('ErrorConnection', message => {
                        alert("Error, lobby may have started or it does not exist. Click the back button or leave the website.")


                    });
                    connection.on('ErrorAPI', message => {
                        alert("Error, invalid address or Yelp is down. Try again later. If error persists, contact developer.")


                    });
                })
                        .catch(e => console.log('Connection failed: ', e));
                }
                    
    }, [connection]);


    
    const sendMessage = async () => {
        
        var joinLobbyMessage = {
            UrlString: params.lobbyUrl,
            
        };
        
        joinLobbyMessage.UserName = prompt("Please enter your name", "Harry");
        
        

        if (connection._connectionStarted) {
            try {
                await connection.send('JoinLobby', joinLobbyMessage);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const sendUserDoneMessage = async () => {
      
        const DoneMessage = {
            UrlString: params.lobbyUrl,
            UserId: user.id
        };
        
        setLobbyState(1)
        if (connection._connectionStarted) {
            try {
                await connection.send('UserDone', DoneMessage);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const sendYesListing = async (value) => {
        const yesMessage = {
            UrlString: params.lobbyUrl,
            UserId: user.id,
            YelpListingId: value
        };

        if (connection._connectionStarted) {
            try {
                await connection.send('yesListing', yesMessage);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
       
    }
    const startLobby = async (distance, openNow, categoriesString, price, address) => {
        const miles = distance * 1609.34
        if (miles > 40000) {
            miles = 40000
        }
        const startMessage = {
            UrlString: params.lobbyUrl,
            UserId: user.id,
            Address: address,
            Distance: miles | 0 ,
            Categories: categoriesString,
            Price: price,
            Open: openNow
        };

        if (connection._connectionStarted) {
            try {
                await connection.send('StartLobby', startMessage);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }



    if (users.length == 0)
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}

            >
                <CircularProgress color="inherit" />
            </Backdrop>)



    if (lobbyState == 0)
        return(<LobbyState0
            startLobby={startLobby}
            users={users}
            isLeader={user.isLeader}
           
        />)



    if (lobbyState == 1)
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}

            >
                <CircularProgress color="inherit" />
            </Backdrop>)



    if (lobbyState == 2) {
        return (
            <LobbyState2
                connection={connection}
                listings={listings}
                sendYesListing={sendYesListing}
                sendDoneMessage={sendUserDoneMessage}
        />)
    }



    if (lobbyState == 3) {
        return (
            <LobbyState3
                users={users}
                chosen={chosen}

            />)
    }



    return (
        <LobbyState0
            startLobby={startLobby}
            users={users}
            isLeader={user.isLeader}
            
        />
    )
};

export default Lobby;