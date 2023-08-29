import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import Accueil from './Accueil.tsx'
import {startReactDsfr} from "@codegouvfr/react-dsfr/spa";
import Simulateur from "./Simulateur.tsx"
import {loadSimulateur} from "./Components/Simulateur/LoadSimulateur.tsx"

startReactDsfr({defaultColorScheme: "system"});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Accueil/>,
    },
    {
        path: "/simulateur",
        element: <Simulateur/>,
        loader: loadSimulateur,
        children: [{path: ":etape"}],
    },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
