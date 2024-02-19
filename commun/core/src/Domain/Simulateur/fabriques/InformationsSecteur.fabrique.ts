import { match } from "ts-pattern";
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
import { contientPetiteEntreprise } from "../services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  InformationSecteurPossible,
  InformationsSecteur,
  InformationsSecteurGrand,
  InformationsSecteurPetit,
} from "../services/Eligibilite/Reponse.definitions";
import {
  estSecteurAutre,
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
  secteurAutre: () => (): Set<InformationSecteurPossible> =>
    ens({
      secteurActivite: "autreSecteurActivite",
    }),

  secteurSimple:
    (donnees: DonneesFormulaireSimulateur) =>
    (secteur: SecteurActivite): Set<InformationSecteurPossible> =>
      ens({
        secteurActivite: secteur,
        activites: ens(
          ...donnees.activites.filter(activiteEstDansSecteur(secteur)),
        ),
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
  ): Set<InformationSecteurPossible> =>
    ens({
      secteurActivite: secteur,
      sousSecteurActivite: sousSecteur,
    }),

  accumuleSecteursComposites:
    (donnees: DonneesFormulaireSimulateur) =>
    (secteur: SecteursAvecSousSecteurs) =>
    (
      ensembleSecteurs: Set<InformationSecteurPossible>,
      sousSecteur: SousSecteurActivite,
    ): Set<InformationSecteurPossible> =>
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
    (secteur: SecteursAvecSousSecteurs): Set<InformationSecteurPossible> =>
      donnees.sousSecteurActivite
        .filter(estDansSecteur(secteur))
        .reduce(
          FabriqueInformationsSecteur.accumuleSecteursComposites(donnees)(
            secteur,
          ),
          ensembleNeutreDe<InformationSecteurPossible>(),
        ),

  secteurDepuisDonneesSimulateur: (
    donnees: DonneesFormulaireSimulateur,
    secteurActivite: SecteurActivite,
  ): Set<InformationSecteurPossible> =>
    match(secteurActivite)
      .when(estSecteurAutre, FabriqueInformationsSecteur.secteurAutre())
      .when(
        estUnSecteurSansDesSousSecteurs,
        FabriqueInformationsSecteur.secteurSimple(donnees),
      )
      .when(
        estUnSecteurAvecDesSousSecteurs,
        FabriqueInformationsSecteur.ensembleSecteursComposites(donnees),
      )
      .otherwise(ensembleNeutreDe<InformationSecteurPossible>),

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
      new Set<InformationSecteurPossible>([]),
    ),

  informationsSecteursPetit: (
    donnees: DonneesFormulaireSimulateur,
  ): InformationsSecteurPetit => ({
    _categorieTaille: "Petit",
    secteurs:
      FabriqueInformationsSecteur.listeSecteursDepuisDonneesSimulateur(donnees),
  }),

  informationsSecteursGrand: (
    donnees: DonneesFormulaireSimulateur,
  ): InformationsSecteurGrand => ({
    _categorieTaille: "Grand",
    secteurs:
      FabriqueInformationsSecteur.listeSecteursDepuisDonneesSimulateur(donnees),
  }),

  informationsSecteurs: (
    donnees: DonneesFormulaireSimulateur,
  ): InformationsSecteur =>
    contientPetiteEntreprise(donnees)
      ? FabriqueInformationsSecteur.informationsSecteursPetit(donnees)
      : FabriqueInformationsSecteur.informationsSecteursGrand(donnees),
};