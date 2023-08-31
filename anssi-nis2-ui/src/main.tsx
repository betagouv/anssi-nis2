import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import Accueil from './Accueil.tsx'
import {startReactDsfr} from "@codegouvfr/react-dsfr/spa";
import Simulateur from "./Simulateur.tsx"

startReactDsfr({defaultColorScheme: "system"});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Accueil/>,
    },
    {
        path: "/simulateur",
        element: <Simulateur/>,
    },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
