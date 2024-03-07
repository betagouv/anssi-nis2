import { fc } from "@fast-check/vitest";
import { DonneesFormulaireSimulateur } from "../../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement } from "../../../src/Domain/Simulateur/Eligibilite.constantes";
import { exerceUniquementActivitesDansListe } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { non } from "../../../src/Domain/Simulateur/services/ChampSimulateur/champs.predicats";
import {
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
import { arbNonOSEPrivesPetitFournisseurInfraNum } from "./arbitrairesSimulateur.infrastructuresNumeriques";
import {
  arbEnrAutresSecteursSousSecteurs,
  arbSecteursEtSousSecteursListes,
  arbSecteursSousSecteursListes,
} from "./arbitrairesSimulateur.valeursSectorielles";
import {
  arbappartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbFournitServiceUnionEuropeenne,
  arbLocalisationRepresentant,
  arbTypeStructure,
} from "./ValeursChampsSimulateur.arbitraire";

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
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEuropeenne: arbappartenancePaysUnionEuropeenne.france,
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
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEuropeenne: arbappartenancePaysUnionEuropeenne.france,
  })
  .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
  .chain(
    ajouteArbitraireActivites,
  ) as fc.Arbitrary<DonneesFormulaireSimulateur>;

export const arbNonOSEPrivesMoyenneGrandeAutresActivites = etend(
  arbSecteursSousSecteursListes,
)
  .avec({
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEuropeenne: arbappartenancePaysUnionEuropeenne.france,
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
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEuropeenne: arbappartenancePaysUnionEuropeenne.france,
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
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEuropeenne: arbappartenancePaysUnionEuropeenne.france,
    fournitServicesUnionEuropeenne: arbFournitServiceUnionEuropeenne.oui,
    localisationRepresentant: arbLocalisationRepresentant.france,
  })
  .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs)
  .filter((d) => d.activites.length > 0);
