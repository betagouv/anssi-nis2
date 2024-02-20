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
  ValeursSecteursSansSousSecteur,
} from "../../../src/Domain/Simulateur/SecteurActivite.constantes";
import { SecteursAvecSousSecteurs } from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import {
  DefinitionStructurePetit,
  InformationSecteurSimple,
  InformationsSecteurPetit,
  InformationsSecteursCompositeListe,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";
import { estSecteurListe } from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { SousSecteurActivite } from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import {
  fabriqueArbitraireCapsuleSecteur,
  fabriqueArbitraireEnsembleActivitesPourSecteur,
  fabriqueArbitraireEnsembleActivitesPourSecteurComposite,
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

export const arbSecteurSansSousSecteur = fc.constantFrom(
  ...ValeursSecteursSansSousSecteur.filter(estSecteurListe),
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
export const arbInformationsSecteurComposite =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurComposite,
  );
export const arbSecteursSimples: fc.Arbitrary<Set<InformationSecteurSimple>> =
  fabriqueArbitrairesEnsembleInformationsSecteurs(arbInformationsSecteurSimple);

export const arbSecteursComposites: fc.Arbitrary<
  Set<InformationsSecteursCompositeListe>
> = fabriqueArbitrairesEnsembleInformationsSecteurs(
  arbInformationsSecteurComposite,
);

export const arbInformationsSecteurSimplesPetit: fc.Arbitrary<InformationsSecteurPetit> =
  arbSecteursSimples.chain((info) =>
    fc.record({
      _categorieTaille: fc.constant("Petit"),
      secteurs: fc.constant(info),
    }),
  );

export const arbInformationsSecteurCompositesPetit: fc.Arbitrary<InformationsSecteurPetit> =
  fabriqueArbitraireCapsuleSecteur(arbSecteursComposites);

export const arbInformationsSecteurPetit = fc.oneof(
  arbInformationsSecteurCompositesPetit,
  arbInformationsSecteurSimplesPetit,
);
