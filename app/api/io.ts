"use client";

import { io } from "socket.io-client";

export const SOCKET_URL = 'http://localhost:8081/';

export const socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        withCredentials: false,
    }
);
