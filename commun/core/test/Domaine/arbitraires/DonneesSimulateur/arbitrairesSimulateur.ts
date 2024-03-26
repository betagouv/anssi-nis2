import { arbActivitesAutres } from "./arbitrairesSimulateur.activites";
import { arbFournisseursInfrastructureNumerique } from "./arbitrairesSimulateur.infrastructuresNumeriques";
import {
  arbNonOSEPrivesMoyenneGrandeAutresActivites,
  arbNonOSEPrivesMoyenneGrandeAutresValeursSectorielles,
  arbNonOSEPrivesMoyenneGrandeAvecBesoinLocalisation,
  arbNonOSEPrivesMoyenneGrandeSansBesoinLocalisation,
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
        secteursListes: {
          sansBesoinLocalisation:
            arbNonOSEPrivesMoyenneGrandeSansBesoinLocalisation,
          avecBesoinLocalisation:
            arbNonOSEPrivesMoyenneGrandeAvecBesoinLocalisation,
        },

        secteursAutres: arbNonOSEPrivesMoyenneGrandeAutresValeursSectorielles,
        activitesAutres: arbNonOSEPrivesMoyenneGrandeAutresActivites,
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
