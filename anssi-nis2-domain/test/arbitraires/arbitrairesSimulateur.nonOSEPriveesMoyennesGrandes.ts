import { fc } from "@fast-check/vitest";

import {
  arbEnrAutresSecteursSousSecteurs,
  arbSecteursEtSousSecteursListes,
  arbSecteursSousSecteursListes,
} from "./arbitrairesSimulateur.valeursSectorielles";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";
import { IDonneesBrutesFormulaireSimulateur } from "../../src/Simulateur/DonneesFormulaire";
import { predicatDonneesFormulaire } from "../../src/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { estSecteurParmi } from "../../src/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import {
  ajouteArbitraireActivites,
  ajouteAuMoinsUneActiviteAutre,
  ajouteAuMoinsUneActiviteListee,
  etend,
  fabriqueArbContraintSurTrancheCA,
  fabriqueArbTrancheSingleton,
} from "../utilitaires/manipulationArbitraires";
import { ArbitraireFormulaire } from "./arbitraireFormulaire.definitions";

export const arbNonOSEPrivesMoyenneGrande = etend(
  arbSecteursEtSousSecteursListes.filter((d) =>
    d.secteurActivite.every(
      (s) =>
        !estSecteurParmi(s)([
          "gestionServicesTic",
          "fournisseursNumeriques",
          "infrastructureNumerique",
        ]),
    ),
  ),
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheCA: fabriqueArbTrancheSingleton(),
    etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain<IDonneesBrutesFormulaireSimulateur>(
    ajouteAuMoinsUneActiviteListee,
  ) as ArbitraireFormulaire;
export const arbNonOSEPrivesMoyenneGrandeAutresValeursSectorielles = etend(
  arbEnrAutresSecteursSousSecteurs,
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheCA: fabriqueArbTrancheSingleton(),
    etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain<IDonneesBrutesFormulaireSimulateur>(
    ajouteArbitraireActivites,
  ) as ArbitraireFormulaire;
export const arbNonOSEPrivesMoyenneGrandeAutresActivites = etend(
  arbSecteursSousSecteursListes,
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheCA: fabriqueArbTrancheSingleton(),
    etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteAutre)
  .filter(predicatDonneesFormulaire.uniquement.activiteAutre)
  .filter((d) => d.activites.length > 0) as ArbitraireFormulaire;

export const arbNonOSEPrivesMoyenGrandGestionTic: fc.Arbitrary<IDonneesBrutesFormulaireSimulateur> =
  etend(
    fc.record({
      secteurActivite: fc.constant(["gestionServicesTic"]),
      sousSecteurActivite: fc.constant([]),
    }),
  )
    .avec({
      designeOperateurServicesEssentiels:
        arbDesigneOperateurServicesEssentiels.non,
      typeStructure: arbTypeStructure.privee,
      trancheCA: fabriqueArbTrancheSingleton(),
      etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
    })
    .chain(fabriqueArbContraintSurTrancheCA)
    .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteListee)
    .filter((d) => d.activites.length > 0) as ArbitraireFormulaire;

export const arbNonOSEPrivesMoyenGrandFournisseurNumerique: fc.Arbitrary<IDonneesBrutesFormulaireSimulateur> =
  etend(
    fc.record({
      secteurActivite: fc.constant(["fournisseursNumeriques"]),
      sousSecteurActivite: fc.constant([]),
    }),
  )
    .avec({
      designeOperateurServicesEssentiels:
        arbDesigneOperateurServicesEssentiels.non,
      typeStructure: arbTypeStructure.privee,
      trancheCA: fabriqueArbTrancheSingleton(),
      etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
    })
    .chain(fabriqueArbContraintSurTrancheCA)
    .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteListee)
    .filter((d) => d.activites.length > 0) as ArbitraireFormulaire;
