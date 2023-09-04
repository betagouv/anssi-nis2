import {
    SimulateurContenuEtapeProps,
    SimulateurEtapeNode,
    transformeTypeStructureVersOptions,
} from "../../Services/simulateurFrontServices.ts";
import {typesStructure} from "../../Domaine/DomaineSimulateur.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";

const SimulateurEtape2: SimulateurEtapeNode = ({
                                                   handleChange,
                                                   formData,
                                               }: SimulateurContenuEtapeProps) => {
    const optionsTypeStructure = transformeTypeStructureVersOptions(
        typesStructure,
        handleChange,
        formData,
    );

    return (
        <div className="fr-fieldset__element">
            <RadioButtons
                legend="Quel type de structure qualifie votre organisation ?"
                options={optionsTypeStructure}
                className="fr-checkbox-group--sm"
            />
        </div>
    );
};

export default SimulateurEtape2;
