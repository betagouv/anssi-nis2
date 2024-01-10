import { ValeursAppartenancePaysUnionEuropeenne } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  ajouteArbitraireActivites,
  etend,
  fabriqueArbContraintSurTrancheCA,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires";
import {
  arbDesigneOperateurServicesEssentiels,
  arbTranche,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";
import { ArbitraireFormulaire } from "./arbitraireFormulaire.definitions";
import { arbitraireSecteursSousSecteurs } from "./arbitrairesSimulateur.valeursSectorielles";

export const arbOSEPetit = etend(arbitraireSecteursSousSecteurs)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.oui,
    typeStructure: arbTypeStructure.privee,
    trancheCA: arbTranche.petit,
    trancheNombreEmployes: arbTranche.petit,
    appartenancePaysUnionEurpopeenne: fabriqueArbSingleton(
      ValeursAppartenancePaysUnionEuropeenne,
    ),
  })
  .chain(ajouteArbitraireActivites)
  .filter((d) => d.activites.length > 0) as ArbitraireFormulaire;

export const arbOSEMoyenGrand = etend(arbitraireSecteursSousSecteurs)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.oui,
    typeStructure: arbTypeStructure.privee,
    appartenancePaysUnionEurpopeenne: fabriqueArbSingleton(
      ValeursAppartenancePaysUnionEuropeenne,
    ),
    trancheCA: fabriqueArbTrancheSingleton(),
  })
  .chain(fabriqueArbContraintSurTrancheCA)
  .chain(ajouteArbitraireActivites)
  .filter((d) => d.activites.length > 0) as ArbitraireFormulaire;

export const arbDesigneOSE = {
  petit: arbOSEPetit,
  moyenGrand: arbOSEMoyenGrand,
};
