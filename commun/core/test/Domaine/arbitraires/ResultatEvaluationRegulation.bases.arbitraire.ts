import { fc } from "@fast-check/vitest";
import { ActivitesLocalisablesPetit } from "../../../src/Domain/Simulateur/Activite.definitions";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  ValeursPetitMoyenGrand,
  ValeursTypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  listeTuplesSecteursSousSecteurs,
  ValeursSecteursSansSousSecteur,
} from "../../../src/Domain/Simulateur/SecteurActivite.constantes";
import {
  SecteurAvecBesoinLocalisationRepresentant,
  SecteursAvecSousSecteurs,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import {
  ValeursSecteursNecessitantLocalisationRepresentant,
  ValeursSecteurAvecBesoinLocalisationRepresentantPetiteEntite,
} from "../../../src/Domain/Simulateur/SecteurActivite.valeurs";
import {
  estActiviteAutre,
  estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  InformationSecteurLocalisablePetiteEntite,
  InformationSecteurSimple,
  InformationsSecteursCompositeListe,
  ReponseInformationsSecteur,
  ReponseStructurePrivee,
  ReponseStructurePublique,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import {
  estSecteurListe,
  estSecteurNeNecessitantPasLocalisationRepresentant,
  estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite,
} from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { SousSecteurActivite } from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import {
  fabriqueArbEnsembleActivitesPourSecteur,
  fabriqueArbEnsembleActivitesPourSecteurAvecFiltre,
  fabriqueArbInformationsSecteurAutre,
  fabriqueArbitraireCapsuleSecteurGrand,
  fabriqueArbitraireCapsuleSecteurLocalisable,
  fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance,
  fabriqueArbitraireCapsuleSecteurPetit,
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

export const arbStructurePetitPrive = fc.constant<
  ReponseStructurePrivee<"Petit"> | ReponseStructurePublique<"Petit">
>({
  _categorieTaille: "Petit" as const,
  typeStructure: "privee",
  trancheChiffreAffaire: "petit",
  trancheNombreEmployes: "petit",
});
export const arbStructureGrandPrive = fc.oneof(
  fc.record<
    ReponseStructurePrivee<"Grand"> | ReponseStructurePublique<"Grand">
  >({
    _categorieTaille: fc.constant("Grand"),
    typeStructure: fc.constant("privee"),
    trancheChiffreAffaire: fc.constantFrom(...ValeursPetitMoyenGrand),
    trancheNombreEmployes: fc.constantFrom("moyen", "grand"),
  }),
  fc.record<
    ReponseStructurePrivee<"Grand"> | ReponseStructurePublique<"Grand">
  >({
    _categorieTaille: fc.constant("Grand"),
    typeStructure: fc.constant("privee"),
    trancheChiffreAffaire: fc.constantFrom("moyen", "grand"),
    trancheNombreEmployes: fc.constantFrom(...ValeursPetitMoyenGrand),
  }),
);
export const arbStructurePetitPublic = fc
  .constantFrom<TypeEntitePublique>(...ValeursTypeEntitePublique)
  .map<ReponseStructurePrivee<"Petit"> | ReponseStructurePublique<"Petit">>(
    (typeEntitePublique) => ({
      _categorieTaille: "Petit" as const,
      typeStructure: "publique",
      trancheNombreEmployes: "petit",
      typeEntitePublique: typeEntitePublique,
    }),
  );

export const arbStructurePetit = fc.oneof(
  arbStructurePetitPrive,
  arbStructurePetitPublic,
);
export const arbStructureGrand = fc.oneof(
  arbStructureGrandPrive,
  // arbStructurePetitPublic,
);

export const arbInformationsSecteurAutrePetit =
  fabriqueArbInformationsSecteurAutre("Petit");
export const arbInformationsSecteurAutreGrand =
  fabriqueArbInformationsSecteurAutre("Grand");

export const arbSecteurListesSansSousSecteurNiLocaGrand = fc.constantFrom(
  ...ValeursSecteursSansSousSecteur.filter(estSecteurListe).filter(
    estSecteurNeNecessitantPasLocalisationRepresentant,
  ),
);
export const arbSecteurLocalisablesGrandeEntreprise =
  fc.constantFrom<SecteurAvecBesoinLocalisationRepresentant>(
    ...ValeursSecteursNecessitantLocalisationRepresentant,
  );
export const arbSecteurLocalisablesPetiteEntite = fc.constantFrom(
  ...ValeursSecteurAvecBesoinLocalisationRepresentantPetiteEntite,
);
export const arbSecteurNonEligiblesPetiteEntite = fc.constantFrom(
  ...ValeursSecteursSansSousSecteur.filter(estSecteurListe).filter(
    estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite,
  ),
);
export const arbSecteurAvecSousSecteurListes = fc.constantFrom<
  [SecteursAvecSousSecteurs, SousSecteurActivite]
>(
  ...listeTuplesSecteursSousSecteurs.filter(([, sousSecteur]) =>
    estSousSecteurListe(sousSecteur),
  ),
);

export const arbInformationsSecteurSimple =
  arbSecteurListesSansSousSecteurNiLocaGrand.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteur,
  );
export const arbInformationsSecteurLocaliseesFrancePetite =
  arbSecteurLocalisablesPetiteEntite.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      fc.constant("france"),
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesPetit>,
    ),
  );
