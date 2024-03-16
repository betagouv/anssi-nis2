import { ExtraitAutre } from "../../../../../../utils/types/Extrait";
import {
  ActiviteInfranumLocalEtabLot1,
  ActiviteInfranumLocalEtabLot2,
  ActiviteInfranumLocalServices,
  ActiviteSecteursSimplesListe,
  ActivitesEnergie,
  ActivitesFabrication,
  ActivitesPourSecteur,
  ActivitesTransports,
} from "../../Activite.definitions";
import {
  SecteurActivite,
  SecteurComposite,
  SecteursDefinitsSansBesoinLocalisationRepresentant,
  SecteurSimple,
  SecteursReqLocalEtap,
  SousSecteurAutrePour,
} from "../../SecteurActivite.definitions";
import {
  SousSecteurEnergie,
  SousSecteurFabrication,
  SousSecteurTransport,
} from "../../SousSecteurActivite.definitions";
import { CategorieTaille } from "./ReponseStructure.definitions";

export type InformationsSecteurSimpleListe = {
  secteurActivite: SecteursDefinitsSansBesoinLocalisationRepresentant;
  activites: Set<ActiviteSecteursSimplesListe>;
};
export type InformationsSecteurCompositeAutre<
  S extends SecteurComposite = SecteurComposite,
> = {
  secteurActivite: S;
  sousSecteurActivite: SousSecteurAutrePour<S>;
};
export type InformationsSecteurCompositeEnergie = {
  secteurActivite: "energie";
  sousSecteurActivite: Exclude<SousSecteurEnergie, "autreSousSecteurEnergie">;
  activites: Set<ActivitesEnergie>;
};
export type InformationsSecteurCompositeFabrication = {
  secteurActivite: "fabrication";
  sousSecteurActivite: Exclude<
    SousSecteurFabrication,
    "autreSousSecteurFabrication"
  >;
  activites: Set<ActivitesFabrication>;
};
export type InformationsSecteurCompositeTransport = {
  secteurActivite: "transports";
  sousSecteurActivite: Exclude<
    SousSecteurTransport,
    "autreSousSecteurTransports"
  >;
  activites: Set<ActivitesTransports>;
};
export type InformationsSecteursCompositeListe =
  | InformationsSecteurCompositeEnergie
  | InformationsSecteurCompositeFabrication
  | InformationsSecteurCompositeTransport;
export type InformationsSecteurComposite =
  | InformationsSecteursCompositeListe
  | InformationsSecteurCompositeAutre;
// export type ActivitesAvecBesoinLocalisationRepresentant<
//   Taille extends CategorieTaille,
// > = Taille extends "Petit"
//   ? ActiviteInfranumLocalEtabLot1
//   :
//       | ActiviteInfranumLocalEtabLot1
//       | ActivitesFournisseursNumeriques
//       | ActivitesGestionServicesTic;
export type InformationsSecteurLocalEtab<
  S extends SecteursReqLocalEtap = SecteursReqLocalEtap,
> = {
  secteurActivite: S;
  activites: Set<ActivitesPourSecteur[S]>;
};

export type InfoSecteurExtraitActivites<
  S extends SecteurSimple,
  A extends ActivitesPourSecteur[S],
> = {
  secteurActivite: S;
  activites: Set<Extract<ActivitesPourSecteur[S], A>>;
};
export type InfoSecteursMoinsActivites<
  S extends SecteurSimple,
  A extends ActivitesPourSecteur[S],
> = {
  secteurActivite: S;
  activites: Set<Exclude<ActivitesPourSecteur[S], A>>;
};

export type InformationsSecteurAvecActiviteInfranumLocalServices =
  InfoSecteurExtraitActivites<
    "infrastructureNumerique",
    ActiviteInfranumLocalServices
  >;

export type InformationsSecteurAvecActiviteInfranumLocalEtabLot1 =
  InfoSecteurExtraitActivites<
    "infrastructureNumerique",
    ActiviteInfranumLocalEtabLot1
  >;

export type InformationsSecteurAvecActiviteInfranumLocalEtabLot2 =
  InfoSecteurExtraitActivites<
    "infrastructureNumerique",
    ActiviteInfranumLocalEtabLot2
  >;

export type InformationsSecteurInfranumAutresActivitesListees_P =
  InfoSecteursMoinsActivites<
    "infrastructureNumerique",
    ActiviteInfranumLocalServices | ActiviteInfranumLocalEtabLot1
  >;
export type InformationsSecteurInfranumAutresActivitesListees_MG =
  InfoSecteursMoinsActivites<
    "infrastructureNumerique",
    | ActiviteInfranumLocalServices
    | ActiviteInfranumLocalEtabLot1
    | ActiviteInfranumLocalEtabLot2
  >;

export type InformationsSecteurInfranumAutresActivitesListees<
  Taille extends CategorieTaille,
> = Taille extends "Petit"
  ? InformationsSecteurInfranumAutresActivitesListees_P
  : InformationsSecteurInfranumAutresActivitesListees_MG;

export type InformationsAutresSecteursListes<
  S extends Exclude<
    SecteurSimple,
    "infrastructureNumerique" | "gestionServicesTic" | "fournisseursNumeriques"
  > = Exclude<
    SecteurSimple,
    "infrastructureNumerique" | "gestionServicesTic" | "fournisseursNumeriques"
  >,
> = {
  secteurActivite: S;
  activites: Set<ActivitesPourSecteur[S extends SecteurSimple ? S : never]>;
};

// export type InformationsSecteurListe =
//   | InformationsSecteurAvecActiviteInfranumLocalServices
//   | InformationsSecteurAvecActiviteInfranumLocalEtabLot1
//   | InformationsSecteurAvecActiviteInfranumLocalEtabLot2
//   | InfoSecteursMoinsActivites<
//       "infrastructureNumerique",
//       ActiviteInfranumLocalServices | ActiviteInfranumLocalEtabLot1
//     >
//   | InformationsSecteurLocalEtab
//   | InformationsAutresSecteursListes
//   | InformationsSecteursCompositeListe;
//
// export type InformationsSecteurAvecBesoinLocalisation =
//   | InformationsSecteurAvecActiviteInfranumLocalServices
//   | InformationsSecteurAvecActiviteInfranumLocalEtabLot1
//   | InformationsSecteurAvecActiviteInfranumLocalEtabLot2
//   | InformationsSecteurLocalEtab;
//   {
//   secteurActivite: SecteurAvecBesoinLocalisationRepresentant;
//   activites: Set<ActivitesAvecBesoinLocalisationRepresentant<Taille>>;
// } & EtablissementPrincipalLocalisation;

export type InformationSecteurSimpleAutre = {
  secteurActivite: ExtraitAutre<SecteurActivite>;
};

export type InformationsSecteurAutre =
  | InformationSecteurSimpleAutre
  | InformationsSecteurCompositeAutre;
export type InformationsSecteurSansBesoinLocalisation =
  | InformationsSecteursCompositeListe
  | InformationsSecteurSimpleListe;
export type InformationsSecteursComposite =
  | InformationsSecteurCompositeAutre
  | InformationsSecteursCompositeListe;
