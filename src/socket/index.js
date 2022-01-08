import {io} from 'socket.io-client';

export const socketInit = () => {
    const options = {
        'force new Connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transport: ['websocket']
    };

    return io('http://localhost:8000', options);
}
