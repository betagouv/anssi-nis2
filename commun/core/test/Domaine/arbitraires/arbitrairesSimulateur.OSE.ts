import { ValeursappartenancePaysUnionEuropeenne } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { DonneesFormulaireSimulateur } from "../../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import {
  ajouteArbitraireActivites,
  ajouteChampsFacultatifs,
  etend,
  nommeArbitraire,
  partitionneLocalisationServices,
} from "../../utilitaires/manipulationArbitraires";
import {
  fabriqueArbContraintSurtrancheChiffreAffaire,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires.fabriques";
import { arbitraireSecteursSousSecteurs } from "./arbitrairesSimulateur.valeursSectorielles";
import {
  arbDesigneOperateurServicesEssentiels,
  arbTranche,
  arbTypeStructure,
} from "./ValeursChampsSimulateur.arbitraire";

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
  .chain(ajouteChampsFacultatifs) as fc.Arbitrary<DonneesFormulaireSimulateur>;

export const arbDesigneOSE = {
  petit: partitionneLocalisationServices(
    nommeArbitraire("Petites entités désignées OSE pour NIS 1")(arbOSEPetit),
  ),
  moyenGrand: partitionneLocalisationServices(arbOSEMoyenGrand),
};
