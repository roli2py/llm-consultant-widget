import type { ReactElement, ReactNode } from "react";

import "normalize.css";
import "./styles/global.css";
import "./styles/widget.css";


export default function Layout({ children }: { children: ReactNode }): ReactElement {
    return (
        <html lang="en" className="ibm-plex-sans-font">
            <head>
                <base target="_blank" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
