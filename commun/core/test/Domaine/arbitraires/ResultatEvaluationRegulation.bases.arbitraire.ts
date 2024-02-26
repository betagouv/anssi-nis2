import { fc } from "@fast-check/vitest";
import {
  Activite,
  ActivitesLocalisablesGrand,
  ActivitesLocalisablesPetit,
} from "../../../src/Domain/Simulateur/Activite.definitions";
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
  SecteurImportantsAvecBesoinLocalisation,
  SecteursAvecSousSecteurs,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import {
  ValeursSecteurAvecActivitesEssentielles,
  ValeursSecteursImportantsAvecBesoinLocalisation,
} from "../../../src/Domain/Simulateur/SecteurActivite.valeurs";
import {
  estActiviteAutre,
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
  estActiviteInfrastructureNumeriqueSansBesoinLocalisation,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  InformationSecteurLocalisable,
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
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France,
  fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance,
  fabriqueArbitraireCapsuleSecteurPetit,
  fabriqueArbitraireEnsembleActivitesPourSecteur,
  fabriqueArbitraireEnsembleActivitesPourSecteurComposite,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableHorsUe,
  fabriqueArbitrairesEnsembleInformationsSecteurs,
} from "./ResultatEvaluationRegulation.arbitraire.fabrique";
import { flow } from "fp-ts/lib/function";

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
/**
 * ["infrastructureNumerique"]
 */
export const arbSecteurInfrascructureNumerique = fc.constantFrom(
  ...ValeursSecteurAvecActivitesEssentielles,
);
export const arbSecteurImportantsLocalisablesGrandeEntite =
  fc.constantFrom<SecteurImportantsAvecBesoinLocalisation>(
    ...ValeursSecteursImportantsAvecBesoinLocalisation,
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

export const arbInformationsSecteurLocaliseesFrancePetite =
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      fc.constant("france"),
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesPetit>,
    ),
  );
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "gestionServicesTic" | "fournisseursNumeriques"
 */
export const arbInformationsSecteurLocaliseesFranceGrande =
  arbSecteurImportantsLocalisablesGrandeEntite.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      fc.constant("france"),
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(estActiviteListee)<
        SecteurAvecBesoinLocalisationRepresentant,
        ActivitesLocalisablesGrand
      >,
    ),
  );

/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique" et activité non registre et non fournisseur DNS
 *      ou
 * secteur dans "gestionServicesTic" | "fournisseursNumeriques"
 */
export const arbInformationsSecteurLocaliseesFranceGrandeEI = fc.oneof(
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      fc.constant("france"),
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        (activite: Activite) =>
          !estActiviteInfrastructureNumeriqueAvecBesoinLocalisation(activite) &&
          estActiviteListee(activite),
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesGrand>,
    ),
  ),
  arbSecteurImportantsLocalisablesGrandeEntite.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      fc.constant("france"),
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(estActiviteListee)<
        SecteurAvecBesoinLocalisationRepresentant,
        ActivitesLocalisablesGrand
      >,
    ),
  ),
);
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique" et activite registre ou fournisseur DNS
 */
export const arbInformationsSecteurLocaliseesFranceGrandeInfranumEE =
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      fc.constant("france"),
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesGrand>,
    ),
  );
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique"
 *      et
 * activite dans :
 *  - "fournisseurPointEchangeInternet",
 *  - "fournisseurServicesInformatiqueNuage",
 *  - "fournisseurServiceCentresDonnees",
 *  - "fournisseurReseauxDiffusionContenu",
 *  - "prestataireServiceConfiance",
 */
export const arbInformationsSecteurLocaliseesFranceGrandeInfranumEI =
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      fc.constant("france"),
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        (activite) =>
          estActiviteInfrastructureNumeriqueSansBesoinLocalisation(activite) &&
          estActiviteListee(activite),
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesGrand>,
    ),
  );
export const arbInformationsSecteurLocaliseesHorsFrancePetite =
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      fc.constantFrom("autre", "horsue"),
      fabriqueArbEnsembleActivitesPourSecteur<
        SecteurAvecBesoinLocalisationRepresentant,
        ActivitesLocalisablesPetit
      >,
    ),
  );
export const arbInformationsSecteurLocaliseesHorsUEPetite =
  arbSecteurInfrascructureNumerique.chain(
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

export const arbInformationsSecteurLocalisesFrancePetit: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurLocalisable(
  arbEnsembleSecteursLocalisablesPetitFrance,
  fc.constant("oui"),
  fc.constant("france"),
);

export const arbInformationsSecteurLocalisesFranceGrandInfranumEE = flow(
  fabriqueArbitrairesEnsembleInformationsSecteurs<
    InformationSecteurLocalisable<"Grand">
  >,
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France,
)(arbInformationsSecteurLocaliseesFranceGrandeInfranumEE);
export const arbInformationsSecteurLocalisesFranceGrandInfranumEI =
  fabriqueArbitraireCapsuleSecteurGrand(
    fabriqueArbitrairesEnsembleInformationsSecteurs(
      arbInformationsSecteurLocaliseesFranceGrandeInfranumEI,
    ),
  );
export const arbInformationsSecteurLocalisesFranceGrandEI =
  fabriqueArbitraireCapsuleSecteurLocalisableGrand_Oui_France(
    fabriqueArbitrairesEnsembleInformationsSecteurs(
      arbInformationsSecteurLocaliseesFranceGrandeEI,
    ),
  );

export const arbInformationsSecteurLocalisesHorsFrancePetit: fc.Arbitrary<
  ReponseInformationsSecteur<"Petit">
> = fabriqueArbitraireCapsuleSecteurLocalisableUeHorsFrance(
  arbEnsembleSecteursLocalisablesNonFrance,
);
export const arbInformationsSecteurPetit = fc.oneof(
  fabriqueArbitraireCapsuleSecteurPetit(arbEnsembleSecteursComposites),
  fabriqueArbitraireCapsuleSecteurPetit(arbEnsembleSecteursSimples),
);
export const arbInformationsSecteurGrand = fc.oneof(
  fabriqueArbitraireCapsuleSecteurGrand(arbEnsembleSecteursComposites),
  fabriqueArbitraireCapsuleSecteurGrand(arbEnsembleSecteursSimples),
);
export const arbInformationsSecteurGrandActivitesAutres = fc.oneof(
  fabriqueArbitraireCapsuleSecteurGrand(
    arbEnsembleSecteursCompositesActivitesAutres,
  ),
  fabriqueArbitraireCapsuleSecteurGrand(
    arbEnsembleSecteursSimplesActivitesAutres,
  ),
  fabriqueArbitraireCapsuleSecteurGrand(
    arbEnsembleSecteursSimplesEligiblesPetitActivitesAutres,
  ),
);
