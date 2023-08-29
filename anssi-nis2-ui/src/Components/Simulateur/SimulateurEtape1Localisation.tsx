import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons"
import {DefaultComponent} from "../../Props.ts"
import {SimulateurEtape} from "./SimulateurEtape.tsx"

const SimulateurEtape1Localisation: DefaultComponent = () => {
    const paysUnionEuropeenneOptions = [
        {
            label: "France",
            nativeInputProps: {
                name: "etatMembre",
                value: "France",
            },
        },
        {
            label: "Autre état membre",
            nativeInputProps: {
                name: "etatMembre",
                value: "Autre",
            },
        },
        {
            label: "Hors Union Européenne",
            nativeInputProps: {
                name: "etatMembre",
                value: "HorsUE",
            },
        },
    ]
    return <SimulateurEtape
        numero={1}
        total={6}
        etape={{
            titre: "Localisation de l’activité",
        }}
        suivante={{
            titre: "Type de structure",
        }}
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