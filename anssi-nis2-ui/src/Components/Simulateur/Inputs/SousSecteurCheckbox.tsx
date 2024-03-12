import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { OptionsChampSimulateur } from "../../../Services/Simulateur/Props/optionChampSimulateur";
import { SecteurComposite } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";

export const SousSecteurCheckbox = ({
  secteur,
  optionsSousSecteur,
}: {
  secteur: SecteurComposite;
  optionsSousSecteur: OptionsChampSimulateur;
}) => {
  return (
    <Checkbox
      legend={libellesSecteursActivite[secteur]}
      options={optionsSousSecteur}
    />
  );
};
