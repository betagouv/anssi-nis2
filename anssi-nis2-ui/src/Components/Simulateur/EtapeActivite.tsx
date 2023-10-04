import { FormSimulateur } from "./index.ts";
import {
  ListeOptionsChampFormulaire,
  SimulateurContenuEtapeProps,
} from "../../Services/Simulateur/props.ts";
import React, { useEffect, useState } from "react";
import { NomsChampsSimulateur } from "../../Services/Simulateur/donneesFormulaire.ts";
import { activitesParSecteurEtSousSecteur } from "../../Domaine/Simulateur/ActivitesParSecteurEtSousSecteur.ts";
import {
  collecteTitresPourActivite,
  construitListeActivites,
} from "../../Services/Simulateur/Transformateurs.ts";
import { libellesSecteursActivite } from "../../Domaine/Simulateur/LibellesSecteursActivite.ts";
import { libellesSousSecteursActivite } from "../../Domaine/Simulateur/LibellesSousSecteursActivite.ts";
import { TValeursSectorielles } from "../../Domaine/Simulateur/ValeursCles.ts";

import { EnsembleChamps } from "./Inputs/EnsembleChamps.tsx";

const EtapeActivite = ({
  propageActionSimulateur,
  formData,
}: SimulateurContenuEtapeProps) => {
  const [optionsParSecteurActivite, setOptionsParSecteurActivite] = useState<
    [string, ListeOptionsChampFormulaire][]
  >([]);

  useEffect(() => {
    const changeMulti: React.ChangeEventHandler<HTMLInputElement> = (evt) =>
      propageActionSimulateur({
        type: "checkMulti",
        name: evt.target.name as NomsChampsSimulateur,
        newValue: evt.target.value,
      });

    const titresExtraits: string[][] = collecteTitresPourActivite(
      libellesSecteursActivite,
      libellesSousSecteursActivite,
      formData,
    );

    setOptionsParSecteurActivite(
      titresExtraits.map(([secteurOuSousSecteur, titreActivites]) => [
        titreActivites,
        activitesParSecteurEtSousSecteur[
          secteurOuSousSecteur as TValeursSectorielles
        ].map(construitListeActivites(formData, changeMulti)),
      ]),
    );
  }, [formData, propageActionSimulateur]);
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

        {optionsParSecteurActivite.map(
          ([legende, optionsSecteurActivite], index) => (
            <EnsembleChamps
              legende={legende}
              optionsSecteurActivite={optionsSecteurActivite}
              key={`activites-${index}`}
            />
          ),
        )}
      </div>
    </FormSimulateur>
  );
};

export default EtapeActivite;
