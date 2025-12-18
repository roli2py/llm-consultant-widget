import type { UUID } from "crypto";

export default interface IMessage {
    id: UUID,
    role: string,
    text: string,
}