import { fc } from "@fast-check/vitest";
import { DonneesSectorielles } from "../../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import {
  ajouteAuMoinsUneActiviteAutre,
  ajouteChampsFacultatifs,
  etend,
} from "../../../utilitaires/manipulationArbitraires";
import { PiocheDonneesForm } from "../../../utilitaires/manipulationArbitraires.declarations";
import { fabriqueArbTrancheSingleton } from "../../../utilitaires/manipulationArbitraires.fabriques";
import { arbSecteursSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import {
  arbappartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
} from "../ValeursChampsSimulateur.arbitraire";

export const arbActivitesAutres = etend<DonneesSectorielles>(
  arbSecteursSousSecteursListes,
)
  .avec<
    PiocheDonneesForm<
      | "designationOperateurServicesEssentiels"
      | "typeStructure"
      | "trancheChiffreAffaire"
      | "trancheNombreEmployes"
      | "appartenancePaysUnionEuropeenne"
    >
  >({
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: fc.constant(["privee"]),
    trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
    trancheNombreEmployes: fabriqueArbTrancheSingleton(),
    appartenancePaysUnionEuropeenne: arbappartenancePaysUnionEuropeenne.france,
  })
  .chain(ajouteAuMoinsUneActiviteAutre)
  .chain(ajouteChampsFacultatifs)
  .filter((d) => d.activites.length > 0)
  .chain(ajouteChampsFacultatifs);
