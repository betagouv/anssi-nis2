import { fc } from "@fast-check/vitest";
import {
  estActiviteAutre,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  InformationSecteurLocalisable,
  InformationSecteurSimple,
  InformationsSecteursCompositeListe,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import {
  arbInformationsSecteurComposite,
  arbInformationsSecteurCompositeActivitesAutres,
  arbInformationsSecteurLocaliseesFrancePetite,
  arbInformationsSecteurLocaliseesHorsFranceGrand,
  arbInformationsSecteurLocaliseesHorsFrancePetite,
  arbInformationsSecteurLocaliseesHorsUEGrand,
  arbInformationsSecteurLocaliseesHorsUEPetite,
  arbSecteurInfrascructureNumerique,
  arbSecteurListesSansSousSecteurNiLocaGrand,
} from "./InformationsSecteur.arbitraires";
import {
  fabriqueArbitraireEnsembleActivitesPourSecteur,
  fabriqueArbitrairesEnsembleInformationsSecteurs,
} from "./ResultatEvaluationRegulation.arbitraire.fabrique";

export const arbEnsembleSecteursSimples: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbSecteurListesSansSousSecteurNiLocaGrand.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteur(estActiviteListee),
  ),
);
export const arbEnsembleSecteursSimplesActivitesAutres: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbSecteurListesSansSousSecteurNiLocaGrand.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteur(estActiviteAutre),
  ),
);
export const arbEnsembleSecteursSimplesEligiblesPetit: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteur(estActiviteListee),
  ),
);
export const arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteur(estActiviteAutre),
  ),
);
export const arbEnsembleSecteursLocalisablesPetitFrance: fc.Arbitrary<
  Set<InformationSecteurLocalisable<"Petit">>
> = fabriqueArbitrairesEnsembleInformationsSecteurs<
  InformationSecteurLocalisable<"Petit">
>(arbInformationsSecteurLocaliseesFrancePetite);
export const arbEnsembleSecteursLocalisablesNonFrance: fc.Arbitrary<
  Set<InformationSecteurLocalisable<"Petit">>
> = fc.oneof(
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationSecteurLocalisable<"Petit">
  >(arbInformationsSecteurLocaliseesHorsUEPetite),
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationSecteurLocalisable<"Petit">
  >(arbInformationsSecteurLocaliseesHorsFrancePetite),
);
export const arbEnsembleSecteursLocalisablesNonFranceGrande: fc.Arbitrary<
  Set<InformationSecteurLocalisable<"Grand">>
> = fc.oneof(
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationSecteurLocalisable<"Grand">
  >(arbInformationsSecteurLocaliseesHorsUEGrand),
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationSecteurLocalisable<"Grand">
  >(arbInformationsSecteurLocaliseesHorsFranceGrand),
);
export const arbEnsembleSecteursComposites: fc.Arbitrary<
  Set<InformationsSecteursCompositeListe>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbInformationsSecteurComposite,
);
export const arbEnsembleSecteursCompositesActivitesAutres: fc.Arbitrary<
  Set<InformationsSecteursCompositeListe>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbInformationsSecteurCompositeActivitesAutres,
);
