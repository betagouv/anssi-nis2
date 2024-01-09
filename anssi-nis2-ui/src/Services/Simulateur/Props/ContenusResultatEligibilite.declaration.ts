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
  titre: string;
  sousTitre?: string;
  classIcone?: string;
  modeFormulaireEmail: "simple" | "complet";
  classeDivResultat: string;
  fichierPrecisionSurReponse?: string;
  blocs: BlocsAffiches;
};
