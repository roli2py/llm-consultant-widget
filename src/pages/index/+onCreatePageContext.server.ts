import cookie from "cookie";
import { v4 as uuidv4 } from "uuid";
import type { PageContextServer } from "vike/types";


export default function onCreatePageContext(pageContext: PageContextServer) {
    const rawHeaders = pageContext.headers;

    if (rawHeaders !== null) {
        const cookieName = "userId";

        const headers = new Headers(rawHeaders);
        const rawCookies = headers.get("Cookie");

        let userId: string | undefined;

        if (rawCookies !== null) {
            const cookies = cookie.parseCookie(rawCookies);

            if (Object.hasOwn(cookies, cookieName)) {
                userId = cookies[cookieName];
            }
        } else {
            userId = uuidv4();

            const setCookie = {
                name: cookieName,
                value: userId,
                priority: "high" as const,
                sameSite: true,
            }
            const rawSetCookie = cookie.stringifySetCookie(setCookie);

            pageContext.headersResponse.set("Set-Cookie", rawSetCookie);
        }

        pageContext.userId = userId;
    }
}