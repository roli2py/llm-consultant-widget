import type { Key } from "react";
import Showdown from "showdown";
import escapeHtmlExceptCode from "./html-escape";

import "./Message.css";


export default function Message(
    { key_, role, text }:
        {
            key_: Key,
            role: string,
            text: string,
        }
) {
    const converter = new Showdown.Converter();

    const textWithEscapedHtml = escapeHtmlExceptCode(text);
    const htmlFromText = converter.makeHtml(textWithEscapedHtml);

    return (
        <li key={key_} className={`message ${role}`}>
            <div className="message-background">
                <div className="message-text" dangerouslySetInnerHTML={{ __html: htmlFromText }} />
            </div>
        </li>
    );
}