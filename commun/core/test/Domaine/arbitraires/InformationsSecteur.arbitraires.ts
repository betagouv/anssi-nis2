import { flow } from "fp-ts/lib/function";
import {
  estActiviteAutre,
  estActiviteListee,
  estActiviteListeeSansBesoinLocalisation,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { transformeSecteurSimple_SecteurPeutEtreComposite } from "../../../src/Domain/Simulateur/SousSecteurActivite.operations";
import { Arbitraire as A } from "../../utilitaires/Arbitraires.operations";
import {
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur,
  fabriqueArb_EnsActivites_PourSecteurEILocalisable_HorsUe,
  fabriqueArb_EnsActivites_PourSecteurInfraNumLocalisable_HorsUe,
} from "../../utilitaires/EnsActivites.arbitraires.fabriques";
import { fabriqueArb_EnsInformationsSecteurPossible } from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
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

export const arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI =
  fabriqueArb_EnsInformationsSecteurPossible(
    A.enchaine(
      flow(
        transformeSecteurSimple_SecteurPeutEtreComposite,
        fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(
          estActiviteListeeSansBesoinLocalisation,
        ),
      ),
    )(arbSecteurActivite_InfrastructureNumerique),
  );
