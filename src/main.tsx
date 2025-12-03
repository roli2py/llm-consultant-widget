import { createRoot } from "react-dom/client";
import App from "./App";
import Layout from "./Layout";

const root = createRoot(document.getElementById("root")!);

window.addEventListener("vite:preloadError", () => {
    // TODO create an error page
    root.render(<h1>Error</h1>);
});

root.render(
    <Layout>
        <App />
    </Layout>
);
