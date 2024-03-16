import { describe, expect, it } from "vitest";
import { ens } from "../../../utils/services/sets.operations";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.fabrique";
import { ConvertisseurDonneesBrutesVersEtatDonneesSimulateur } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseEtat.fabriques";

import { UnionReponseEtat } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseEtat.definitions";

describe("fabrique ReponseEtat", () => {
  describe("depuisDonneesFormulaireSimulateur", () => {
    describe("DesignationOperateurServicesEssentiels", () => {
      it("Construit un designe OSE a partir de donnees simples", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "DesignationOperateurServicesEssentiels",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Construit un designe OSE, variante", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["non"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "DesignationOperateurServicesEssentiels",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "non",
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
    });
    describe("AppartenancePaysUnionEuropeenne", () => {
      it("Enchaine les données OSE puis UE a partir de donnees simples", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          appartenancePaysUnionEuropeenne: ["france"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "AppartenancePaysUnionEuropeenne",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
    });
    describe("Structure", () => {
      it("Enchaine les données jusqu'à la structure privée complète", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["privee"],
          trancheChiffreAffaire: ["moyen"],
          trancheNombreEmployes: ["petit"],
          appartenancePaysUnionEuropeenne: ["france"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "Structure",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            _categorieTaille: "Moyen",
            typeStructure: "privee",
            trancheChiffreAffaire: "moyen",
            trancheNombreEmployes: "petit",
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'à la structure publique complète", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["publique"],
          typeEntitePublique: ["administrationCentrale"],
          trancheNombreEmployes: ["moyen"],
          appartenancePaysUnionEuropeenne: ["france"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "Structure",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            _categorieTaille: "Moyen",
            typeStructure: "publique",
            typeEntitePublique: "administrationCentrale",
            trancheNombreEmployes: "moyen",
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
    });
    describe("Informations de Secteurs", () => {
      it("Enchaine les données jusqu'au secteur autre", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["publique"],
          typeEntitePublique: ["administrationCentrale"],
          trancheNombreEmployes: ["moyen"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["autreSecteurActivite"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "InformationsSecteur",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            _categorieTaille: "Moyen",
            typeStructure: "publique",
            typeEntitePublique: "administrationCentrale",
            trancheNombreEmployes: "moyen",
          },
          InformationsSecteur: {
            _categorieTaille: "Moyen",
            secteurs: ens({
              secteurActivite: "autreSecteurActivite",
            }),
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'au secteur simple et son activité", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["publique"],
          typeEntitePublique: ["administrationCentrale"],
          trancheNombreEmployes: ["moyen"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["eauPotable"],
          activites: ["fournisseursDistributeursEauxConsommation"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "InformationsSecteur",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            _categorieTaille: "Moyen",
            typeStructure: "publique",
            typeEntitePublique: "administrationCentrale",
            trancheNombreEmployes: "moyen",
          },
          InformationsSecteur: {
            _categorieTaille: "Moyen",
            secteurs: ens({
              secteurActivite: "eauPotable",
              activites: ens("fournisseursDistributeursEauxConsommation"),
            }),
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'au secteur/sous-secteur et son activité", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["privee"],
          trancheNombreEmployes: ["moyen"],
          trancheChiffreAffaire: ["grand"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["transports"],
          sousSecteurActivite: ["transportsFerroviaires"],
          activites: ["entrepriseFerroviaire"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "InformationsSecteur",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            _categorieTaille: "Grand",
            typeStructure: "privee",
            trancheNombreEmployes: "moyen",
            trancheChiffreAffaire: "grand",
          },
          InformationsSecteur: {
            _categorieTaille: "Grand",
            secteurs: ens({
              secteurActivite: "transports",
              sousSecteurActivite: "transportsFerroviaires",
              activites: ens("entrepriseFerroviaire"),
            }),
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'à plusieurs secteurs et leurs activités", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["publique"],
          typeEntitePublique: ["administrationCentrale"],
          trancheNombreEmployes: ["moyen"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["eauPotable", "sante"],
          activites: [
            "fournisseursDistributeursEauxConsommation",
            "rechercheDeveloppementMedicament",
          ],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "InformationsSecteur",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            _categorieTaille: "Moyen",
            typeStructure: "publique",
            typeEntitePublique: "administrationCentrale",
            trancheNombreEmployes: "moyen",
          },
          InformationsSecteur: {
            _categorieTaille: "Moyen",
            secteurs: ens(
              {
                secteurActivite: "eauPotable",
                activites: ens("fournisseursDistributeursEauxConsommation"),
              },
              {
                secteurActivite: "sante",
                activites: ens("rechercheDeveloppementMedicament"),
              },
            ),
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'à plusieurs secteurs simples, un composite et leurs activités", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["publique"],
          typeEntitePublique: ["administrationCentrale"],
          trancheNombreEmployes: ["moyen"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["eauPotable", "sante", "fabrication"],
          sousSecteurActivite: ["fabricationEquipementsElectroniques"],
          activites: [
            "fournisseursDistributeursEauxConsommation",
            "rechercheDeveloppementMedicament",
            "laboratoireReferenceUE",
            "fabriquantPilesAccumulateursElectriques",
            "fabriquantAppareilEclairage",
          ],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "InformationsSecteur",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            _categorieTaille: "Moyen",
            typeStructure: "publique",
            typeEntitePublique: "administrationCentrale",
            trancheNombreEmployes: "moyen",
          },
          InformationsSecteur: {
            _categorieTaille: "Moyen",
            secteurs: ens(
              {
                secteurActivite: "eauPotable",
                activites: ens("fournisseursDistributeursEauxConsommation"),
              },
              {
                secteurActivite: "sante",
                activites: ens(
                  "rechercheDeveloppementMedicament",
                  "laboratoireReferenceUE",
                ),
              },
              {
                secteurActivite: "fabrication",
                sousSecteurActivite: "fabricationEquipementsElectroniques",
                activites: ens(
                  "fabriquantPilesAccumulateursElectriques",
                  "fabriquantAppareilEclairage",
                ),
              },
            ),
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'à plusieurs secteurs composites et leurs activités", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["privee"],
          trancheNombreEmployes: ["moyen"],
          trancheChiffreAffaire: ["grand"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["eauPotable", "sante", "fabrication", "transports"],
          sousSecteurActivite: [
            "fabricationEquipementsElectroniques",
            "fabricationProduitsInformatiquesElectroniquesOptiques",
            "transportsFerroviaires",
          ],
          activites: [
            "fournisseursDistributeursEauxConsommation",
            "rechercheDeveloppementMedicament",
            "laboratoireReferenceUE",
            "fabriquantPilesAccumulateursElectriques",
            "fabriquantAppareilEclairage",
            "fabriquantEquipementCommunication",
            "fabriquantProduitsElectroniquesGrandPublic",
            "entrepriseFerroviaire",
          ],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "InformationsSecteur",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            _categorieTaille: "Grand",
            typeStructure: "privee",
            trancheNombreEmployes: "moyen",
            trancheChiffreAffaire: "grand",
          },
          InformationsSecteur: {
            _categorieTaille: "Grand",
            secteurs: ens(
              {
                secteurActivite: "eauPotable",
                activites: ens("fournisseursDistributeursEauxConsommation"),
              },
              {
                secteurActivite: "sante",
                activites: ens(
                  "rechercheDeveloppementMedicament",
                  "laboratoireReferenceUE",
                ),
              },
              {
                secteurActivite: "fabrication",
                sousSecteurActivite: "fabricationEquipementsElectroniques",
                activites: ens(
                  "fabriquantPilesAccumulateursElectriques",
                  "fabriquantAppareilEclairage",
                ),
              },
              {
                secteurActivite: "fabrication",
                sousSecteurActivite:
                  "fabricationProduitsInformatiquesElectroniquesOptiques",
                activites: ens(
                  "fabriquantEquipementCommunication",
                  "fabriquantProduitsElectroniquesGrandPublic",
                ),
              },
              {
                secteurActivite: "transports",
                sousSecteurActivite: "transportsFerroviaires",
                activites: ens("entrepriseFerroviaire"),
              },
            ),
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'à un secteur composite autre", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["privee"],
          trancheNombreEmployes: ["moyen"],
          trancheChiffreAffaire: ["grand"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["energie", "fabrication", "transports"],
          sousSecteurActivite: [
            "autreSousSecteurEnergie",
            "autreSousSecteurFabrication",
            "autreSousSecteurTransports",
          ],
          activites: [],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "InformationsSecteur",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            _categorieTaille: "Grand",
            typeStructure: "privee",
            trancheNombreEmployes: "moyen",
            trancheChiffreAffaire: "grand",
          },
          InformationsSecteur: {
            _categorieTaille: "Grand",
            secteurs: ens(
              {
                secteurActivite: "energie",
                sousSecteurActivite: "autreSousSecteurEnergie",
              },
              {
                secteurActivite: "fabrication",
                sousSecteurActivite: "autreSousSecteurFabrication",
              },
              {
                secteurActivite: "transports",
                sousSecteurActivite: "autreSousSecteurTransports",
              },
            ),
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
      it("Enchaine les données jusqu'à un secteur petite structure privée", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["privee"],
          trancheNombreEmployes: ["petit"],
          trancheChiffreAffaire: ["petit"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["eauxUsees"],
          activites: ["collectantEvacuantTraitantEaux"],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "InformationsSecteur",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            _categorieTaille: "Petit",
            typeStructure: "privee",
            trancheNombreEmployes: "petit",
            trancheChiffreAffaire: "petit",
          },
          InformationsSecteur: {
            _categorieTaille: "Petit",
            secteurs: ens({
              secteurActivite: "eauxUsees",
              activites: ens("collectantEvacuantTraitantEaux"),
            }),
          },
        };
        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
    });
    describe("LocalisationsServices", () => {
      it("transforme localisationFournitureServicesNumeriques", () => {
        const donnees = fabriqueDonneesFormulaire({
          designationOperateurServicesEssentiels: ["oui"],
          typeStructure: ["privee"],
          trancheNombreEmployes: ["petit"],
          trancheChiffreAffaire: ["petit"],
          appartenancePaysUnionEuropeenne: ["france"],
          secteurActivite: ["infrastructureNumerique"],
          activites: ["fournisseurReseauxCommunicationElectroniquesPublics"],
          localisationFournitureServicesNumeriques: [
            "france",
            "autre",
            "horsue",
          ],
        });
        const resultatAttendu: UnionReponseEtat = {
          _tag: "InformationsSecteur",
          DesignationOperateurServicesEssentiels: {
            designationOperateurServicesEssentiels: "oui",
          },
          AppartenancePaysUnionEuropeenne: {
            appartenancePaysUnionEuropeenne: "france",
          },
          Structure: {
            _categorieTaille: "Petit",
            typeStructure: "privee",
            trancheNombreEmployes: "petit",
            trancheChiffreAffaire: "petit",
          },
          InformationsSecteur: {
            _categorieTaille: "Petit",
            secteurs: ens({
              _categorieTaille: "Petit",
              secteurActivite: "infrastructureNumerique",
              activites: ens(
                "fournisseurReseauxCommunicationElectroniquesPublics",
              ),
              localisationFournitureServicesNumeriques: ens(
                "france",
                "autre",
                "horsue",
              ),
            }),
          },
        };

        const resultatObtenu =
          ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
            donnees,
          );
        expect(resultatObtenu).toStrictEqual(resultatAttendu);
      });
    });
    // describe.skip(
    //   "*** Raison Skip *** plus en accord avec nouveau modèle" +
    //     "Données localisation",
    //   () => {
    //     it("Enchaine les données jusqu'à un secteur petite structure privée localisée", () => {
    //       const donnees = fabriqueDonneesFormulaire({
    //         designationOperateurServicesEssentiels: ["oui"],
    //         typeStructure: ["privee"],
    //         trancheNombreEmployes: ["petit"],
    //         trancheChiffreAffaire: ["petit"],
    //         appartenancePaysUnionEuropeenne: ["france"],
    //         secteurActivite: ["infrastructureNumerique"],
    //         activites: ["registresNomsDomainesPremierNiveau"],
    //         fournitServicesUnionEuropeenne: ["oui"],
    //         localisationRepresentant: ["france"],
    //       });
    //       const resultatAttendu: UnionReponseEtat = {
    //         _tag: "InformationsSecteur",
    //         DesignationOperateurServicesEssentiels: {
    //           designationOperateurServicesEssentiels: "oui",
    //         },
    //         AppartenancePaysUnionEuropeenne: {
    //           appartenancePaysUnionEuropeenne: "france",
    //         },
    //         Structure: {
    //           _categorieTaille: "Petit",
    //           typeStructure: "privee",
    //           trancheNombreEmployes: "petit",
    //           trancheChiffreAffaire: "petit",
    //         },
    //         InformationsSecteur: {
    //           _categorieTaille: "Petit",
    //           secteurs: ens({
    //             secteurActivite: "infrastructureNumerique",
    //             activites: ens("registresNomsDomainesPremierNiveau"),
    //             fournitServicesUnionEuropeenne: "oui",
    //             localisationRepresentant: "france",
    //           }),
    //         },
    //       };
    //       const resultatObtenu =
    //         ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
    //           donnees,
    //         );
    //       expect(resultatObtenu).toStrictEqual(resultatAttendu);
    //     });
    //     it("Enchaine les données jusqu'à un secteur petite structure privée localisée hors UE", () => {
    //       const donnees = fabriqueDonneesFormulaire({
    //         designationOperateurServicesEssentiels: ["oui"],
    //         typeStructure: ["privee"],
    //         trancheNombreEmployes: ["petit"],
    //         trancheChiffreAffaire: ["petit"],
    //         appartenancePaysUnionEuropeenne: ["france"],
    //         secteurActivite: ["infrastructureNumerique"],
    //         activites: ["registresNomsDomainesPremierNiveau"],
    //         fournitServicesUnionEuropeenne: ["non"],
    //       });
    //       const resultatAttendu: UnionReponseEtat = {
    //         _tag: "InformationsSecteur",
    //         DesignationOperateurServicesEssentiels: {
    //           designationOperateurServicesEssentiels: "oui",
    //         },
    //         AppartenancePaysUnionEuropeenne: {
    //           appartenancePaysUnionEuropeenne: "france",
    //         },
    //         Structure: {
    //           _categorieTaille: "Petit",
    //           typeStructure: "privee",
    //           trancheNombreEmployes: "petit",
    //           trancheChiffreAffaire: "petit",
    //         },
    //         InformationsSecteur: {
    //           _categorieTaille: "Petit",
    //           secteurs: ens({
    //             secteurActivite: "infrastructureNumerique",
    //             activites: ens("registresNomsDomainesPremierNiveau"),
    //             fournitServicesUnionEuropeenne: "non",
    //           }),
    //         },
    //       };
    //       const resultatObtenu =
    //         ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
    //           donnees,
    //         );
    //       expect(resultatObtenu).toStrictEqual(resultatAttendu);
    //     });
    //     it("Enchaine les données jusqu'à un secteur grande structure privée localisée hors UE", () => {
    //       const donnees = fabriqueDonneesFormulaire({
    //         designationOperateurServicesEssentiels: ["non"],
    //         typeStructure: ["privee"],
    //         trancheNombreEmployes: ["grand"],
    //         trancheChiffreAffaire: ["petit"],
    //         appartenancePaysUnionEuropeenne: ["france"],
    //         secteurActivite: ["infrastructureNumerique"],
    //         activites: ["registresNomsDomainesPremierNiveau"],
    //         fournitServicesUnionEuropeenne: ["non"],
    //       });
    //       const resultatAttendu: UnionReponseEtat = {
    //         _tag: "InformationsSecteur",
    //         DesignationOperateurServicesEssentiels: {
    //           designationOperateurServicesEssentiels: "non",
    //         },
    //         AppartenancePaysUnionEuropeenne: {
    //           appartenancePaysUnionEuropeenne: "france",
    //         },
    //         Structure: {
    //           _categorieTaille: "Grand",
    //           typeStructure: "privee",
    //           trancheNombreEmployes: "grand",
    //           trancheChiffreAffaire: "petit",
    //         },
    //         InformationsSecteur: {
    //           _categorieTaille: "Grand",
    //           secteurs: ens({
    //             secteurActivite: "infrastructureNumerique",
    //             activites: ens("registresNomsDomainesPremierNiveau"),
    //             fournitServicesUnionEuropeenne: "non",
    //           }),
    //         },
    //       };
    //       const resultatObtenu =
    //         ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
    //           donnees,
    //         );
    //       expect(resultatObtenu).toStrictEqual(resultatAttendu);
    //     });
    //     it("Enchaine les données jusqu'à un secteur grande structure publique localisée hors france", () => {
    //       const donnees = fabriqueDonneesFormulaire({
    //         designationOperateurServicesEssentiels: ["non"],
    //         typeStructure: ["publique"],
    //         typeEntitePublique: ["collectiviteTerritoriale"],
    //         trancheNombreEmployes: ["grand"],
    //         appartenancePaysUnionEuropeenne: ["france"],
    //         secteurActivite: ["infrastructureNumerique"],
    //         activites: ["registresNomsDomainesPremierNiveau"],
    //         fournitServicesUnionEuropeenne: ["oui"],
    //         localisationRepresentant: ["autre"],
    //       });
    //       const resultatAttendu: UnionReponseEtat = {
    //         _tag: "InformationsSecteur",
    //         DesignationOperateurServicesEssentiels: {
    //           designationOperateurServicesEssentiels: "non",
    //         },
    //         AppartenancePaysUnionEuropeenne: {
    //           appartenancePaysUnionEuropeenne: "france",
    //         },
    //         Structure: {
    //           _categorieTaille: "Grand",
    //           typeStructure: "publique",
    //           trancheNombreEmployes: "grand",
    //           typeEntitePublique: "collectiviteTerritoriale",
    //         },
    //         InformationsSecteur: {
    //           _categorieTaille: "Grand",
    //           secteurs: ens({
    //             secteurActivite: "infrastructureNumerique",
    //             activites: ens("registresNomsDomainesPremierNiveau"),
    //             fournitServicesUnionEuropeenne: "oui",
    //             localisationRepresentant: "autre",
    //           }),
    //         },
    //       };
    //       const resultatObtenu =
    //         ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
    //           donnees,
    //         );
    //       expect(resultatObtenu).toStrictEqual(resultatAttendu);
    //     });
    //     it("grande structure gestion TIC localisée hors france", () => {
    //       const donnees = fabriqueDonneesFormulaire({
    //         typeEntitePublique: [],
    //         fournitServicesUnionEuropeenne: ["oui"],
    //         localisationRepresentant: ["france"],
    //         secteurActivite: ["gestionServicesTic"],
    //         sousSecteurActivite: [],
    //         designationOperateurServicesEssentiels: ["non"],
    //         typeStructure: ["privee"],
    //         trancheChiffreAffaire: ["grand"],
    //         appartenancePaysUnionEuropeenne: ["france"],
    //         trancheNombreEmployes: ["moyen"],
    //         activites: ["fournisseurServicesSecuriteGeres"],
    //       });
    //       const resultatAttendu: UnionReponseEtat = {
    //         _tag: "InformationsSecteur",
    //         DesignationOperateurServicesEssentiels: {
    //           designationOperateurServicesEssentiels: "non",
    //         },
    //         AppartenancePaysUnionEuropeenne: {
    //           appartenancePaysUnionEuropeenne: "france",
    //         },
    //         Structure: {
    //           _categorieTaille: "Grand",
    //           typeStructure: "privee",
    //           trancheChiffreAffaire: "grand",
    //           trancheNombreEmployes: "moyen",
    //         },
    //         InformationsSecteur: {
    //           _categorieTaille: "Grand",
    //           secteurs: ens({
    //             secteurActivite: "gestionServicesTic",
    //             activites: ens("fournisseurServicesSecuriteGeres"),
    //             localisationRepresentant: "france",
    //             fournitServicesUnionEuropeenne: "oui",
    //           }),
    //         },
    //       };
    //       const resultatObtenu =
    //         ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
    //           donnees,
    //         );
    //       expect(resultatObtenu).toStrictEqual(resultatAttendu);
    //     });
    //     it("grande structure gestion TIC localisée hors france", () => {
    //       const donnees = fabriqueDonneesFormulaire({
    //         typeEntitePublique: [],
    //         fournitServicesUnionEuropeenne: ["oui"],
    //         localisationRepresentant: ["france"],
    //         secteurActivite: ["gestionServicesTic", "infrastructureNumerique"],
    //         sousSecteurActivite: [],
    //         designationOperateurServicesEssentiels: ["non"],
    //         typeStructure: ["privee"],
    //         trancheChiffreAffaire: ["grand"],
    //         appartenancePaysUnionEuropeenne: ["france"],
    //         trancheNombreEmployes: ["grand"],
    //         activites: ["fournisseurServicesInformatiqueNuage"],
    //       });
    //       const resultatAttendu: UnionReponseEtat = {
    //         _tag: "InformationsSecteur",
    //         DesignationOperateurServicesEssentiels: {
    //           designationOperateurServicesEssentiels: "non",
    //         },
    //         AppartenancePaysUnionEuropeenne: {
    //           appartenancePaysUnionEuropeenne: "france",
    //         },
    //         Structure: {
    //           _categorieTaille: "Grand",
    //           typeStructure: "privee",
    //           trancheChiffreAffaire: "grand",
    //           trancheNombreEmployes: "grand",
    //         },
    //         InformationsSecteur: {
    //           _categorieTaille: "Grand",
    //           secteurs: ens(
    //             {
    //               secteurActivite: "gestionServicesTic",
    //               activites: ens(),
    //               localisationRepresentant: "france",
    //               fournitServicesUnionEuropeenne: "oui",
    //             },
    //             {
    //               secteurActivite: "infrastructureNumerique",
    //               activites: ens("fournisseurServicesInformatiqueNuage"),
    //               localisationRepresentant: "france",
    //               fournitServicesUnionEuropeenne: "oui",
    //             },
    //           ),
    //         },
    //       };
    //       const resultatObtenu =
    //         ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
    //           donnees,
    //         );
    //       expect(resultatObtenu).toStrictEqual(resultatAttendu);
    //     });
    //   },
    // );
  });
});
