import { match } from "ts-pattern";
import {
  ens,
  ensembleNeutreDe,
  union,
} from "../../../../../utils/services/sets.operations";
import {
  contientUnParmi,
  est,
} from "../../../../../utils/services/commun.predicats";
import { ActivitesInfrastructureNumerique } from "../Activite.definitions";
import { DonneesFormulaireSimulateur } from "../services/DonneesFormulaire/DonneesFormulaire.definitions";
import {
  SecteurActivite,
  SecteurComposite,
  SecteurSimple,
} from "../SecteurActivite.definitions";
import { activiteEstDansSecteur } from "../services/Activite/Activite.predicats";
import {
  InformationsSecteurComposite,
  InformationsSecteurCompositeAutre,
  InformationsSecteurSansBesoinLocalisation,
} from "../services/Eligibilite/InformationsSecteur.definitions";
import {
  InformationsSecteurPossible,
  RepInfoSecteur,
  RepInfoSecteurInfranum,
  ReponseInformationsSecteur,
  ReponseInformationsSecteurInfranumActiviteLocalEtabLot1,
  ReponseInformationsSecteurInfranumActiviteLocalEtabLot2,
  ReponseInformationsSecteurInfranumActiviteLocalServices,
  ReponseInformationsSecteurInfranumAutresActivitesListees,
} from "../services/Eligibilite/ReponseInformationsSecteur.definitions";
import { CategorieTaille } from "../services/Eligibilite/ReponseStructure.definitions";
import { fabriqueCategorieTaille } from "../services/Eligibilite/ReponseStructure.fabriques";
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
  SousSecteurListes,
} from "../SousSecteurActivite.definitions";

export const FabriqueInformationsSecteur = {
  secteurAutre:
    <Taille extends CategorieTaille>() =>
    (): Set<RepInfoSecteur<Taille>> =>
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

  secteurAvecLocalisationEtablissementPrincipal:
    <Taille extends CategorieTaille>(taille: Taille) =>
    (
      donnees: DonneesFormulaireSimulateur,
      activitesInfraNum: ActivitesInfrastructureNumerique[],
    ) =>
      ens({
        ...fabriqueCategorieTaille(taille),
        secteurActivite: "infrastructureNumerique",
        activites: ens(...activitesInfraNum),
        paysDecisionsCyber: donnees.paysDecisionsCyber[0],
        ...(donnees.paysDecisionsCyber[0] === "horsue"
          ? {
              paysOperationsCyber: donnees.paysOperationsCyber[0],
              ...(donnees.paysOperationsCyber[0] === "horsue"
                ? {
                    paysPlusGrandNombreSalaries:
                      donnees.paysPlusGrandNombreSalaries[0],
                  }
                : {}),
            }
          : {}),
      }),
  secteurInfrastructureNumerique:
    <Taille extends CategorieTaille>(taille: Taille) =>
    (
      donnees: DonneesFormulaireSimulateur,
      activitesInfraNum: ActivitesInfrastructureNumerique[],
    ) =>
    (): Set<RepInfoSecteurInfranum<Taille>> =>
      match(activitesInfraNum)
        .when(
          contientUnParmi<ActivitesInfrastructureNumerique>(
            "fournisseurReseauxCommunicationElectroniquesPublics",
            "fournisseurServiceCommunicationElectroniquesPublics",
          ),
          () =>
            ens({
              ...fabriqueCategorieTaille(taille),
              secteurActivite: "infrastructureNumerique",
              activites: ens(...activitesInfraNum),
              localisationFournitureServicesNumeriques: ens(
                ...donnees.localisationFournitureServicesNumeriques,
              ),
            }) as Set<
              ReponseInformationsSecteurInfranumActiviteLocalServices<Taille>
            >,
        )
        .when(
          contientUnParmi<ActivitesInfrastructureNumerique>(
            "registresNomsDomainesPremierNiveau",
            "fournisseurServicesDNS",
          ),
          () =>
            FabriqueInformationsSecteur.secteurAvecLocalisationEtablissementPrincipal(
              taille,
            )(donnees, activitesInfraNum) as Set<
              ReponseInformationsSecteurInfranumActiviteLocalEtabLot2<Taille>
            >,
        )
        .when(
          contientUnParmi<ActivitesInfrastructureNumerique>(
            "fournisseurServicesInformatiqueNuage",
            "fournisseurServiceCentresDonnees",
            "fournisseurReseauxDiffusionContenu",
          ),
          () =>
            FabriqueInformationsSecteur.secteurAvecLocalisationEtablissementPrincipal(
              taille,
            )(donnees, activitesInfraNum) as Set<
              ReponseInformationsSecteurInfranumActiviteLocalEtabLot1<Taille>
            >,
        )
        .otherwise(
          () =>
            ens({
              ...fabriqueCategorieTaille(taille),
              secteurActivite: "infrastructureNumerique",
              activites: ens(...activitesInfraNum),
            }) as Set<
              ReponseInformationsSecteurInfranumAutresActivitesListees<Taille>
            >,
        ),

  secteurDepuisDonneesSimulateur:
    <Taille extends CategorieTaille>(taille: Taille) =>
    (
      donnees: DonneesFormulaireSimulateur,
      secteurActivite: SecteurActivite,
    ): Set<InformationsSecteurPossible<Taille>> =>
      match(secteurActivite)
        .when(estSecteurAutre, FabriqueInformationsSecteur.secteurAutre())
        .when(
          est("infrastructureNumerique" as SecteurActivite),
          FabriqueInformationsSecteur.secteurInfrastructureNumerique(taille)(
            donnees,
            donnees.activites.filter(
              activiteEstDansSecteur("infrastructureNumerique"),
            ),
          ),
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
          ensembleNeutreDe<InformationsSecteurPossible<Taille>>,
        ) as Set<InformationsSecteurPossible<Taille>>,

  listeSecteursDepuisDonneesSimulateur:
    <Taille extends CategorieTaille>(taille: Taille) =>
    (donnees: DonneesFormulaireSimulateur) =>
      donnees.secteurActivite.reduce(
        (liste, secteur) =>
          union(
            liste,
            FabriqueInformationsSecteur.secteurDepuisDonneesSimulateur(taille)(
              donnees,
              secteur,
            ),
          ),
        new Set<InformationsSecteurPossible<Taille>>([]),
      ),

  informationsSecteurs:
    <Taille extends CategorieTaille>(taille: Taille) =>
    (
      donnees: DonneesFormulaireSimulateur,
    ): ReponseInformationsSecteur<Taille> => ({
      ...fabriqueCategorieTaille(taille),
      secteurs:
        FabriqueInformationsSecteur.listeSecteursDepuisDonneesSimulateur(
          taille,
        )(donnees),
    }),
};
