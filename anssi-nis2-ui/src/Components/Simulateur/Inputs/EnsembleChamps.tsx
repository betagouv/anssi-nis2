import { ListeOptionsChampFormulaire } from "../../../Services/Simulateur/props.ts";
import { useId } from "react";
import { ActiviteACocher } from "./ActiviteACocher.tsx";

export const EnsembleChamps = ({
  legende,
  optionsSecteurActivite,
}: {
  legende: string;
  optionsSecteurActivite: ListeOptionsChampFormulaire;
}) => {
  const id = `default-${useId()}`;

  return (
    <fieldset className="fr-fieldset" id={id}>
      <legend className="fr-fieldset__legend fr-text--regular">
        {legende}
      </legend>
      <div className="fr-fieldset__content">
        {optionsSecteurActivite.map((optionsChamp, indice) => (
          <ActiviteACocher
            optionChampSimulateur={optionsChamp}
            indice={indice}
            key={`${id}-${indice}`}
          />
        ))}
      </div>
    </fieldset>
  );
};
