import { fc } from "@fast-check/vitest";
import { et } from "../../../../utils/services/predicats.operations";
import {
  ActivitesLocalisablesGrand,
  ActivitesLocalisablesPetit,
} from "../../../src/Domain/Simulateur/Activite.definitions";
import { AppartenancePaysUnionEuropeenne } from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  listeTuplesSecteursSousSecteurs,
  ValeursSecteursSansSousSecteur,
} from "../../../src/Domain/Simulateur/SecteurActivite.constantes";
import {
  SecteurActivite,
  SecteurAvecBesoinLocalisationRepresentant,
  SecteurImportantsAvecBesoinLocalisation,
  SecteursAvecSousSecteurs,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import {
  ValeursSecteurAvecActivitesEssentielles,
  ValeursSecteursActivitesAnnexe1,
  ValeursSecteursActivitesAnnexe2,
  ValeursSecteursImportantsAvecBesoinLocalisation,
} from "../../../src/Domain/Simulateur/SecteurActivite.valeurs";
import {
  estActiviteAutre,
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
  estActiviteInfrastructureNumeriqueSansBesoinLocalisation,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { CategorieTaille } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import { fabriqueTuplesSecteurSousSecteur } from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.operations";
import {
  estSecteurListe,
  estSecteurNeNecessitantPasLocalisationRepresentant,
  estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite,
  estUnSecteurAvecDesSousSecteurs,
} from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import {
  estSousSecteur,
  estSousSecteurListe,
} from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import {
  PeutEtreSousSecteurActivite,
  SousSecteurActivite,
} from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import { Arbitraire as A } from "../../utilitaires/Arbitraires.operations";
import {
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur,
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite,
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteurSimple,
  fabriqueArb_EnsActivites_PourSecteurEILocalisable_HorsUe,
  fabriqueArb_EnsActivites_PourSecteurInfraNumLocalisable_HorsUe,
  fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe,
} from "../../utilitaires/EnsActivites.arbitraires.fabriques";
import { fabriqueArb_EnsInformationsSecteurPossible } from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbLocalisationRepresentant_ToujoursAutre,
  arbLocalisationRepresentant_ToujoursFrance,
  arbLocalisationRepresentant_ToujoursHorsUE,
} from "./ValeursChampsSimulateur.arbitraire";

export const arbSecteurListesSansSousSecteurNiLocaGrand = fc.constantFrom(
  ...ValeursSecteursSansSousSecteur.filter(estSecteurListe).filter(
    estSecteurNeNecessitantPasLocalisationRepresentant,
  ),
);

const fabriqueTupleSectoriel = (
  secteur: SecteurActivite,
): [SecteurActivite, PeutEtreSousSecteurActivite][] =>
  estUnSecteurAvecDesSousSecteurs(secteur)
    ? fabriqueTuplesSecteurSousSecteur(secteur)
    : [[secteur, "PasDeSousSecteurActivite"]];

const accumuleTuplesSecteurs = (
  acc: [SecteurActivite, PeutEtreSousSecteurActivite][],
  secteur: SecteurActivite,
): [SecteurActivite, PeutEtreSousSecteurActivite][] => [
  ...acc,
  ...fabriqueTupleSectoriel(secteur),
];

const filtreValsursSecteursInutiles = (
  listeSecteurs: readonly SecteurActivite[],
) =>
  listeSecteurs
    .filter(estSecteurNeNecessitantPasLocalisationRepresentant)
    .reduce(
      accumuleTuplesSecteurs,
      [] as [SecteurActivite, PeutEtreSousSecteurActivite][],
    )
    .filter(
      ([, ssSecteur]) =>
        estSousSecteur(ssSecteur) && estSousSecteurListe(ssSecteur),
    );

export const arbSecteursActivite_Annexe1_SansBesoinLocalisation =
  fc.constantFrom(
    ...filtreValsursSecteursInutiles(ValeursSecteursActivitesAnnexe1),
  );
export const arbSecteursActivite_Annexe2_SansBesoinLocalisation =
  fc.constantFrom(
    ...filtreValsursSecteursInutiles(ValeursSecteursActivitesAnnexe2),
  );

export const arbSecteurActivite_InfrastructureNumerique = fc.constantFrom(
  ...ValeursSecteurAvecActivitesEssentielles,
);
export const arbSecteurImportantAvecBesoinLocalisation =
  fc.constantFrom<SecteurImportantsAvecBesoinLocalisation>(
    ...ValeursSecteursImportantsAvecBesoinLocalisation,
  );
export const arbSecteurNonEligiblesPetiteEntite = fc.constantFrom(
  ...ValeursSecteursSansSousSecteur.filter(estSecteurListe).filter(
    estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite,
  ),
);
export const arbSecteurAvecSousSecteurListes = fc.constantFrom<
  [SecteursAvecSousSecteurs, SousSecteurActivite]
>(
  ...listeTuplesSecteursSousSecteurs.filter(([, sousSecteur]) =>
    estSousSecteurListe(sousSecteur),
  ),
);
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique"
 *      et
 * activite dans :
 *  - "fournisseurReseauxCommunicationElectroniquesPublics",
 *  - "fournisseurServiceCommunicationElectroniquesPublics",
 *  - "prestataireServiceConfiance",
 */
export const arbInformationsSecteur_AvecActivitesEssentielles_Petite =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe(
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
        estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesPetit>,
    )(arbLocalisationRepresentant_ToujoursFrance),
  );
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique"
 *      et
 * activite dans :
 *  - "registresNomsDomainesPremierNiveau",
 *  - "fournisseurServicesDNS",
 */
