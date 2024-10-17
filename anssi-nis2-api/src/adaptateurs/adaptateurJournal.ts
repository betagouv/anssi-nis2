import { ReponsesEtResultatAvecAnalyse } from "./adaptateurEligibilite";

export enum TypeEvenement {
  ReponseSimulateurRecue = "REPONSE_SIMULATEUR_RECUE",
}

interface DictionnaireDesDonnees {
  [TypeEvenement.ReponseSimulateurRecue]: ReponsesEtResultatAvecAnalyse;
}

export type EvenementJournal<Type extends keyof DictionnaireDesDonnees> = {
  type: Type;
  donnees: DictionnaireDesDonnees[Type];
  date: Date;
};

export interface AdaptateurJournal {
  consigneEvenement: <T extends TypeEvenement>(
    evenement: EvenementJournal<T>,
  ) => Promise<void>;
}
