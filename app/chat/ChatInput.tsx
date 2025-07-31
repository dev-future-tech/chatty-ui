import { useContext, useState, useEffect } from "react"
import { ChatContext, ChatContextType } from "./context"

import { socket } from "../api/io";
import { useSession } from "next-auth/react";

interface PrevMessage {
    prev_message: string;
};

export default function ChatInput() {
    const { data: session } = useSession();
    const {setSentMessage, setResponseMsg} = useContext(ChatContext) as ChatContextType
    const [isConnected, setIsConnected] = useState(false);
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
            })
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
        }
    }, []);

    function sendMessage(formData: FormData) {
        const toSendMsg = formData.get('message');

        const sendVal = {
            name: session?.user?.email,
            message: toSendMsg
        };

        setSentMessage(JSON.stringify(toSendMsg));
        socket.emit('chatEvent', sendVal, (response: PrevMessage) => {
            setResponseMsg(response.prev_message);
        });
    }

    return (
        <div>
            <p> Status: {isConnected ? "Connected" : "Disconnected"}</p>
            <p>Transport: { transport }</p>
            <form action={sendMessage}>
                <input type="text" name="message" />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Send
                </button>
            </form>
        </div>
    )
}