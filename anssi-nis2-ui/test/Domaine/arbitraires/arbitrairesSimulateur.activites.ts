import { fc } from "@fast-check/vitest";
import {
  ajouteAuMoinsUneActiviteAutre,
  etend,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires";
import { arbSecteursSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import { arbDesigneOperateurServicesEssentiels } from "./arbitraireChampFormulaire";
import { ValeursAppartenancePaysUnionEuropeenne } from "../../../src/Domaine/Simulateur/ChampsSimulateur.valeurs";
import {
  DonneesSectorielles,
  IDonneesBrutesFormulaireSimulateur,
} from "../../../src/Domaine/Simulateur/DonneesFormulaire";

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
  .chain<IDonneesBrutesFormulaireSimulateur>(ajouteAuMoinsUneActiviteAutre)
  .filter((d) => d.activites.length > 0);
