import {DefaultComponent, InformationsEtape} from "./Props.ts"
import React, {useState} from "react"

import MiseEnPage from "./Components/MiseEnPage.tsx"
import {SimulateurEtape} from "./Components/Simulateur/SimulateurEtape.tsx"
import {FormContainer} from "./Components/FormContainer.tsx"
import {SimulateurEtape1, SimulateurEtape2} from "./Components/Simulateur"

const Simulateur: DefaultComponent = () => {
    const [etapeCourante, setEtapeCourante] = useState(0)

    const soumissionEtape = (limitConditions: (i: number) => boolean, valeur: number) => ((e: React.MouseEvent) => {
        e.preventDefault()
        if (limitConditions(valeur)) {
            setEtapeCourante(valeur)
        }
    })

    const etapeSuivante = soumissionEtape((etape) => (etape < 6), etapeCourante + 1)
    const etapePrecedente = soumissionEtape((etape) => (etape >= 0), etapeCourante - 1)

    const etapesQuestionnaire: InformationsEtape[] = [
        {
            titre: "Localisation de l’activité",
            indicationReponses: "Sélectionnez une réponse",
            contenu: <SimulateurEtape1 />
        },
        {
            titre: "Type de structure",
            indicationReponses: "Sélectionnez une réponse",
            contenu: <SimulateurEtape2 />
        },
    ]

    return <MiseEnPage page={"simulateur"}>
        <FormContainer>
            <SimulateurEtape
                etapeCourante={etapeCourante + 1}
                nombreEtapes={6}
                etape={etapesQuestionnaire[etapeCourante]}
                suivante={etapesQuestionnaire[etapeCourante + 1] || ""}
                etapePrecedente={etapePrecedente}
                etapeSuivante={etapeSuivante}
            />
        </FormContainer>
    </MiseEnPage>
}

export default Simulateur