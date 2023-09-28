import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/props.ts";
import React, { useCallback, useEffect, useState } from "react";
import {
  genereTransformateurValeursVersOptions,
  labelGenerator,
  SelectOptions,
  TransformeRecordToSelect,
} from "../../Services/Simulateur/simulateurFrontServices.ts";
import {
  TValeursSousSecteurEnergie,
  TValeursSousSecteursActivites,
} from "../../Domaine/Simulateur/ValeursCles.ts";
import { libellesSousSecteursActivite } from "../../Domaine/Simulateur/LibellesSousSecteursActivite.ts";
import {
  sousSecteursParSecteur,
  TValeursSecteursAvecSousSecteurs,
  ValeursSecteursAvecSousSecteurs,
} from "../../Domaine/Simulateur/SousSecteurs.ts";
import { libellesSecteursActivite } from "../../Domaine/Simulateur/LibellesSecteursActivite.ts";
import { VVV } from "../../utilitaires/debug.ts";

function estUnSecteurAvecDesSousSecteurs(secteur: string) {
  return ValeursSecteursAvecSousSecteurs.includes(
    secteur as TValeursSecteursAvecSousSecteurs,
  );
}

function contientSousSecteur(secteur: string, sousSecteur: string) {
  return sousSecteursParSecteur[
    secteur as TValeursSecteursAvecSousSecteurs
  ].includes(sousSecteur);
}

const Etape4bisSousSecteur = ({
  propageActionSimulateur,
  formData,
}: SimulateurContenuEtapeProps) => {
  const gereChangement = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as TValeursSousSecteurEnergie;
      propageActionSimulateur({
        type: "checkMulti",
        name: "sousSecteurActivite",
        newValue: newValue,
      });
    },
    [propageActionSimulateur],
  );

  const [optionsSousSecteurActivite, setOptionsSousSecteurActivite] =
    useState<
      Partial<Record<TValeursSecteursAvecSousSecteurs, SelectOptions>>
    >();

  useEffect(() => {
    const getSousSecteurLabel: labelGenerator<TValeursSousSecteursActivites> = (
      value: string,
      sousSecteur: Record<TValeursSousSecteursActivites, string>,
    ) => sousSecteur[value as TValeursSousSecteursActivites];

    const transformateurSousSecteurActivite: TransformeRecordToSelect<TValeursSousSecteursActivites> =
      genereTransformateurValeursVersOptions(
        getSousSecteurLabel,
        "sousSecteurActivite",
      );

    VVV(`formData=${formData}`);
    const structOptions = formData.secteurActivite.reduce(
      (
        secteursAvecOptionsSousSecteurs: Partial<
          Record<TValeursSecteursAvecSousSecteurs, SelectOptions>
        >,
        secteur,
      ) => {
        const entries = Object.entries(libellesSousSecteursActivite);
        const reducteurCleValeurVersObjet = (
          libellesSousSecteurDuSecteur: Partial<
            Record<TValeursSousSecteursActivites, string>
          >,
          [sousSecteur, libelle]: [string, string],
        ) => ({
          ...libellesSousSecteurDuSecteur,
          [sousSecteur]: libelle,
        });
        return {
          ...secteursAvecOptionsSousSecteurs,
          [secteur]: transformateurSousSecteurActivite(
            entries
              .filter(
                ([sousSecteur]) =>
                  estUnSecteurAvecDesSousSecteurs(secteur) &&
                  contientSousSecteur(secteur, sousSecteur),
              )
              .reduce(reducteurCleValeurVersObjet, {}),
            gereChangement,
            formData,
          ),
        };
      },
      {},
    );

    setOptionsSousSecteurActivite(structOptions);
  }, [formData, gereChangement]);

  return (
    <FormSimulateur>
      <legend className="fr-text--medium">
        Précisez les sous-secteurs concernés :
      </legend>
      <div className="fr-fieldset__element">
        {optionsSousSecteurActivite &&
          Object.entries(optionsSousSecteurActivite).map(
            ([secteur, optionsSousSecteur]) => (
              <Checkbox
                legend={
                  libellesSecteursActivite[
                    secteur as TValeursSecteursAvecSousSecteurs
                  ]
                }
                options={optionsSousSecteur}
              />
            ),
          )}
      </div>
    </FormSimulateur>
  );
};

export default Etape4bisSousSecteur;
