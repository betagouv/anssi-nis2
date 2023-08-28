import {DefaultComponent} from "./Props.ts"
import MiseEnPage from "./Components/MiseEnPage.tsx"
import {useLoaderData} from "react-router-dom"
import {ReactNode} from "react"

const ComposantSimulateur:DefaultComponent = ({children}) => children

const Simulateur: DefaultComponent = () => {
    const etape : ReactNode = useLoaderData() as ReactNode

    return <MiseEnPage page={"simulateur"}>
        <div className="fr-container fr-container--fluid fr-mb-md-14v">
            <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
                <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
                    <div className="fr-container fr-background-alt--blue-france fr-px-md-0 fr-py-10v fr-py-md-14v">
                        <ComposantSimulateur>{etape}</ComposantSimulateur>
                    </div>
                </div>
            </div>
        </div>
    </MiseEnPage>
}

export default Simulateur