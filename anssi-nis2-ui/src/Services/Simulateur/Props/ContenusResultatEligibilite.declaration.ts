export type BlocResultatSpecifiques =
  | "etMaintenant"
  | "enSavoirPlus"
  | "bienDebuterAvecPdf";

export type PrecisionsResultatProps = {
  principal: string;
  annexe: string;
};

type BlocsAffiches = Set<BlocResultatSpecifiques>;

export type ContenusResultatEligibilite = {
  modeFormulaireEmail: "simple" | "complet";
  blocs: BlocsAffiches;
};
