import { fc } from "@fast-check/vitest";
import { ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement } from "../../../src/Domain/Simulateur/Eligibilite.constantes";
import { exerceUniquementActivitesDansListe } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { estSecteurParmi } from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import {
  ajouteArbitraireActivites,
  ajouteAuMoinsUneActiviteAutre,
  ajouteAuMoinsUneActiviteListee,
  ajouteChampsFacultatifs,
  etend,
  fabriqueArbContraintSurtrancheChiffreAffaire,
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
import { arbNonOSEPrivesPetitFournisseurInfraNum } from "./arbitrairesSimulateur.infrastructuresNumeriques";
import { ArbitraireFormulaire } from "./arbitraireFormulaire.definitions";

export const arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance =
  etend(arbNonOSEPrivesPetitFournisseurInfraNum)
    .avec({ trancheChiffreAffaire: fabriqueArbTrancheSingleton() })
    .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
    .filter(
      exerceUniquementActivitesDansListe(
        ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement
      )
    )
    .chain(ajouteChampsFacultatifs);

export const arbNonOSEPrivesMoyenneGrande = etend(
  arbSecteursEtSousSecteursListes.filter((d) =>
    d.secteurActivite.every(
      (s) =>
        !estSecteurParmi(s)([
          "gestionServicesTic",
          "fournisseursNumeriques",
          "infrastructureNumerique",
        ])
    )
  )
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEurpopeenne: arbAppartenancePaysUnionEuropeenne.france,
  })
  .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs);

export const arbNonOSEPrivesMoyenneGrandeAutresValeursSectorielles = etend(
  arbEnrAutresSecteursSousSecteurs
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEurpopeenne: arbAppartenancePaysUnionEuropeenne.france,
  })
  .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
  .chain(ajouteArbitraireActivites) as ArbitraireFormulaire;

export const arbNonOSEPrivesMoyenneGrandeAutresActivites = etend(
  arbSecteursSousSecteursListes
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEurpopeenne: arbAppartenancePaysUnionEuropeenne.france,
  })
  .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
  .chain(ajouteAuMoinsUneActiviteAutre)
  .chain(ajouteChampsFacultatifs)
  // .filter(predicatDonneesFormulaire.uniquement.activiteAutre)
  .filter((d) => d.activites.length > 0);

export const arbNonOSEPrivesMoyenGrandGestionTic = etend(
  fc.record({
    secteurActivite: fc.constant(["gestionServicesTic"]),
    sousSecteurActivite: fc.constant([]),
  })
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEurpopeenne: arbAppartenancePaysUnionEuropeenne.france,
  })
  .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs)
  .filter((d) => d.activites.length > 0);

export const arbNonOSEPrivesMoyenGrandFournisseurNumerique = etend(
  fc.record({
    secteurActivite: fc.constant(["fournisseursNumeriques"]),
    sousSecteurActivite: fc.constant([]),
  })
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEurpopeenne: arbAppartenancePaysUnionEuropeenne.france,
  })
  .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs)
  .filter((d) => d.activites.length > 0);
