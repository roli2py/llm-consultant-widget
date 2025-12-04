import type IMessage from "./interfaces/imessage";


export default class MessagesReceiver {
    private apiPublicUrl;
    private apiToken;

    constructor(apiPublicUrl: string, apiToken: string) {
        this.apiPublicUrl = apiPublicUrl;
        this.apiToken = apiToken;
    }

    async receive(chatId: string): Promise<IMessage[]> {
        const response = await fetch(`${this.apiPublicUrl}/messages?chatId=${chatId}`, {
            headers: {
                "Authorization": `Bearer ${this.apiToken}`,
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
}