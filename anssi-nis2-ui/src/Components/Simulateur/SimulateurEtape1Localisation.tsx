import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup"
import Stepper from "@codegouvfr/react-dsfr/Stepper"
import {DefaultComponent} from "../../Props.ts"
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons"

const SimulateurEtape1Localisation : DefaultComponent = () => {
    return <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">
            <Stepper
                currentStep={1}
                nextTitle="Type de structure"
                stepCount={6}
                title="Localisation de l’activité"
            />
            <hr />
            <form className="fr-mb-0" id="login-1797">
                <fieldset className="fr-mb-0 fr-fieldset" id="login-1797-fieldset"
                          aria-labelledby="login-1797-fieldset-legend login-1797-fieldset-messages">
                    <div className="fr-fieldset__element">
                        <RadioButtons
                            legend={"Dans quel état membre de l’Union Européenne êtes-vous implanté"
                                + " et/ou exercez-vous votre activité principale ?"}
                            hintText={"Là où sont principalement prises les décisions cyber," +
                                " ou à défaut là où les opérations cyber son effectuées." +
                                " Si indéterminé : là où se trouve le plus grand nombre de salariés."}
                            options={[
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
                            ]}
                            className="fr-checkbox-group--sm"
                        />
                    </div>

                    <div className="fr-grid-row fr-mr-auto" style={{ width: "100%" }}>
                        <div className="fr-col fr-right fr-my-1w fr-text--sm fr-text-mention--grey" style={{textAlign: "right"}}>
                            Sélectionnez une réponse
                        </div>
                        <div className="fr-col-5">
                            <div className="fr-fieldset__element">
                                <ButtonsGroup
                                    alignment="right"
                                    // style={{float: "right"}}
                                    buttons={[
                                        {
                                            children: "Précédent",
                                            linkProps: {
                                                href: "#",
                                            },
                                            priority: "secondary",
                                        },
                                        {
                                            children: "Suivant",
                                            linkProps: {
                                                href: "#",
                                            },
                                        },
                                    ]}
                                    inlineLayoutWhen="sm and up"
                                />
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
}

export default SimulateurEtape1Localisation