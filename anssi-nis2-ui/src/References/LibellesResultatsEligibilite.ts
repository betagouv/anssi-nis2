import { BlocResultatSpecifiques } from "../Services/Simulateur/Props/ContenusResultatEligibilite.declaration.ts";

export const titreDeSections: Record<BlocResultatSpecifiques, string> = {
  bienDebuter: "Pour bien débuter",
  enSavoirPlus: "En savoir plus",
  etMaintenant: "Et Maintenant ?",
};

export const texteIntroductionBienDebuterPetiteEntite =
  "Dans l’attente des exigences françaises pour votre organisation, retrouvez" +
  " les guides essentiels de bonne pratique de l’ANSSI pour débuter dès à" +
  " présent votre montée en maturité cyber.";

export const texteIntroductionBienDebuterGrandeEntite =
  "Dans l’attente des exigences françaises pour votre organisation, " +
  "retrouvez sur le site de l’ANSSI l’ensemble des guides de bonnes " +
  "pratiques ainsi que les mesures cyber préventives prioritaires.";
export const libelleTitreIncertainAutrePaysUnionEuropeenne =
  "Nous ne pouvons pas déterminer si votre  \nentité serait régulée par la directive NIS 2";
export const libelleTitreIncertainStandard =
  "Nous ne pouvons vous répondre dans l’immédiat";
export const libelleTitreNonRegule =
  "Votre entité ne sera pas régulée par NIS 2";
export const libelleTitreReguleEntiteEssentielle =
  "Votre entité sera régulée par NIS 2  \nen tant qu’Entité Essentielle (EE)";
export const libelleTitreReguleEntiteEssentielleTelcoPlusieursPaysDontFrance =
  "Votre entité sera régulée par NIS 2 en France  \nen tant qu’Entité Essentielle (EE)";
export const libelleTitreReguleEntiteNonDeterminee =
  "Votre entité sera régulée par NIS 2";
export const libelleTitreReguleEntiteImportante =
  "Votre entité sera régulée par NIS 2  \nen tant qu’Entité Importante (EI)";

export const libelleAvertissementRegule =
  "Ce résultat se base sur les éléments saisis et est **_strictement indicatif_** " +
  "et **_susceptible d'évoluer_** dans le cadre de l'adoption prochaine des textes " +
  "législatifs et réglementaires de transposition de la directive NIS 2.";
export const explicationContenuIncertain =
  "Le test est en cours d’évolution pour prendre en compte l’ensemble des " +
  "typologies d’entités, mais n’est pas encore en mesure de couvrir les " +
  "paramètres qui ont été saisis.";
