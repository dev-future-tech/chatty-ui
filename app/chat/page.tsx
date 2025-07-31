"use client";

import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { ChatContextProvider } from "./context";

export default function Chat() {

    return <>
        <ChatContextProvider>
            <ChatHistory></ChatHistory>
            <ChatInput></ChatInput>
        </ChatContextProvider>
    </>
}