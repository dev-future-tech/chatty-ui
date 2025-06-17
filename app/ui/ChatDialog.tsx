"use client";

import { useEffect, useState } from "react";
import { socket } from "../api/io";

export default function ChatDialog() {
    const [isConnected,setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");

    useEffect( () => {
        if(socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }
    function sendMessage(formData: FormData) {
        const message = formData.get('message')
        console.log(`Got message ${message}`);

        socket.emit('demoEvent', 'Welcome to message: ' + message, (response: string) => {
            console.log(`Got response ${JSON.stringify(response)}`);
        });
    }

    return (
        <div>
            <p>Status: { isConnected ? "connected" : "disconnected" }</p>
            <p>Transport: { transport }</p>
            <form action={sendMessage}>
                <input type="text" name="message" />
                <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Count {count}
                </button>
            </form>
            

        </div>
    )
}