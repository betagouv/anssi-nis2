import { FormSimulateur } from "./index.ts";
import React, { useMemo } from "react";
import { AssociationSectorielleActivite } from "../../../Domaine/Simulateur/ActivitesParSecteurEtSousSecteur.ts";
import {
  collecteTitresPourActivite,
  fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur,
} from "../../../Services/Simulateur/Transformateurs.ts";
import { libellesSecteursActivite } from "../../../Domaine/References/LibellesSecteursActivite.ts";
import { libellesSousSecteursActivite } from "../../../Domaine/References/LibellesSousSecteursActivite.ts";

import { EnsembleChamps } from "../Inputs/EnsembleChamps.tsx";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";

const EtapeActivitesCalculee = ({
  propageActionSimulateur,
  donneesFormulaire,
}: SimulateurContenuEtapeProps) => {
  const optionsParSecteurActivite = useMemo(() => {
    const titresExtraits: AssociationSectorielleActivite[] =
      collecteTitresPourActivite(
        libellesSecteursActivite,
        libellesSousSecteursActivite,
        donneesFormulaire,
      );

    const cartographieEntreesLegendeEtOptionsChampSimlulateur =
      fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur(
        donneesFormulaire,
        propageActionSimulateur,
      );
    return titresExtraits.map(
      cartographieEntreesLegendeEtOptionsChampSimlulateur,
    );
  }, [donneesFormulaire, propageActionSimulateur]);

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

        {optionsParSecteurActivite.map(({ legende, options }, index) => (
          <EnsembleChamps
            legende={legende}
            optionsSecteurActivite={options}
            key={`activites-${index}`}
          />
        ))}
      </div>
    </FormSimulateur>
  );
};

const EtapeActivites = React.memo(EtapeActivitesCalculee);

export default EtapeActivites;
