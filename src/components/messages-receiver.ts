import type IMessage from "./interfaces/imessage";


export default class MessagesReceiver {
    private apiToken;

    constructor(apiToken: string) {
        this.apiToken = apiToken;
    }

    async receive(chatId: string): Promise<IMessage[]> {
        const response = await fetch(`http://api:5000/messages?chatId=${chatId}`, {
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