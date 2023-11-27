import { fc } from "@fast-check/vitest";
import {
  ajouteAuMoinsUneActiviteAutre,
  etend,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../utilitaires/manipulationArbitraires";
import { arbSecteursSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import { arbDesigneOperateurServicesEssentiels } from "./arbitraireChampFormulaire";
import { ValeursAppartenancePaysUnionEuropeenne } from "../../src/Simulateur/ChampsSimulateur.valeurs";
import { DonneesSectorielles } from "../utilitaires/manipulationArbitraires.declarations";
import { ArbitraireFormulaire } from "./arbitraireFormulaire.definitions";

export const arbActivitesAutres = etend<DonneesSectorielles>(
  arbSecteursSousSecteursListes,
)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    typeStructure: fc.constant(["privee"]),
    trancheCA: fabriqueArbTrancheSingleton(),
    trancheNombreEmployes: fabriqueArbTrancheSingleton(),
    etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
  })
  .chain(ajouteAuMoinsUneActiviteAutre)
  .filter((d) => d.activites.length > 0) as ArbitraireFormulaire;
