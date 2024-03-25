import {
  estActiviteAutre,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { Arbitraire as A } from "../../utilitaires/Arbitraires.operations";
import {
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur,
  fabriqueArb_EnsActivites_PourSecteurEILocalisable_HorsUe,
  fabriqueArb_EnsActivites_PourSecteurInfraNumLocalisable_HorsUe,
} from "../../utilitaires/EnsActivites.arbitraires.fabriques";
import {
  arbSecteurActivite_InfrastructureNumerique,
  arbSecteurAvecSousSecteurListes,
  arbSecteurImportantAvecBesoinLocalisation,
} from "./SecteurActivite.arbitraires";

export const arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE =
  A.enchaine(fabriqueArb_EnsActivites_PourSecteurEILocalisable_HorsUe)(
    arbSecteurImportantAvecBesoinLocalisation,
  );

export const arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE =
  A.enchaine(fabriqueArb_EnsActivites_PourSecteurInfraNumLocalisable_HorsUe)(
    arbSecteurActivite_InfrastructureNumerique,
  );
export const arbInformationsSecteurComposite = A.enchaine(
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteListee),
)(arbSecteurAvecSousSecteurListes);
export const arbInformationsSecteurCompositeActivitesAutres = A.enchaine(
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteAutre),
)(arbSecteurAvecSousSecteurListes);
