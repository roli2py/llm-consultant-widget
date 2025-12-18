import Message from "./Message";

import { useEffect, useRef } from "react";

import type IMessage from "./interfaces/imessage";

import type { RefObject } from "react";


export default function Chat(
    { messages }:
        {
            messages: IMessage[]
        }
) {
    const chatRef: RefObject<null | HTMLElement> = useRef(null);

    // TODO add `useMemo()`?
    const messagesComponents = messages.map((message, index) => {
        return (
            // TODO replace `index` to an another identifier
            <Message key={index} role={message.role} text={message.text} />
        );
    });

    // TODO can I find a better solution?
    useEffect(() => {
        if (chatRef !== null) {
            const chat = chatRef.current
            if (chat instanceof HTMLElement) {
                const timer = setTimeout(() => {
                    chat.scrollTop = chat.scrollHeight;
                }, 300);

                return () => {
                    clearTimeout(timer)
                };
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