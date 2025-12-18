import type { Key } from "react";
import Showdown from "showdown";
import escapeHtmlExceptCode from "./html-escape";


export default function Message(
    { key_, role, text }:
        {
            key_: Key,
            role: string,
            text: string,
        }
) {
    const converter = new Showdown.Converter();

    return (
        <li key={key_} className={`message ${role}`}>
            <div className="message-background">
                <p className="message-text" dangerouslySetInnerHTML={{ __html: converter.makeHtml(escapeHtmlExceptCode(text)) }} />
            </div>
        </li>
    );
}