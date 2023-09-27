import { genereTransformateurValeursVersOptions } from "../../Services/Simulateur/simulateurFrontServices.ts";
import { FormSimulateur } from "./index.ts";
import {
  ListeOptionsChampFormulaire,
  SimulateurContenuEtapeProps,
} from "../../Services/Simulateur/props.ts";
import React, { useEffect, useId, useReducer, useState } from "react";
import { NomsChampsSimulateur } from "../../Services/Simulateur/donneesFormulaire.ts";
import { detailsDesSecteurs } from "../../Domaine/Simulateur/SecteursActivite.ts";
import { fr } from "@codegouvfr/react-dsfr";
import { Infobulle } from "./Infobulle.tsx";
import { changeInfobulleOuverte } from "../../Services/Simulateur/reducers.ts";
import { IconeInfobulle } from "../Icones/IconeInfobulle.tsx";

const Etape5Activite = ({
  propageActionSimulateur,
  formData,
}: SimulateurContenuEtapeProps) => {
  const [optionsSecteurActivite, setOptionsSecteurActivite] =
    useState<ListeOptionsChampFormulaire>([]);
  const [infobulleAffichee, propageInfobulleAffichee] = useReducer(
    changeInfobulleOuverte,
    { id: "" },
  );

  useEffect(() => {
    const valeursActivites =
      detailsDesSecteurs.energie.sousSecteurs?.electricite.activites || {};

    const changeMulti: React.ChangeEventHandler<HTMLInputElement> = (evt) =>
      propageActionSimulateur({
        type: "checkMulti",
        name: evt.target.name as NomsChampsSimulateur,
        newValue: evt.target.value,
      });

    const transformateurSecteurActivite =
      genereTransformateurValeursVersOptions<string>(
        (cle: string, valeurs: Record<string, string>) => valeurs[cle],
        "activites",
      );
    const optionsBrutesSecteurActivite = transformateurSecteurActivite(
      valeursActivites,
      changeMulti,
      formData,
      "energie",
    );
    setOptionsSecteurActivite(
      optionsBrutesSecteurActivite.map((option, i) => {
        return {
          ...option,
          contenuInfobulle: (
            <p>{`Je t'indique ${i}: ${option.nativeInputProps.value}`}</p>
          ),
          nativeInputProps: {
            ...option.nativeInputProps,
          },
        };
      }),
    );
  }, [formData, propageActionSimulateur]);

  const id = `default-${useId()}`;
  const getInputId = (i: number) => `${id}-${i}`;
  const recupereIdInfobulle = (i: number) => `${id}-infoBulle-${i}`;
  const type = "checkbox";

  const legende = "Énergie / Électricité";
  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <p>
          Quelles sont les activités pratiquées dans les secteurs sélectionnés ?
        </p>
        <p className="fr-text-mention--grey fr-text--sm">
          Cliquez sur les info-bulles pour obtenir plus d’informations sur les
          définitions des activités.
        </p>

        <fieldset className="fr-fieldset" id={id}>
          <legend className="fr-fieldset__legend fr-text--regular">
            {legende}
          </legend>
          <div className="fr-fieldset__content">
            {optionsSecteurActivite.map(
              ({ label, contenuInfobulle, nativeInputProps }, i) => {
                const idInfobulle = recupereIdInfobulle(i);

                return (
                  <>
                    <div className={fr.cx(`fr-${type}-group`)} key={i}>
                      <input
                        type={type}
                        id={getInputId(i)}
                        {...nativeInputProps}
                      />
                      <label className="fr-label" htmlFor={getInputId(i)}>
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
                            propageInfobulleAffichee(id);
                          }}
                        />
                      </>
                    )}
                  </>
                );
              },
            )}
          </div>
        </fieldset>
      </div>
    </FormSimulateur>
  );
};

export default Etape5Activite;
