import { RegulationEntite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { PrecisionResultat } from "../../../../commun/core/src/Domain/Simulateur/Resultat.declarations.ts";
import { chargeContenuMarkdown } from "../depots/ChargeContenuMarkdown.depot.ts";
import { separeMarkdownParLignes } from "../Markdown/TransformeMarkdown.operations.ts";
import { precisionsResultatVide } from "../Simulateur/Props/ContenusResultatEligibilite.constantes.ts";
import { PrecisionsResultatProps } from "../Simulateur/Props/ContenusResultatEligibilite.declaration.ts";

export const fabriquePrecisionsResultatProps = (
  md: string,
): PrecisionsResultatProps => {
  const [principal, annexe] = separeMarkdownParLignes(md);
  return {
    principal: principal ?? "",
    annexe: annexe ?? "",
  };
};

export const chargeContenuPour =
  (r: RegulationEntite) => async (p: PrecisionResultat) =>
    chargeContenuMarkdown(
      `PrecisionsResultat.${r}${p}`,
      fabriquePrecisionsResultatProps,
      precisionsResultatVide,
    );
