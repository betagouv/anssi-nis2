import { arbActivitesAutres } from "./arbitrairesSimulateur.activites";
import {
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
        activitesAutres: arbNonOSEPrivesMoyenneGrandeAutresActivites,
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
  },
  nonValide: {
    donneeAbsente: donneeAbsente,
  },
};
