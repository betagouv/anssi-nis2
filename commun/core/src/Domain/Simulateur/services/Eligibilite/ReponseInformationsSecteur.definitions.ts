import { ExtraitAutre } from "../../../../../../utils/types/Extrait";
import {
  ActiviteInfrastructureNumeriqueDNSRegistreDomainePermierNiveau,
  ActivitesPourSecteur,
  ActiviteSecteursSimples,
  ActivitesEnergie,
  ActivitesFabrication,
  ActivitesFournisseursNumeriques,
  ActivitesGestionServicesTic,
  ActivitesTransports,
} from "../../Activite.definitions";
import {
  SecteurActivite,
  SecteurAvecBesoinLocalisationRepresentant,
  SecteurComposite,
  SecteursDefinitsSansBesoinLocalisationRepresentant,
  SecteurSimple,
  SousSecteurAutrePour,
} from "../../SecteurActivite.definitions";
import {
  SousSecteurEnergie,
  SousSecteurFabrication,
  SousSecteurTransport,
} from "../../SousSecteurActivite.definitions";
import { EtablissementPrincipalLocalisation } from "./LocalisationsActivites.definitions";
import {
  CategorieTaille,
  CategoriseTaille,
} from "./ReponseStructure.definitions";

export type InformationsSecteurSimple = {
  secteurActivite: SecteursDefinitsSansBesoinLocalisationRepresentant;
  activites: Set<ActiviteSecteursSimples>;
};

export type InformationsSecteurCompositeAutre<S extends SecteurComposite> = {
  secteurActivite: S;
  sousSecteurActivite: SousSecteurAutrePour<S>;
};
export type InformationsSecteurCompositeEnergie = {
  secteurActivite: "energie";
  sousSecteurActivite: Omit<SousSecteurEnergie, "autreSousSecteurEnergie">;
  activites: Set<ActivitesEnergie>;
};
export type InformationsSecteurCompositeFabrication = {
  secteurActivite: "fabrication";
  sousSecteurActivite: Omit<
    SousSecteurFabrication,
    "autreSousSecteurFabrication"
  >;
  activites: Set<ActivitesFabrication>;
};
export type InformationsSecteurCompositeTransport = {
  secteurActivite: "transports";
  sousSecteurActivite: Omit<SousSecteurTransport, "autreSousSecteurTransports">;
  activites: Set<ActivitesTransports>;
};
export type InformationsSecteursCompositeListe =
  | InformationsSecteurCompositeEnergie
  | InformationsSecteurCompositeFabrication
  | InformationsSecteurCompositeTransport;

export type ActivitesAvecBesoinLocalisationRepresentant<
  Taille extends CategorieTaille,
> = Taille extends "Petit"
  ? ActiviteInfrastructureNumeriqueDNSRegistreDomainePermierNiveau
  :
      | ActiviteInfrastructureNumeriqueDNSRegistreDomainePermierNiveau
      | ActivitesFournisseursNumeriques
      | ActivitesGestionServicesTic;

export type InformationsSecteurLocalEtab<
  S extends "gestionServicesTic" | "fournisseursNumeriques",
> = {
  secteurActivite: S;
  activites: Set<ActivitesPourSecteur[S]>;
};

export type InformationsSecteurInfranumAutresActivitesListees = {
  secteurActivite: "infrastructureNumerique";
  activites: Set<
    Omit<
      ActivitesPourSecteur["infrastructureNumerique"],
      | "fournisseurReseauxCommunicationElectroniquesPublics"
      | "fournisseurServiceCommunicationElectroniquesPublics"
      | "fournisseurServicesDNS"
      | "registresNomsDomainesPremierNiveau"
      | "fournisseurServicesInformatiqueNuage"
      | "fournisseurServiceCentresDonnees"
      | "fournisseurReseauxDiffusionContenu"
      | "fournisseurServicesEnregristrementNomDomaine"
    >
  >;
};

export type InformationsSecteurInfranumActiviteLocalServices = {
  secteurActivite: "infrastructureNumerique";
  activites: Set<
    Extract<
      ActivitesPourSecteur["infrastructureNumerique"],
      | "fournisseurReseauxCommunicationElectroniquesPublics"
      | "fournisseurServiceCommunicationElectroniquesPublics"
    >
  >;
};

export type InformationsSecteurInfranumActiviteLocalEtabLot1 = {
  secteurActivite: "infrastructureNumerique";
  activites: Set<
    Extract<
      ActivitesPourSecteur["infrastructureNumerique"],
      "fournisseurServicesDNS" | "registresNomsDomainesPremierNiveau"
    >
  >;
};

export type InformationsSecteurInfranumActiviteLocalEtabLot2 = {
  secteurActivite: "infrastructureNumerique";
  activites: Set<
    Extract<
      ActivitesPourSecteur["infrastructureNumerique"],
      | "fournisseurServicesInformatiqueNuage"
      | "fournisseurServiceCentresDonnees"
      | "fournisseurReseauxDiffusionContenu"
      | "fournisseurServicesEnregristrementNomDomaine"
    >
  >;
};

export type InformationsAutresSecteursListes<
  S extends Omit<
    SecteurSimple,
    "infrastructureNumerique" | "gestionServicesTic" | "fournisseursNumeriques"
  >,
> = {
  secteurActivite: S;
  activites: Set<ActivitesPourSecteur[S extends SecteurSimple ? S : never]>;
};

export type InformationsSecteurAvecBesoinLocalisation<
  Taille extends CategorieTaille,
> = {
  secteurActivite: SecteurAvecBesoinLocalisationRepresentant;
  activites: Set<ActivitesAvecBesoinLocalisationRepresentant<Taille>>;
} & EtablissementPrincipalLocalisation;

export type InformationSecteurSimpleAutre = {
  secteurActivite: ExtraitAutre<SecteurActivite>;
};
export type InformationsSecteurAutre =
  | InformationSecteurSimpleAutre
  | InformationsSecteurCompositeAutre<SecteurComposite>;

export type InformationsSecteurSansBesoinLocalisation =
  | InformationsSecteursCompositeListe
  | InformationsSecteurSimple;

export type InformationsSecteurPossible<Taille extends CategorieTaille> =
  | InformationsSecteurSansBesoinLocalisation
  | InformationsSecteurAvecBesoinLocalisation<Taille>
  | InformationsSecteurAutre;

export type InformationsSecteursComposite =
  | InformationsSecteurCompositeAutre<SecteurComposite>
  | InformationsSecteursCompositeListe;

export type InformationsSecteur<Taille extends CategorieTaille> = {
  secteurs: Set<InformationsSecteurPossible<Taille>>;
};
export type ReponseInformationsSecteur<Taille extends CategorieTaille> =
  CategoriseTaille<Taille> & InformationsSecteur<Taille>;

export type PredicatInformationSecteurPossible = (
  i: InformationsSecteurPossible<CategorieTaille>,
) => boolean;
