import { SecteursAvecSousSecteurs } from "../../../Domaine/Simulateur/SousSecteurs.ts";
import { libellesSecteursActivite } from "../../../Domaine/References/LibellesSecteursActivite.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { OptionsChampSimulateur } from "../../../Services/Simulateur/Props/optionChampSimulateur";

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
