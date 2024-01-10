import { PrecisionResultatRegulation } from "../../../../commun/core/src/Domain/Simulateur/Resultat.declarations.ts";
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

export const chargeContenuPour = async (p: PrecisionResultatRegulation) =>
  import(`../../References/Documents/PrecisionsResultat.${p}.md?url`).then(
    (resultat) =>
      fetch(resultat.default)
        .then((res) => res.text())
        .then(fabriquePrecisionsResultatProps)
        .catch(() => precisionsResultatVide),
  );
