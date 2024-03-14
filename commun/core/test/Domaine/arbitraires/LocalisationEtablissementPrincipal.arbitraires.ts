import { fc } from "@fast-check/vitest";
import { LocalisationEtablissementPrincipal } from "../../../src/Domain/Simulateur/services/Eligibilite/LocalisationsActivites.definitions";

export const arbLocalisationEtablissementPrincipal_DecisionsToujoursFrance: fc.Arbitrary<LocalisationEtablissementPrincipal> =
  fc.constant({
    paysDecisionsCyber: "france",
  });
export const arbLocalisationEtablissementPrincipal_DecisionsToujoursAutreUE: fc.Arbitrary<LocalisationEtablissementPrincipal> =
  fc.constant({
    paysDecisionsCyber: "autre",
  });
export const arbLocalisationEtablissementPrincipal_OperationsToujoursFrance: fc.Arbitrary<LocalisationEtablissementPrincipal> =
  fc.constant({
    paysDecisionsCyber: "horsue",
    paysOperationsCyber: "france",
  });
export const arbLocalisationEtablissementPrincipal_OperationsToujoursAutreUE: fc.Arbitrary<LocalisationEtablissementPrincipal> =
  fc.constant({
    paysDecisionsCyber: "horsue",
    paysOperationsCyber: "autre",
  });
export const arbLocalisationEtablissementPrincipal_PlusGrandNombreSalarieToujoursFrance: fc.Arbitrary<LocalisationEtablissementPrincipal> =
  fc.constant({
    paysDecisionsCyber: "horsue",
    paysOperationsCyber: "horsue",
    paysPlusGrandNombreSalaries: "france",
  });
export const arbLocalisationEtablissementPrincipal_PlusGrandNombreSalarieToujoursAutreUE: fc.Arbitrary<LocalisationEtablissementPrincipal> =
  fc.constant({
    paysDecisionsCyber: "horsue",
    paysOperationsCyber: "horsue",
    paysPlusGrandNombreSalaries: "autre",
  });

export const arbLocalisationEtablissementPrincipal_France: fc.Arbitrary<LocalisationEtablissementPrincipal> =
  fc.oneof(
    arbLocalisationEtablissementPrincipal_DecisionsToujoursFrance,
    arbLocalisationEtablissementPrincipal_OperationsToujoursFrance,
    arbLocalisationEtablissementPrincipal_PlusGrandNombreSalarieToujoursFrance,
  );
export const arbLocalisationEtablissementPrincipal_AutreUE: fc.Arbitrary<LocalisationEtablissementPrincipal> =
  fc.oneof(
    arbLocalisationEtablissementPrincipal_DecisionsToujoursAutreUE,
    arbLocalisationEtablissementPrincipal_OperationsToujoursAutreUE,
    arbLocalisationEtablissementPrincipal_PlusGrandNombreSalarieToujoursAutreUE,
  );
