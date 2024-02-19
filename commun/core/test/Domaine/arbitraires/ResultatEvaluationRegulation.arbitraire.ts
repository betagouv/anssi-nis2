import { fc } from "@fast-check/vitest";
import { ens } from "../../../../utils/services/sets.operations";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { resultatIncertain } from "../../../src/Domain/Simulateur/Regulation.constantes";
import { FabriqueEtatDonneesSimulateur } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique";
import { ResultatEvaluationRegulation } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definition";
import {
  fabriqueResultatEvaluationEnSuspens,
  fabriqueResultatEvaluationInconnu,
} from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.fabriques";
import {
  ReponseDesigneOperateurServicesEssentiels,
  ReponseEtatInformationsSecteur,
  ReponseEtatStructure,
  ReponseLocalisation,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";

const arbDesignationOperateurServicesEssentielsToujoursOui = fc.constant({
  designationOperateurServicesEssentiels: "oui" as const,
});
const arbDesignationOperateurServicesEssentielsJamaisOui = fc.record({
  designationOperateurServicesEssentiels:
    fc.constantFrom<DesignationOperateurServicesEssentiels>("non", "nsp"),
});

const arbAppartenanceUnionEuropeenneToujoursFrance = fc.record({
  appartenancePaysUnionEuropeenne:
    fc.constant<AppartenancePaysUnionEuropeenne>("france"),
});

const arbAppartenanceUnionEuropeenneJamaisFrance = fc.record({
  appartenancePaysUnionEuropeenne:
    fc.constantFrom<AppartenancePaysUnionEuropeenne>("horsue", "autre"),
});

const fabriqueResultatEvaluationInconnuOse = (
  designationOperateurServicesEssentiels: ReponseDesigneOperateurServicesEssentiels,
) =>
  fabriqueResultatEvaluationInconnu({
    _tag: "DesignationOperateurServicesEssentiels",
    DesignationOperateurServicesEssentiels:
      designationOperateurServicesEssentiels,
  });

const fabriqueResultatEvaluationEnSuspensAppUE = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
]: [ReponseDesigneOperateurServicesEssentiels, ReponseLocalisation]) =>
  fabriqueResultatEvaluationEnSuspens(
    "AppartenancePaysUnionEuropeenne",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.appartenancePaysUnionEuropeenneChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
    ),
  );

export const arbResultatEvaluationRegulationDesigneeOse =
  arbDesignationOperateurServicesEssentielsToujoursOui.map(
    fabriqueResultatEvaluationInconnuOse,
  ) as fc.Arbitrary<ResultatEvaluationRegulation>;

export const arbResultatEvaluationRegulationNonOse =
  arbDesignationOperateurServicesEssentielsJamaisOui.map(
    fabriqueResultatEvaluationInconnuOse,
  ) as fc.Arbitrary<ResultatEvaluationRegulation>;
export const arbResultatEvaluationRegulationEnSuspensApresLocalisationFrance =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneToujoursFrance,
    )
    .map(
      fabriqueResultatEvaluationEnSuspensAppUE,
    ) as fc.Arbitrary<ResultatEvaluationRegulation>;
export const arbResultatEvaluationRegulationEnSuspensApresLocalisationHorsFrance =
  fc
    .tuple(
      arbDesignationOperateurServicesEssentielsJamaisOui,
      arbAppartenanceUnionEuropeenneJamaisFrance,
    )
    .map(
      fabriqueResultatEvaluationEnSuspensAppUE,
    ) as fc.Arbitrary<ResultatEvaluationRegulation>;

const reponseIncertainEtapeStructure: ResultatEvaluationRegulation &
  ReponseEtatStructure = {
  _tag: "Structure",
  _resultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee: "AppartenancePaysUnionEuropeenne",
  ...resultatIncertain,
  DesignationOperateurServicesEssentiels: {
    designationOperateurServicesEssentiels: "non",
  },
  AppartenancePaysUnionEuropeenne: {
    appartenancePaysUnionEuropeenne: "france",
  },
  Structure: {
    _categorieTaille: "Petit",
    typeStructure: "privee",
    trancheChiffreAffaire: "petit",
    trancheNombreEmployes: "petit",
  },
};

export const arbResultatEvaluationRegulationEnSuspensApresOseStructure =
  fc.constant(reponseIncertainEtapeStructure);

const reponseIncertainEtapeSecteur: ResultatEvaluationRegulation &
  ReponseEtatInformationsSecteur = {
  _tag: "InformationsSecteur",
  _resultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee: "Structure",
  ...resultatIncertain,
  DesignationOperateurServicesEssentiels: {
    designationOperateurServicesEssentiels: "non",
  },
  AppartenancePaysUnionEuropeenne: {
    appartenancePaysUnionEuropeenne: "france",
  },
  Structure: {
    _categorieTaille: "Petit",
    typeStructure: "privee",
    trancheChiffreAffaire: "petit",
    trancheNombreEmployes: "petit",
  },
  InformationsSecteur: {
    _categorieTaille: "Petit",
    secteurs: ens({
      secteurActivite: "autreSecteurActivite",
    }),
  },
};

export const arbResultatEvaluationRegulationEnSuspensApresStructurePriveePetite =
  fc.constant(reponseIncertainEtapeSecteur);
