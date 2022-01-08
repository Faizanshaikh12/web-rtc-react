import {useCallback, useEffect, useRef, useState} from "react";
import {useStateWithCallbacks} from "./useStateWithCallbacks";
import {socketInit} from "../socket";
import {ACTIONS} from "../actions";

const users = [{
    id: 1, name: 'Rakesh K'
}, {
    id: 2, name: 'Faizan S'
}]

export const useWebRTC = (roomId, user) => {
    const [clients, setClients] = useStateWithCallbacks(users);
    const audioElements = useRef({});
    const connections = useRef({});
    const localMediaStream = useRef(null);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = socketInit();
    }, [])

    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance
    }

    const addNewClients = useCallback((newClient, cb) => {
        const lookingFor = clients.find((client) => client.id === newClient.id);
        if (lookingFor === undefined) {
            setClients((existingClients) => [...existingClients, newClient], cb);
        }
    }, [clients, setClients],);


    //Capture Media
    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true
            })
        }
        startCapture().then(() => {
            addNewClients(user, () => {
                const localElement = audioElements.current[user.id];
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }

                //Socket io emit
                socket.current.emit(ACTIONS.JOIN, {roomId, user});
            })
        })
    }, []);

    return {clients, provideRef};
}
