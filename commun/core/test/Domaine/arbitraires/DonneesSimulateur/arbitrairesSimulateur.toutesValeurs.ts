import { fc } from "@fast-check/vitest";
import { TypeStructure } from "../../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  ValeursappartenancePaysUnionEuropeenne,
  ValeursTypeEntitePublique,
} from "../../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { ValeursNomChampsFormulaire } from "../../../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.valeurs";

import {
  ajouteAuMoinsUneActiviteListee,
  ajouteChampsFacultatifs,
  etend,
} from "../../../utilitaires/manipulationArbitraires.DonneesFormulaireExtensibles";
import {
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../../utilitaires/manipulationArbitraires.fabriques";
import { arbFormulaireVide } from "./DonneesFormulaireSimulateur.arbitraires";
import { arbSecteursSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import {
  arbappartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
} from "../ValeursChampsSimulateur.arbitraire";

export const arbToutesValeursPossibles = etend(
  arbSecteursSousSecteursListes,
).avec({
  designationOperateurServicesEssentiels: fabriqueArbSingleton([
    "oui",
    "non",
    "nsp",
  ]),
  typeStructure: fabriqueArbSingleton([
    "privee",
    "publique",
  ] as TypeStructure[]),
  typeEntitePublique: fabriqueArbSingleton(ValeursTypeEntitePublique),
  trancheChiffreAffaire: fabriqueArbTrancheSingleton(),
  trancheNombreEmployes: fabriqueArbTrancheSingleton(),
  appartenancePaysUnionEuropeenne: fabriqueArbSingleton(
    ValeursappartenancePaysUnionEuropeenne,
  ),
});

export const arbHorsUe = etend(arbToutesValeursPossibles)
  .avec({
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    appartenancePaysUnionEuropeenne: arbappartenancePaysUnionEuropeenne.horsue,
  })
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs);
export const arbAutrePaysUe = etend(arbToutesValeursPossibles)
  .avec({
    designationOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    appartenancePaysUnionEuropeenne: arbappartenancePaysUnionEuropeenne.autre,
  })
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs);

const initialValue: Record<
  NomsChampsSimulateur,
  fc.Arbitrary<DonneesFormulaireSimulateur>
> = {
  activites: arbFormulaireVide,
  designationOperateurServicesEssentiels: arbFormulaireVide,
  appartenancePaysUnionEuropeenne: arbFormulaireVide,
  secteurActivite: arbFormulaireVide,
  sousSecteurActivite: arbFormulaireVide,
  trancheChiffreAffaire: arbFormulaireVide,
  trancheNombreEmployes: arbFormulaireVide,
  typeEntitePublique: arbFormulaireVide,
  typeStructure: arbFormulaireVide,
  localisationFournitureServicesNumeriques: arbFormulaireVide,
  paysDecisionsCyber: arbFormulaireVide,
  paysOperationsCyber: arbFormulaireVide,
  paysPlusGrandNombreSalaries: arbFormulaireVide,
};
export const donneeAbsente = ValeursNomChampsFormulaire.reduce(
  (resultat, nom) => ({
    ...resultat,
    [nom]: arbFormulaireVide,
  }),
  initialValue,
);
