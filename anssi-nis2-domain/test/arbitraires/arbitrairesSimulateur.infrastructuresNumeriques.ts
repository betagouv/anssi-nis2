import { fc } from "@fast-check/vitest";
import {
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "../../src/Simulateur/DonneesFormulaire";
import {
  ajouteAuMoinsUneActiviteListee,
  etend,
  fabriqueArbContraintSurTrancheCA,
  fabriqueArbEnrSecteurSousSecteurs,
  fabriqueArbTrancheSingleton,
} from "../utilitaires/manipulationArbitraires";
import {
  filtreEnrSectorielHorsSecteurs,
  filtreSecteurListeSecteursSousSecteurs,
} from "../../../anssi-nis2-ui/test/Services/Simulateur/exemples/ListesEnrSecteursSousSecteur";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbTranche,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";
import {
  ValeursActivitesConcernesInfrastructureNumerique,
  ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
} from "../../src/Simulateur/Eligibilite.constantes";
import { DonneesSectorielles } from "../utilitaires/manipulationArbitraires.declarations";

const arbSecteurSousSecteurInfraNum = fabriqueArbEnrSecteurSousSecteurs(
  filtreSecteurListeSecteursSousSecteurs("infrastructureNumerique"),
  { minLength: 1 },
);
const arbSecteurSousSecteurNonInfraNum = fabriqueArbEnrSecteurSousSecteurs(
  filtreEnrSectorielHorsSecteurs([
    "infrastructureNumerique",
    "autreSecteurActivite",
  ]),
  { minLength: 1 },
);
export const arbNonOSEPrivesPetitFournisseurInfraNum =
  etend<DonneesSectorielles>(arbSecteurSousSecteurInfraNum)
    .avec({
      designeOperateurServicesEssentiels:
        arbDesigneOperateurServicesEssentiels.non,
      typeStructure: arbTypeStructure.privee,
      trancheCA: arbTranche.petit,
      trancheNombreEmployes: arbTranche.petit,
      etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
    })
    .chain(ajouteAuMoinsUneActiviteListee);
export const arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernes: fc.Arbitrary<IDonneesBrutesFormulaireSimulateur> =
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    (d: IDonneesBrutesFormulaireSimulateur) =>
      d.activites.some((a) =>
        ValeursActivitesConcernesInfrastructureNumerique.includes(a),
      ),
  ) as fc.Arbitrary<IDonneesBrutesFormulaireSimulateur>;
export const arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernesFrance: fc.Arbitrary<IDonneesBrutesFormulaireSimulateur> =
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    (d: IDonneesBrutesFormulaireSimulateur) =>
      d.activites.every((a) =>
        ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement.includes(
          a,
        ),
      ),
  ) as fc.Arbitrary<IDonneesBrutesFormulaireSimulateur>;
export const arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  etend(arbNonOSEPrivesPetitFournisseurInfraNum)
    .avec({ trancheCA: fabriqueArbTrancheSingleton() })
    .chain(fabriqueArbContraintSurTrancheCA)
    .filter((d: IDonneesBrutesFormulaireSimulateur) =>
      d.activites.every((a) =>
        ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement.includes(
          a,
        ),
      ),
    ) as fc.Arbitrary<IDonneesFormulaireSimulateur>;
export const arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes: fc.Arbitrary<IDonneesBrutesFormulaireSimulateur> =
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    (d: IDonneesBrutesFormulaireSimulateur) =>
      d.activites.every(
        (a) =>
          !ValeursActivitesConcernesInfrastructureNumerique.includes(a) &&
          !ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement.includes(
            a,
          ),
      ),
  ) as fc.Arbitrary<IDonneesBrutesFormulaireSimulateur>;
export const arbNonOSEPrivesPetitHorsFournisseurInfraNum =
  etend<DonneesSectorielles>(arbSecteurSousSecteurNonInfraNum)
    .avec({
      designeOperateurServicesEssentiels:
        arbDesigneOperateurServicesEssentiels.non,
      typeStructure: arbTypeStructure.privee,
      trancheCA: arbTranche.petit,
      trancheNombreEmployes: arbTranche.petit,
      etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
    })
    .chain(
      ajouteAuMoinsUneActiviteListee,
    ) as fc.Arbitrary<IDonneesBrutesFormulaireSimulateur>;
