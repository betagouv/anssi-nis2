import { ValeursOuiNon } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { contientSecteurNecessitantLocalisation } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { non } from "../../../src/Domain/Simulateur/services/ChampSimulateur/champs.predicats";
import {
  etend,
  fabriqueArbSingleton,
} from "../../utilitaires/manipulationArbitraires";
import { arbActivitesAutres } from "./arbitrairesSimulateur.activites";
import {
  arbAutrePaysUe,
  arbHorsUe,
  donneeAbsente,
} from "./arbitrairesSimulateur.toutesValeurs";
import { arbNonOSEPublique } from "./arbitrairesSimulateur.nonOSEPublique";
import {
  arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance,
  arbNonOSEPrivesMoyenGrandFournisseurNumerique,
  arbNonOSEPrivesMoyenGrandGestionTic,
  arbNonOSEPrivesMoyenneGrande,
  arbNonOSEPrivesMoyenneGrandeAutresActivites,
  arbNonOSEPrivesMoyenneGrandeAutresValeursSectorielles,
} from "./arbitrairesSimulateur.nonOSEPriveesMoyennesGrandes";
import { arbFournisseursInfrastructureNumerique } from "./arbitrairesSimulateur.infrastructuresNumeriques";
import { arbDesigneOSE } from "./arbitrairesSimulateur.OSE";

export const arbForm = {
  designeOSE: arbDesigneOSE,
  nonDesigneOSE: {
    privee: {
      activitesAutres: arbActivitesAutres,
      petit: arbFournisseursInfrastructureNumerique,
      grand: {
        secteursListes: arbNonOSEPrivesMoyenneGrande,
        secteursAutres: arbNonOSEPrivesMoyenneGrandeAutresValeursSectorielles,
        activitesAutres: {
          sansLocalisation: arbNonOSEPrivesMoyenneGrandeAutresActivites.filter(
            non(contientSecteurNecessitantLocalisation),
          ),
          avecLocalisation: etend(
            arbNonOSEPrivesMoyenneGrandeAutresActivites.filter(
              contientSecteurNecessitantLocalisation,
            ),
          ).avec({
            fournitServicesUnionEuropeenne: fabriqueArbSingleton(ValeursOuiNon),
          }),
        },
      },
      exceptions: {
        etablissementPrincipalFrance: {
          moyenGrandInfraNum:
            arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance,
          moyenGrandGestionTic: arbNonOSEPrivesMoyenGrandGestionTic,
          moyenGrandFournisseurNum:
            arbNonOSEPrivesMoyenGrandFournisseurNumerique,
        },
      },
    },
    publique: arbNonOSEPublique,
    horsUE: arbHorsUe,
    autrePaysUe: arbAutrePaysUe,
  },
  nonValide: {
    donneeAbsente: donneeAbsente,
  },
};
