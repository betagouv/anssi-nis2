import { fc } from "@fast-check/vitest";
import {
  ajouteAuMoinsUneActiviteListee,
  etend,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires";
import { arbSecteursSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursTypeEntitePublique,
} from "../../../src/Domaine/Simulateur/ChampsSimulateur.valeurs";
import { ArbitraireSurTousLesChamps } from "./arbitraireFormulaire.definitions";
import { ValeursNomChampsFormulaire } from "../../../src/Domaine/Simulateur/DonneesFormulaire.valeurs";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
} from "./arbitraireChampFormulaire";
import { arbFormulaireVide } from "./arbitraireFormulaire.constantes";
import { IDonneesBrutesFormulaireSimulateur } from "../../../src/Domaine/Simulateur/DonneesFormulaire";

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
