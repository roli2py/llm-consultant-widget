import Chat from "../../components/Chat";
import SendButton from "../../components/SendButton";
import settings from "../../components/settings.json";
import Textbox from "../../components/Textbox";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { useData } from "vike-react/useData";
import type IMessage from "../../components/interfaces/imessage";

import type { RefObject } from "react";

import "./Page.css";


export default function Page() {
    const data: {
        apiToken: string,
        apiPublicUrl: string,
        savedMessages: IMessage[]
    } = useData();
    const { apiToken, apiPublicUrl, savedMessages } = data;
    const chatId = "PLACEHOLDER";

    const [messages, setMessages] = useState(savedMessages);
    const [canWriting, setCanWriting] = useState(true);
    const [text, setText] = useState("");
    const [textboxHeight, setTextboxHeight] = useState("32px");

    const socketRef: RefObject<null | Socket> = useRef(null);
    const textboxRef = useRef(null);

    useEffect(() => {
        const socket = io(apiPublicUrl, {
            extraHeaders: {
                // TODO switch to JWT
                "Authorization": `Bearer ${apiToken}`
            }
        }
        );

        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Chat connected!");
        });

        socket.on("disconnect", () => {
            console.log("Chat disconnected!");
        });

        socket.on("error", error => {
            console.error(error);
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        if (socketRef !== null) {
            const socket = socketRef.current;
            if (socket instanceof Socket) {
                socket.on("message", text => {
                    console.log("Message received!");
                    setCanWriting(true);

                    const message = {
                        role: "operator",
                        text,
                    }

                    /* TODO solve a problem with a not changing array
                     * due to the depacking to simplify the rendering */
                    setMessages([...messages, message]);
                });
            }
        }
    }, [messages]);

    function sendMessage(text: string) {
        setCanWriting(false);

        const message = {
            role: "user",
            text,
        }

        /* TODO solve a problem with a not changing array
         * due to the depacking to simplify the rendering */
        setMessages([...messages, message]);

        if (socketRef !== null) {
            const socket = socketRef.current;
            if (socket instanceof Socket) {
                socket.send(chatId, text);
            }
        }
    };

    return (
        <div className="widget">
            <header>
                <hgroup className="operator-infos">
                    <h2 className="operator-name">
                        {settings.visual.name}
                    </h2>
                    <p className="operator-description">
                        {settings.visual.description}
                    </p>
                </hgroup>
                <img
                    src={settings.visual.avatarUrl}
                    alt="Avatar"
                    width={500}
                    height={500}
                    className="operator-avatar"
                />
            </header>
            <Chat messages={messages} />
            <footer>
                <Textbox
                    text={text}
                    setText={setText}
                    sendMessage={sendMessage}
                    canWriting={canWriting}
                    textboxRef={textboxRef}
                    textboxHeight={textboxHeight}
                    setTextboxHeight={setTextboxHeight}
                />
                <SendButton
                    text={text}
                    setText={setText}
                    sendMessage={sendMessage}
                    canWriting={canWriting}
                    setTextboxHeight={setTextboxHeight}
                />
            </footer>
        </div>
    );
}
