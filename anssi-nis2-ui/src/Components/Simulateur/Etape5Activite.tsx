import { genereTransformateurValeursVersOptions } from "../../Services/Simulateur/simulateurFrontServices.ts";
import { FormSimulateur } from "./index.ts";
import {
  ListeOptionsChampFormulaire,
  SimulateurContenuEtapeProps,
} from "../../Services/Simulateur/props.ts";
import React, {
  useEffect,
  useState,
  useId,
  useReducer,
  Reducer,
  ReactNode,
} from "react";
import { NomsChampsSimulateur } from "../../Services/Simulateur/donneesFormulaire.ts";
import { detailsDesSecteurs } from "../../Domaine/Simulateur/SecteursActivite.ts";
import { VVV } from "../../utilitaires/debug.ts";
import { fr } from "@codegouvfr/react-dsfr";
import styled from "@emotion/styled";

const changeInfobulleOuverte: Reducer<
  {
    id: string;
  },
  string
> = ({ id }, nouvelId) => {
  if (id === nouvelId) return { id: "" };
  return { id: nouvelId };
};

const BoutonFerme = styled.button`
  position: absolute;
  top: 0;
  right: 2rem;
  font-size: 0.875rem;
  line-height: 1.5rem;
  min-height: 2rem;
  overflow: hidden;
  white-space: nowrap;
  max-width: 4rem;
  max-height: 4rem;
`;
const Infobulle = ({
  id,
  cachee,
  contenu,
  action,
}: {
  id: string;
  cachee: boolean;
  contenu: ReactNode;
  action: () => void;
}) => {
  return (
    <div
      className={fr.cx(
        "fr-callout",
        "fr-grid-row",
        // "fr-alert",
        cachee && "fr-hidden",
      )}
      id={id}
    >
      <h3 className="fr-alert__title">Entreprise d’électricité</h3>
      <p className="fr-callout__text">{contenu}</p>
      <BoutonFerme
        className="fr-btn--close fr-btn"
        title="Masquer le message"
        onClick={action}
      />
    </div>
  );
};

const Icone16 = styled.i`
  padding-left: 0.5rem;

  &::before {
    --icon-size: 1.125rem;
  }
`;

const IconeInfobulle = (props: { onClick: () => void; label: string }) => (
  <Icone16
    className="fr-icon-error-warning-fill fr-text-action-high--blue-france"
    onClick={props.onClick}
    title={`Informations à propos de l'activité "${props.label}"`}
  />
);

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
  VVV("Valeurs Options", optionsSecteurActivite);

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
