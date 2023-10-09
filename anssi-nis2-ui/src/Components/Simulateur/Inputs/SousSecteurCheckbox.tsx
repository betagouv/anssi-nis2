import { TValeursSecteursAvecSousSecteurs } from "../../../Domaine/Simulateur/SousSecteurs.ts";
import { SelectOptions } from "../../../Services/Simulateur/simulateurFrontServices.ts";
import { libellesSecteursActivite } from "../../../Domaine/References/LibellesSecteursActivite.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";

export const SousSecteurCheckbox = ({
  secteur,
  optionsSousSecteur,
}: {
  secteur: TValeursSecteursAvecSousSecteurs;
  optionsSousSecteur: SelectOptions;
}) => {
  return (
    <Checkbox
      legend={libellesSecteursActivite[secteur]}
      options={optionsSousSecteur}
    />
  );
};
