import { fc } from "@fast-check/vitest";
import { IDonneesFormulaireSimulateur } from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  ajouteMethodeAvec,
  DonneesSansActivite,
  fabriqueArbSingleton,
  propageBase,
} from "../../utilitaires/manibulationArbitraires";
import {
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
  UnionPetitMoyenGrand,
} from "../../../src/Domaine/Simulateur/ChampsSimulateur";
import {
  ValeursAppartenancePaysUnionEuropeenne,
  ValeursPetitMoyenGrand,
  ValeursTypeStructure,
} from "../../../src/Domaine/Simulateur/ValeursChampsSimulateur";
import { SecteurActivite } from "../../../src/Domaine/Simulateur/SecteursActivite";
import {
  EnrSecteurSousSecteur,
  SousSecteurActivite,
} from "../../../src/Domaine/Simulateur/SousSecteurs";
import { Activite } from "../../../src/Domaine/Simulateur/Activite";
import { filtreSecteursSansSousSecteurs } from "../../../src/Domaine/Simulateur/Operations/operationsActivite";

import { fabriqueListeActivitesDesSecteurs } from "../../../src/Domaine/Simulateur/Operations/FiltreActivites";
import {
  tuplesSecteursEtSousSecteurs,
  tuplesSecteursSansSousSecteur,
} from "../../../src/Domaine/Simulateur/TuplesSecteursSousSecteur";

const trancheSansDoublonSurValeur = (
  base,
  valeurExclusive: UnionPetitMoyenGrand,
) =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand).filter(
    (tranche) =>
      (base.trancheCA.includes(valeurExclusive) &&
        !tranche.includes(valeurExclusive)) ||
      (!base.trancheCA.includes(valeurExclusive) &&
        tranche.includes(valeurExclusive)),
  );
export const arbTranche = () => fabriqueArbSingleton(ValeursPetitMoyenGrand);
const arbSsecteursAvecLeursSousSecteurs: EnrSecteurSousSecteur[] = [
  ...tuplesSecteursSansSousSecteur,
  ...tuplesSecteursEtSousSecteurs,
];
const arbitraireSecteursSousSecteurs = fc
  .subarray(arbSsecteursAvecLeursSousSecteurs)
  .chain((couplesSecteurSousSecteur) =>
    fc.record({
      secteurActivite: fc.constant(
        Array.from(
          couplesSecteurSousSecteur.reduce(
            (listeSecteurs, couple) => listeSecteurs.add(couple.secteur),
            new Set<SecteurActivite>(),
          ),
        ),
      ),
      sousSecteurActivite: fc.constant(
        Array.from(
          couplesSecteurSousSecteur.reduce(
            (listeSousSecteurs, couple) =>
              listeSousSecteurs.add(couple.sousSecteur),
            new Set<SousSecteurActivite>(),
          ),
        ).filter((sousSecteur) => sousSecteur !== undefined),
      ),
    }),
  );

export const ajouteArbitraireActivites = <
  DonneesPartielle extends DonneesSansActivite,
>(
  base: DonneesPartielle,
  filtreActivite: (activite: Activite) => boolean = () => true,
) => {
  return fc.record<DonneesPartielle>({
    ...propageBase(base),
    activites: fc.subarray(
      Array.from(
        new Set(
          fabriqueListeActivitesDesSecteurs(
            [
              ...filtreSecteursSansSousSecteurs(base.secteurActivite),
              ...base.sousSecteurActivite,
            ],
            filtreActivite,
          ),
        ),
      ),
    ),
  });
};

export const donneesArbitrairesFormOSEPetit: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbitraireSecteursSousSecteurs
    .chain((base) =>
      fc.record<DonneesSansActivite>({
        ...propageBase(base),
        designeOperateurServicesEssentiels: fc.constant<
          DesignationOperateurServicesEssentiels[]
        >(["oui"]),
        typeStructure: fc.constant<TypeStructure[]>(["privee"]),
        trancheCA: fc.constant<TrancheChiffreAffaire[]>(["petit"]),
        trancheNombreEmployes: fc.constant<TrancheNombreEmployes[]>(["petit"]),
        etatMembre: fabriqueArbSingleton(
          ValeursAppartenancePaysUnionEuropeenne,
        ),
      }),
    )
    .chain<DonneesSansActivite>(ajouteArbitraireActivites)
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);
export const donneesArbitrairesFormOSEMoyenGrand: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbitraireSecteursSousSecteurs
    .chain((base) =>
      fc.record<Omit<DonneesSansActivite, "trancheNombreEmployes">>({
        ...propageBase(base),
        designeOperateurServicesEssentiels: fc.constant<
          DesignationOperateurServicesEssentiels[]
        >(["oui"]),
        typeStructure: fc.constant<TypeStructure[]>(["privee"]),
        etatMembre: fabriqueArbSingleton(
          ValeursAppartenancePaysUnionEuropeenne,
        ),
        trancheCA: arbTranche(),
      }),
    )
    .chain((base) =>
      fc.record<DonneesSansActivite>({
        ...propageBase(base),
        trancheNombreEmployes: trancheSansDoublonSurValeur(base, "petit"),
      }),
    )
    .chain<Partial<IDonneesFormulaireSimulateur>>(ajouteArbitraireActivites)
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

export const donneesArbitrairesFormActivitesAutres: fc.Arbitrary<IDonneesFormulaireSimulateur> =
  arbitraireSecteursSousSecteurs
    .chain((base) =>
      fc.record<DonneesSansActivite>({
        ...propageBase(base),
        designeOperateurServicesEssentiels: fc.constant<
          DesignationOperateurServicesEssentiels[]
        >(["non"]),
        typeStructure: fabriqueArbSingleton(ValeursTypeStructure),
        trancheCA: arbTranche(),
        trancheNombreEmployes: arbTranche(),
        etatMembre: fabriqueArbSingleton(
          ValeursAppartenancePaysUnionEuropeenne,
        ),
      }),
    )
    .chain<DonneesSansActivite>((base) =>
      ajouteArbitraireActivites(base, (activite: Activite) =>
        activite.startsWith("autre"),
      ),
    )
    .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);

export const arbForm = {
  designeOSE: {
    petit: donneesArbitrairesFormOSEPetit,
    moyenGrand: donneesArbitrairesFormOSEMoyenGrand,
  },
  nonDesigneOSE: {
    activitesAutres: donneesArbitrairesFormActivitesAutres,
  },
};
