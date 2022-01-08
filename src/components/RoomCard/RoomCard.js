import React from 'react';

import './RoomCard.css'
import {useHistory} from "react-router-dom";

const RoomCard = ({room}) => {

    const history = useHistory()
    return (
        <div className='roomCard'
             onClick={() => {
                 history.push(`/room/${room.id}`)
             }}>
            <h3 className='topic'>{room.topic}</h3>
            <div className={`speakers ${room.speakers.length === 1 ? 'singleSpeaker' : ''}`}>
                <div className='avatars'>
                    {room.speakers?.map(speaker => (
                        <img key={speaker._id} src={speaker.avatar} alt='speaker-avatar'/>
                    ))}
                </div>
                <div className='names'>
                    {room.speakers?.map(speaker => (
                        <div className='nameWarp'>
                            <span key={speaker._id}>{speaker.name}</span>
                            <img src='/images/chat-bubble.png' alt='chat'/>
                        </div>
                    ))}
                </div>
            </div>
            <div className='count'>
                <span>{room.totalPeople}</span>
                <img src='/images/user-icon.png' alt='count'/>
            </div>
        </div>
    )
}

export default RoomCard;
