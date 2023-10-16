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

export const ajouteArbitraireActivites = <
  DonneesPartielle extends DonneesSansActivite,
>(
  base: DonneesPartielle,
  filtreActivite: (activite: Activite) => boolean = () => true,
) =>
  fc.record<DonneesPartielle>({
    ...propageBase(base),
    activites: fc.subarray(
      base.secteurActivite
        .map(
          (secteur) =>
            activitesParSecteurEtSousSecteur[secteur]?.filter(filtreActivite),
        )
        .filter((activite) => activite !== undefined),
    ),
  });
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
const tuplesSecteursSansSousSecteur: {
  secteur: SecteurActivite;
  sousSecteur?: SousSecteurActivite;
}[] = ValeursSecteursSansSousSecteur.map((secteur) => ({ secteur: secteur }));
const tuplesSecteursEtSousSecteurs: {
  secteur: SecteurActivite;
  sousSecteur?: SousSecteurActivite;
}[] = ValeursSecteursAvecSousSecteurs.map(
  (secteur) =>
    [secteur, sousSecteursParSecteur[secteur]] as [
      SecteurActivite,
      SousSecteurActivite[],
    ],
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
        couplesSecteurSousSecteur.map((couple) => couple.secteur),
      ),
      sousSecteurActivite: fc.constant(
        couplesSecteurSousSecteur
          .map((couple) => couple.sousSecteur)
          .filter((sousSecteur) => sousSecteur !== undefined),
      ),
    }),
  );
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