export const arbInformationsSecteur_AvecActivitesEssentielles_LocaliseesFrance_Petite =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe(
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesPetit>,
    )(arbLocalisationRepresentant_ToujoursFrance),
  );
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "gestionServicesTic" | "fournisseursNumeriques"
 */
export const arbInformationsSecteur_LocaliseesFrance_Grande_EI =
  arbSecteurImportantAvecBesoinLocalisation.chain(
    fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe(
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
        estActiviteListee,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesGrand>,
    )(arbLocalisationRepresentant_ToujoursFrance),
  );
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "gestionServicesTic" | "fournisseursNumeriques"
 */
export const arbInformationsSecteur_LocaliseesAutre_Grande_EI =
  arbSecteurImportantAvecBesoinLocalisation.chain(
    fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe(
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
        estActiviteListee,
      ),
    )(arbLocalisationRepresentant_ToujoursAutre),
  );

/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique" et activite registre ou fournisseur DNS
 */
export const arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe(
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      ),
    )(arbLocalisationRepresentant_ToujoursFrance),
  );
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique" et activite registre ou fournisseur DNS
 */
export const arbInformationsSecteur_LocaliseesAutrePaysUE_Grande_Infranum_EE =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe(
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      ),
    )(arbLocalisationRepresentant_ToujoursAutre),
  );
export const arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE =
  arbSecteurImportantAvecBesoinLocalisation.chain(
    fabriqueArb_EnsActivites_PourSecteurEILocalisable_HorsUe,
  );
const fabriqueArb_EnsActivites_Infranum_Localisees = <
  Taille extends CategorieTaille,
  TypeAppartenancePaysUnionEuropeenne extends AppartenancePaysUnionEuropeenne,
>(
  arb: fc.Arbitrary<TypeAppartenancePaysUnionEuropeenne>,
) =>
  A.enchaine(
    fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe<Taille>(
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteurPeutEtreComposite(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      ),
    )(arb),
  )(arbSecteurActivite_InfrastructureNumerique);
export const arbInformationsSecteur_Infranum_LocaliseesAutrePaysUE_PE =
  fabriqueArb_EnsActivites_Infranum_Localisees(
    arbLocalisationRepresentant_ToujoursAutre,
  );

export const arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE =
  fabriqueArb_EnsActivites_Infranum_Localisees(
    arbLocalisationRepresentant_ToujoursHorsUE,
  );

export const arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArb_EnsActivites_PourSecteurInfraNumLocalisable_HorsUe,
  );
export const arbInformationsSecteurComposite =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteListee),
  );
export const arbInformationsSecteurCompositeActivitesAutres =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteAutre),
  );
export const arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI =
  fabriqueArb_EnsInformationsSecteurPossible(
    arbSecteurActivite_InfrastructureNumerique.chain(
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteurSimple(
        et(
          estActiviteListee,
          estActiviteInfrastructureNumeriqueSansBesoinLocalisation,
        ),
      ),
    ),
  );
