import { match } from "ts-pattern";
import {
  toujourNegatif,
  toujoursFaux,
  toujoursVrai,
} from "../../../../utils/services/commun.predicats";
import { PredicatDonneesSimulateurDefinitions } from "./PredicatDonneesSimulateur.definitions";
import { DonneesFormulaireSimulateur } from "./services/DonneesFormulaire/DonneesFormulaire.definitions";
import {
  CapaciteEtape,
  EtapePrealable,
  EtapeResultat,
  InformationEtapeForm,
  InformationsEtape,
  InformationsEtapesVariantes,
  OptionsInformationEtapeForm,
  SousEtapeConditionnelle,
  TypeEtape,
  VariantesEtape,
} from "./InformationsEtape";
import { ValidationReponses } from "./services/ChampSimulateur/champs.domaine";
import { validationToutesLesReponses } from "./services/ChampSimulateur/ValidationReponses";

const fabriqueInformationsEtapeResultat: (titre: string) => EtapeResultat = (
  titre,
) => ({
  type: "resultat",
  titre: titre,
  longueurComptabilisee: 0,
  existe: true,
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursFaux,
  validationReponses: validationToutesLesReponses,
  varianteAffichee: toujourNegatif,
});

const fabriqueInformationsEtapeForm = (
  titre: string,
  validationReponses: ValidationReponses,
  type: TypeEtape,
  options: Partial<OptionsInformationEtapeForm> = optionsInformationEtapeFormParDefaut,
): InformationEtapeForm => {
  const optionsCompletes = {
    ...optionsInformationEtapeFormParDefaut,
    ...options,
  };
  return {
    type: type,
    titre: titre,
    validationReponses: validationReponses,
    options: optionsCompletes,
    longueurComptabilisee: 1,
    existe: true,
    remplitContitionSousEtape: (donnees: DonneesFormulaireSimulateur) =>
      options.sousEtapeConditionnelle?.condition(donnees) || false,
    estIgnoree: optionsCompletes.ignoreSi,
    varianteAffichee: toujourNegatif,
    fabriqueValidationReponses: () => validationReponses,
  };
};

const fabriqueInformationsEtapeSpeciale = (
  titre: string,
  validationReponses: ValidationReponses,
  type: TypeEtape,
  options: Partial<OptionsInformationEtapeForm> = optionsInformationEtapeFormParDefaut,
): InformationEtapeForm => {
  const optionsCompletes = {
    ...optionsInformationEtapeFormParDefaut,
    ...options,
  };
  return {
    type: type,
    titre: titre,
    validationReponses: validationReponses,
    options: optionsCompletes,
    longueurComptabilisee: 1,
    existe: true,
    remplitContitionSousEtape: (donnees: DonneesFormulaireSimulateur) =>
      options.sousEtapeConditionnelle?.condition(donnees) || false,
    estIgnoree: optionsCompletes.ignoreSi,
    varianteAffichee: toujourNegatif,
    fabriqueValidationReponses: () => validationReponses,
  };
};

const fabriqueInformationEtapePrealable: (titre: string) => EtapePrealable = (
  titre: string,
) => ({
  type: "prealable",
  existe: true,
  longueurComptabilisee: 0,
  titre: titre,
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursFaux,
  validationReponses: validationToutesLesReponses,
  varianteAffichee: toujourNegatif,
});

const fabriqueFonctionEtapeAffichee =
  <TypeEtape extends InformationEtapeForm>(
    variantesEtapes: VariantesEtape<TypeEtape>[],
  ) =>
  (donnees: DonneesFormulaireSimulateur) =>
    variantesEtapes
      .reduce(
        (acc, variante, indice) => acc.with(variante.conditions, () => indice),
        match<DonneesFormulaireSimulateur, number>(donnees),
      )
      .otherwise(() => 0);

const fabriqueInformationsEtapesVariantes = <
  TypeEtape extends InformationEtapeForm,
>(
  variantesEtapes: VariantesEtape<TypeEtape>[],
): InformationsEtapesVariantes<TypeEtape> => {
  const variantes = variantesEtapes.map((variante) => variante.etape);
  const varianteAffichee = fabriqueFonctionEtapeAffichee(variantesEtapes);
  return {
    type: "variante",
    variantes: variantes,
    varianteAffichee: varianteAffichee,
    longueurComptabilisee: 1,
    existe: true,
    titre: variantesEtapes[0]?.etape.titre,
    estIgnoree: toujoursFaux,
    remplitContitionSousEtape: toujoursFaux,
    validationReponses: variantesEtapes[0]?.etape.validationReponses,
    fabriqueValidationReponses: (donnees: DonneesFormulaireSimulateur) =>
      variantes[varianteAffichee(donnees)].validationReponses,
  };
};

const fabriqueSousEtapeConditionnelle: (
  condition: PredicatDonneesSimulateurDefinitions,
  sousEtape:
    | InformationEtapeForm
    | InformationsEtapesVariantes<InformationEtapeForm>,
) => SousEtapeConditionnelle = (condition, sousEtape) => ({
  condition: condition,
  sousEtape: sousEtape,
});

export const fabriquesInformationsEtapes = {
  sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle,
  resultat: fabriqueInformationsEtapeResultat,
  form: fabriqueInformationsEtapeForm,
  speciale: fabriqueInformationsEtapeSpeciale,
  prealable: fabriqueInformationEtapePrealable,
  variantes: fabriqueInformationsEtapesVariantes,
} as const;

export const EtapeInexistante: InformationsEtape & CapaciteEtape = {
  longueurComptabilisee: 0,
  existe: false,
  titre: "Hors de portee",
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursVrai,
  validationReponses: validationToutesLesReponses,
  varianteAffichee: toujourNegatif,
  type: "inexistante",
} as const;

export const optionsInformationEtapeFormParDefaut: OptionsInformationEtapeForm =
  {
    ignoreSi: toujoursFaux,
    sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle(
      toujoursFaux,
      EtapeInexistante as InformationEtapeForm,
    ),
  } as const;
