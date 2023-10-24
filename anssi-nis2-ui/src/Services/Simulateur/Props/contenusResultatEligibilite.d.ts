export type BlocResultatSpecifiques =
  | "etMaintenant"
  | "enSavoirPlus"
  | "bienDebuterAvecPdf";
export type ContenusResultatEligibilite = {
  titre: string;
  sousTitre?: string;
  classIcone?: string;
  classeDivResultat: string;
  fichierPrecisionSurReponse?: string;
  afficheBlocs: Record<BlocResultatSpecifiques, boolean>;
};
