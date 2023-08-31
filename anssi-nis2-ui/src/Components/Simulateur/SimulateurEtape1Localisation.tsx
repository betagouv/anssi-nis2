import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons"
import {DefaultComponent} from "../../Props.ts"
import {SimulateurEtape} from "./SimulateurEtape.tsx"
import {transformePaysUnionEuropeennePourSelect} from "../../Services/simulateurFrontServices.ts"
import {paysUnionEuropeenneLocalisation} from "../../Domaine/DomaineSimulateur.ts"

const SimulateurEtape1Localisation: DefaultComponent = () => {
    const paysUnionEuropeenneOptions =
        transformePaysUnionEuropeennePourSelect(paysUnionEuropeenneLocalisation)

    return <SimulateurEtape
        numero={1}
        total={6}
        etape={{titre: "Localisation de l’activité"}}
        suivante={{titre: "Type de structure"}}
        indicationReponses="Sélectionnez une réponse"
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
}

export default SimulateurEtape1Localisation