import { arbSecteursEtSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";
import { ValeursTypeEntitePublique } from "../../src/Simulateur/ChampsSimulateur.valeurs";
import { IDonneesBrutesFormulaireSimulateur } from "../../src/Simulateur/DonneesFormulaire";
import { predicatDonneesFormulaire } from "../../src/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  ajouteAuMoinsUneActiviteArbitraire,
  etend,
  fabriqueArbContraintSurTrancheCA,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../utilitaires/manipulationArbitraires";
import { ArbitraireFormulaire } from "./arbitraireFormulaire.definitions";

export const arbNonOSEPublique = etend(arbSecteursEtSousSecteursListes)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: arbTypeStructure.publique,
    typeEntitePublique: fabriqueArbSingleton(ValeursTypeEntitePublique),
    trancheCA: fabriqueArbTrancheSingleton(),
    etatMembre: arbAppartenancePaysUnionEuropeenne.franceOuAutre,
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteArbitraire)
  .filter(
    predicatDonneesFormulaire.auMoins.une.activiteListee,
  ) as ArbitraireFormulaire;
