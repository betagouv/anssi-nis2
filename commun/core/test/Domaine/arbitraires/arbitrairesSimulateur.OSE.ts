import { ValeursappartenancePaysUnionEuropeenne } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  ajouteArbitraireActivites,
  ajouteChampsFacultatifs,
  etend,
  partitionneLocalisationServices,
  nommeArbitraire,
} from "../../utilitaires/manipulationArbitraires";
import {
  fabriqueArbContraintSurtrancheChiffreAffaire,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires.fabriques";
import {
  arbDesigneOperateurServicesEssentiels,
  arbTranche,
  arbTypeStructure,
} from "./arbitraireChampFormulaire";
import { ArbitraireFormulaire } from "./arbitraireFormulaire.definitions";
import { arbitraireSecteursSousSecteurs } from "./arbitrairesSimulateur.valeursSectorielles";

export const arbOSEPetit = etend(arbitraireSecteursSousSecteurs)
  .avec({
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.oui,
    typeStructure: arbTypeStructure.privee,
    trancheChiffreAffaire: arbTranche.petit,
    trancheNombreEmployes: arbTranche.petit,
    appartenancePaysUnionEuropeenne: fabriqueArbSingleton(
      ValeursappartenancePaysUnionEuropeenne,
    ),
  })
  .chain(ajouteArbitraireActivites)
  .filter((d) => d.activites.length > 0)
  .chain(ajouteChampsFacultatifs);

export const arbOSEMoyenGrand = etend(arbitraireSecteursSousSecteurs)
  .avec({
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.oui,
    typeStructure: arbTypeStructure.privee,
    appartenancePaysUnionEuropeenne: fabriqueArbSingleton(
      ValeursappartenancePaysUnionEuropeenne,
    ),
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
  })
  .chain(fabriqueArbContraintSurtrancheChiffreAffaire)
  .chain(ajouteArbitraireActivites)
  .filter((d) => d.activites.length > 0)
  .chain(ajouteChampsFacultatifs) as ArbitraireFormulaire;

export const arbDesigneOSE = {
  petit: partitionneLocalisationServices(
    nommeArbitraire("Petites entités désignées OSE pour NIS 1")(arbOSEPetit),
  ),
  moyenGrand: partitionneLocalisationServices(arbOSEMoyenGrand),
};
