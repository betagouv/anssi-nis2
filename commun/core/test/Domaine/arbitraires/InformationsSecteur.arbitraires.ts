import { fc } from "@fast-check/vitest";
import { et } from "../../../../utils/services/predicats.operations";
import {
  ActivitesLocalisablesGrand,
  ActivitesLocalisablesPetit,
} from "../../../src/Domain/Simulateur/Activite.definitions";
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
import {
  fabriqueArbEnsembleActivitesPourSecteur,
  fabriqueArbEnsembleActivitesPourSecteurAvecFiltre,
  fabriqueArbitraireEnsembleActivitesPourSecteur,
  fabriqueArbitraireEnsembleActivitesPourSecteurComposite,
  fabriqueArbitraireEnsembleActivitesPourSecteurEILocalisable_HorsUe,
  fabriqueArbitraireEnsembleActivitesPourSecteurInfraNumLocalisable_HorsUe,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand,
  fabriqueArbitrairesEnsembleInformationsSecteurs,
} from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbLocalisationRepresentant_JamaisFrance,
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
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      arbLocalisationRepresentant_ToujoursFrance,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesPetit>,
    ),
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
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      arbLocalisationRepresentant_ToujoursFrance,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesPetit>,
    ),
  );
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "gestionServicesTic" | "fournisseursNumeriques"
 */
export const arbInformationsSecteur_LocaliseesFrance_Grande_EI =
  arbSecteurImportantAvecBesoinLocalisation.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      arbLocalisationRepresentant_ToujoursFrance,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(estActiviteListee)<
        SecteurAvecBesoinLocalisationRepresentant,
        ActivitesLocalisablesGrand
      >,
    ),
  );
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "gestionServicesTic" | "fournisseursNumeriques"
 */
export const arbInformationsSecteur_LocaliseesAutre_Grande_EI =
  arbSecteurImportantAvecBesoinLocalisation.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      arbLocalisationRepresentant_ToujoursAutre,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(estActiviteListee)<
        SecteurAvecBesoinLocalisationRepresentant,
        ActivitesLocalisablesGrand
      >,
    ),
  );

/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique" et activite registre ou fournisseur DNS
 */
export const arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      arbLocalisationRepresentant_ToujoursFrance,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesGrand>,
    ),
  );
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique" et activite registre ou fournisseur DNS
 */
export const arbInformationsSecteur_LocaliseesAutrePaysUE_Grande_Infranum_EE =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      arbLocalisationRepresentant_ToujoursAutre,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesGrand>,
    ),
  );

export const arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsFrance =
  arbSecteurImportantAvecBesoinLocalisation.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      arbLocalisationRepresentant_JamaisFrance,
      fabriqueArbEnsembleActivitesPourSecteur,
    ),
  );
export const arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE =
  arbSecteurImportantAvecBesoinLocalisation.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurEILocalisable_HorsUe,
  );
export const arbInformationsSecteur_Infranum_LocaliseesAutrePaysUE_PE =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      arbLocalisationRepresentant_ToujoursAutre,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesPetit>,
    ),
  );
export const arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      arbLocalisationRepresentant_ToujoursHorsUE,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesPetit>,
    ),
  );
export const arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurInfraNumLocalisable_HorsUe,
  );
export const arbInformationsSecteurComposite =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurComposite(estActiviteListee),
  );
export const arbInformationsSecteurCompositeActivitesAutres =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurComposite(estActiviteAutre),
  );
export const arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI =
  fabriqueArbitrairesEnsembleInformationsSecteurs(
    arbSecteurActivite_InfrastructureNumerique.chain(
      fabriqueArbitraireEnsembleActivitesPourSecteur(
        et(
          estActiviteListee,
          estActiviteInfrastructureNumeriqueSansBesoinLocalisation,
        ),
      ),
    ),
  );
