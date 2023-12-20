import { fc } from "@fast-check/vitest";
import { ValeursAppartenancePaysUnionEuropeenne } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { DonneesSectorielles } from "../../../src/Domain/Simulateur/DonneesFormulaire";
import {
  ajouteAuMoinsUneActiviteAutre,
  ajouteChampsFacultatifs,
  etend,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires";
import { PiocheDonneesForm } from "../../utilitaires/manipulationArbitraires.declarations";
import { arbSecteursSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import { arbDesigneOperateurServicesEssentiels } from "./arbitraireChampFormulaire";

export const arbActivitesAutres = etend<DonneesSectorielles>(
  arbSecteursSousSecteursListes
)
  .avec<
    PiocheDonneesForm<
      | "designeOperateurServicesEssentiels"
      | "typeStructure"
      | "trancheCA"
      | "trancheNombreEmployes"
      | "etatMembre"
    >
  >({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: fc.constant(["privee"]),
    trancheCA: fabriqueArbTrancheSingleton(),
    trancheNombreEmployes: fabriqueArbTrancheSingleton(),
    etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
  })
  .chain(ajouteAuMoinsUneActiviteAutre)
  .chain(ajouteChampsFacultatifs)
  .filter((d) => d.activites.length > 0);
