import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { estValeurVide, Regle } from "../Specifications.ts";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV.ts";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";
import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite.ts";
import { SecteurActivite } from "../../../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions.ts";

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
