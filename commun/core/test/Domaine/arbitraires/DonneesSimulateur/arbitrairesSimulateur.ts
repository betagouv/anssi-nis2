import { partitionneLocalisationServices } from "../../../utilitaires/manipulationArbitraires";
import { arbActivitesAutres } from "./arbitrairesSimulateur.activites";
import { arbFournisseursInfrastructureNumerique } from "./arbitrairesSimulateur.infrastructuresNumeriques";
import {
  arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance,
  arbNonOSEPrivesMoyenGrandFournisseurNumerique,
  arbNonOSEPrivesMoyenGrandGestionTic,
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
          avecBesoinLocalisation: partitionneLocalisationServices(
            arbNonOSEPrivesMoyenneGrandeAvecBesoinLocalisation,
          ),
        },

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
    publique: partitionneLocalisationServices(arbNonOSEPublique),
    horsUE: arbHorsUe,
    autrePaysUe: arbAutrePaysUe,
  },
  nonValide: {
    donneeAbsente: donneeAbsente,
  },
};
