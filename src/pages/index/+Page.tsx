import type { ReactElement } from "react";
import { useData } from "vike-react/useData";
import Widget from "../../components/Widget";
import type IMessage from "../../components/interfaces/imessage";


export default function Page(): ReactElement {
    const data: {
        apiToken: string,
        apiPublicUrl: string,
        savedMessages: IMessage[],
    } = useData();
    const { apiToken, apiPublicUrl, savedMessages } = data;

    // TODO handle an ID assigning
    /*
    let chatId = localStorage.getItem("chatId");
    if (chatId === null) {
        localStorage.setItem("chatId", ulid());
        chatId = localStorage.getItem("chatId") as string;
    }
    */

    return <Widget backendToken={apiToken} backendPublicUrl={apiPublicUrl} chatId={"TEST"} savedMessages={savedMessages} />
}
