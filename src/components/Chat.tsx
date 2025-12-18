import Message from "./Message";

import { useEffect, useMemo, useRef } from "react";

import type IMessage from "./interfaces/imessage";

import type { RefObject } from "react";


export default function Chat(
    { messages }:
        {
            messages: IMessage[]
        }
) {
    const chatRef: RefObject<null | HTMLElement> = useRef(null);

    const messagesComponents = useMemo(() => messages.map(message => {
        return (
            // TODO replace `index` to an another identifier
            <Message key_={message.id} role={message.role} text={message.text} />
        );
    }), [messages]);

    useEffect(() => {
        if (chatRef !== null) {
            const chat = chatRef.current;
            if (chat instanceof HTMLElement) {
                chat.scrollTop = chat.scrollHeight;
            }
        }
    }, [messagesComponents]);

    return (
        <main ref={chatRef} className="chat">
            <ul className="messages">
                {messagesComponents}
            </ul>
        </main>
    );
}