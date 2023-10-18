import ReactDOM from "react-dom/client";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { App } from "./app.tsx";

startReactDsfr({ defaultColorScheme: "light" });

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
