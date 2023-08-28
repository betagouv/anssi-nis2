import {LoaderFunction, LoaderFunctionArgs} from "react-router-dom"
import SimulateurEtape1Localisation from "../Components/Simulateur/SimulateurEtape1Localisation.tsx"

export const loadSimulateur: LoaderFunction = ({params}: LoaderFunctionArgs) => {
    const etape = params?.etape || "1"
    switch (etape) {
        case "1":
            return <SimulateurEtape1Localisation/>
        case "2":
            return <p>Step 2</p>
        default:
            return <p>Nein ! Nein ! Nein !</p>
    }
}