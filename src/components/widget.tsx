"use client";
import Chat from "./chat";
import SendButton from "./send-button";
import settings from "./settings.json";
import Textbox from "./textbox";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import type IMessage from "./interfaces/imessage";

import type { ReactElement, RefObject } from "react";


export default function Widget(
    { backendToken, backendPublicUrl, chatId, savedMessages }:
        {
            backendToken: string,
            backendPublicUrl: string,
            chatId: string,
            savedMessages: IMessage[]
        }
): ReactElement {
    const socketRef: RefObject<null | Socket> = useRef(null);

    const [messages, setMessages] = useState(savedMessages);

    const [canWriting, setCanWriting] = useState(true);

    const textboxRef = useRef(null);

    useEffect(() => {
        const socket = io(backendPublicUrl, {
            extraHeaders: {
                "Authorization": `Bearer ${backendToken}`
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
            const socket = socketRef.current
            if (socket instanceof Socket) {
                socket.on("message", text => {
                    console.log("Message received!");
                    setCanWriting(true);

                    const message = {
                        role: "operator",
                        text
                    }

                    setMessages([...messages, message]);
                });
            }
        }
    }, [messages]);

    function sendMessage(text: string) {
        setCanWriting(false);

        const message = {
            role: "user",
            text
        }

        setMessages([...messages, message]);

        if (socketRef !== null) {
            const socket = socketRef.current
            if (socket instanceof Socket) {
                // Exception: InvalidStateError
                socket.send(chatId, text);
            }
        }
    };

    const [text, setText] = useState("");
    const [textboxHeight, setTextboxHeight] = useState("32px");

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
