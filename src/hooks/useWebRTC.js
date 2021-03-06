import {useCallback, useEffect, useRef, useState} from "react";
import {useStateWithCallbacks} from "./useStateWithCallbacks";
import {socketInit} from "../socket";
import {ACTIONS} from "../actions";
import freeice from "freeice";

const users = [
    {
        id: 1,
        name: 'Rakesh K',
        avatar: 'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=1024'
    }, {
        id: 2,
        name: 'Faizan S',
        avatar: 'https://yt3.ggpht.com/ytc/AKedOLQf5MBcFSDzo2FeZIXSqafCvdRMGjW2C-0j8RpD=s900-c-k-c0x00ffffff-no-rj'
    }
]

export const useWebRTC = (roomId, user) => {
    const [clients, setClients] = useStateWithCallbacks(users);
    const audioElements = useRef({});
    const connections = useRef({});
    const localMediaStream = useRef(null);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = socketInit();
    }, [])

    const addNewClient = useCallback((newClient, cb) => {
        const lookingFor = clients.find((client) => client.id === newClient.id);
        if (lookingFor === undefined) {
            setClients((existingClients) => [...existingClients, newClient], cb);
        }
    }, [clients, setClients],);

    //Capture Media


    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current =
                await navigator.mediaDevices.getUserMedia({
                    audio: true
                })
        }
        startCapture().then(() => {
            addNewClient(user, () => {
                const localElement = audioElements.current[user.id];
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }

                //Socket io emit
                socket.current.emit(ACTIONS.JOIN, {roomId, user});
            });
        });

        return () => {
            // Leaving the room stop my track
            localMediaStream.current.getTracks()
                .forEach(track => track.stop());

            socket.current.emit(ACTIONS.LEAVE, {roomId});
        };
    }, []);

    useEffect(() => {
        const handleNewPeer = async ({peerId, createOffer, user: remoteUser}) => {
            // if  already connected then give warning
            if (peerId in connections.current) {
                return console.warn(`you already connected to ${peerId} ${user.name}`);
            }
            connections.current[peerId] = new RTCPeerConnection({
                iceServers: freeice()
            });

            // Handle new ice candidate
            connections.current[peerId].onicecandidate = (event) => {
                socket.current.emit(ACTIONS.RELAY_ICE, {
                    peerId,
                    icecandidate: event.candidate
                })
            }

            //Handle on track on this connection
            connections.current[peerId].ontrack = ({streams: [remoteStream]}) => {
                addNewClient(remoteUser, () => {
                    if (audioElements.current[remoteUser.id]) {
                        audioElements.current[remoteUser.id].srcObject = remoteStream;
                    } else {
                        let settled = false;
                        const interval = setInterval(() => {
                            if (audioElements.current[remoteUser.id]) {
                                audioElements.current[remoteUser.id].srcObject = remoteStream;
                                settled = true;
                            }
                            if (settled) {
                                clearInterval(interval);
                            }
                        }, 1000)
                    }
                });
            }
            //Add local tracks to remote connections
            localMediaStream.current.getTracks().forEach(track => {
                connections.current[peerId].addTrack(
                    track,
                    localMediaStream.current
                );
            });

            //create offer
            if (createOffer) {
                const offer = await connections.current[peerId].createOffer();

                await connections.current[peerId].setLocalDescription(offer);

                //send offer to another client
                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: offer
                })
            }
        };
        socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

        return () => {
            socket.current.off(ACTIONS.ADD_PEER);
        }
    }, []);

    // Handle server to client ICE CANDIDATE
    useEffect(() => {
        socket.current.on(ACTIONS.ICE_CANDIDATE, ({peerId, icecandidate}) => {
            if (icecandidate) {
                connections.current[peerId].addIceCandidate(icecandidate);
            }
        });

        return () => {
            socket.current.off(ACTIONS.ICE_CANDIDATE);
        }
    }, []);
    //Handle server to client SDP

    useEffect(() => {
        const handleRemoteSdp = async ({peerId, sessionDescription: remoteSessionDescription}) => {
            await connections.current[peerId].setRemoteDescription(
                new RTCSessionDescription(remoteSessionDescription))

            // if session description is type of offer then create  an answer
            if (remoteSessionDescription.type === 'offer') {
                const connection = connections.current[peerId];
                const answer = await connection.createAnswer();

                await connection.setLocalDescription(answer);

                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: answer
                })
            }
        }
        socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp);

        return () => {
            socket.current.off(ACTIONS.SESSION_DESCRIPTION);
        }
    }, []);
    // Handle remove peer

    useEffect(() => {
        const handleRemovePeer = ({peerId, userId}) => {
            if (connections.current[peerId]) {
                connections.current[peerId].close();
            }
            delete connections.current[peerId];
            delete audioElements.current[peerId];
            setClients(list => list.filter(client => client.id !== userId));
        }
        socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

        return () => {
            socket.current.off(ACTIONS.REMOVE_PEER);
        }
    }, [])

    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance
    }

    return {clients, provideRef};
}
