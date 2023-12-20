import { fc } from "@fast-check/vitest";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursTypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { IDonneesBrutesFormulaireSimulateur } from "../../../src/Domain/Simulateur/DonneesFormulaire";
import { ValeursNomChampsFormulaire } from "../../../src/Domain/Simulateur/DonneesFormulaire.valeurs";

import {
  ajouteAuMoinsUneActiviteListee,
  etend,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires";
import { arbSecteursSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import { ArbitraireSurTousLesChamps } from "./arbitraireFormulaire.definitions";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
} from "./arbitraireChampFormulaire";
import { arbFormulaireVide } from "./arbitraireFormulaire.constantes";

export const arbToutesValeursPossibles = etend(
  arbSecteursSousSecteursListes,
).avec({
  designeOperateurServicesEssentiels: fabriqueArbSingleton([
    "oui",
    "non",
    "nsp",
  ]),
  typeStructure: fabriqueArbSingleton(["privee", "publique"]),
  typeEntitePublique: fabriqueArbSingleton(ValeursTypeEntitePublique),
  trancheCA: fabriqueArbTrancheSingleton(),
  trancheNombreEmployes: fabriqueArbTrancheSingleton(),
  etatMembre: fabriqueArbSingleton(ValeursAppartenancePaysUnionEuropeenne),
});

export const arbHorsUe: fc.Arbitrary<IDonneesBrutesFormulaireSimulateur> =
  etend(arbToutesValeursPossibles)
    .avec({
      designeOperateurServicesEssentiels:
        arbDesigneOperateurServicesEssentiels.non,
      etatMembre: arbAppartenancePaysUnionEuropeenne.horsue,
    })
    .chain(ajouteAuMoinsUneActiviteListee);

const initialValue: ArbitraireSurTousLesChamps = {
  activites: arbFormulaireVide,
  designeOperateurServicesEssentiels: arbFormulaireVide,
  etatMembre: arbFormulaireVide,
  secteurActivite: arbFormulaireVide,
  sousSecteurActivite: arbFormulaireVide,
  trancheCA: arbFormulaireVide,
  trancheNombreEmployes: arbFormulaireVide,
  typeEntitePublique: arbFormulaireVide,
  typeStructure: arbFormulaireVide,
  fournitServicesUnionEuropeenne: arbFormulaireVide,
  localisationRepresentant: arbFormulaireVide,
};
export const donneeAbsente = ValeursNomChampsFormulaire.reduce(
  (resultat, nom) => ({
    ...resultat,
    [nom]: arbFormulaireVide,
  }),
  initialValue,
);
