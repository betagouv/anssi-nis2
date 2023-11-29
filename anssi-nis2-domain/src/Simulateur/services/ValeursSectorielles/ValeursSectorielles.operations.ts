import {
  SecteursSansSousSecteur,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import { CoupleSectoriel } from "../../ValeurCleSectorielle.definitions";
import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire";
import { extraitSousSecteursOuListeVide } from "../SousSecteurActivite/SousSecteurActivite.operations";

export const fabriqueListeValeursSectorielles = (
  secteursSansSousSecteurs: SecteursSansSousSecteur[],
  sousSecteurs: SousSecteurActivite[],
) => [...secteursSansSousSecteurs, ...sousSecteurs];
export const collecteCouplesSectoriels = (
  secteur: SecteurActivite,
  listeSousSecteurs: SousSecteurActivite[],
): CoupleSectoriel[] =>
  listeSousSecteurs.length === 0
    ? ([[secteur, undefined]] as CoupleSectoriel[])
    : listeSousSecteurs.map(
        (sousSecteur) => [secteur, sousSecteur] as CoupleSectoriel,
      );

export const extraitListeSousSecteursParSecteur = ({
  secteurActivite,
  sousSecteurActivite,
}: IDonneesBrutesFormulaireSimulateur) =>
  secteurActivite.reduce<[SecteurActivite, SousSecteurActivite[]][]>(
    (acc, secteur) => [
      ...acc,
      [secteur, extraitSousSecteursOuListeVide(secteur, sousSecteurActivite)],
    ],
    [],
  );
export const extraitCouplesSectoriels = (
  reponses: IDonneesBrutesFormulaireSimulateur,
) =>
  extraitListeSousSecteursParSecteur(reponses).reduce<CoupleSectoriel[]>(
    (acc: CoupleSectoriel[], [secteur, listeSousSecteurs]) => [
      ...acc,
      ...collecteCouplesSectoriels(secteur, listeSousSecteurs),
    ],
    [],
  );
