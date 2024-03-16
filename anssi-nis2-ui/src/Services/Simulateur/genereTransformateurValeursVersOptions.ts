import { ValeurChampSimulateur } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { NomsChampsSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { OptionsChampSimulateur } from "./Props/optionChampSimulateur";
import { TransformeRecordToSelect } from "./Operations/OptionsChampsSimulateur.declarations.ts";
import { GenerateurLibelle } from "./Operations/OptionsChampsSimulateur.declarations.ts";

export const genereTransformateurValeursVersOptions: <
  ValeursCles extends ValeurChampSimulateur,
  Contenu extends string = string,
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
