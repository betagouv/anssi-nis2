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

export type InformationSecteurSimpleAutre = {
  secteurActivite: ExtraitAutre<SecteurActivite>;
};

export type InformationsSecteurSansBesoinLocalisation =
  | InformationsSecteursCompositeListe
  | InformationsSecteurSimpleListe;
export type InformationsSecteursComposite =
  | InformationsSecteurCompositeAutre
  | InformationsSecteursCompositeListe;
