import type IMessage from "./interfaces/imessage";


export default async function receiveMessages(
    apiUrl: string,
    apiToken: string,
    chatId: string,
): Promise<IMessage[]> {
    const response = await fetch(`${apiUrl}/messages?chatId=${chatId}`, {
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
