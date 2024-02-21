import { fc } from "@fast-check/vitest";
import { ens } from "../../../../utils/services/sets.operations";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursTypeEntitePublique } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  listeTuplesSecteursSousSecteurs,
  secteursNecessitantLocalisationRepresentant,
  ValeursSecteursNecessitantLocalisationRepresentantPetiteEntite,
  ValeursSecteursSansSousSecteur,
} from "../../../src/Domain/Simulateur/SecteurActivite.constantes";
import {
  SecteursAvecBesoinLocalisationRepresentant,
  SecteursAvecSousSecteurs,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import {
  ReponseStructurePetit,
  InformationSecteurLocalisablePetiteEntreprise,
  InformationSecteurSimple,
  ReponseInformationsSecteurPetit,
  InformationsSecteursCompositeListe,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import { estSecteurListe } from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { SousSecteurActivite } from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import {
  fabriqueArbitraireCapsuleSecteur,
  fabriqueArbitraireCapsuleSecteurLocalisable,
  fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance,
  fabriqueArbitraireEnsembleActivitesPourSecteur,
  fabriqueArbitraireEnsembleActivitesPourSecteurComposite,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableHorsUe,
  fabriqueArbitrairesEnsembleInformationsSecteurs,
} from "./ResultatEvaluationRegulation.arbitraire.fabrique";

export const arbDesignationOperateurServicesEssentielsToujoursOui = fc.constant(
  {
    designationOperateurServicesEssentiels: "oui" as const,
  },
);
export const arbDesignationOperateurServicesEssentielsJamaisOui = fc.record({
  designationOperateurServicesEssentiels:
    fc.constantFrom<DesignationOperateurServicesEssentiels>("non", "nsp"),
});

export const arbAppartenanceUnionEuropeenneToujoursFrance = fc.record({
  appartenancePaysUnionEuropeenne:
    fc.constant<AppartenancePaysUnionEuropeenne>("france"),
});
export const arbAppartenanceUnionEuropeenneJamaisFrance = fc.record({
  appartenancePaysUnionEuropeenne:
    fc.constantFrom<AppartenancePaysUnionEuropeenne>("horsue", "autre"),
});

export const arbStructurePetitPrive = fc.constant<ReponseStructurePetit>({
  _categorieTaille: "Petit" as const,
  typeStructure: "privee",
  trancheChiffreAffaire: "petit",
  trancheNombreEmployes: "petit",
});
export const arbStructurePetitPublic = fc
  .constantFrom<TypeEntitePublique>(...ValeursTypeEntitePublique)
  .map<ReponseStructurePetit>((typeEntitePublique) => ({
    _categorieTaille: "Petit" as const,
    typeStructure: "publique",
    trancheNombreEmployes: "petit",
    typeEntitePublique: typeEntitePublique,
  }));
export const arbStructurePetit = fc.oneof(
  arbStructurePetitPrive,
  arbStructurePetitPublic,
);

export const arbInformationsSecteurPetitAutre =
  fc.constantFrom<ReponseInformationsSecteurPetit>(
    {
      _categorieTaille: "Petit",
      secteurs: ens({
        secteurActivite: "autreSecteurActivite",
      }),
    },
    {
      _categorieTaille: "Petit",
      secteurs: ens({
        secteurActivite: "energie",
        sousSecteurActivite: "autreSousSecteurEnergie",
      }),
    },
    {
      _categorieTaille: "Petit",
      secteurs: ens({
        secteurActivite: "fabrication",
        sousSecteurActivite: "autreSousSecteurFabrication",
      }),
    },
    {
      _categorieTaille: "Petit",
      secteurs: ens({
        secteurActivite: "transports",
        sousSecteurActivite: "autreSousSecteurTransports",
      }),
    },
  );

export const arbSecteurSansSousSecteur = fc.constantFrom(
  ...ValeursSecteursSansSousSecteur.filter(estSecteurListe).filter(
    (secteur) =>
      !secteursNecessitantLocalisationRepresentant.includes(
        secteur as SecteursAvecBesoinLocalisationRepresentant,
      ),
  ),
);
export const arbSecteurLocalisablesGrandeEntreprise =
  fc.constantFrom<SecteursAvecBesoinLocalisationRepresentant>(
    ...secteursNecessitantLocalisationRepresentant,
  );
export const arbSecteurLocalisablesPetiteEntite =
  fc.constantFrom<SecteursAvecBesoinLocalisationRepresentant>(
    ...ValeursSecteursNecessitantLocalisationRepresentantPetiteEntite,
  );
export const arbSecteurAvecSousSecteurListes = fc.constantFrom<
  [SecteursAvecSousSecteurs, SousSecteurActivite]
>(
  ...listeTuplesSecteursSousSecteurs.filter(([, sousSecteur]) =>
    estSousSecteurListe(sousSecteur),
  ),
);

export const arbInformationsSecteurSimple = arbSecteurSansSousSecteur.chain(
  fabriqueArbitraireEnsembleActivitesPourSecteur,
);
export const arbInformationsSecteurLocaliseesFrancePetite =
  arbSecteurLocalisablesPetiteEntite.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      fc.constant("france"),
    ),
  );
