import {
  SimulateurContenuEtapeProps,
  transformeTranchesCAVersOptions,
  transformeTranchesNombreEmployesVersOptions,
} from "../../Services/simulateurFrontServices.ts";
import {
  tranchesCA,
  tranchesNombreEmployes,
} from "../../Domaine/DomaineSimulateur.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";

const SimulateurEtape3 = ({
  handleChange,
  formData,
}: SimulateurContenuEtapeProps) => {
  const optionsTranchesNombreEmployes =
    transformeTranchesNombreEmployesVersOptions(
      tranchesNombreEmployes,
      handleChange,
      formData,
    );
  const optionsTranchesCA = transformeTranchesCAVersOptions(
    tranchesCA,
    handleChange,
    formData,
  );

  return (
    <div className="fr-fieldset__element">
      <p>
        Quelles sont les caractéristiques clés de votre organisation ? Texte de
        description additionnel
      </p>
      <RadioButtons
        legend="Nombre d’employé·e·s (équivalents temps pleins)"
        options={optionsTranchesNombreEmployes}
        className="fr-checkbox-group--sm"
      />
      <RadioButtons
        legend="Chiffre d’affaires annuel de l’année passée"
        options={optionsTranchesCA}
        className="fr-checkbox-group--sm"
      />
    </div>
  );
};

export default SimulateurEtape3;
