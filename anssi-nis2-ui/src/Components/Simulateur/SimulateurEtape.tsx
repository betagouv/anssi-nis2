import {DefaultComponentExtensible} from "../../Props.ts";
import Stepper from "@codegouvfr/react-dsfr/Stepper";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import React, {useState} from "react";
import {
    emptySimulateurFormData,
    SimulateurEtapeProps,
    SimulateurFieldNames,
    SimulateurFormData,
} from "../../Services/simulateurFrontServices.ts";

type FormValueHandler = (value: string) => (string[])
export const SimulateurEtape: DefaultComponentExtensible<
    SimulateurEtapeProps
> = ({
         etapeCourante,
         nombreEtapes,
         etape,
         suivante,
         etapePrecedente,
         etapeSuivante,
     }: SimulateurEtapeProps) => {
    console.log(`Etape courante = ${etapeCourante}`);
    const [inputs, setInputs] = useState<SimulateurFormData>(
        emptySimulateurFormData,
    );

    console.log(`Inputs state = ${JSON.stringify(inputs)}`);

    const handleMultipleValues: (name: SimulateurFieldNames) => FormValueHandler = (name: SimulateurFieldNames) => (value: string) => {
        console.log(`handleMultipleValues(name=${name}, value=${value}`)
        if (inputs[name].indexOf(value) === -1)
            return [...(inputs[name]), value]
        else {
            return inputs[name].filter(content => content !== value)
        }
    }

    const handleSingleValue: (name: SimulateurFieldNames) => FormValueHandler = (name: SimulateurFieldNames) => (value: string) => {
        console.log(`handleSingleValue(name=${name}, value=${value}`)
        return [value]
    }

    const fieldHandlers : Record<SimulateurFieldNames, FormValueHandler> = {
        etatMembre: handleMultipleValues("etatMembre"),
        secteurActivite: handleMultipleValues("secteurActivite"),
        trancheCA: handleSingleValue("trancheCA"),
        trancheNombreEmployes: handleSingleValue("trancheNombreEmployes"),
        typeStructure: handleSingleValue("typeStructure"),
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        const fieldName = name as SimulateurFieldNames

        console.log(`Name = "${name}" and value = "${value}"`);
        console.log(`New value : Name = "${name}" and value = "${JSON.stringify(inputs[fieldName])}"`);

        setInputs({...inputs, [fieldName]: fieldHandlers[fieldName](value)});
    };

    const EtapeCourante = etape.contenu || <></>;

    return (
        <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-10 fr-col-lg-9">
                <Stepper
                    currentStep={etapeCourante}
                    nextTitle={suivante.titre}
                    stepCount={nombreEtapes}
                    title={etape.titre}
                />
                <hr/>
                <form className="fr-mb-0" id="login-1797">
                    <fieldset
                        className="fr-mb-0 fr-fieldset"
                        id="login-1797-fieldset"
                        aria-labelledby="login-1797-fieldset-legend login-1797-fieldset-messages"
                    >
                        <EtapeCourante handleChange={handleChange} formData={inputs}/>
                        <div className="fr-grid-row fr-mr-auto" style={{width: "100%"}}>
                            <div
                                className="fr-col fr-right fr-my-1w fr-text--sm fr-text-mention--grey"
                                style={{textAlign: "right"}}
                            >
                                {etape.indicationReponses}
                            </div>
                            <div className="fr-col-5">
                                <div className="fr-fieldset__element">
                                    <ButtonsGroup
                                        alignment="right"
                                        buttons={[
                                            {
                                                children: "Précédent",
                                                onClick: etapePrecedente,
                                                priority: "secondary",
                                            },
                                            {
                                                children: "Suivant",
                                                onClick: etapeSuivante,
                                                type: "submit",
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
    );
};
