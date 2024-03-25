import { fc } from "@fast-check/vitest";
import { ens } from "../../../../utils/services/sets.operations";
import { TypeStructure } from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  fabriqueRegule,
  resultatReguleOSE,
} from "../../../src/Domain/Simulateur/ResultatRegulation.fabrique";
import { resultatIncertain } from "../../../src/Domain/Simulateur/Regulation.constantes";
import {
  CausesRegulation,
  ResultatRegulationEntite,
} from "../../../src/Domain/Simulateur/Regulation.definitions";
import { ReponseInformationsSecteur } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.definitions";
import { ReponseStructure } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";

export const generateurResultatRegulationConstants = fc.constantFrom(
  resultatIncertain,
  resultatReguleOSE,
);

export const generateurResultatRegulationInfranum = fc
  .record<CausesRegulation>({
    Structure: fc.constant<ReponseStructure<TypeStructure, "Moyen">>({
      typeStructure: "privee",
      _categorieTaille: "Moyen",
      trancheChiffreAffaire: "moyen",
      trancheNombreEmployes: "moyen",
    }),
    InformationsSecteur: fc.constant<ReponseInformationsSecteur<"Moyen">>({
      _categorieTaille: "Moyen",
      secteurs: ens({
        _categorieTaille: "Moyen",
        secteurActivite: "infrastructureNumerique",
        activites: ens(
          "registresNomsDomainesPremierNiveau",
          "fournisseurServicesDNS",
        ),
        paysDecisionsCyber: "france",
      }),
    }),
  })
  .chain((cause) =>
    fc.constant(fabriqueRegule(cause)),
  ) as fc.Arbitrary<ResultatRegulationEntite>;

export const arbitrairesResultatRegulation = fc.oneof(
  generateurResultatRegulationConstants,
  generateurResultatRegulationInfranum,
);
