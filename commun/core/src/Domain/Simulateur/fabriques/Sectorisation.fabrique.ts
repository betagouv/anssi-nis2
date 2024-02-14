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

export const FabriqueSectorisation = {
  construitSecteurAutre: () => (): Set<InformationSecteurPossible> =>
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
    (secteur: SecteurActivite): Set<InformationSecteurPossible> =>
      ens({
        secteurActivite: secteur,
        sousSecteurActivite: donnees.sousSecteurActivite[0],
        activites: ens(...donnees.activites),
      }),

  secteurDepuisDonneesSimulateur: (
    donnees: DonneesFormulaireSimulateur,
    secteurActivite: SecteurActivite,
  ): Set<InformationSecteurPossible> =>
    match(secteurActivite)
      .when(estSecteurAutre, FabriqueSectorisation.construitSecteurAutre())
      .when(
        estUnSecteurSansDesSousSecteurs,
        FabriqueSectorisation.secteurSimple(donnees),
      )
      .when(
        estUnSecteurAvecDesSousSecteurs,
        FabriqueSectorisation.secteurComposite(donnees),
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
