import { fc } from "@fast-check/vitest";
import { ens } from "../../../../utils/services/sets.operations";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursTypeEntitePublique } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { ValeursSecteursSansSousSecteur } from "../../../src/Domain/Simulateur/SecteurActivite.constantes";
import {
  SecteurActivite,
  SecteursAvecSousSecteurs,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import { ValeursSecteursAvecSousSecteurs } from "../../../src/Domain/Simulateur/SecteurActivite.valeurs";
import { activitesParSecteurEtSousSecteur } from "../../../src/Domain/Simulateur/services/Activite/Activite.operations";
import { estActiviteListee } from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  DefinitionStructurePetit,
  eqInformationsSecteur,
  InformationSecteurSimple,
  InformationsSecteurPetit,
  InformationsSecteursCompositeListe,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import { fabriqueTuplesSecteurSousSecteur } from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.operations";
import { estSecteurListe } from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import {
  SousSecteurActivite,
  SousSecteurDe,
} from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import { ValeurCleSectorielle } from "../../../src/Domain/Simulateur/ValeurCleSectorielle.definitions";

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

export const arbStructurePetitPrive = fc.constant<DefinitionStructurePetit>({
  _categorieTaille: "Petit" as const,
  typeStructure: "privee",
  trancheChiffreAffaire: "petit",
  trancheNombreEmployes: "petit",
});
export const arbStructurePetitPublic = fc
  .constantFrom<TypeEntitePublique>(...ValeursTypeEntitePublique)
  .map<DefinitionStructurePetit>((typeEntitePublique) => ({
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
  fc.constantFrom<InformationsSecteurPetit>(
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
fc.constantFrom<InformationsSecteurPetit>({
  _categorieTaille: "Petit",
  secteurs: ens({
    secteurActivite: "transports",
    sousSecteurActivite: "transportsAeriens",
    activites: ens("entiteGestionnaireAeroports"),
  }),
});
export const arbSecteurSansSousSecteur = fc.constantFrom(
  ...ValeursSecteursSansSousSecteur.filter(estSecteurListe),
);
const listeTuplesSecteursSousSecteurs = ValeursSecteursAvecSousSecteurs.filter(
  estSecteurListe,
).reduce(
  (acc: [SecteursAvecSousSecteurs, SousSecteurActivite][], secteur) => [
    ...acc,
    ...fabriqueTuplesSecteurSousSecteur(secteur),
  ],
  [],
);
export const arbSecteurAvecSousSecteurListes = fc.constantFrom<
  [SecteursAvecSousSecteurs, SousSecteurActivite]
>(
  ...listeTuplesSecteursSousSecteurs.filter(([, ss]) =>
    estSousSecteurListe(ss),
  ),
);

const getValeurCleSectorielle = <T>(
  secteur: T,
  sousSecteur?: string,
): ValeurCleSectorielle =>
  (sousSecteur ? sousSecteur : secteur) as ValeurCleSectorielle;

const getActivitesPour = <T extends SecteurActivite>(
  secteur: T,
  sousSecteur?: SousSecteurActivite,
) => [
  ...activitesParSecteurEtSousSecteur[
    getValeurCleSectorielle(secteur, sousSecteur)
  ],
];

const fabriqueArbEnsembleActivitesPourSecteur = <T extends SecteurActivite>(
  secteur: T,
  sousSecteur?: SousSecteurActivite,
) =>
  fc
    .subarray(
      getActivitesPour(secteur, sousSecteur).filter(estActiviteListee),
      {
        minLength: 1,
      },
    )
    .chain((a) => fc.constant(ens(...a)));

export const fabriqueArbitraireEnsembleActivitesPourSecteur = (
  secteur: SecteurActivite,
): fc.Arbitrary<InformationSecteurSimple> =>
  fc.record({
    secteurActivite: fc.constant(secteur),
    activites: fabriqueArbEnsembleActivitesPourSecteur(secteur),
  });
export const fabriqueArbitraireEnsembleActivitesPourSecteurComposite = <
  T extends SecteursAvecSousSecteurs,
  U extends SousSecteurDe<T>,
>([secteur, sousSecteur]: [
  T,
  U,
]): fc.Arbitrary<InformationsSecteursCompositeListe> =>
  fc.record({
    secteurActivite: fc.constant(secteur),
    sousSecteurActivite: fc.constant(sousSecteur),
    activites: fabriqueArbEnsembleActivitesPourSecteur(secteur, sousSecteur),
  }) as fc.Arbitrary<InformationsSecteursCompositeListe>;

export const arbInformationsSecteurSimple = arbSecteurSansSousSecteur.chain(
  fabriqueArbitraireEnsembleActivitesPourSecteur,
);
export const arbInformationsSecteurComposite =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurComposite,
  );
export const arbSecteursSimples: fc.Arbitrary<Set<InformationSecteurSimple>> =
  fc
    .uniqueArray<InformationSecteurSimple>(arbInformationsSecteurSimple, {
      minLength: 1,
      comparator: eqInformationsSecteur,
    })
    .chain((a) => fc.constant(ens(...a)));
export const arbSecteursComposites: fc.Arbitrary<
  Set<InformationSecteurSimple>
> = fc
  .uniqueArray<InformationSecteurSimple>(arbInformationsSecteurComposite, {
    minLength: 1,
    comparator: eqInformationsSecteur,
  })
  .chain((a) => fc.constant(ens(...a)));

export const arbInformationsSecteurSimplesPetit: fc.Arbitrary<InformationsSecteurPetit> =
  arbSecteursSimples.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
    }),
  );
export const arbInformationsSecteurCompositesPetit: fc.Arbitrary<InformationsSecteurPetit> =
  arbSecteursComposites.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
    }),
  );

export const arbInformationsSecteurPetit = fc.oneof(
  arbInformationsSecteurCompositesPetit,
  arbInformationsSecteurSimplesPetit,
);
