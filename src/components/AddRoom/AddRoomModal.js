import React, {useState} from 'react';
import './AddRoomModal.css'
import {TextInput} from "../shared/TextInput/TextInput";
import {roomCreate} from '../../http'
import {useHistory} from "react-router-dom";

const AddRoomModal = ({closeModal}) => {
    const history = useHistory()
    const [roomType, setRoomType] = useState('open')
    const [topic, setTopic] = useState('')

    async function createRoom() {
        try {
            if (!topic) return;
            const {data} = await roomCreate({topic, roomType});
            history.push(`/room/${data.id}`);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='modal'>
            <div className='modalBody'>
                <button className='closeBtn' onClick={closeModal}>
                    <img src='/images/close.png' alt='Close'/>
                </button>
                <div className='modalHeader'>
                    <h3 className='modalHeading'>Enter the topic to be discussed</h3>
                    <TextInput fullwidth='true' value={topic} onChange={(e) => setTopic(e.target.value)}/>
                    <h2 className='typesHeading'>Room types</h2>
                    <div className='roomTypes'>
                        <div className={`typeBox ${roomType === 'open' ? 'active' : ""}`}
                             onClick={() => setRoomType('open')}>
                            <img src='/images/globe.png' alt='global'/>
                            <span>Open</span>
                        </div>
                        <div className={`typeBox ${roomType === 'social' ? 'active' : ""}`}
                             onClick={() => setRoomType('social')}>
                            <img src='/images/social.png' alt='social'/>
                            <span>Social</span>
                        </div>
                        <div className={`typeBox ${roomType === 'private' ? 'active' : ""}`}
                             onClick={() => setRoomType('private')}>
                            <img src='/images/lock.png' alt='lock'/>
                            <span>Private</span>
                        </div>
                    </div>
                </div>
                <div className='modalFooter'>
                    <h2>Start a room, open to everyone</h2>
                    <button className='footerBtn' onClick={createRoom}>
                        <img src='/images/celebration.png' alt='celebration'/>
                        Let's go
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddRoomModal;
