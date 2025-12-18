import { useEffect } from "react";

import type {
    ChangeEvent,
    Dispatch,
    KeyboardEvent,
    ReactElement,
    RefObject,
    SetStateAction,
} from "react";


export default function Textbox(
    { text, setText, sendMessage, canWriting, textboxRef, textboxHeight, setTextboxHeight }:
        {
            text: string,
            setText: Dispatch<SetStateAction<string>>,
            sendMessage: (text: string) => void,
            canWriting: boolean,
            textboxRef: RefObject<null | HTMLTextAreaElement>,
            textboxHeight: string,
            setTextboxHeight: Dispatch<SetStateAction<string>>,
        }
): ReactElement {
    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const element = event.target;

        setText(element.value);

        element.style.height = "32px";

        const textboxHeight = element.scrollHeight.toString() + "px";

        element.style.height = textboxHeight;
        setTextboxHeight(textboxHeight);
    }

    function handleSendKey(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter") {
            event.preventDefault();

            if (canWriting && text.trim()) {
                sendMessage(text);
                setText("");
                setTextboxHeight("32px");
            }
        }
    }

    // Focus on textbox after receiving a message
    useEffect(() => {
        if (textboxRef !== null && canWriting === true) {
            const textbox = textboxRef.current;
            if (textbox instanceof HTMLTextAreaElement) {
                textbox.focus();
            }
        }
    }, [textboxRef, canWriting]);

    return (
        <div className="scrollbar-rounder">
            <textarea
                placeholder="Write a message"
                value={text}
                onChange={handleChange}
                onKeyDown={handleSendKey}
                ref={textboxRef}
                disabled={!canWriting}
                style={{ height: textboxHeight }}
            />
        </div>
    );
}
