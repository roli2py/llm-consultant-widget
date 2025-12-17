import type { ReactElement, ReactNode } from "react";
import { StrictMode } from "react";

import "@fontsource-variable/ibm-plex-sans";
import "normalize.css";
import "./Layout.css";


export default function Layout({ children }: { children: ReactNode }): ReactElement {
    return (
        <StrictMode>
            <div className="ibm-plex-sans-font">
                {children}
            </div>
        </StrictMode >
    );
}
