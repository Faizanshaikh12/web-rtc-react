import React, {useState} from 'react';
import {useWebRTC} from "../../hooks/useWebRTC";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function Room() {
    const {id: roomId} = useParams();
    const user = useSelector(({auth}) => auth.user);
    const {clients, provideRef} = useWebRTC(roomId, user);
    return (
        <div>
            <h1>Rooms</h1>
            {clients.map(client => {
                return (
                    <div key={client.id}>
                        <audio controls ref={(instance) => provideRef(instance, client.id)}/>
                        <div>{client.name}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Room;
