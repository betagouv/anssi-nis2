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
import {
  ArbitraireFormulaire,
  ArbitraireSurTousLesChamps,
} from "./arbitraireFormulaire.definitions";
import { ValeursNomChampsFormulaire } from "../../../src/Domaine/Simulateur/DonneesFormulaire.valeurs";
import {
  arbAppartenancePaysUnionEuropeenne,
  arbDesigneOperateurServicesEssentiels,
} from "./arbitraireChampFormulaire";

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
}) as ArbitraireFormulaire;

export const arbHorsUe: ArbitraireFormulaire = etend(arbToutesValeursPossibles)
  .avec({
    designeOperateurServicesEssentiels:
      arbDesigneOperateurServicesEssentiels.non,
    etatMembre: arbAppartenancePaysUnionEuropeenne.horsue,
  })
  .chain(ajouteAuMoinsUneActiviteListee);

const fabriqueArbitraireVidePourChamp = (nom: string) =>
  etend(arbToutesValeursPossibles).avec({
    [nom]: fc.constant([]),
  }) as ArbitraireFormulaire;

const initialValue: ArbitraireSurTousLesChamps = {
  activites: undefined,
  designeOperateurServicesEssentiels: undefined,
  etatMembre: undefined,
  secteurActivite: undefined,
  sousSecteurActivite: undefined,
  trancheCA: undefined,
  trancheNombreEmployes: undefined,
  typeEntitePublique: undefined,
  typeStructure: undefined,
};
export const donneeAbsente = ValeursNomChampsFormulaire.reduce(
  (resultat, nom) => ({
    ...resultat,
    [nom]: fabriqueArbitraireVidePourChamp(nom),
  }),
  initialValue,
);
