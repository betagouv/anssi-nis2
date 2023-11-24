import {
  ajouteAuMoinsUneActiviteArbitraire,
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
import { ValeursTypeEntitePublique } from "../../../../anssi-nis2-domain/src/Simulateur/ChampsSimulateur.valeurs";
import { IDonneesBrutesFormulaireSimulateur } from "../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import { predicatDonneesFormulaire } from "../../../../anssi-nis2-domain/src/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";

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
  .filter(predicatDonneesFormulaire.auMoins.une.activiteListee);
