import { match, P } from "ts-pattern";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { Activite } from "./Activite.ts";
import { SecteurActivite } from "./SecteursActivite";
import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "./ChampsSimulateur";

import {
  estActiviteAutre,
  estActiviteListee,
} from "./Operations/FiltreActivites.ts";

import { listeSecteursActiviteSaufAutre } from "./ListesEnrSecteursSousSecteur.ts";
import { SousSecteurActivite } from "./SousSecteurs";
import { estSecteurListe } from "./Operations/operationsSecteurs.ts";

export type ResultatEligibilite =
  | "NonEligible"
  | "EligiblePetiteEntreprise"
  | "EligibleMoyenneGrandeEntreprise"
  | "Incertain";

export const Eligibilite: Readonly<
  Record<ResultatEligibilite, ResultatEligibilite>
> = {
  NonEligible: "NonEligible",
  EligiblePetiteEntreprise: "EligiblePetiteEntreprise",
  EligibleMoyenneGrandeEntreprise: "EligibleMoyenneGrandeEntreprise",
  Incertain: "Incertain",
} as const;

export const estPetiteEntreprise = (
  nombreEmployes: TrancheNombreEmployes[],
  chiffreAffaire: TrancheChiffreAffaire[],
) => nombreEmployes.includes("petit") && chiffreAffaire.includes("petit");

export const estMoyenneEntreprise = (
  nombreEmployes: TrancheNombreEmployes[],
  chiffreAffaire: TrancheChiffreAffaire[],
) =>
  (nombreEmployes.includes("moyen") && chiffreAffaire.includes("moyen")) ||
  (nombreEmployes.includes("moyen") && chiffreAffaire.includes("petit")) ||
  (nombreEmployes.includes("petit") && chiffreAffaire.includes("moyen"));
export const estGrandeEntreprise = (
  nombreEmployes: TrancheNombreEmployes[],
  chiffreAffaire: TrancheChiffreAffaire[],
) => nombreEmployes.includes("grand") || chiffreAffaire.includes("grand");

const auMoinsUneActiviteListee = (activites: Activite[]) =>
  activites && activites.length && activites.some(estActiviteListee);
const tousLesSecteursSontListee = (secteurs: SecteurActivite[]) =>
  secteurs &&
  secteurs.length &&
  secteurs.some((secteur) => listeSecteursActiviteSaufAutre.includes(secteur));
const tousLesSousSecteursSontListee = (sousSecteurs: SousSecteurActivite[]) =>
  !sousSecteurs ||
  !sousSecteurs.length ||
  sousSecteurs.some((sousSecteur) => !sousSecteur.startsWith("autre"));

export const eligibilite: (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => ResultatEligibilite = (donneesFormulaireSimulateur) => {
  const {
    designeOperateurServicesEssentiels,
    etatMembre,
    typeStructure,
    trancheNombreEmployes,
    trancheCA,
    secteurActivite,
    sousSecteurActivite,
    activites,
  } = donneesFormulaireSimulateur;

  const estUnOperateurDeServicesEssentielsNIS1 =
    designeOperateurServicesEssentiels.includes("oui");
  const estPrivee = typeStructure.includes("privee");
  const estEtatMembre = etatMembre[0] !== "horsue";

  if (
    estUnOperateurDeServicesEssentielsNIS1 &&
    estPetiteEntreprise(trancheNombreEmployes, trancheCA)
  ) {
    return Eligibilite.EligiblePetiteEntreprise;
  }
  const estSecteurInfrastructureNumerique = secteurActivite.includes(
    "infrastructureNumerique",
  );
  const estPetiteOuMoyenneEntreprise =
    estMoyenneEntreprise(trancheNombreEmployes, trancheCA) ||
    estGrandeEntreprise(trancheNombreEmployes, trancheCA);

  if (estUnOperateurDeServicesEssentielsNIS1 && estPetiteOuMoyenneEntreprise) {
    return Eligibilite.EligibleMoyenneGrandeEntreprise;
  }
  if (
    !tousLesSecteursSontListee(secteurActivite) ||
    !tousLesSousSecteursSontListee(sousSecteurActivite) ||
    !auMoinsUneActiviteListee(activites)
  ) {
    return Eligibilite.NonEligible;
  }
  if (
    estEtatMembre &&
    estPrivee &&
    estPetiteEntreprise(trancheNombreEmployes, trancheCA) &&
    estSecteurInfrastructureNumerique &&
    auMoinsUneActiviteListee(activites)
  ) {
    return Eligibilite.EligiblePetiteEntreprise;
  }
  if (
    estEtatMembre &&
    estPrivee &&
    estPetiteOuMoyenneEntreprise &&
    tousLesSecteursSontListee(secteurActivite) &&
    auMoinsUneActiviteListee(activites)
  ) {
    return Eligibilite.EligibleMoyenneGrandeEntreprise;
  }

  return Eligibilite.Incertain;
};

const auMoinsUnSecteurListe = (secteurs: SecteurActivite[]) =>
  secteurs.some(estSecteurListe);
const aucuneActiviteListee = (activites: Activite[]) =>
  activites.every(estActiviteAutre);

export const eligi: (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => ResultatEligibilite = (donneesFormulaireSimulateur) => {
  return match(donneesFormulaireSimulateur)
    .with(
      {
        designeOperateurServicesEssentiels: ["oui"],
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
      },
      () => Eligibilite.EligiblePetiteEntreprise,
    )
    .with(
      { designeOperateurServicesEssentiels: ["oui"] },
      () => Eligibilite.EligibleMoyenneGrandeEntreprise,
    )
    .with(
      {
        designeOperateurServicesEssentiels: ["non"],
        typeStructure: ["privee"],
        activites: P.when(aucuneActiviteListee),
      },
      () => Eligibilite.NonEligible,
    )
    .with(
      {
        designeOperateurServicesEssentiels: ["non"],
        typeStructure: ["privee"],
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        activites: P.when(auMoinsUneActiviteListee),
      },
      () => Eligibilite.EligiblePetiteEntreprise,
    )
    .with(
      {
        designeOperateurServicesEssentiels: ["non"],
        typeStructure: ["privee"],
        secteurActivite: P.when(auMoinsUnSecteurListe),
        activites: P.when(auMoinsUneActiviteListee),
      },
      () => Eligibilite.EligibleMoyenneGrandeEntreprise,
    )
    .otherwise(() => Eligibilite.Incertain);
};
