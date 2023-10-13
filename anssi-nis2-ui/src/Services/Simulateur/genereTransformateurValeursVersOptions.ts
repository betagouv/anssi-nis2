import { NomsChampsSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { OptionsChampSimulateur } from "./Props/optionChampSimulateur";
import { TransformeRecordToSelect } from "./Operations/optionChampSimulateur";
import { GenerateurLibelle } from "./Operations/operationsLibelles";

import { ValeurChampSimulateur } from "../../Domaine/Simulateur/ValeursChampsSimulateur";

export const genereTransformateurValeursVersOptions: <
  ValeursCles extends ValeurChampSimulateur,
  Contenu = string,
>(
  generateurLabel: GenerateurLibelle<ValeursCles, Contenu>,
  name: NomsChampsSimulateur,
) => TransformeRecordToSelect<ValeursCles, Contenu> =
  (generateurLabel, name) => (valeursMetier, onChange?, formData?) => {
    const selectOptions: OptionsChampSimulateur = [];
    const checkedValue: ValeurChampSimulateur[] =
      formData?.[name as NomsChampsSimulateur] || [];
    for (const key in valeursMetier) {
      const valeurMetier = key;
      const nativeInputProps = {
        name: name,
        value: valeurMetier,
        onChange: onChange || (() => {}),
        checked: checkedValue.indexOf(valeurMetier) !== -1,
      };
      selectOptions.push({
        label: generateurLabel(key, valeursMetier),
        nativeInputProps: nativeInputProps,
      });
    }
    return selectOptions;
  };
