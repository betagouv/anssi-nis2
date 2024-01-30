import { TypeStructure } from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursTypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { ValeursNomChampsFormulaire } from "../../../src/Domain/Simulateur/DonneesFormulaire.valeurs";

import {
  ajouteAuMoinsUneActiviteListee,
  ajouteChampsFacultatifs,
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
  arbSecteursSousSecteursListes
).avec({
  designeOperateurServicesEssentiels: fabriqueArbSingleton([
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
  appartenancePaysUnionEurpopeenne: fabriqueArbSingleton(
    ValeursAppartenancePaysUnionEuropeenne
  ),
});

export const arbHorsUe = etend(arbToutesValeursPossibles)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    appartenancePaysUnionEurpopeenne: arbAppartenancePaysUnionEuropeenne.horsue,
  })
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs);
export const arbAutrePaysUe = etend(arbToutesValeursPossibles)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    appartenancePaysUnionEurpopeenne: arbAppartenancePaysUnionEuropeenne.autre,
  })
  .chain(ajouteAuMoinsUneActiviteListee)
  .chain(ajouteChampsFacultatifs);

const initialValue: ArbitraireSurTousLesChamps = {
  activites: arbFormulaireVide,
  designeOperateurServicesEssentiels: arbFormulaireVide,
  appartenancePaysUnionEurpopeenne: arbFormulaireVide,
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
  initialValue
);
