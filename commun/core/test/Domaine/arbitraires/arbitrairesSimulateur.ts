import { partitionneLocalisationServices } from "../../utilitaires/manipulationArbitraires";
import { arbActivitesAutres } from "./arbitrairesSimulateur.activites";
import { arbFournisseursInfrastructureNumerique } from "./arbitrairesSimulateur.infrastructuresNumeriques";
import {
  arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance,
  arbNonOSEPrivesMoyenGrandFournisseurNumerique,
  arbNonOSEPrivesMoyenGrandGestionTic,
  arbNonOSEPrivesMoyenneGrande,
  arbNonOSEPrivesMoyenneGrandeAutresActivites,
  arbNonOSEPrivesMoyenneGrandeAutresValeursSectorielles,
} from "./arbitrairesSimulateur.nonOSEPriveesMoyennesGrandes";
import { arbNonOSEPublique } from "./arbitrairesSimulateur.nonOSEPublique";
import { arbDesigneOSE } from "./arbitrairesSimulateur.OSE";
import {
  arbAutrePaysUe,
  arbHorsUe,
  donneeAbsente,
} from "./arbitrairesSimulateur.toutesValeurs";

export const arbForm = {
  designeOSE: arbDesigneOSE,
  nonDesigneOSE: {
    privee: {
      activitesAutres: arbActivitesAutres,
      petit: arbFournisseursInfrastructureNumerique,
      grand: {
        secteursListes: partitionneLocalisationServices(
          arbNonOSEPrivesMoyenneGrande,
        ),
        secteursAutres: arbNonOSEPrivesMoyenneGrandeAutresValeursSectorielles,
        activitesAutres: arbNonOSEPrivesMoyenneGrandeAutresActivites,
      },
      exceptions: {
        etablissementPrincipalFrance: {
          moyenGrandInfraNum:
            arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance,
          moyenGrandGestionTic: partitionneLocalisationServices(
            arbNonOSEPrivesMoyenGrandGestionTic,
          ),
          moyenGrandFournisseurNum: partitionneLocalisationServices(
            arbNonOSEPrivesMoyenGrandFournisseurNumerique,
          ),
        },
      },
    },
    publique: partitionneLocalisationServices(arbNonOSEPublique),
    horsUE: arbHorsUe,
    autrePaysUe: arbAutrePaysUe,
  },
  nonValide: {
    donneeAbsente: donneeAbsente,
  },
};
