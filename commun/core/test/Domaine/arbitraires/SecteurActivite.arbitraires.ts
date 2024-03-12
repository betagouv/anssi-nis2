import { fc } from "@fast-check/vitest";
import {
  listeTuplesSecteursSousSecteurs,
  ValeursSecteursSansSousSecteur,
} from "../../../src/Domain/Simulateur/SecteurActivite.constantes";
import {
  SecteurImportantsAvecBesoinLocalisationEtablissementPrincipal,
  SecteurComposite,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import {
  ValeurSecteurInfrastructureNumerique,
  ValeursSecteursActivitesAnnexe1,
  ValeursSecteursActivitesAnnexe2,
  ValeursSecteursAvecBesoinLocalisationEtablissementPrincipal,
} from "../../../src/Domain/Simulateur/SecteurActivite.valeurs";
import {
  estSecteurListe,
  estSecteurNeNecessitantPasLocalisationRepresentant,
  estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite,
} from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { filtreValsursSecteursInutiles } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.operations";
import { estSousSecteurListe } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { SousSecteurActivite } from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";

export const arbSecteurActivite_Listes_SansSousSecteur_SansBesoinLoca_GE =
  fc.constantFrom(
    ...ValeursSecteursSansSousSecteur.filter(estSecteurListe).filter(
      estSecteurNeNecessitantPasLocalisationRepresentant,
    ),
  );
export const arbSecteursActivite_Annexe1_SansBesoinLocalisation =
  fc.constantFrom(
    ...filtreValsursSecteursInutiles(ValeursSecteursActivitesAnnexe1),
  );
export const arbSecteursActivite_Annexe2_SansBesoinLocalisation =
  fc.constantFrom(
    ...filtreValsursSecteursInutiles(ValeursSecteursActivitesAnnexe2),
  );
export const arbSecteurActivite_InfrastructureNumerique = fc.constantFrom(
  ...ValeurSecteurInfrastructureNumerique,
);
export const arbSecteurImportantAvecBesoinLocalisation =
  fc.constantFrom<SecteurImportantsAvecBesoinLocalisationEtablissementPrincipal>(
    ...ValeursSecteursAvecBesoinLocalisationEtablissementPrincipal,
  );
export const arbSecteurNonEligiblesPetiteEntite = fc.constantFrom(
  ...ValeursSecteursSansSousSecteur.filter(estSecteurListe).filter(
    estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite,
  ),
);
export const arbSecteurAvecSousSecteurListes = fc.constantFrom<
  [SecteurComposite, SousSecteurActivite]
>(
  ...listeTuplesSecteursSousSecteurs.filter(([, sousSecteur]) =>
    estSousSecteurListe(sousSecteur),
  ),
);
