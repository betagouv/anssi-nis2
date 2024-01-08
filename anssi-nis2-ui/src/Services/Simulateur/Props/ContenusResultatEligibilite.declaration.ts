export type BlocResultatSpecifiques =
  | "etMaintenant"
  | "enSavoirPlus"
  | "bienDebuterAvecPdf";

export type PrecisionsResultat = {
  principal: string;
  annexe: string;
};

export type ContenusResultatEligibilite = {
  titre: string;
  sousTitre?: string;
  classIcone?: string;
  modeFormulaireEmail: "simple" | "complet";
  classeDivResultat: string;
  fichierPrecisionSurReponse?: string;
  precisions?: PrecisionsResultat;
  afficheBlocs: Record<BlocResultatSpecifiques, boolean>;
};
