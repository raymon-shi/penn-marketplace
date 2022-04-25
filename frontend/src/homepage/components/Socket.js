import React from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');
const SocketContext = React.createContext(socket);

export { SocketContext, socket };