export const arbInformationsSecteurLocaliseesHorsFrancePetite =
  arbSecteurLocalisablesPetiteEntite.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      fc.constantFrom("autre", "horsue"),
      fabriqueArbEnsembleActivitesPourSecteur<
        SecteurAvecBesoinLocalisationRepresentant,
        ActivitesLocalisablesPetit
      >,
    ),
  );
export const arbInformationsSecteurLocaliseesHorsUEPetite =
  arbSecteurLocalisablesPetiteEntite.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableHorsUe,
  );
export const arbInformationsSecteurComposite =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurComposite(estActiviteListee),
  );
export const arbInformationsSecteurCompositeActivitesAutres =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurComposite(estActiviteAutre),
  );
export const arbEnsembleSecteursSimples: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbInformationsSecteurSimple,
);
export const arbEnsembleSecteursSimplesEligiblesPetit: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbSecteurLocalisablesPetiteEntite.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteur,
  ),
);
export const arbEnsembleSecteursLocalisablesPetitFrance: fc.Arbitrary<
  Set<InformationSecteurLocalisablePetiteEntite>
> =
  fabriqueArbitrairesEnsembleInformationsSecteurs<InformationSecteurLocalisablePetiteEntite>(
    arbInformationsSecteurLocaliseesFrancePetite,
  );
export const arbEnsembleSecteursLocalisablesNonFrance: fc.Arbitrary<
  Set<InformationSecteurLocalisablePetiteEntite>
> = fc.oneof(
  fabriqueArbitrairesEnsembleInformationsSecteurs<InformationSecteurLocalisablePetiteEntite>(
    arbInformationsSecteurLocaliseesHorsUEPetite,
  ),
  fabriqueArbitrairesEnsembleInformationsSecteurs<InformationSecteurLocalisablePetiteEntite>(
    arbInformationsSecteurLocaliseesHorsFrancePetite,
  ),
);
export const arbSecteursComposites: fc.Arbitrary<
  Set<InformationsSecteursCompositeListe>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbInformationsSecteurComposite,
);
export const arbSecteursCompositesActivitesAutres: fc.Arbitrary<
  Set<InformationsSecteursCompositeListe>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbInformationsSecteurCompositeActivitesAutres,
);

export const arbInformationsSecteurSimplesPetitNonEligibles: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurPetit(arbEnsembleSecteursSimples);
export const arbInformationsSecteurSimplesGrandEligibles: fc.Arbitrary<
  ReponseInformationsSecteur<"Grand">
> = fabriqueArbitraireCapsuleSecteurGrand(arbEnsembleSecteursSimples);
export const arbInformationsSecteurLocalisesFrancePetit: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurLocalisable(
  arbEnsembleSecteursLocalisablesPetitFrance,
  fc.constant("oui"),
  fc.constant("france"),
);

export const arbInformationsSecteurLocalisesHorsFrancePetit: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance(
  arbEnsembleSecteursLocalisablesNonFrance,
);
export const arbInformationsSecteurComposites: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurPetit(arbSecteursComposites);
export const arbInformationsSecteurCompositesGrand: fc.Arbitrary<
  ReponseInformationsSecteur<"Grand">
> = fabriqueArbitraireCapsuleSecteurGrand(arbSecteursComposites);

export const arbInformationsSecteurPetit = fc.oneof(
  arbInformationsSecteurComposites,
  arbInformationsSecteurSimplesPetitNonEligibles,
);
export const arbInformationsSecteurGrand = fc.oneof(
  arbInformationsSecteurCompositesGrand,
  arbInformationsSecteurSimplesGrandEligibles,
);
export const arbInformationsSecteurGrandActivitesAutres = fc.oneof(
  fabriqueArbitraireCapsuleSecteurGrand(arbSecteursCompositesActivitesAutres),
  // arbInformationsSecteurSimplesGrandEligibles,
);
