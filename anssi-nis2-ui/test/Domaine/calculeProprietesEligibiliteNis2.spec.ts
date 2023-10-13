import { describe, expect } from "vitest";
import { it, fc } from "@fast-check/vitest";
import { ValeursSecteursSansSousSecteur } from "../../src/Domaine/Simulateur/ValeursSecteursActivites";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../src/Domaine/Simulateur/resultatEligibilite";
import {
  DonneesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "../../src/Domaine/Simulateur/DonneesFormulaire";
import { ValeursAppartenancePaysUnionEuropeenne } from "../../src/Domaine/Simulateur/ValeursChampsSimulateur";
import {
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
} from "../../src/Domaine/Simulateur/ChampsSimulateur";
import { activitesParSecteurEtSousSecteur } from "../../src/Domaine/Simulateur/ActivitesParSecteurEtSousSecteur";

const ajouteMethodeAvec = (base: IDonneesFormulaireSimulateur) =>
  fc.record({
    designeOperateurServicesEssentiels: fc.constant(
      base.designeOperateurServicesEssentiels,
    ),
    typeStructure: fc.constant(base.typeStructure),
    trancheCA: fc.constant(base.trancheCA),
    trancheNombreEmployes: fc.constant(base.trancheNombreEmployes),
    etatMembre: fc.constant(base.etatMembre),
    secteurActivite: fc.constant(base.secteurActivite),
    sousSecteurActivite: fc.constant(base.sousSecteurActivite),
    activites: fc.constant(base.activites),
    avec: fc.constant(
      (data) => new DonneesFormulaireSimulateur({ ...base, ...data }),
    ),
  });

const ajouteSecteursArbitraires = (base: IDonneesFormulaireSimulateur) =>
  fc.record<Partial<IDonneesFormulaireSimulateur>>({
    designeOperateurServicesEssentiels: fc.constant(
      base.designeOperateurServicesEssentiels,
    ),
    typeStructure: fc.constant(base.typeStructure),
    trancheCA: fc.constant(base.trancheCA),
    trancheNombreEmployes: fc.constant(base.trancheNombreEmployes),
    etatMembre: fc.constant(base.etatMembre),
    secteurActivite: fc.constant(base.secteurActivite),
    sousSecteurActivite: fc.constant(base.sousSecteurActivite),
    activites: fc.subarray(
      base.secteurActivite.map(
        (secteur) => activitesParSecteurEtSousSecteur[secteur],
      ),
    ),
  });
describe("Entité OSE pour NIS1", () => {
  const faussesDonneesPourTest: fc.Arbitrary<IDonneesFormulaireSimulateur> = fc
    .record<Partial<IDonneesFormulaireSimulateur>>({
      designeOperateurServicesEssentiels: fc.constant<
        DesignationOperateurServicesEssentiels[]
      >(["oui"]),
      typeStructure: fc.constant<TypeStructure[]>(["privee"]),
      trancheCA: fc.constant<TrancheChiffreAffaire[]>(["petit"]),
      trancheNombreEmployes: fc.constant<TrancheNombreEmployes[]>(["petit"]),
      sousSecteurActivite: fc.constant([]),
      etatMembre: fc.subarray([...ValeursAppartenancePaysUnionEuropeenne]),
      secteurActivite: fc.subarray([...ValeursSecteursSansSousSecteur]),
    })
    .chain(ajouteSecteursArbitraires)
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);
  it("de petite taille est toujours éligible", () => {
    fc.assert(
      fc.property(faussesDonneesPourTest, (donnees) => {
        expect(eligibilite(donnees)).toStrictEqual(
          ResultatEligibiliteEnum.EligiblePetiteEntreprise,
        );
      }),
    );
  });
});
