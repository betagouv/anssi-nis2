import {DefaultComponentExtensible, SimulateurEtapeProps} from "../../Props.ts"
import Stepper from "@codegouvfr/react-dsfr/Stepper"
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup"

export const SimulateurEtape: DefaultComponentExtensible<SimulateurEtapeProps> =
    ({
         numero,
         total,
         etape,
         suivante,
         indicationReponses,
         children,
     }: SimulateurEtapeProps) => {
        return <div
            className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">
                <Stepper
                    currentStep={numero}
                    nextTitle={suivante.titre}
                    stepCount={total}
                    title={etape.titre}
                />
                <hr/>
                <form className="fr-mb-0" id="login-1797">
                    <fieldset className="fr-mb-0 fr-fieldset" id="login-1797-fieldset"
                              aria-labelledby="login-1797-fieldset-legend login-1797-fieldset-messages">
                        {children}

                        <div className="fr-grid-row fr-mr-auto" style={{width: "100%"}}>
                            <div className="fr-col fr-right fr-my-1w fr-text--sm fr-text-mention--grey"
                                 style={{textAlign: "right"}}>
                                {indicationReponses}
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