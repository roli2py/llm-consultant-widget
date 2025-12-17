import { readFile } from "node:fs/promises";
import type { PageContext } from "vike/types";
import MessagesReceiver from "../../components/messages-receiver";

export default async function data(_: PageContext) {
    let isHttps, apiToken, apiDomain, apiPort

    if (process.env.LLM_CONSULTANT_DOCKER !== undefined) {
        isHttps = await readFile("/https", "utf-8");
        apiToken = await readFile("/run/secrets/api_token", "utf-8");
        apiDomain = await readFile("/api_domain", "utf-8");
        apiPort = await readFile("/api_port", "utf-8");
    } else {
        isHttps = process.env.LLM_CONSULTANT_HTTPS;
        apiToken = process.env.LLM_CONSULTANT_API_TOKEN;
        apiDomain = process.env.LLM_CONSULTANT_API_DOMAIN;
        apiPort = process.env.LLM_CONSULTANT_API_PORT;
    }

    isHttps = "0";
    apiToken = "TOKEN";
    apiDomain = "127.0.0.1";
    apiPort = "8080";

    if (apiToken === undefined || apiToken === "") {
        throw TypeError(`The API's token must be set by settings the
            \`LLM_CONSULTANT_API_TOKEN\` environment variable`)
    }
    if (apiDomain === undefined || apiDomain === "") {
        throw TypeError(`The API's domain must be set by settings the
            \`LLM_CONSULTANT_API_DOMAIN\` environment variable`)
    }
    if (apiPort === undefined || apiPort === "") {
        throw TypeError(`The API's port must be set by settings the
            \`LLM_CONSULTANT_API_PORT\` environment variable`)
    }

    let protocol = "http";
    if (isHttps !== "0") {
        protocol = "https";
    }

    const apiPublicUrl = `${protocol}://${apiDomain}:${apiPort}`;

    const savedMessages = await new MessagesReceiver(apiPublicUrl, apiToken).receive("TEST");

    return {
        apiToken,
        apiPublicUrl,
        savedMessages,
    }
}