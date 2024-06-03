import { Regle } from "../Specifications.ts";
import { EtatQuestionnaire } from "../../reducerQuestionnaire.ts";
import { SpecificationTexte } from "../FormatDesSpecificationsCSV.ts";
import { ErreurLectureDeRegle } from "./ErreurLectureDeRegle.ts";
import { Activite } from "../../../../../commun/core/src/Domain/Simulateur/Activite.definitions.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";

export class RegleActivites implements Regle {
  constructor(private readonly activite: Activite) {}

  evalue(reponses: EtatQuestionnaire): boolean {
    const activites = reponses.activites;
    return contientUnParmi(this.activite)(activites);
  }

  static nouvelle(texte: SpecificationTexte): RegleActivites | undefined {
    const valeur = texte["Activités"];

    if (!valeur) return;

    if (
      valeur ===
      "Fournisseurs de réseaux de communications électroniques publics"
    )
      return new RegleActivites(
        "fournisseurReseauxCommunicationElectroniquesPublics",
      );

    throw new ErreurLectureDeRegle(valeur, "Activités");
  }
}
