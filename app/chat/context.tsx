import { createContext, ReactNode, useState } from 'react';

export interface ChatContextType {
    sentMessage: string;
    setSentMessage: (message: string) => void;
    responseMsg: string;
    setResponseMsg: (message: string) => void;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({ children }: {children: ReactNode}) => {
    const [sentMessage, setSentMessage] = useState<string>("");
    const [responseMsg, setResponseMsg] = useState<string>("");

    const contextValue: ChatContextType = {
        sentMessage,
        setSentMessage,
        responseMsg,
        setResponseMsg,
    };
    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    )
}