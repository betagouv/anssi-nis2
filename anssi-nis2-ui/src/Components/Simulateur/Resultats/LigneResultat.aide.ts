import { P, match } from "ts-pattern";
import {
  et,
  non,
  toujoursFaux,
  toujoursVrai,
} from "../../../../../commun/utils/services/commun.predicats.ts";
import {
  Regulation,
  TypeEntite,
} from "../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import {
  EtatRegulationDefinitif,
  EtatRegulationDefinitivement as EtatRegulationDefinivement,
  EtatRegulationDefinitivement,
} from "../../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";
import {
  auMoinsUneActiviteEst,
  auMoinsUneActiviteEstParmis,
  contientActivitesListees,
  contientLocalisationFournitureServicesNumeriques,
  estEtablissementPrincipalLocalise,
  estInformationsPourSecteur,
  estSecteurBancaire,
} from "../../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats.ts";
import { certains } from "../../../../../commun/utils/services/sets.operations.ts";
import {
  libelleTitreIncertainAutrePaysUnionEuropeenne,
  libelleTitreIncertainStandard,
  libelleTitreNonRegule,
  libelleTitreReguleEnregistrementUniquement,
  libelleTitreReguleEntiteEssentielle,
  libelleTitreReguleEntiteEssentielleTelcoPlusieursPaysDontFrance,
  libelleTitreReguleEntiteImportante,
  libelleTitreReguleEntiteNonDeterminee,
} from "../../../References/LibellesResultatsEligibilite.ts";
import {
  ActionPrecisionsResultat,
  EtatPrecisionsResultat,
} from "./LigneResultat.declarations.ts";

const certainsSontTelcoFournisseursReseauxPlusieursPaysDontFrance = certains(
  et(
    estInformationsPourSecteur("infrastructureNumerique"),
    auMoinsUneActiviteEstParmis(
      "fournisseurReseauxCommunicationElectroniquesPublics",
      "fournisseurServiceCommunicationElectroniquesPublics",
    ),
    contientLocalisationFournitureServicesNumeriques("france"),
    contientLocalisationFournitureServicesNumeriques("autre"),
  ),
);

export const changePropriete = (
  state: EtatPrecisionsResultat,
  action: ActionPrecisionsResultat,
) => ({ ...state, [action.type]: action.value });

export type ClassesCssResultat = { icone: string; cadre: string };

export const fabriqueClassesCSSResultat = (
  classeIcone: string,
  classeCadre: string,
): ClassesCssResultat => ({
  icone: classeIcone,
  cadre: classeCadre,
});

export const getClassesCssResultatIncertain = (
  etatRegulation: EtatRegulationDefinitivement<"Incertain">,
): ClassesCssResultat =>
  match(etatRegulation.causes._tag)
    .with("DefiniDansUnAutreEtatMembre", () =>
      fabriqueClassesCSSResultat(
        "fr-icon-question-fill",
        "fr-nis2-incertain-UE",
      ),
    )
    .with("ConstructionTestEnCours", () =>
      fabriqueClassesCSSResultat("fr-icon-close-line", "fr-nis2-non-eligible"),
    )
    .with(P.string, () =>
      fabriqueClassesCSSResultat(
        "fr-nis2-icon-in-progress",
        "fr-nis2-incertain",
      ),
    )
    .exhaustive();

export const getClassesCssResultat = (
  etatRegulation: EtatRegulationDefinitif,
): ClassesCssResultat =>
  match(etatRegulation.decision)
    .with("NonRegule", () =>
      fabriqueClassesCSSResultat("fr-icon-close-line", "fr-nis2-non-eligible"),
    )
    .with("Incertain", () =>
      getClassesCssResultatIncertain(
        etatRegulation as EtatRegulationDefinitivement<"Incertain">,
      ),
    )
    .with("Regule", () =>
      fabriqueClassesCSSResultat("fr-icon-check-line", "fr-nis2-eligible"),
    )
    .exhaustive();

export const getTitrePourEtatEvaluation = (
  etatRegulation: EtatRegulationDefinitif,
) =>
  match(etatRegulation)
    .with(
      {
        decision: Regulation.Regule,
        typeEntite: TypeEntite.EntiteEssentielle,
        causes: {
          InformationsSecteur: {
            secteurs: P.when(
              certainsSontTelcoFournisseursReseauxPlusieursPaysDontFrance,
            ),
          },
        },
      },
      () => libelleTitreReguleEntiteEssentielleTelcoPlusieursPaysDontFrance,
    )
    .with(
      {
        decision: Regulation.Regule,
        typeEntite: TypeEntite.EntiteEssentielle,
      },
      () => libelleTitreReguleEntiteEssentielle,
    )
    .with(
      { decision: Regulation.Regule, typeEntite: TypeEntite.EntiteImportante },
      () => libelleTitreReguleEntiteImportante,
    )
    .with(
      {
        decision: Regulation.Regule,
        typeEntite: TypeEntite.EnregistrementUniquement,
      },
      () => libelleTitreReguleEnregistrementUniquement,
    )
    .with(
      {
        decision: Regulation.Regule,
        typeEntite: TypeEntite.AutreEtatMembreUE,
      },
      () => libelleTitreReguleEntiteNonDeterminee,
    )
    .with(
      {
        decision: Regulation.Incertain,
        causes: { _tag: "DefiniDansUnAutreEtatMembre" },
      },
      () => libelleTitreIncertainAutrePaysUnionEuropeenne,
    )
    .with(
      {
        decision: "Incertain",
        causes: {
          _tag: "ConstructionTestEnCours",
          typeConstructionEnCours: "HorsUnionEuropeenne",
        },
      },
      () => libelleTitreNonRegule,
    )
    .with({ decision: Regulation.NonRegule }, () => libelleTitreNonRegule)
    .otherwise(() => libelleTitreIncertainStandard);

