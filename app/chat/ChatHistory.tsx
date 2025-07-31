import { useContext, useEffect, useState } from "react";
import { ChatContext, ChatContextType } from "./context"

export default function ChatHistory() {

    const { responseMsg, sentMessage, setSentMessage } = useContext(ChatContext) as ChatContextType;
    const [messages, setMessages] = useState<string[]>([]);

    useEffect( () => {
        console.log(`sent message: ${sentMessage}, response message: ${responseMsg}`);
        if (sentMessage) {
            setMessages(prevMessages => [...prevMessages, sentMessage]);
            setSentMessage("")
        }

        if (responseMsg) {
            setMessages(prevMessages => [...prevMessages, responseMsg]);
        }
    }, [responseMsg, sentMessage, setSentMessage]);

    return <>
    <textarea value={messages.join('\n')} rows={30} style={{width: "30em"}}
      readOnly >

    </textarea>
    </>
}