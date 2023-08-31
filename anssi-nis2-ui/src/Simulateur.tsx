import {DefaultComponent} from "./Props.ts"
import MiseEnPage from "./Components/MiseEnPage.tsx"

import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons"
import {SimulateurEtape} from "./Components/Simulateur/SimulateurEtape.tsx"
import {transformePaysUnionEuropeennePourSelect} from "./Services/simulateurFrontServices.ts"
import {paysUnionEuropeenneLocalisation} from "./Domaine/DomaineSimulateur.ts"
import {useState} from "react"

const Simulateur: DefaultComponent = () => {
    const paysUnionEuropeenneOptions =
        transformePaysUnionEuropeennePourSelect(paysUnionEuropeenneLocalisation)

    const [etapeCourante, setEtapeCourante] = useState(0)

    const etapeSuivante = (e: any) => {
        e.preventDefault()
        if (etapeCourante <= 6) {
            setEtapeCourante(etapeCourante + 1)
        }
    }
    const etapePrecedente = (e: any) => {
        e.preventDefault()
        if (etapeCourante >= 1) {
            setEtapeCourante(etapeCourante - 1)
        }
    }

    return <MiseEnPage page={"simulateur"}>
        <div className="fr-container fr-container--fluid fr-mb-md-14v">
            <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
                <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
                    <div className="fr-container fr-background-alt--blue-france fr-px-md-0 fr-py-10v fr-py-md-14v">
                        <SimulateurEtape
                            etapeCourante={etapeCourante + 1}
                            nombreEtapes={6}
                            etape={{titre: "Localisation de l’activité"}}
                            suivante={{titre: "Type de structure"}}
                            indicationReponses="Sélectionnez une réponse"
                            etapePrecedente={etapePrecedente}
                            etapeSuivante={etapeSuivante}
                        >
                            <div className="fr-fieldset__element">
                                <RadioButtons
                                    legend={"Dans quel état membre de l’Union Européenne êtes-vous implanté"
                                        + " et/ou exercez-vous votre activité principale ?"}
                                    hintText={"Là où sont principalement prises les décisions cyber," +
                                        " ou à défaut là où les opérations cyber son effectuées." +
                                        " Si indéterminé : là où se trouve le plus grand nombre de salariés."}
                                    options={paysUnionEuropeenneOptions}
                                    className="fr-checkbox-group--sm"
                                />
                            </div>
                        </SimulateurEtape>
                    </div>
                </div>
            </div>
        </div>
    </MiseEnPage>
}

export default Simulateur