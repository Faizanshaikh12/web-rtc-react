import {io} from 'socket.io-client';

export const socketInit = () => {
    const options = {
        'force new Connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transport: ['websocket']
    };

    return io(process.env.REACT_APP_API_URL, options);
}
