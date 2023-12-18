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
} from "../InformationsEtape.ts";
import { PredicatDonneesSimulateur } from "../../../Services/Simulateur/PredicatDonneesSimulateur.ts";
import { ValidationReponses } from "../services/ChampSimulateur/champs.domaine.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../DonneesFormulaire.ts";
import { validationToutesLesReponses } from "../services/ChampSimulateur/ValidationReponses.ts";
import { match } from "ts-pattern";
import { toujoursFaux, toujoursVrai } from "../../Commun/Commun.predicats.ts";
import { toujourNegatif } from "../../Commun/Commun.predicats.ts";

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
    remplitContitionSousEtape: (donnees: IDonneesBrutesFormulaireSimulateur) =>
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
  (donnees: IDonneesBrutesFormulaireSimulateur) =>
    variantesEtapes
      .reduce(
        (acc, variante, indice) => acc.with(variante.conditions, () => indice),
        match<IDonneesBrutesFormulaireSimulateur, number>(donnees),
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
    fabriqueValidationReponses: (donnees: IDonneesBrutesFormulaireSimulateur) =>
      variantes[varianteAffichee(donnees)].validationReponses,
  };
};

const fabriqueSousEtapeConditionnelle: (
  condition: PredicatDonneesSimulateur,
  sousEtape: InformationEtapeForm,
) => SousEtapeConditionnelle = (condition, sousEtape) => ({
  condition: condition,
  sousEtape: sousEtape,
});

export const fabriquesInformationsEtapes = {
  sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle,
  resultat: fabriqueInformationsEtapeResultat,
  form: fabriqueInformationsEtapeForm,
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
