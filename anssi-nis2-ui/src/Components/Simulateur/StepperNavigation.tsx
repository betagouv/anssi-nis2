import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";

export const StepperNavigation = (props: {
    indicationReponses: string;
    onClick: (e: React.MouseEvent) => void;
    onClick1: (e: React.MouseEvent) => void;
}) => (
    <div className="fr-grid-row fr-mr-auto" style={{width: "100%"}}>
        <div
            className="fr-col fr-right fr-my-1w fr-text--sm fr-text-mention--grey"
            style={{textAlign: "right"}}
        >
            {props.indicationReponses}
        </div>
        <div className="fr-col-5">
            <div className="fr-fieldset__element">
                <ButtonsGroup
                    alignment="right"
                    buttons={[
                        {
                            children: "Précédent",
                            onClick: props.onClick,
                            priority: "secondary",
                        },
                        {
                            children: "Suivant",
                            onClick: props.onClick1,
                            type: "submit",
                        },
                    ]}
                    inlineLayoutWhen="sm and up"
                />
            </div>
        </div>
    </div>
)