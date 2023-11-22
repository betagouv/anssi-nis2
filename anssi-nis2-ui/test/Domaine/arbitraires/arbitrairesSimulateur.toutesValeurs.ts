import { fc } from "@fast-check/vitest";
import {
  etend,
  fabriqueArbSingleton,
  fabriqueArbTrancheSingleton,
} from "../../utilitaires/manipulationArbitraires";
import { arbSecteursSousSecteursListes } from "./arbitrairesSimulateur.valeursSectorielles";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursTypeEntitePublique,
} from "../../../src/Domaine/Simulateur/ChampsSimulateur.valeurs";
import { ArbitraireFormulaire } from "./arbitraireFormulaire.definitions";
import { NomsChampsSimulateur } from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import { ValeursNomChampsFormulaire } from "../../../src/Domaine/Simulateur/DonneesFormulaire.valeurs";

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
type ArbitraireSurTousLesChamps = Record<
  NomsChampsSimulateur,
  ArbitraireFormulaire
>;
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
