import { isMatching } from "ts-pattern";
import { auMoinsUneActiviteListee, estActiviteAutre } from "../../Activite.predicats";
import { estMoyenneEntreprise, estPetiteEntreprise } from "../TailleEntreprise/TailleEntite.predicats";
import {
  ChampsAvecPredicats,
  DonneesFormulaireSimulateur,
  DonneesSectorielles,
  FabriquePredicatChamp,
  NomsChampsSimulateur,
} from "./DonneesFormulaire.definitions";
import { ValeursNomChampsFormulaire } from "./DonneesFormulaire.valeurs";

export const contientPetiteEntreprise = (d: DonneesFormulaireSimulateur) =>
  estPetiteEntreprise(d.trancheNombreEmployes, d.trancheChiffreAffaire);
export const contientMoyenneEntreprise = (d: DonneesFormulaireSimulateur) =>
  estMoyenneEntreprise(d.trancheNombreEmployes, d.trancheChiffreAffaire);

const verifAuMoinsUn = {
  activiteListee: <
    T extends DonneesSectorielles &
      Pick<DonneesFormulaireSimulateur, "activites">
  >(
    donnees: T
  ): donnees is T => auMoinsUneActiviteListee(donnees.activites),
};

const fabriqueSatisfaitUniquement =
  <TypeNom extends NomsChampsSimulateur>(
    champ: TypeNom,
    predicat: (
      activite: DonneesFormulaireSimulateur[TypeNom][number]
    ) => boolean
  ) =>
  <T extends DonneesSectorielles & Pick<DonneesFormulaireSimulateur, TypeNom>>(
    donnees: T
  ) =>
    donnees[champ].every(predicat);

const fabriquePredicatChamp: FabriquePredicatChamp = <
  C extends NomsChampsSimulateur
>(
  champ: C
) => ({
  contient:
    <T extends DonneesFormulaireSimulateur[C][number]>(valeur: T) =>
    (donnees: DonneesFormulaireSimulateur) =>
      donnees !== undefined &&
      champ in donnees &&
      (donnees[champ] as DonneesFormulaireSimulateur[C][number][]).includes(
        valeur
      ),
  contientUnParmi:
    <T extends DonneesFormulaireSimulateur[C][number]>(...listeValeur: T[]) =>
    (donnees: DonneesFormulaireSimulateur) =>
      donnees !== undefined &&
      champ in donnees &&
      listeValeur.some((valeur) =>
        (donnees[champ] as DonneesFormulaireSimulateur[C][number][]).includes(
          valeur
        )
      ),
  satisfait:
    (f: <T extends DonneesFormulaireSimulateur[C]>(valeurs: T) => boolean) =>
    (d: DonneesFormulaireSimulateur) =>
      f(d[champ]),
  est: <T extends DonneesFormulaireSimulateur[C]>(valeurs: T) =>
    isMatching({ [champ]: valeurs }),
});

export const predicatDonneesFormulaire = {
  auMoins: {
    un: verifAuMoinsUn,
    une: verifAuMoinsUn,
  },
  uniquement: {
    activiteAutre: fabriqueSatisfaitUniquement("activites", estActiviteAutre),
  },
  ...ValeursNomChampsFormulaire.reduce(
    (acc, nom) => ({ ...acc, [nom]: fabriquePredicatChamp(nom) }),
    {} as ChampsAvecPredicats
  ),
};