export const arbInformationsSecteurLocaliseesHorsFrancePetite =
  arbSecteurLocalisablesPetiteEntite.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      fc.constantFrom("autre", "horsue"),
    ),
  );
export const arbInformationsSecteurLocaliseesHorsUEPetite =
  arbSecteurLocalisablesPetiteEntite.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableHorsUe,
  );
export const arbInformationsSecteurComposite =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurComposite,
  );
export const arbSecteursSimples: fc.Arbitrary<Set<InformationSecteurSimple>> =
  fabriqueArbitrairesEnsembleInformationsSecteurs(arbInformationsSecteurSimple);
export const arbEnsembleSecteursLocalisablesFrance: fc.Arbitrary<
  Set<InformationSecteurLocalisablePetiteEntreprise>
> =
  fabriqueArbitrairesEnsembleInformationsSecteurs<InformationSecteurLocalisablePetiteEntreprise>(
    arbInformationsSecteurLocaliseesFrancePetite,
  );
export const arbEnsembleSecteursLocalisablesNonFrance: fc.Arbitrary<
  Set<InformationSecteurLocalisablePetiteEntreprise>
> = fc.oneof(
  fabriqueArbitrairesEnsembleInformationsSecteurs<InformationSecteurLocalisablePetiteEntreprise>(
    arbInformationsSecteurLocaliseesHorsUEPetite,
  ),
  fabriqueArbitrairesEnsembleInformationsSecteurs<InformationSecteurLocalisablePetiteEntreprise>(
    arbInformationsSecteurLocaliseesHorsFrancePetite,
  ),
);
export const arbSecteursComposites: fc.Arbitrary<
  Set<InformationsSecteursCompositeListe>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbInformationsSecteurComposite,
);

export const arbInformationsSecteurSimplesPetit: fc.Arbitrary<ReponseInformationsSecteurPetit> =
  fabriqueArbitraireCapsuleSecteur(arbSecteursSimples);
export const arbInformationsSecteurLocalisesFrancePetit: fc.Arbitrary<ReponseInformationsSecteurPetit> =
  fabriqueArbitraireCapsuleSecteurLocalisable(
    arbEnsembleSecteursLocalisablesFrance,
    fc.constant("oui"),
    fc.constant("france"),
  );

export const arbInformationsSecteurLocalisesHorsFrancePetit: fc.Arbitrary<ReponseInformationsSecteurPetit> =
  fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance(
    arbEnsembleSecteursLocalisablesNonFrance,
  );
export const arbInformationsSecteurCompositesPetit: fc.Arbitrary<ReponseInformationsSecteurPetit> =
  fabriqueArbitraireCapsuleSecteur(arbSecteursComposites);

export const arbInformationsSecteurPetit = fc.oneof(
  arbInformationsSecteurCompositesPetit,
  arbInformationsSecteurSimplesPetit,
);
