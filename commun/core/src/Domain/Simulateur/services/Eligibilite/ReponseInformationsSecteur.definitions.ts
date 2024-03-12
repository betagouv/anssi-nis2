import { ExtraitAutre } from "../../../../../../utils/types/Extrait";
import {
  ActiviteInfrastructureNumeriqueDNSRegistreDomainePermierNiveau,
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
  SecteursAvecSousSecteurs,
  SecteursDefinitsSansBesoinLocalisationRepresentant,
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

export type InformationsSecteurCompositeAutre<
  S extends SecteursAvecSousSecteurs,
> = {
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
  | InformationsSecteurCompositeAutre<SecteursAvecSousSecteurs>;

export type InformationsSecteurSansBesoinLocalisation =
  | InformationsSecteursCompositeListe
  | InformationsSecteurSimple;

export type InformationsSecteurPossible<Taille extends CategorieTaille> =
  | InformationsSecteurSansBesoinLocalisation
  | InformationsSecteurAvecBesoinLocalisation<Taille>
  | InformationsSecteurAutre;

export type InformationsSecteursComposite =
  | InformationsSecteurCompositeAutre<SecteursAvecSousSecteurs>
  | InformationsSecteursCompositeListe;

export type InformationsSecteur<Taille extends CategorieTaille> = {
  secteurs: Set<InformationsSecteurPossible<Taille>>;
};
export type ReponseInformationsSecteur<Taille extends CategorieTaille> =
  CategoriseTaille<Taille> & InformationsSecteur<Taille>;

export type PredicatInformationSecteurPossible = (
  i: InformationsSecteurPossible<CategorieTaille>,
) => boolean;
