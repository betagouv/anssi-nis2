import { describe, expect } from "vitest";
import { fc, it } from "@fast-check/vitest";
import { ValeursSecteursSansSousSecteur } from "../../src/Domaine/Simulateur/ValeursSecteursActivites";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../src/Domaine/Simulateur/resultatEligibilite";
import { IDonneesFormulaireSimulateur } from "../../src/Domaine/Simulateur/DonneesFormulaire";
import { ValeursAppartenancePaysUnionEuropeenne } from "../../src/Domaine/Simulateur/ValeursChampsSimulateur";
import {
  DesignationOperateurServicesEssentiels,
  TypeStructure,
} from "../../src/Domaine/Simulateur/ChampsSimulateur";
import { Activite } from "../../src/Domaine/Simulateur/Activite";
import {
  ajouteMethodeAvec,
  DonneesSansActivite,
} from "../utilitaires/manibulationArbitraires";
import {
  ajouteArbitraireActivites,
  arbTranche,
  donneesArbitrairesFormOSEMoyenGrand,
  donneesArbitrairesFormOSEPetit,
} from "./arbitraires/arbitrairesSimulateur";

describe("Entité OSE pour NIS1", () => {
  it("de petite taille est toujours éligible", () => {
    console.log(
      fc.statistics(
        donneesArbitrairesFormOSEPetit,
        (v) => `${v.activites.length} activités`,
      ),
    );
    console.log(fc.sample(donneesArbitrairesFormOSEPetit));
    fc.assert(
      fc.property(donneesArbitrairesFormOSEPetit, (donnees) => {
        expect(eligibilite(donnees)).toStrictEqual(
          ResultatEligibiliteEnum.EligiblePetiteEntreprise,
        );
      }),
    );
  });
  it("de moyenne taille est toujours éligible", () => {
    fc.assert(
      fc.property(donneesArbitrairesFormOSEMoyenGrand, (donnees) => {
        expect(eligibilite(donnees)).toStrictEqual(
          ResultatEligibiliteEnum.EligibleMoyenneGrandeEntreprise,
        );
      }),
    );
  });
});

describe("Entite non OSE pour NIS 1", () => {
  const donneesArbitrairesFormActivitesAutres: fc.Arbitrary<IDonneesFormulaireSimulateur> =
    fc
      .record<DonneesSansActivite>({
        designeOperateurServicesEssentiels: fc.constant<
          DesignationOperateurServicesEssentiels[]
        >(["non"]),
        typeStructure: fc.constant<TypeStructure[]>(["privee"]),
        trancheCA: arbTranche(),
        trancheNombreEmployes: arbTranche(),
        sousSecteurActivite: fc.constant([]),
        etatMembre: fc.subarray([...ValeursAppartenancePaysUnionEuropeenne]),
        secteurActivite: fc.subarray([...ValeursSecteursSansSousSecteur]),
      })
      .chain<DonneesSansActivite>((base) =>
        ajouteArbitraireActivites(base, (activite: Activite) =>
          activite.startsWith("autre"),
        ),
      )
      .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);
  it("n'est pas eligible si activites cochees sont uniquement autres", () => {
    fc.assert(
      fc.property(donneesArbitrairesFormActivitesAutres, (donnees) => {
        expect(eligibilite(donnees)).toStrictEqual(
          ResultatEligibiliteEnum.NonEligible,
        );
      }),
    );
  });
});
