import { fc } from "@fast-check/vitest";
import {
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "../../src/Simulateur/DonneesFormulaire";
import {
  ajouteAuMoinsUneActiviteListee,
  DonneesSectorielles,
  etend,
  fabriqueArbContraintSurTrancheCA,
  fabriqueArbEnrSecteurSousSecteurs,
  fabriqueArbTrancheSingleton,
} from "../../../anssi-nis2-ui/test/utilitaires/manipulationArbitraires";
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
export const arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernes: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    (d: IDonneesBrutesFormulaireSimulateur) =>
      d.activites.some((a) =>
        ValeursActivitesConcernesInfrastructureNumerique.includes(a),
      ),
  );
export const arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernesFrance: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    (d: IDonneesBrutesFormulaireSimulateur) =>
      d.activites.every((a) =>
        ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement.includes(
          a,
        ),
      ),
  );
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
export const arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbNonOSEPrivesPetitFournisseurInfraNum.filter(
    (d: IDonneesBrutesFormulaireSimulateur) =>
      d.activites.every(
        (a) =>
          !ValeursActivitesConcernesInfrastructureNumerique.includes(a) &&
          !ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement.includes(
            a,
          ),
      ),
  );
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
    .chain(ajouteAuMoinsUneActiviteListee);
