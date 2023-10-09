import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../DonneesFormulaire.ts";
import {
  sousSecteurAppartientASecteur,
  TValeursSecteursAvecSousSecteurs,
  ValeursSecteursAvecSousSecteurs,
} from "../SousSecteurs.ts";
import {
  TValeursActivites,
  TValeursSecteursActivites,
  TValeursSecteursSansSousSecteur,
  TValeursSectorielles,
  TValeursSousSecteursActivites,
} from "../ValeursCles.ts";
import { Validateur, ValidationReponses } from "../Workflows/validateursChamps";
import { activitesParSecteurEtSousSecteur } from "../ActivitesParSecteurEtSousSecteur.ts";

export const et: (...validateurs: Array<Validateur>) => Validateur = (
  ...validateurs
) => {
  return (donneesFormulaireSimulateur) => {
    return validateurs.every((validateur) =>
      validateur(donneesFormulaireSimulateur),
    );
  };
};

export const auMoinsN =
  (n: number, nomChamp: NomsChampsSimulateur) =>
  (donneesFormulaireSimulateur: DonneesFormulaireSimulateur) =>
    donneesFormulaireSimulateur[nomChamp].filter(
      (listeValeurs) => listeValeurs.length > 0,
    ).length >
    n - 1;

export const auMoinsUn = (nomChamp: NomsChampsSimulateur) =>
  auMoinsN(1, nomChamp);

export const auMoinsUnSousSecteurParSecteur: Validateur = (
  donneesFormulaireSimulateur,
) => {
  const valeursSecteur: TValeursSecteursActivites[] =
    donneesFormulaireSimulateur[
      "secteurActivite"
    ] as TValeursSecteursActivites[];
  const validateursParGroupe = valeursSecteur.map((valeur) =>
    sousSecteurAppartientASecteur(valeur as TValeursSecteursAvecSousSecteurs),
  );
  const validateur = et(
    ...validateursParGroupe,
    auMoinsN(
      donneesFormulaireSimulateur["secteurActivite"].length,
      "sousSecteurActivite",
    ),
  );
  return validateur(donneesFormulaireSimulateur);
};

function activiteEstDansSecteur(
  activites: TValeursActivites[],
  secteurActivite: TValeursSectorielles,
) {
  return activites.some((activite) =>
    activitesParSecteurEtSousSecteur[secteurActivite].includes(activite),
  );
}

const estUnSecteurSansSousSecteur = (secteur: string) =>
  !(ValeursSecteursAvecSousSecteurs as readonly string[]).includes(secteur);
export const auMoinsUneActiviteParValeurSectorielle: Validateur = (
  donneesFormulaireSimulateur,
) => {
  const secteursActivite = donneesFormulaireSimulateur.secteurActivite.filter(
    estUnSecteurSansSousSecteur,
  ) as TValeursSecteursSansSousSecteur[];
  const sousSecteursActivite =
    donneesFormulaireSimulateur.sousSecteurActivite as TValeursSousSecteursActivites[];
  const secteursEtSousSecteurs: TValeursSectorielles[] = [
    ...secteursActivite,
    ...sousSecteursActivite,
  ];
  const activites =
    donneesFormulaireSimulateur.activites as TValeursActivites[];
  const nombreDeValeursEstCoherent =
    donneesFormulaireSimulateur.activites.length ===
    secteursEtSousSecteurs.length;
  const tousLesSecteursEtSousSecteurOntUneActiviteAssociee =
    secteursEtSousSecteurs.every((secteurActivite) =>
      activiteEstDansSecteur(activites, secteurActivite),
    );
  return (
    nombreDeValeursEstCoherent &&
    tousLesSecteursEtSousSecteurOntUneActiviteAssociee
  );
};

export const validationUneReponses = (
  nomChamp: NomsChampsSimulateur,
): ValidationReponses => ({
  message: "Selectionnez une réponse",
  validateur: auMoinsUn(nomChamp),
});

export const validationReponsesTaille = {
  message: "Sélectionnez une réponse pour chaque critère",
  validateur: et(auMoinsUn("trancheNombreEmployes"), auMoinsUn("trancheCA")),
};
export const validationReponsesSecteurs = {
  message: "Sélectionnez au moins une réponse",
  validateur: auMoinsUn("secteurActivite"),
};
export const validationReponsesSousActivites = {
  message: "Sélectionnez au moins une réponse par secteur",
  validateur: auMoinsUnSousSecteurParSecteur,
};
export const validationReponsesActivites = {
  message: "Sélectionnez au moins une réponse par secteur",
  validateur: auMoinsUneActiviteParValeurSectorielle,
};
