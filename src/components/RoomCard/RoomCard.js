import React from 'react';
import './RoomCard.css'

const RoomCard = ({room}) => {
    return (
        <div className='roomCard'>
            <h3 className='topic'>{room.topic}</h3>
            <div className='speaker'>
                <div className='avatars'>
                    {room.speakers.map(speaker =>(
                        <img src={speaker.avatar} alt='speaker-avatar'/>
                    ))}
                </div>
                <div className='names'>
                    {room.speakers.map(speaker =>(
                        <div className='nameWarp'>
                            <span>{speaker.name}</span>
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
