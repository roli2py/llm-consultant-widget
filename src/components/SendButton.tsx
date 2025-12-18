import settings from "./settings.json";

import type { Dispatch, MouseEvent, SetStateAction } from "react";


export default function SendButton(
    { text, setText, sendMessage, canWriting, setTextboxHeight }:
        {
            text: string,
            setText: Dispatch<SetStateAction<string>>,
            sendMessage: (text: string) => void,
            canWriting: boolean,
            setTextboxHeight: Dispatch<SetStateAction<string>>
        }
) {
    function handleSendKey(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        /* Using `String.prototype.trim()` in the condition to check
         * that a text is not empty. That is, `String.prototype.trim()`
         * outputs "" if there is no text and, consequently, produce
         * `false`*/
        if (canWriting && text.trim()) {
            sendMessage(text);
            setText("");
            setTextboxHeight("32px");
        }
    }

    return (
        <button
            type="button"
            className="send-button"
            onClick={handleSendKey}
            disabled={!canWriting}
        >
            <img
                src={settings.visual.sendIconUrl}
                alt="Send"
                width={300}
                height={300}
            />
            <div className="visually-hidden">
                Send
            </div>
        </button>
    );
}
