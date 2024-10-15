import { estValeurVide, Regle } from "../Specifications";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle";
import { contientUnParmi } from "../../../../../utils/services/commun.predicats";
import { SecteurActivite } from "../../Simulateur/SecteurActivite.definitions";
import { EtatQuestionnaire } from "../EtatQuestionnaire";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV";
import { libellesSecteursActivite } from "../../Simulateur/LibellesSecteursActivite";

export class RegleSecteurs implements Regle {
  constructor(private readonly secteurActivite: SecteurActivite) {}

  evalue(reponses: EtatQuestionnaire): boolean {
    const secteurs = reponses.secteurActivite;
    return contientUnParmi(this.secteurActivite)(secteurs);
  }

  static nouvelle(texte: SpecificationTexte): RegleSecteurs | undefined {
    const secteurAttendu = texte["Secteurs"];

    if (estValeurVide(secteurAttendu)) return;

    const secteur = Object.entries(libellesSecteursActivite).find(
      ([, valeur]) => valeur == secteurAttendu,
    );

    if (!secteur) throw new ErreurLectureDeRegle(secteurAttendu, "Secteurs");

    const [id] = secteur;
    return new RegleSecteurs(id as SecteurActivite);
  }
}
