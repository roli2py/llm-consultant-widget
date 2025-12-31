import { readFile } from "node:fs/promises";
import { render } from "vike/abort";
import type { PageContextServer } from "vike/types";
import receiveMessages from "../../components/receiveMessages";
import settings from "../../components/settings.json";


export default async function data(pageContext: PageContextServer) {
    /* `apiServerUrl` -- URL that are used on the server side. When the
     * widget is started without Docker, then the widget is always
     * making the request from the client-side, so we can't use the
     * docker URL and, therefore, we're using the client URL */
    if (pageContext.userId === undefined) {
        throw render(500);
    }

    let isHttps, apiToken, protocol, apiDomain, apiPort, apiServerUrl;

    const isInDocker = process.env.LLM_CONSULTANT_DOCKER;

    if (isInDocker !== undefined) {
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
            \`LLM_CONSULTANT_API_TOKEN\` environment variable`);
    }

    if (apiDomain === undefined || apiDomain === "") {
        throw TypeError(`The API's domain must be set by settings the
            \`LLM_CONSULTANT_API_DOMAIN\` environment variable`);
    }

    if (apiPort === undefined || apiPort === "") {
        throw TypeError(`The API's port must be set by settings the
            \`LLM_CONSULTANT_API_PORT\` environment variable`);
    }

    protocol = "http";

    if (isHttps !== "0") {
        protocol = "https";
    }

    const apiClientUrl = `${protocol}://${apiDomain}:${apiPort}`;
    apiServerUrl = apiClientUrl;

    if (isInDocker !== undefined) {
        apiServerUrl = `http://${settings.docker.api.serviceName}:${settings.docker.api.port}`;
    }

    const savedMessages = await receiveMessages(apiServerUrl, apiToken, pageContext.userId);

    return {
        apiToken,
        apiClientUrl,
        savedMessages,
    }
}