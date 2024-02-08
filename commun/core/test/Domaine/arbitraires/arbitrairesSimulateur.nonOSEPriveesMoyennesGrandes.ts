import { fc } from "@fast-check/vitest";
import { ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement } from "../../../src/Domain/Simulateur/Eligibilite.constantes";
import { exerceUniquementActivitesDansListe } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { non } from "../../../src/Domain/Simulateur/services/ChampSimulateur/champs.predicats";
import {
  contientPetiteEntreprise,
  contientSecteurALocaliser,
  contientSecteurNecessitantLocalisation,
  contientUniquementSecteurNecessitantLocalisation,
} from "../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  ajouteArbitraireActivites,
  ajouteAuMoinsUneActiviteAutre,
  ajouteAuMoinsUneActiviteListee,
  ajouteChampsFacultatifs,
  etend,
  partitionneLocalisationServices,
} from "../../utilitaires/manipulationArbitraires";
import {
  fabriqueArbContraintSurtrancheChiffreAffaire,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires.fabriques";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbFournitServiceUnionEuropeenne,
  arbLocalisationRepresentant,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";
import { ArbitraireFormulaire } from "./arbitraireFormulaire.definitions";
import { arbNonOSEPrivesPetitFournisseurInfraNum } from "./arbitrairesSimulateur.infrastructuresNumeriques";
import {
  arbEnrAutresSecteursSousSecteurs,
  arbSecteursEtSousSecteursListes,
  arbSecteursSousSecteursListes,
} from "./arbitrairesSimulateur.valeursSectorielles";

export const arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance =
  partitionneLocalisationServices(
    etend(arbNonOSEPrivesPetitFournisseurInfraNum)
      .avec({
        trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
        fournitServicesUnionEuropeenne: arbFournitServiceUnionEuropeenne.oui,
        localisationRepresentant: arbLocalisationRepresentant.france,
      })
      .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
      .filter(
        exerceUniquementActivitesDansListe(
          ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
        ),
      )
      .chain(ajouteChampsFacultatifs),
  );

const arbNonOSEPrivesMoyenneGrande = etend(arbSecteursEtSousSecteursListes)
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
export const arbNonOSEPrivesMoyenneGrandeSansBesoinLocalisation =
  arbNonOSEPrivesMoyenneGrande.filter(
    non(contientSecteurNecessitantLocalisation),
  );
export const arbNonOSEPrivesMoyenneGrandeAvecBesoinLocalisation =
  arbNonOSEPrivesMoyenneGrande.filter(
    contientUniquementSecteurNecessitantLocalisation,
  );

export const arbNonOSEPrivesMoyenneGrandeAutresValeursSectorielles = etend(
  arbEnrAutresSecteursSousSecteurs,
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
  arbSecteursSousSecteursListes,
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
  .filter((d) => d.activites.length > 0);

export const arbNonOSEPrivesMoyenGrandGestionTic = etend(
  fc.record({
    secteurActivite: fc.constant(["gestionServicesTic"]),
    sousSecteurActivite: fc.constant([]),
  }),
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEurpopeenne: arbAppartenancePaysUnionEuropeenne.france,
    fournitServicesUnionEuropeenne: arbFournitServiceUnionEuropeenne.oui,
    localisationRepresentant: arbLocalisationRepresentant.france,
  })
  .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs)
  .filter((d) => d.activites.length > 0);

export const arbNonOSEPrivesMoyenGrandFournisseurNumerique = etend(
  fc.record({
    secteurActivite: fc.constant(["fournisseursNumeriques"]),
    sousSecteurActivite: fc.constant([]),
  }),
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEurpopeenne: arbAppartenancePaysUnionEuropeenne.france,
    fournitServicesUnionEuropeenne: arbFournitServiceUnionEuropeenne.oui,
    localisationRepresentant: arbLocalisationRepresentant.france,
  })
  .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs)
  .filter((d) => d.activites.length > 0);
