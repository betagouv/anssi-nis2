import { NomsChampsSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { OptionsChampSimulateur } from "./Props/optionChampSimulateur";
import { TransformeRecordToSelect } from "./Workflow/optionChampSimulateur";
import { GenerateurLibelle, getValueContent } from "./Workflow/libelles.ts";

export const genereTransformateurValeursVersOptions: <
  T extends string,
  P = string,
>(
  generateurLabel: GenerateurLibelle<T, P>,
  name: NomsChampsSimulateur,
) => TransformeRecordToSelect<T, P> =
  (generateurLabel, name) => (valeursMetier, onChange?, formData?, group?) => {
    const selectOptions: OptionsChampSimulateur = [];
    const checkedValue = formData?.[name as NomsChampsSimulateur] || [];
    for (const key in valeursMetier) {
      const valueContent = getValueContent(group, key);
      const nativeInputProps = {
        name: name,
        value: valueContent,
        onChange: onChange || (() => {}),
        checked: checkedValue.indexOf(valueContent) !== -1,
      };
      selectOptions.push({
        label: generateurLabel(key, valeursMetier),
        nativeInputProps: nativeInputProps,
      });
    }
    return selectOptions;
  };
