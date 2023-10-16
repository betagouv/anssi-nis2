import { fc } from "@fast-check/vitest";
import { IDonneesFormulaireSimulateur } from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  ajouteMethodeAvec,
  DonneesSansActivite,
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
} from "../../../src/Domaine/Simulateur/ValeursChampsSimulateur";
import { SecteurActivite } from "../../../src/Domaine/Simulateur/SecteursActivite";
import { SousSecteurActivite } from "../../../src/Domaine/Simulateur/SousSecteurs";
import {
  sousSecteursParSecteur,
  ValeursSecteursAvecSousSecteurs,
} from "../../../src/Domaine/Simulateur/ValeursSousSecteursActivites";
import { Activite } from "../../../src/Domaine/Simulateur/Activite";
import { activitesParSecteurEtSousSecteur } from "../../../src/Domaine/Simulateur/ActivitesParSecteurEtSousSecteur";
import { ValeursSecteursSansSousSecteur } from "../../../src/Domaine/Simulateur/ValeursSecteursActivites";

const trancheSansDoublonSurValeur = (
  base,
  valeurExclusive: UnionPetitMoyenGrand,
) =>
  fc
    .subarray<TrancheNombreEmployes>([...ValeursPetitMoyenGrand], {
      minLength: 1,
      maxLength: 1,
    })
    .filter(
      (tranche) =>
        (base.trancheCA.includes(valeurExclusive) &&
          !tranche.includes(valeurExclusive)) ||
        (!base.trancheCA.includes(valeurExclusive) &&
          tranche.includes(valeurExclusive)),
    );
export const arbTranche = () =>
  fc.subarray<TrancheChiffreAffaire>([...ValeursPetitMoyenGrand], {
    minLength: 1,
    maxLength: 1,
  });
export const tuplesSecteursSansSousSecteur: {
  secteur: SecteurActivite;
  sousSecteur?: SousSecteurActivite;
}[] = [...ValeursSecteursSansSousSecteur].map((secteur) => ({
  secteur: secteur,
}));
const fabriqueTupleSecteurSousSecteurs: (
  secteur: SecteurActivite,
) => [SecteurActivite, SousSecteurActivite[]] = (secteur) => [
  secteur,
  sousSecteursParSecteur[secteur],
];
const tuplesSecteursEtSousSecteurs: {
  secteur: SecteurActivite;
  sousSecteur?: SousSecteurActivite;
}[] = ValeursSecteursAvecSousSecteurs.map(
  fabriqueTupleSecteurSousSecteurs,
).reduce(
  (listeTuples, [secteur, listeSousSecteurs]) => [
    ...listeTuples,
    ...listeSousSecteurs.map((sousSecteur) => ({
      secteur: secteur,
      sousSecteur: sousSecteur,
    })),
  ],
  [],
);
const arbSsecteursAvecLeursSousSecteurs: {
  secteur: SecteurActivite;
  sousSecteur?: SousSecteurActivite;
}[] = [...tuplesSecteursSansSousSecteur, ...tuplesSecteursEtSousSecteurs];
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
const listeActivitesDesSecteurs = (
  secteurActivite: (SecteurActivite | SousSecteurActivite)[],
  filtreActivite: (activite: Activite) => boolean,
): Activite[] => {
  return Array.from(
    secteurActivite.reduce((ensembleActivites, secteur) => {
      activitesParSecteurEtSousSecteur[secteur]
        ?.filter(filtreActivite)
        .map((activite: Activite) => ensembleActivites.add(activite));
      return ensembleActivites;
    }, new Set<Activite>()),
  );
};

export const ajouteArbitraireActivites = <
  DonneesPartielle extends DonneesSansActivite,
>(
  base: DonneesPartielle,
  filtreActivite: (activite: Activite) => boolean = () => true,
) =>
  fc.record<DonneesPartielle>({
    ...propageBase(base),
    activites: fc.subarray(
      [
        ...listeActivitesDesSecteurs(
          [...base.secteurActivite, ...base.sousSecteurActivite],
          filtreActivite,
        ),
      ].filter((activite) => activite !== undefined),
    ),
  });

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
        etatMembre: fc.subarray([...ValeursAppartenancePaysUnionEuropeenne]),
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
        etatMembre: fc.subarray([...ValeursAppartenancePaysUnionEuropeenne]),
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
