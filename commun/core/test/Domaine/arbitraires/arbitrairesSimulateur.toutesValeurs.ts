import { TypeStructure } from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  ValeursappartenancePaysUnionEuropeenne,
  ValeursTypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { ValeursNomChampsFormulaire } from "../../../src/Domain/Simulateur/DonneesFormulaire.valeurs";

import {
  ajouteAuMoinsUneActiviteListee,
  ajouteChampsFacultatifs,
  etend,
} from "../../utilitaires/manipulationArbitraires";
import {
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires.fabriques";
import { arbSecteursSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import { ArbitraireSurTousLesChamps } from "./arbitraireFormulaire.definitions";
import {
  arbappartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
} from "./arbitraireChampFormulaire";
import { arbFormulaireVide } from "./arbitraireFormulaire.constantes";

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

const initialValue: ArbitraireSurTousLesChamps = {
  activites: arbFormulaireVide,
  designationOperateurServicesEssentiels: arbFormulaireVide,
  appartenancePaysUnionEuropeenne: arbFormulaireVide,
  secteurActivite: arbFormulaireVide,
  sousSecteurActivite: arbFormulaireVide,
  trancheChiffreAffaire: arbFormulaireVide,
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
