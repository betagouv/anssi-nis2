import {
  DefaultComponentExtensible,
  DefaultProps,
} from "../../../Services/Props";
import React, { useId, useReducer } from "react";
import { changeInfobulleOuverte } from "../../../Services/Simulateur/Reducteurs.ts";
import { IconeInfobulle } from "../../Icones/IconeInfobulle.tsx";
import { Infobulle } from "../Infobulle.tsx";
import { fr } from "@codegouvfr/react-dsfr";
import { OptionChampSimulateur } from "../../../Services/Simulateur/Props/optionChampSimulateur";
import Markdown from "react-markdown";
import { elementMarkdownSimples } from "../../../Services/constantes.ts";

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
        {!!contenuInfobulle?.length && (
          <IconeInfobulle
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.stopPropagation();
              propageInfobulleAffichee(idInfobulle);
            }}
            label={label}
          />
        )}
        <input
          type={type}
          id={getInputId(indice)}
          {...nativeInputProps}
          name="activites"
        />
        <label className="fr-label" htmlFor={getInputId(indice)}>
          {label}
        </label>
      </div>
      {!!contenuInfobulle?.length && (
        <>
          <Infobulle
            id={idInfobulle}
            cachee={idInfobulle !== infobulleAffichee.id}
            contenu={contenuInfobulle.map(({ titre, description }) => (
              <>
                <h6>{titre}</h6>
                <Markdown allowedElements={elementMarkdownSimples}>
                  {description}
                </Markdown>
              </>
            ))}
            action={() => {
              propageInfobulleAffichee(idInfobulle);
            }}
          />
        </>
      )}
    </>
  );
};
