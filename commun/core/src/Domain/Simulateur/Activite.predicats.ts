import {
  Activite,
  ActiviteInfranumLocalEtabLot1,
  ActivitesPourSecteur,
} from "./Activite.definitions";
import { ValeursActivitesInfrastructureNumeriqueDNSRegistreDomainePermierNiveau } from "./Activite.valeurs";
import { SecteurSimple } from "./SecteurActivite.definitions";
import { SousSecteurListes } from "./SousSecteurActivite.definitions";
import {
  DonneesFormulaireSimulateur,
  DonneesSectorielles,
} from "./services/DonneesFormulaire/DonneesFormulaire.definitions";
import { activitesParSecteurEtSousSecteur } from "./Activite.operations";

const prefixeAutreActivite = "autreActivite";

export const activiteEstDansSecteur =
  <S extends SecteurSimple | SousSecteurListes>(secteurActivite: S) =>
  (activite: Activite): activite is ActivitesPourSecteur[S] =>
    activitesParSecteurEtSousSecteur[
      secteurActivite as SecteurSimple | SousSecteurListes
    ].includes(activite);

export const estActiviteAutre = <T extends Activite>(activite: T) =>
  activite.startsWith(prefixeAutreActivite);
export const estActiviteListee = (activite: Activite) =>
  !activite.startsWith(prefixeAutreActivite);
export const auMoinsUneActiviteListee = (activites: Activite[]) =>
  activites && activites.length > 0 && activites.some(estActiviteListee);

export const auMoinsUneActiviteCommuneAvec =
  (activitesCherchees: Activite[]) => (listeTesteeActivites: Activite[]) =>
    activitesCherchees.some((activite) =>
      listeTesteeActivites.includes(activite),
    );

export const auMoinsUneActiviteInfraNumConcernee =
  auMoinsUneActiviteCommuneAvec([
    "fournisseurReseauxCommunicationElectroniquesPublics",
    "fournisseurServiceCommunicationElectroniquesPublics",
    "prestataireServiceConfianceQualifie",
    "prestataireServiceConfianceNonQualifie",
  ]);

export const exerceAucuneActivitesDansListe =
  (liste: Activite[]) =>
  <
    T extends DonneesSectorielles &
      Pick<DonneesFormulaireSimulateur, "activites">,
  >(
    d: T,
  ) =>
    d.activites.every((a) => !liste.includes(a));
export const estActiviteInfrastructureNumeriqueAvecBesoinLocalisation = (
  a: Activite | ActiviteInfranumLocalEtabLot1,
): a is ActiviteInfranumLocalEtabLot1 =>
  ValeursActivitesInfrastructureNumeriqueDNSRegistreDomainePermierNiveau.includes(
    a as ActiviteInfranumLocalEtabLot1,
  );
