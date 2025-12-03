import MessagesReceiver from "./components/messages-receiver";
import Widget from "./components/widget";

import type { ReactElement } from "react";
import { ulid } from "ulidx";
import settings from "./components/settings.json";


export default async function App(): Promise<ReactElement> {
    let apiPublicUrl = `http://${settings.api.domain}:${settings.api.port}`;
    if (settings.isHttps) {
        apiPublicUrl = `https://${settings.api.domain}:${settings.api.port}`;
    }

    let chatId = localStorage.getItem("chatId");
    if (chatId === null) {
        localStorage.setItem("chatId", ulid());
        chatId = localStorage.getItem("chatId") as string;
    }

    const savedMessages = await new MessagesReceiver(settings.api.token).receive(chatId);

    return <Widget backendToken={settings.api.token} backendPublicUrl={apiPublicUrl} chatId={chatId} savedMessages={savedMessages} />
}
