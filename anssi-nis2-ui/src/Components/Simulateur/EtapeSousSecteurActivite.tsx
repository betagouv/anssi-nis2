import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/props.ts";
import React, { useCallback, useEffect, useState } from "react";
import { SelectOptions } from "../../Services/Simulateur/simulateurFrontServices.ts";
import { TValeursSousSecteursActivites } from "../../Domaine/Simulateur/ValeursCles.ts";
import { libellesSousSecteursActivite } from "../../Domaine/References/LibellesSousSecteursActivite.ts";
import {
  contientSousSecteur,
  estUnSecteurAvecDesSousSecteurs,
  LibellesSousSecteurs,
  TValeursSecteursAvecSousSecteurs,
} from "../../Domaine/Simulateur/SousSecteurs.ts";
import { libellesSecteursActivite } from "../../Domaine/References/LibellesSecteursActivite.ts";
import { transformateurSousSecteurActivite } from "../../Services/Simulateur/Transformateurs.ts";

const EtapeSousSecteurActivite = ({
  propageActionSimulateur,
  formData,
}: SimulateurContenuEtapeProps) => {
  const gereChangement = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as TValeursSousSecteursActivites;
      propageActionSimulateur({
        type: "checkMulti",
        name: "sousSecteurActivite",
        newValue: newValue,
      });
    },
    [propageActionSimulateur],
  );

  const [optionsSousSecteurActivite, setOptionsSousSecteurActivite] = useState<
    [TValeursSecteursAvecSousSecteurs, SelectOptions][]
  >([]);
  useEffect(() => {
    const reducteurSecteursVersOptions = (
      secteursAvecOptionsSousSecteurs: [
        TValeursSecteursAvecSousSecteurs,
        SelectOptions,
      ][],
      secteur: TValeursSecteursAvecSousSecteurs,
    ): [TValeursSecteursAvecSousSecteurs, SelectOptions][] => {
      const entreesLibellesSousSecteurs = Object.entries(
        libellesSousSecteursActivite,
      ) as [TValeursSousSecteursActivites, string][];
      const reducteurCleValeurVersObjet = (
        libellesSousSecteurDuSecteur: LibellesSousSecteurs,
        [sousSecteur, libelle]: [TValeursSousSecteursActivites, string],
      ) => ({
        ...libellesSousSecteurDuSecteur,
        [sousSecteur]: libelle,
      });
      return [
        ...secteursAvecOptionsSousSecteurs,
        [
          secteur,
          transformateurSousSecteurActivite(
            entreesLibellesSousSecteurs
              .filter(
                ([sousSecteur]) =>
                  estUnSecteurAvecDesSousSecteurs(secteur) &&
                  contientSousSecteur(secteur, sousSecteur),
              )
              .reduce(reducteurCleValeurVersObjet, {}),
            gereChangement,
            formData,
          ),
        ],
      ];
    };
    const structOptions = (
      formData.secteurActivite as TValeursSecteursAvecSousSecteurs[]
    ).reduce(reducteurSecteursVersOptions, []);

    setOptionsSousSecteurActivite(structOptions);
  }, [formData, gereChangement]);

  return (
    <FormSimulateur>
      <legend className="fr-text--medium">
        Précisez les sous-secteurs concernés :
      </legend>
      <div className="fr-fieldset__element">
        {optionsSousSecteurActivite.map(
          ([secteur, optionsSousSecteur], index) => (
            <Checkbox
              legend={libellesSecteursActivite[secteur]}
              options={optionsSousSecteur}
              key={`sousSecteurs-${secteur}-${index}`}
            />
          ),
        )}
      </div>
    </FormSimulateur>
  );
};

export default EtapeSousSecteurActivite;