const getNomFichierPrecisionRegule = (
  etatRegulation: EtatRegulationDefinitivement<"Regule">,
) =>
  match(etatRegulation)
    .with(
      {
        causes: {
          InformationsSecteur: {
            _categorieTaille: "Grand",
            secteurs: P.when(
              certains(et(estSecteurBancaire, contientActivitesListees)),
            ),
          },
        },
      },
      () => "PrecisionsResultat.ReguleDORA",
    )
    .with(
      {
        typeEntite: "AutreEtatMembreUE",
        causes: {
          InformationsSecteur: {
            secteurs: P.when(
              certains(estInformationsPourSecteur("infrastructureNumerique")),
            ),
          },
        },
      },
      () => "PrecisionsResultat.ReguleTelcoAutreEM",
    )
    .with(
      {
        causes: {
          InformationsSecteur: {
            secteurs: P.when(
              certainsSontTelcoFournisseursReseauxPlusieursPaysDontFrance,
            ),
          },
        },
      },
      () => "PrecisionsResultat.ReguleTelcoFranceEtAutreEM",
    )
    .with(
      {
        causes: {
          InformationsSecteur: {
            secteurs: P.when(
              certains(
                et(
                  estInformationsPourSecteur("infrastructureNumerique"),
                  auMoinsUneActiviteEstParmis(
                    "fournisseurReseauxCommunicationElectroniquesPublics",
                    "fournisseurServiceCommunicationElectroniquesPublics",
                  ),
                  contientLocalisationFournitureServicesNumeriques("autre"),
                ),
              ),
            ),
          },
        },
      },
      () => "PrecisionsResultat.ReguleTelcoAutreEM",
    )
    .with(
      {
        causes: {
          InformationsSecteur: {
            secteurs: P.when(
              certains(
                et(
                  estInformationsPourSecteur("infrastructureNumerique"),
                  auMoinsUneActiviteEstParmis(
                    "fournisseurServicesDNS",
                    "registresNomsDomainesPremierNiveau",
                    "fournisseurServicesInformatiqueNuage",
                    "fournisseurServiceCentresDonnees",
                    "fournisseurReseauxDiffusionContenu",
                  ),
                  non(estEtablissementPrincipalLocalise("france")),
                  estEtablissementPrincipalLocalise("autre"),
                ),
              ),
            ),
          },
        },
      },
      () => "PrecisionsResultat.ReguleTelcoAutreEM",
    )
    .with(
      {
        causes: {
          InformationsSecteur: {
            secteurs: P.when(
              certains(
                et(
                  estInformationsPourSecteur("infrastructureNumerique"),
                  auMoinsUneActiviteEst(
                    "fournisseurServicesEnregristrementNomDomaine",
                  ),
                ),
              ),
            ),
          },
        },
      },
      () => "PrecisionsResultat.ReguleEnregistrementDeNomsDeDomaine",
    )
    .otherwise(() => "PrecisionsResultat.ReguleStandard");
const getNomFichierPrecisionIncertain = (
  etatRegulation: EtatRegulationDefinitivement<"Incertain">,
) =>
  match(etatRegulation.causes)
    .with(
      {
        _tag: "ConstructionTestEnCours",
        typeConstructionEnCours: "HorsUnionEuropeenne",
      },
      () => "PrecisionsResultat.NonReguleHorsUnionEuropeenne",
    )
    .with(
      { _tag: "DefiniDansUnAutreEtatMembre" },
      () => "PrecisionsResultat.IncertainAutrePaysUnionEuropeenne",
    )
    .otherwise(() => "");
export const getNomFichierPrecision = (
  etatRegulation: EtatRegulationDefinitif,
) =>
  match(etatRegulation.decision)
    .with("Regule", () =>
      getNomFichierPrecisionRegule(
        etatRegulation as EtatRegulationDefinivement<"Regule">,
      ),
    )
    .with("NonRegule", () => "PrecisionsResultat.NonReguleStandard")
    .with("Incertain", () =>
      getNomFichierPrecisionIncertain(
        etatRegulation as EtatRegulationDefinitivement<"Incertain">,
      ),
    )
    .exhaustive();

export const getInformationsResultatEvaluation = (
  etatRegulation: EtatRegulationDefinitif,
) => ({
  titre: getTitrePourEtatEvaluation(etatRegulation),
  classes: getClassesCssResultat(etatRegulation),
  fichierPrecisions: getNomFichierPrecision(etatRegulation),
});

/**
 * Détermine si le cas est un cas en cours d'implémentation dans l'algorithme
 * @param etatRegulation
 */
export const estCasGere = (etatRegulation: EtatRegulationDefinitif) =>
  match(etatRegulation)
    .with(
      {
        decision: P.not("Incertain"),
      },
      toujoursVrai,
    )
    .with(
      {
        causes: {
          _tag: "ConstructionTestEnCours",
          typeConstructionEnCours: "HorsUnionEuropeenne",
        },
      },
      toujoursVrai,
    )
    .with(
      {
        causes: {
          _tag: "DefiniDansUnAutreEtatMembre",
        },
      },
      toujoursVrai,
    )
    .otherwise(toujoursFaux);
