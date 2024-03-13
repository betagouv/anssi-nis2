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
  SecteurAvecBesoinLocalisationRepresentant,
  SecteurComposite,
  SecteurSimple,
} from "../SecteurActivite.definitions";
import { activiteEstDansSecteur } from "../services/Activite/Activite.predicats";
import {
  InformationsSecteurAvecBesoinLocalisation,
  InformationsSecteurComposite,
  InformationsSecteurCompositeAutre,
  InformationsSecteurPossible,
  InformationsSecteurSansBesoinLocalisation,
} from "../services/Eligibilite/InformationsSecteur.definitions";
import { ReponseInformationsSecteur } from "../services/Eligibilite/ReponseInformationsSecteur.definitions";
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
  SousSecteurListes,
} from "../SousSecteurActivite.definitions";

export const FabriqueInformationsSecteur = {
  secteurAutre:
    <Taille extends CategorieTaille>() =>
    (): Set<InformationsSecteurPossible<Taille>> =>
      ens({
        secteurActivite: "autreSecteurActivite",
      }),

  secteurSimple:
    (donnees: DonneesFormulaireSimulateur) =>
    (secteur: SecteurSimple): Set<InformationsSecteurSansBesoinLocalisation> =>
      ens({
        secteurActivite: secteur,
        activites: ens(
          ...donnees.activites.filter(activiteEstDansSecteur(secteur)),
        ),
      }) as Set<InformationsSecteurSansBesoinLocalisation>,

  secteurSimpleAvecLocalisation:
    <Taille extends CategorieTaille>(donnees: DonneesFormulaireSimulateur) =>
    (
      secteur: SecteurAvecBesoinLocalisationRepresentant,
    ): Set<InformationsSecteurAvecBesoinLocalisation<Taille>> =>
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
      }) as Set<InformationsSecteurAvecBesoinLocalisation<Taille>>,

  secteurComposite:
    (donnees: DonneesFormulaireSimulateur) =>
    (secteur: SecteurComposite, sousSecteur: SousSecteurListes) =>
      ens({
        secteurActivite: secteur,
        sousSecteurActivite: sousSecteur,
        activites: ens(
          ...donnees.activites.filter(activiteEstDansSecteur(sousSecteur)),
        ),
      }),

  secteurCompositeAutre: (
    secteur: SecteurComposite,
    sousSecteur: SousSecteurAutre,
  ): Set<InformationsSecteurCompositeAutre> =>
    ens({
      secteurActivite: secteur,
      sousSecteurActivite: sousSecteur,
    }),

  accumuleSecteursComposites:
    (donnees: DonneesFormulaireSimulateur) =>
    (secteur: SecteurComposite) =>
    (
      ensembleSecteurs: Set<InformationsSecteurComposite>,
      sousSecteur: SousSecteurActivite,
    ): Set<InformationsSecteurComposite> => {
      const secteurCompositeAutre =
        FabriqueInformationsSecteur.secteurCompositeAutre(
          secteur,
          sousSecteur as SousSecteurAutre,
        );
      const secteurCompositeListe =
        FabriqueInformationsSecteur.secteurComposite(donnees)(
          secteur,
          sousSecteur as SousSecteurListes,
        );
      return union(
        ensembleSecteurs,
        (estSousSecteurAutre(sousSecteur)
          ? secteurCompositeAutre
          : secteurCompositeListe) as Set<InformationsSecteurComposite>,
      );
    },

  ensembleSecteursComposites:
    (donnees: DonneesFormulaireSimulateur) =>
    (secteur: SecteurComposite): Set<InformationsSecteurComposite> =>
      donnees.sousSecteurActivite
        .filter(estDansSecteur(secteur))
        .reduce(
          FabriqueInformationsSecteur.accumuleSecteursComposites(donnees)(
            secteur,
          ),
          ensembleNeutreDe<InformationsSecteurComposite>(),
        ),

  secteurDepuisDonneesSimulateur: <Taille extends CategorieTaille>(
    donnees: DonneesFormulaireSimulateur,
    secteurActivite: SecteurActivite,
  ): Set<InformationsSecteurPossible<Taille>> =>
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
      .otherwise(ensembleNeutreDe<InformationsSecteurPossible<Taille>>) as Set<
      InformationsSecteurPossible<Taille>
    >,

  listeSecteursDepuisDonneesSimulateur: <Taille extends CategorieTaille>(
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
      new Set<InformationsSecteurPossible<Taille>>([]),
    ),

  informationsSecteursPetit: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseInformationsSecteur<"Petit"> => ({
    _categorieTaille: "Petit",
    secteurs:
      FabriqueInformationsSecteur.listeSecteursDepuisDonneesSimulateur<"Petit">(
        donnees,
      ),
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
