import { fc } from "@fast-check/vitest";
import { non } from "../../../../../utils/services/commun.predicats";
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
} from "../../../utilitaires/manipulationArbitraires.DonneesFormulaireExtensibles";
import {
  fabriqueArbContraintSurtrancheChiffreAffaire,
  fabriqueArbTrancheSingleton,
} from "../../../utilitaires/manipulationArbitraires.fabriques";
import {
  arbappartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbTypeStructure,
} from "../ValeursChampsSimulateur.arbitraire";
import {
  arbEnrAutresSecteursSousSecteurs,
  arbSecteursEtSousSecteursListes,
  arbSecteursSousSecteursListes,
} from "./arbitrairesSimulateur.valeursSectorielles";

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
