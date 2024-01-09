import { separeMarkdownParLignes } from "../Markdown/TransformeMarkdown.operations.ts";
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
