import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { OptionsChampSimulateur } from "../../../Services/Simulateur/Props/optionChampSimulateur";

import { SecteursAvecSousSecteurs } from "../../../Domaine/Simulateur/SousSecteurActivite.definitions.ts";

export const SousSecteurCheckbox = ({
  secteur,
  optionsSousSecteur,
}: {
  secteur: SecteursAvecSousSecteurs;
  optionsSousSecteur: OptionsChampSimulateur;
}) => {
  return (
    <Checkbox
      legend={libellesSecteursActivite[secteur]}
      options={optionsSousSecteur}
    />
  );
};
