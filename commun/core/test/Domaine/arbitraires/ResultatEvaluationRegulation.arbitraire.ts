import { fc } from "@fast-check/vitest";
import { ens } from "../../../../utils/services/sets.operations";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursTypeEntitePublique } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { resultatIncertain } from "../../../src/Domain/Simulateur/Regulation.constantes";
import { FabriqueEtatDonneesSimulateur } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique";
import { ResultatEvaluationRegulation } from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definition";
import {
  fabriqueResultatEvaluationEnSuspens,
  fabriqueResultatEvaluationInconnu,
} from "../../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.fabriques";
import {
  DefinitionStructure,
  DefinitionStructurePetit,
  InformationsSecteurPetit,
  ReponseDesigneOperateurServicesEssentiels,
  ReponseEtatInformationsSecteur,
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

const arbStructurePetitPrive = fc.constant<DefinitionStructurePetit>({
  _categorieTaille: "Petit" as const,
  typeStructure: "privee",
  trancheChiffreAffaire: "petit",
  trancheNombreEmployes: "petit",
});

const arbStructurePetitPublic = fc
  .constantFrom<TypeEntitePublique>(...ValeursTypeEntitePublique)
  .map<DefinitionStructurePetit>((typeEntitePublique) => ({
    _categorieTaille: "Petit" as const,
    typeStructure: "publique",
    trancheNombreEmployes: "petit",
    typeEntitePublique: typeEntitePublique,
  }));

const arbStructurePetit = fc.oneof(
  arbStructurePetitPrive,
  arbStructurePetitPublic,
);

// const arbStructure = fc.oneof(arbStructurePetit);

const arbInformationsSecteurPetitAutre =
  fc.constantFrom<InformationsSecteurPetit>(
    {
      _categorieTaille: "Petit" as const,
      secteurs: ens({
        secteurActivite: "autreSecteurActivite",
      }),
    },
    {
      _categorieTaille: "Petit" as const,
      secteurs: ens({
        secteurActivite: "fabrication",
        sousSecteurActivite: "autreSousSecteurFabrication",
      }),
    },
  );

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
const fabriqueResultatEvaluationEnSuspensStructure = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
  structure,
]: [
  ReponseDesigneOperateurServicesEssentiels,
  ReponseLocalisation,
  DefinitionStructure,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "AppartenancePaysUnionEuropeenne",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.structureChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
    ),
  );

const fabriqueResultatEvaluationDefinitifSecteurPetit = ([
  designationOperateurServicesEssentiel,
  appartenancePaysUnionEuropeenne,
  structure,
  informationsSecteur,
]: [
  ReponseDesigneOperateurServicesEssentiels,
  ReponseLocalisation,
  DefinitionStructurePetit,
  InformationsSecteurPetit,
]) =>
  fabriqueResultatEvaluationEnSuspens(
    "Structure",
    resultatIncertain,
    FabriqueEtatDonneesSimulateur.informationsSecteurPetitChaine(
      designationOperateurServicesEssentiel,
      appartenancePaysUnionEuropeenne,
      structure,
      informationsSecteur,
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

export const arbResultatEvaluationRegulationEnSuspensApresLocalisation = fc
  .tuple(
    arbDesignationOperateurServicesEssentielsJamaisOui,
    arbAppartenanceUnionEuropeenneToujoursFrance,
    arbStructurePetit,
  )
  .map(fabriqueResultatEvaluationEnSuspensStructure);

export const arbResultatEvaluationRegulationEnSuspensApresStructure = fc
  .tuple(
    arbDesignationOperateurServicesEssentielsJamaisOui,
    arbAppartenanceUnionEuropeenneToujoursFrance,
    arbStructurePetit,
    arbInformationsSecteurPetitAutre,
  )
  .map(fabriqueResultatEvaluationDefinitifSecteurPetit);

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
