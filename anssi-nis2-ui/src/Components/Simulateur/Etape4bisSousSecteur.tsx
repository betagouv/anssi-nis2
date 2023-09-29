import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/props.ts";
import React, { useCallback, useEffect, useState } from "react";
import { SelectOptions } from "../../Services/Simulateur/simulateurFrontServices.ts";
import {
  TValeursSousSecteurEnergie,
  TValeursSousSecteursActivites,
} from "../../Domaine/Simulateur/ValeursCles.ts";
import { libellesSousSecteursActivite } from "../../Domaine/Simulateur/LibellesSousSecteursActivite.ts";
import {
  contientSousSecteur,
  estUnSecteurAvecDesSousSecteurs,
  TValeursSecteursAvecSousSecteurs,
} from "../../Domaine/Simulateur/SousSecteurs.ts";
import { libellesSecteursActivite } from "../../Domaine/Simulateur/LibellesSecteursActivite.ts";
import { transformateurSousSecteurActivite } from "../../Services/Simulateur/Transformateurs.ts";

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
            ([secteur, optionsSousSecteur], index) => (
              <Checkbox
                legend={
                  libellesSecteursActivite[
                    secteur as TValeursSecteursAvecSousSecteurs
                  ]
                }
                options={optionsSousSecteur}
                key={`sousSecteurs-${secteur}-${index}`}
              />
            ),
          )}
      </div>
    </FormSimulateur>
  );
};

export default Etape4bisSousSecteur;
