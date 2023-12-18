import { fc } from "@fast-check/vitest";
import {
  ajouteArbitraireActivites,
  ajouteAuMoinsUneActiviteAutre,
  ajouteAuMoinsUneActiviteListee,
  etend,
  fabriqueArbContraintSurTrancheCA,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires";
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
import {
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import { predicatDonneesFormulaire } from "../../../src/Domaine/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { estSecteurParmi } from "../../../src/Domaine/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement } from "../../../src/Domaine/Simulateur/Eligibilite.constantes";
import { exerceUniquementActivitesDansListe } from "../../../src/Domaine/Simulateur/services/Activite/Activite.predicats";
import { arbFournisseursInfrastructureNumerique } from "./arbitrairesSimulateur.infrastructuresNumeriques";
import { ArbitraireFormulaire } from "./arbitraireFormulaire.definitions";

export const arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  etend(
    arbFournisseursInfrastructureNumerique.fournisseursInfrastructureNumerique,
  )
    .avec({ trancheCA: fabriqueArbTrancheSingleton() })
    .filter(
      exerceUniquementActivitesDansListe(
        ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
      ),
    )
    .chain(
      fabriqueArbContraintSurTrancheCA,
    ) as fc.Arbitrary<IDonneesFormulaireSimulateur>;

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
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteListee);

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
  .chain(ajouteArbitraireActivites) as ArbitraireFormulaire;

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
  .filter((d) => d.activites.length > 0);

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
    .filter((d) => d.activites.length > 0);

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
    .filter((d) => d.activites.length > 0);
