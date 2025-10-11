import MessagesReceiver from "@/components/messages-receiver";
import Widget from "@/components/widget";

import { cookies } from "next/headers";

import settings from "@/components/settings.json";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { ReactElement } from "react";


export default async function Page(): Promise<ReactElement> {
    // Due to how the Next.js framework works, we're taking the settings from the settings file instead of the environment variables
    let apiPublicUrl = `http://${settings.api.domain}:${settings.api.port}`;
    if (settings.isHttps) {
        apiPublicUrl = `https://${settings.api.domain}:${settings.api.port}`;
    }

    const cookieStore = await cookies();
    const chatId = (cookieStore.get("chatId") as ResponseCookie).value;

    const savedMessages = await new MessagesReceiver(settings.api.token).receive(chatId);

    return <Widget backendToken={settings.api.token} backendPublicUrl={apiPublicUrl} chatId={chatId} savedMessages={savedMessages} />
}
