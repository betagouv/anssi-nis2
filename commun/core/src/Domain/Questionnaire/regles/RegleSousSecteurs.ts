import { estValeurVide, Regle } from "../Specifications";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle";
import { SousSecteurActivite } from "../../Simulateur/SousSecteurActivite.definitions";
import { contientUnParmi } from "../../../../../utils/services/commun.predicats";
import { EtatQuestionnaire } from "../EtatQuestionnaire";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV";
import { libellesSousSecteursActivite } from "../../Simulateur/LibellesSousSecteursActivite";

export class RegleSousSecteurs implements Regle {
  constructor(private readonly sousSecteurAttendu: SousSecteurActivite) {}

  evalue(reponses: EtatQuestionnaire): boolean {
    const sousSecteurs = reponses.sousSecteurActivite;
    return contientUnParmi(this.sousSecteurAttendu)(sousSecteurs);
  }

  static nouvelle(texte: SpecificationTexte): RegleSousSecteurs | undefined {
    const sousSecteurAttendu = texte["Sous-secteurs"];

    if (estValeurVide(sousSecteurAttendu)) return;

    return sousSecteurAttendu === "Autre sous-secteur"
      ? chercheSousSecteurAutre(texte["Secteurs"])
      : chercheSousSecteurPrecis(sousSecteurAttendu);
  }
}

const chercheSousSecteurAutre = (secteurParent: string) => {
  switch (secteurParent) {
    case "Énergie":
      return new RegleSousSecteurs("autreSousSecteurEnergie");
    case "Fabrication":
      return new RegleSousSecteurs("autreSousSecteurFabrication");
    case "Transports":
      return new RegleSousSecteurs("autreSousSecteurTransports");
    default:
      throw new ErreurLectureDeRegle(
        `Autre sous-secteur pour le secteur parent ${secteurParent}`,
        "Sous-secteur",
      );
  }
};

const chercheSousSecteurPrecis = (sousSecteurAttendu: string) => {
  const sousSecteurCorrespondant = Object.entries(
    libellesSousSecteursActivite,
  ).find(([, valeur]) => valeur == sousSecteurAttendu);

  if (!sousSecteurCorrespondant)
    throw new ErreurLectureDeRegle(sousSecteurAttendu, "Sous-secteurs");

  const [id] = sousSecteurCorrespondant;
  return new RegleSousSecteurs(id as SousSecteurActivite);
};
