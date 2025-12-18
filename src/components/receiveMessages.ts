import type IMessage from "./interfaces/imessage";


export default async function receiveMessages(
    apiPublicUrl: string,
    apiToken: string,
    chatId: string,
): Promise<IMessage[]> {
    // TODO switch to the inner URL and condition to docker URL
    const response = await fetch(`${apiPublicUrl}/messages?chatId=${chatId}`, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json; charset=utf-8"
        }
    });
    const responseJson: { answer: IMessage[] } = await response.json();

    // Status: not 200 - 299
    if (!response.ok) {
        console.log(responseJson);
    }

    const messages = responseJson.answer;
    return messages;
}
