import { predicatDonneesFormulaire } from "../../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  ajouteAuMoinsUneActiviteArbitraire,
  ajouteChampsFacultatifs,
  etend,
} from "../../../utilitaires/manipulationArbitraires.DonneesFormulaireExtensibles";
import {
  fabriqueArbContraintSurtrancheChiffreAffaire,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../../utilitaires/manipulationArbitraires.fabriques";
import { arbSecteursEtSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import { ValeursTypeEntitePublique } from "../../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  arbappartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbTypeStructure,
} from "../ValeursChampsSimulateur.arbitraire";

export const arbNonOSEPublique = etend(arbSecteursEtSousSecteursListes)
  .avec({
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.publique,
    typeEntitePublique: fabriqueArbSingleton(ValeursTypeEntitePublique),
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEuropeenne: arbappartenancePaysUnionEuropeenne.france,
  })
  .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
  .chain(ajouteAuMoinsUneActiviteArbitraire)
  .chain(ajouteChampsFacultatifs)
  .filter(predicatDonneesFormulaire.auMoins.une.activiteListee);
