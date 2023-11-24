import { FormSimulateur } from "./index.ts";
import React, { useMemo } from "react";
import {
  AssociationSectorielleActivite,
  collecteTitresPourActivite,
} from "../../../../../anssi-nis2-domain/src/Simulateur/services/Activite/Activite.operations.ts";
import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite.ts";
import { libellesSousSecteursActivite } from "../../../References/LibellesSousSecteursActivite.ts";

import { EnsembleChamps } from "../Inputs/EnsembleChamps.tsx";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur } from "../../../Services/Simulateur/Transformateurs/FabriqueConstructeurOptionActivite.ts";

const EtapeActivitesCalculee = ({
  propageActionSimulateur,
  donneesFormulaire,
}: SimulateurContenuEtapeProps) => {
  const titresExtraits: AssociationSectorielleActivite[] =
    collecteTitresPourActivite(
      libellesSecteursActivite,
      libellesSousSecteursActivite,
      donneesFormulaire,
    );
  const optionsParSecteurActivite = useMemo(
    () =>
      titresExtraits.map(
        fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur(
          donneesFormulaire,
          propageActionSimulateur,
        ),
      ),
    [donneesFormulaire, propageActionSimulateur, titresExtraits],
  );

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
