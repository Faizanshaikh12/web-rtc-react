import React, {useEffect, useState} from 'react';
import {useWebRTC} from "../../hooks/useWebRTC";
import {useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import './Room.css';
import {getRoom} from "../../http";

function Room() {
    const {id: roomId} = useParams();
    const user = useSelector(({auth}) => auth.user);
    const {clients, provideRef} = useWebRTC(roomId, user);
    const history = useHistory();
    const [room, setRoom] = useState(null);

    const handleManualLeave = () => {
        history.push('/rooms')
    }

    useEffect(() => {
        const fetchRoom = async () => {
            const {data} = await getRoom(roomId);
            setRoom((prev) => data);
        }
        fetchRoom();
    }, [roomId])

    return (<div>
        <div className='container'>
            <button onClick={handleManualLeave} className="goBack">
                <img src="/images/arrow-left.png" alt="Back"/>
                <p>All voice rooms</p>
            </button>
        </div>
        <div className='clientsWrap'>
            <div className='header'>
                <h2 className='topic'>{room?.topic}</h2>
                <div className='actions'>
                    <button className='actionsBtn'>
                        <img src="/images/palm.png" alt=""/>
                    </button>
                    <button className='actionsBtn' onClick={handleManualLeave}>
                        <img src="/images/win.png" alt=""/>
                        <span>Leave quietly</span>
                    </button>
                </div>
            </div>
            <div className='clientsList'>
                {clients.map(client => {
                    return (
                        <div key={client.id} className='client'>
                            <div className='userHead'>
                                <audio ref={(instance) => provideRef(instance, client.id)}/>
                                <img className='userAvatar' src={client.avatar} alt='avatar'/>
                                <button className='micBtn'>
                                    <img src="/images/mic.png" alt="Mic"/>
                                    {/*<img src="/images/mic-mute.png" alt="Mic"/>*/}
                                </button>
                            </div>
                            <h4>{client.name}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>)
}

export default Room;
