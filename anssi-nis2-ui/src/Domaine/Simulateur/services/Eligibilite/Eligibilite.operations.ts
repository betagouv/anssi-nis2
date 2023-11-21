import { match, P } from "ts-pattern";
import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";

import { auMoinsUnSecteurListe } from "../SecteurActivite/SecteurActivite.predicats.ts";
import {
  Eligibilite,
  ResultatEligibilite,
} from "../../Eligibilite.definitions.ts";
import {
  aucuneActiviteCommuneAvec,
  aucuneActiviteListee,
  auMoinsUneActiviteCommuneAvec,
  auMoinsUneActiviteListee,
} from "../Activite/Activite.predicats.ts";
import { ValeursActivites } from "../../Activite.definitions.ts";
import { donneesFormulaireSontIncompletes } from "../DonneesFormulaire/DonneesFormulaire.predicats.ts";

export const ValeursActivitesConcernesInfrastructureNumerique: ValeursActivites[] =
  [
    "fournisseurReseauxCommunicationElectroniquesPublics",
    "fournisseurServiceCommunicationElectroniquesPublics",
    "prestataireServiceConfiance",
  ];

type OperationCalculeEligibilite = (
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur,
) => ResultatEligibilite;

const calculeEligibiliteOperateurServiceEssentielNis1: OperationCalculeEligibilite =
  (donnees) =>
    match(donnees)
      .with(
        {
          trancheCA: ["petit"],
          trancheNombreEmployes: ["petit"],
        },
        () => Eligibilite.EligiblePetiteEntreprise,
      )
      .otherwise(() => Eligibilite.EligibleMoyenneGrandeEntreprise);
const calculeEligibilitePetiteStructurePrivee: OperationCalculeEligibilite = (
  donnees,
) =>
  match(donnees)
    .with(
      {
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        secteurActivite: ["infrastructureNumerique"],
        activites: P.when(
          auMoinsUneActiviteCommuneAvec(
            ValeursActivitesConcernesInfrastructureNumerique,
          ),
        ),
      },
      () => Eligibilite.EligiblePetiteEntreprise,
    )
    .with(
      {
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        secteurActivite: ["infrastructureNumerique"],
        activites: P.when(
          aucuneActiviteCommuneAvec(
            ValeursActivitesConcernesInfrastructureNumerique,
          ),
        ),
      },
      () => Eligibilite.NonEligible,
    )
    .with(
      {
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        secteurActivite: P.not(["infrastructureNumerique"]),
      },
      () => Eligibilite.NonEligible,
    )
    .otherwise(() => Eligibilite.Incertain);
const calculeEligibiliteMoyenneOuGrandeStructurePrivee: OperationCalculeEligibilite =
  (donnees) =>
    match(donnees)
      .with(
        {
          secteurActivite: P.when(auMoinsUnSecteurListe),
          activites: P.when(auMoinsUneActiviteListee),
        },
        () => Eligibilite.EligibleMoyenneGrandeEntreprise,
      )
      .otherwise(() => Eligibilite.Incertain);
const calculeEligibiliteStructurePrivee: OperationCalculeEligibilite = (
  donnees,
) =>
  match(donnees)
    .with(
      {
        activites: P.when(aucuneActiviteListee),
      },
      () => Eligibilite.NonEligible,
    )
    .with(
      {
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
      },
      calculeEligibilitePetiteStructurePrivee,
    )
    .with(
      P.union(
        {
          trancheNombreEmployes: P.union(["moyen"], ["grand"]),
        },
        {
          trancheCA: P.union(["moyen"], ["grand"]),
        },
      ),
      calculeEligibiliteMoyenneOuGrandeStructurePrivee,
    )
    .otherwise(() => Eligibilite.Incertain);
export const calculeEligibilite: OperationCalculeEligibilite = (donnees) =>
  match(donnees)
    .when(donneesFormulaireSontIncompletes, () => Eligibilite.Incertain)
    .with(
      { designeOperateurServicesEssentiels: ["oui"] },
      calculeEligibiliteOperateurServiceEssentielNis1,
    )
    .with({ typeStructure: ["privee"] }, calculeEligibiliteStructurePrivee)
    .otherwise(() => Eligibilite.Incertain);
