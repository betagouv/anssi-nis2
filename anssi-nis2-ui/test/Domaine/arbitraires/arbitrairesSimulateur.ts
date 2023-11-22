import { arbOSEMoyenGrand, arbOSEPetit } from "./arbitrairesSimulateur.OSE";
import { arbActivitesAutres } from "./arbitrairesSimulateur.activites";
import {
  arbNonOSEPrivesPetitFournisseurInfraNum,
  arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernes,
  arbNonOSEPrivesPetitFournisseurInfraNumActivitesConcernesFrance,
  arbNonOSEPrivesPetitFournisseurInfraNumActivitesNonConcernes,
  arbNonOSEPrivesPetitHorsFournisseurInfraNum,
} from "./arbitrairesSimulateur.infrastructuresNumeriques";
import { donneeAbsente } from "./arbitrairesSimulateur.toutesValeurs";
import { arbNonOSEPublique } from "./arbitrairesSimulateur.nonOSEPublique";
import {
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
          moyenGrandInfraNum: arbNonOSEPrivesPetitFournisseurInfraNum,
          moyenGrandGestionTic: arbNonOSEPrivesPetitFournisseurInfraNum,
          moyenGrandFournisseurNum: arbNonOSEPrivesPetitFournisseurInfraNum,
        },
      },
    },
    publique: arbNonOSEPublique,
  },
  nonValide: {
    donneeAbsente: donneeAbsente,
  },
};
