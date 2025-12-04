import { use } from "react";
import MessagesReceiver from "./components/messages-receiver";
import Widget from "./components/Widget";

import type { ReactElement } from "react";
import { ulid } from "ulidx";
import settings from "./components/settings.json";


export default function App(): ReactElement {
    let apiPublicUrl = `http://${settings.api.domain}:${settings.api.port}`;
    if (settings.isHttps) {
        apiPublicUrl = `https://${settings.api.domain}:${settings.api.port}`;
    }

    let chatId = localStorage.getItem("chatId");
    if (chatId === null) {
        localStorage.setItem("chatId", ulid());
        chatId = localStorage.getItem("chatId") as string;
    }

    // TODO fix a using of the async function
    const savedMessages = use(new MessagesReceiver(apiPublicUrl, settings.api.token).receive(chatId));

    return <Widget backendToken={settings.api.token} backendPublicUrl={apiPublicUrl} chatId={chatId} savedMessages={savedMessages} />
}
