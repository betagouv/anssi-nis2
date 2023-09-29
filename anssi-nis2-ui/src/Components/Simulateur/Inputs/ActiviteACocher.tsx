import {
  DefaultComponentExtensible,
  DefaultProps,
} from "../../../Services/Props.ts";
import { useId, useReducer } from "react";
import { OptionChampSimulateur } from "../../../Services/Simulateur/props.ts";
import { changeInfobulleOuverte } from "../../../Services/Simulateur/reducers.ts";
import { IconeInfobulle } from "../../Icones/IconeInfobulle.tsx";
import { Infobulle } from "../Infobulle.tsx";
import { fr } from "@codegouvfr/react-dsfr";

type Propiprops = DefaultProps & {
  optionChampSimulateur: OptionChampSimulateur;
  indice: number;
};
export const ActiviteACocher: DefaultComponentExtensible<Propiprops> = ({
  optionChampSimulateur,
  indice,
}: Propiprops) => {
  const { label, contenuInfobulle, nativeInputProps } = optionChampSimulateur;
  const id = useId();
  const getInputId = (i: number) => `${id}-${i}`;
  const recupereIdInfobulle = (i: number) => `${indice}-infoBulle-${i}`;
  const type = "checkbox";
  const idInfobulle = recupereIdInfobulle(indice);
  const [infobulleAffichee, propageInfobulleAffichee] = useReducer(
    changeInfobulleOuverte,
    { id: "" },
  );
  return (
    <>
      <div className={fr.cx(`fr-${type}-group`)}>
        <input type={type} id={getInputId(indice)} {...nativeInputProps} />
        <label className="fr-label" htmlFor={getInputId(indice)}>
          {label}{" "}
          {contenuInfobulle && (
            <IconeInfobulle
              onClick={() => {
                propageInfobulleAffichee(idInfobulle);
              }}
              label={label}
            />
          )}
        </label>
      </div>
      {contenuInfobulle && (
        <>
          <Infobulle
            id={idInfobulle}
            cachee={idInfobulle !== infobulleAffichee.id}
            contenu={contenuInfobulle}
            action={() => {
              propageInfobulleAffichee(idInfobulle);
            }}
          />
        </>
      )}
    </>
  );
};
