import { fc } from "@fast-check/vitest";
import { non } from "../../../../../utils/services/commun.predicats";
import { exerceUniquementActivitesDansListe } from "../../../../src/Domain/Simulateur/Activite.predicats";
import { DonneesFormulaireSimulateur } from "../../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import {
  contientSecteurNecessitantLocalisation,
  contientUniquementSecteurNecessitantLocalisation,
} from "../../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  ajouteArbitraireActivites,
  ajouteAuMoinsUneActiviteAutre,
  ajouteAuMoinsUneActiviteListee,
  ajouteChampsFacultatifs,
  etend,
} from "../../../utilitaires/manipulationArbitraires";
import {
  fabriqueArbContraintSurtrancheChiffreAffaire,
  fabriqueArbTrancheSingleton,
} from "../../../utilitaires/manipulationArbitraires.fabriques";
import {
  arbappartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbFournitServiceUnionEuropeenne,
  arbLocalisationRepresentant,
  arbTypeStructure,
} from "../ValeursChampsSimulateur.arbitraire";
import { arbNonOSEPrivesPetitFournisseurInfraNum } from "./arbitrairesSimulateur.infrastructuresNumeriques";
import {
  arbEnrAutresSecteursSousSecteurs,
  arbSecteursEtSousSecteursListes,
  arbSecteursSousSecteursListes,
} from "./arbitrairesSimulateur.valeursSectorielles";

export const arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance =
  etend(arbNonOSEPrivesPetitFournisseurInfraNum)
    .avec({
      trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
      fournitServicesUnionEuropeenne: arbFournitServiceUnionEuropeenne.oui,
      localisationRepresentant: arbLocalisationRepresentant.france,
    })
    .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
    .filter(
      exerceUniquementActivitesDansListe([
        "registresNomsDomainesPremierNiveau",
        "fournisseurServicesDNS",
      ]),
    )
    .chain(ajouteChampsFacultatifs);

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
