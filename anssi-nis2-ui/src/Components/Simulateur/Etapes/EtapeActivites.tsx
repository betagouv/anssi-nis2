import {
  AssociationSectorielleActivite,
  collecteTitresPourActivite,
} from "../../../../../commun/core/src/Domain/Simulateur/services/Activite/Activite.operations.ts";
import { FormSimulateur } from "./index.ts";
import React, { useMemo } from "react";
import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite.ts";
import { libellesSousSecteursActivite } from "../../../References/LibellesSousSecteursActivite.ts";

import { EnsembleChamps } from "../Inputs/EnsembleChamps.tsx";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { fabriqueCartographieEntreesLegendeEtOptionsChampSimlulateur } from "../../../Services/Simulateur/Transformateurs/FabriqueConstructeurOptionActivite.ts";
import {
  texteQuestionActivite,
  texteQuestionActivitesMention,
} from "../../../References/LibellesQuestionsSimulateur.ts";

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
        <p>{texteQuestionActivite}</p>
        <p className="fr-text-mention--grey fr-text--sm">
          {texteQuestionActivitesMention}
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
