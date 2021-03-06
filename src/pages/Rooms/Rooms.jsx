import React, {useEffect, useState} from 'react'
import './Rooms.css'
import RoomCard from "../../components/RoomCard/RoomCard";
import AddRoomModal from "../../components/AddRoom/AddRoomModal";
import {getAllRooms} from "../../http"
// const rooms = [
//     {
//         id: 1,
//         topic: 'Which framework best work for frontend',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Deo',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'John Deo',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 2,
//         topic: 'Which framework best work for frontend',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Deo',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'John Deo',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 20,
//     },
//     {
//         id: 3,
//         topic: 'Which framework best work for frontend',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Deo',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'John Deo',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 20,
//     },
//     {
//         id: 4,
//         topic: 'Which framework best work for frontend',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Deo',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'John Deo',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 20,
//     },
// ]

export const Rooms = () => {

    const [showModal, setShowModal] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const {data} = await getAllRooms();
            setRooms(data);
        };
        fetchRooms();
    }, [])

    function openModal() {
        setShowModal(true);
    }
    return (
        <div className='container'>
            <div className='roomHeader'>
                <div className='roomLeft'>
                    <span className='roomHeading'>All voice rooms</span>
                    <div className='searchBox'>
                        <img src='/images/search.png' alt='Search'/>
                        <input type='text' className='searchInput'/>
                    </div>
                </div>
                <div className='roomRight'>
                    <button onClick={openModal} className='roomButton'>
                        <img src='/images/add-room-icon.png' alt='room'/>
                        <span>Start a room</span>
                    </button>
                </div>
            </div>
            <div className='roomList'>
                {rooms?.map(room => (
                    <RoomCard room={room} key={room.id}/>
                ))}
            </div>
            {showModal && <AddRoomModal closeModal={() => setShowModal(false)}/>}
        </div>
    )
}
