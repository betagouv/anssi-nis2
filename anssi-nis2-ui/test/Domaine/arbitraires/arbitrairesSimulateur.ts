import { arbOSEMoyenGrand, arbOSEPetit } from "./arbitrairesSimulateur.OSE";
import { arbActivitesAutres } from "./arbitrairesSimulateur.activites";
import {
  arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance,
  arbNonOSEPrivesPetitFournisseurInfraNum,
  arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernes,
  arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernesFrance,
  arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes,
  arbNonOSEPrivesPetitHorsFournisseurInfraNum,
} from "./arbitrairesSimulateur.infrastructuresNumeriques";
import { donneeAbsente } from "./arbitrairesSimulateur.toutesValeurs";
import { arbNonOSEPublique } from "./arbitrairesSimulateur.nonOSEPublique";
import {
  arbNonOSEPrivesMoyenGrandFournisseurNumerique,
  arbNonOSEPrivesMoyenGrandGestionTic,
  arbNonOSEPrivesMoyenneGrande,
  arbNonOSEPrivesMoyenneGrandeAutresActivites,
  arbNonOSEPrivesMoyenneGrandeAutresValeursSectorielles,
} from "./arbitrairesSimulateur.nonOSEPriveesMoyennesGrandes";

export const arbForm = {
  designeOSE: {
    petit: arbOSEPetit,
    moyenGrand: arbOSEMoyenGrand,
  },
  nonDesigneOSE: {
    privee: {
      activitesAutres: arbActivitesAutres,
      petit: {
        fournisseursInfrastructureNumerique:
          arbNonOSEPrivesPetitFournisseurInfraNum,
        fournisseursInfraNum: {
          activitesConcernes:
            arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernes,
          activitesNonConcernes:
            arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes,
        },
        listeNonFournisseursInfrastructureNumerique:
          arbNonOSEPrivesPetitHorsFournisseurInfraNum,
      },
      grand: {
        secteursListes: arbNonOSEPrivesMoyenneGrande,
        secteursAutres: arbNonOSEPrivesMoyenneGrandeAutresValeursSectorielles,
        activitesAutres: arbNonOSEPrivesMoyenneGrandeAutresActivites,
      },
      exceptions: {
        etablissementPrincipalFrance: {
          petitInfraNum:
            arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernesFrance,
          moyenGrandInfraNum:
            arbNonOSEPrivesMoyenGrandFournisseurInfraNumActivitesConcernesFrance,
          moyenGrandGestionTic: arbNonOSEPrivesMoyenGrandGestionTic,
          moyenGrandFournisseurNum:
            arbNonOSEPrivesMoyenGrandFournisseurNumerique,
        },
      },
    },
    publique: arbNonOSEPublique,
  },
  nonValide: {
    donneeAbsente: donneeAbsente,
  },
};
