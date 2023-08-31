import {DefaultComponent} from "./Props.ts"
import React, {useState} from "react"
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons"

import MiseEnPage from "./Components/MiseEnPage.tsx"
import {SimulateurEtape} from "./Components/Simulateur/SimulateurEtape.tsx"
import {transformePaysUnionEuropeennePourSelect} from "./Services/simulateurFrontServices.ts"
import {paysUnionEuropeenneLocalisation} from "./Domaine/DomaineSimulateur.ts"
import {FormContainer} from "./Components/FormContainer.tsx"

const Simulateur: DefaultComponent = () => {
    const paysUnionEuropeenneOptions =
        transformePaysUnionEuropeennePourSelect(paysUnionEuropeenneLocalisation)

    const [etapeCourante, setEtapeCourante] = useState(0)

    const soumissionEtape = (limitConditions: (i: number) => boolean, valeur: number) => ((e: React.MouseEvent) => {
        e.preventDefault()
        if (limitConditions(valeur)) {
            setEtapeCourante(valeur)
        }
    })

    const etapeSuivante = soumissionEtape((etape) => (etape < 6), etapeCourante + 1)
    const etapePrecedente = soumissionEtape((etape) => (etape >= 0), etapeCourante - 1)

    return <MiseEnPage page={"simulateur"}>
        <FormContainer>
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
        </FormContainer>
    </MiseEnPage>
}

export default Simulateur