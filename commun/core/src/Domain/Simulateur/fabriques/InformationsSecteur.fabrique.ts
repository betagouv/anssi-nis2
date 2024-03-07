import { match } from "ts-pattern";
import { ou } from "../../../../../utils/services/predicats.operations";
import {
  ens,
  ensembleNeutreDe,
  union,
} from "../../../../../utils/services/sets.operations";
import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.definitions";
import {
  SecteurActivite,
  SecteursAvecSousSecteurs,
} from "../SecteurActivite.definitions";
import { activiteEstDansSecteur } from "../services/Activite/Activite.predicats";
import {
  InformationsSecteurPossible,
  ReponseInformationsSecteur,
} from "../services/Eligibilite/ReponseInformationsSecteur.predicats";
import { CategorieTaille } from "../services/Eligibilite/ReponseStructure.definitions";
import {
  estSecteurAutre,
  estSecteurAvecActivitesEssentielles,
  estSecteurImportantsAvecBesoinLocalisation,
  estUnSecteurAvecDesSousSecteurs,
  estUnSecteurSansDesSousSecteurs,
} from "../services/SecteurActivite/SecteurActivite.predicats";
import {
  estDansSecteur,
  estSousSecteurAutre,
} from "../services/SousSecteurActivite/SousSecteurActivite.predicats";
import {
  SousSecteurActivite,
  SousSecteurAutre,
} from "../SousSecteurActivite.definitions";

export const FabriqueInformationsSecteur = {
  secteurAutre: () => (): Set<InformationsSecteurPossible<CategorieTaille>> =>
    ens({
      secteurActivite: "autreSecteurActivite",
    }),

  secteurSimple:
    (donnees: DonneesFormulaireSimulateur) =>
    (
      secteur: SecteurActivite,
    ): Set<InformationsSecteurPossible<CategorieTaille>> =>
      ens({
        secteurActivite: secteur,
        activites: ens(
          ...donnees.activites.filter(activiteEstDansSecteur(secteur)),
        ),
      }),
  secteurSimpleAvecLocalisation:
    (donnees: DonneesFormulaireSimulateur) =>
    (
      secteur: SecteurActivite,
    ): Set<InformationsSecteurPossible<CategorieTaille>> =>
      ens({
        secteurActivite: secteur,
        activites: ens(
          ...donnees.activites.filter(activiteEstDansSecteur(secteur)),
        ),
        fournitServicesUnionEuropeenne:
          donnees.fournitServicesUnionEuropeenne[0],
        ...(donnees.fournitServicesUnionEuropeenne[0] === "oui"
          ? {
              localisationRepresentant: donnees.localisationRepresentant[0],
            }
          : {}),
      }),

  secteurComposite:
    (donnees: DonneesFormulaireSimulateur) =>
    (secteur: SecteurActivite, sousSecteur: SousSecteurActivite) =>
      ens({
        secteurActivite: secteur,
        sousSecteurActivite: sousSecteur,
        activites: ens(
          ...donnees.activites.filter(activiteEstDansSecteur(sousSecteur)),
        ),
      }),

  secteurCompositeAutre: (
    secteur: SecteursAvecSousSecteurs,
    sousSecteur: SousSecteurAutre,
  ): Set<InformationsSecteurPossible<CategorieTaille>> =>
    ens({
      secteurActivite: secteur,
      sousSecteurActivite: sousSecteur,
    }),

  accumuleSecteursComposites:
    (donnees: DonneesFormulaireSimulateur) =>
    (secteur: SecteursAvecSousSecteurs) =>
    (
      ensembleSecteurs: Set<InformationsSecteurPossible<CategorieTaille>>,
      sousSecteur: SousSecteurActivite,
    ): Set<InformationsSecteurPossible<CategorieTaille>> =>
      union(
        ensembleSecteurs,
        estSousSecteurAutre(sousSecteur)
          ? FabriqueInformationsSecteur.secteurCompositeAutre(
              secteur,
              sousSecteur,
            )
          : FabriqueInformationsSecteur.secteurComposite(donnees)(
              secteur,
              sousSecteur,
            ),
      ),

  ensembleSecteursComposites:
    (donnees: DonneesFormulaireSimulateur) =>
    (
      secteur: SecteursAvecSousSecteurs,
    ): Set<InformationsSecteurPossible<CategorieTaille>> =>
      donnees.sousSecteurActivite
        .filter(estDansSecteur(secteur))
        .reduce(
          FabriqueInformationsSecteur.accumuleSecteursComposites(donnees)(
            secteur,
          ),
          ensembleNeutreDe<InformationsSecteurPossible<CategorieTaille>>(),
        ),

  secteurDepuisDonneesSimulateur: (
    donnees: DonneesFormulaireSimulateur,
    secteurActivite: SecteurActivite,
  ): Set<InformationsSecteurPossible<CategorieTaille>> =>
    match(secteurActivite)
      .when(estSecteurAutre, FabriqueInformationsSecteur.secteurAutre())
      .when(
        ou(
          estSecteurAvecActivitesEssentielles,
          estSecteurImportantsAvecBesoinLocalisation,
        ),
        FabriqueInformationsSecteur.secteurSimpleAvecLocalisation(donnees),
      )
      .when(
        estUnSecteurSansDesSousSecteurs,
        FabriqueInformationsSecteur.secteurSimple(donnees),
      )
      .when(
        estUnSecteurAvecDesSousSecteurs,
        FabriqueInformationsSecteur.ensembleSecteursComposites(donnees),
      )
      .otherwise(
        ensembleNeutreDe<InformationsSecteurPossible<CategorieTaille>>,
      ),

  listeSecteursDepuisDonneesSimulateur: (
    donnees: DonneesFormulaireSimulateur,
  ) =>
    donnees.secteurActivite.reduce(
      (liste, secteur) =>
        union(
          liste,
          FabriqueInformationsSecteur.secteurDepuisDonneesSimulateur(
            donnees,
            secteur,
          ),
        ),
      new Set<InformationsSecteurPossible<CategorieTaille>>([]),
    ),

  informationsSecteursPetit: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseInformationsSecteur<"Petit"> => ({
    _categorieTaille: "Petit",
    secteurs:
      FabriqueInformationsSecteur.listeSecteursDepuisDonneesSimulateur(donnees),
  }),

  informationsSecteursMoyen: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseInformationsSecteur<"Moyen"> => ({
    _categorieTaille: "Moyen",
    secteurs:
      FabriqueInformationsSecteur.listeSecteursDepuisDonneesSimulateur(donnees),
  }),
  informationsSecteursGrand: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseInformationsSecteur<"Grand"> => ({
    _categorieTaille: "Grand",
    secteurs:
      FabriqueInformationsSecteur.listeSecteursDepuisDonneesSimulateur(donnees),
  }),
};
