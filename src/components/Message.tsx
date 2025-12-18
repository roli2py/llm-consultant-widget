import Showdown from "showdown";
import escapeHtmlExceptCode from "./html-escape";


export default function Message(
    { key, role, text }:
        {
            key: number,
            role: string,
            text: string,
        }
) {
    const converter = new Showdown.Converter();

    return (
        <li key={key} className={`message ${role}`}>
            <div className="message-background">
                <p className="message-text" dangerouslySetInnerHTML={{ __html: converter.makeHtml(escapeHtmlExceptCode(text)) }} />
            </div>
        </li>
    );
}