import { fc } from "@fast-check/vitest";
import {
  ajouteAuMoinsUneActiviteAutre,
  DonneesSectorielles,
  etend,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires";
import { arbSecteursSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import { arbDesigneOperateurServicesEssentiels } from "./arbitraireChampFormulaire";
import { ValeursAppartenancePaysUnionEuropeenne } from "../../../../anssi-nis2-domain/src/Simulateur/ChampsSimulateur.valeurs";
import { IDonneesBrutesFormulaireSimulateur } from "../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire";

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
