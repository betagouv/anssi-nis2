import { predicatDonneesFormulaire } from "../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  ajouteAuMoinsUneActiviteArbitraire,
  ajouteChampsFacultatifs,
  etend,
  fabriqueArbContraintSurTrancheCA,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires";
import { arbSecteursEtSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";
import { ValeursTypeEntitePublique } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";

export const arbNonOSEPublique = etend(arbSecteursEtSousSecteursListes)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.publique,
    typeEntitePublique: fabriqueArbSingleton(ValeursTypeEntitePublique),
    trancheCA: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEurpopeenne: arbAppartenancePaysUnionEuropeenne.france,
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain(ajouteAuMoinsUneActiviteArbitraire)
  .chain(ajouteChampsFacultatifs)
  .filter(predicatDonneesFormulaire.auMoins.une.activiteListee);
