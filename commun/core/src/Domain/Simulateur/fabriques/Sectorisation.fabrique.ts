import { match } from "ts-pattern";
import {
  ens,
  ensembleNeutreDe,
  union,
} from "../../../../../utils/services/sets.operations";
import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.definitions";
import { SecteurActivite } from "../SecteurActivite.definitions";
import { activiteEstDansSecteur } from "../services/Activite/Activite.predicats";
import { InformationSecteurPossible } from "../services/Eligibilite/Reponse.definitions";
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
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
  SousSecteurAutre,
} from "../SousSecteurActivite.definitions";

export const FabriqueSectorisation = {
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
          ? FabriqueSectorisation.secteurCompositeAutre(secteur, sousSecteur)
          : FabriqueSectorisation.secteurComposite(donnees)(
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
          FabriqueSectorisation.accumuleSecteursComposites(donnees)(secteur),
          ensembleNeutreDe<InformationSecteurPossible>(),
        ),

  secteurDepuisDonneesSimulateur: (
    donnees: DonneesFormulaireSimulateur,
    secteurActivite: SecteurActivite,
  ): Set<InformationSecteurPossible> =>
    match(secteurActivite)
      .when(estSecteurAutre, FabriqueSectorisation.secteurAutre())
      .when(
        estUnSecteurSansDesSousSecteurs,
        FabriqueSectorisation.secteurSimple(donnees),
      )
      .when(
        estUnSecteurAvecDesSousSecteurs,
        FabriqueSectorisation.ensembleSecteursComposites(donnees),
      )
      .otherwise(ensembleNeutreDe<InformationSecteurPossible>),

  listeSecteursDepuisDonneesSimulateur: (
    donnees: DonneesFormulaireSimulateur,
  ) =>
    donnees.secteurActivite.reduce(
      (liste, secteur) =>
        union(
          liste,
          FabriqueSectorisation.secteurDepuisDonneesSimulateur(
            donnees,
            secteur,
          ),
        ),
      new Set<InformationSecteurPossible>([]),
    ),
};
