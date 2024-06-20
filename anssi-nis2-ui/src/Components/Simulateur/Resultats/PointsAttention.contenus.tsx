import { ReactElement } from "react";
import {
  PointsAttentionPrecis,
  ResumesPointsAttention,
} from "../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

export const TextesDesResumes: Record<ResumesPointsAttention, ReactElement> = {
  MecanismeExemption: (
    <>
      Des mécanismes d&apos;exemption ou de désignation pourront également être
      mis en place au cas par cas par le gouvernement français pour certaines
      entités et qui seront connus au plus tard le 18 octobre 2024.
    </>
  ),
  TelecomUE: (
    <>
      En tant que fournisseur de réseaux de communications électroniques publics
      ou fournisseur de services de communications électroniques accessibles au
      public, nous vous invitons à vous rapprocher des autorités nationales
      compétentes NIS&nbsp;2 de l&apos;ensemble des États membres de l&apos;UE
      dans lesquels vous fournissez vos services.
    </>
  ),
  NumeriqueUE: (
    <>
      En raison de certaines de vos activités liées aux infrastructures
      numériques, de gestion des services TIC ou de fourniture de services
      numériques, nous vous invitons à vous rapprocher de l&apos;autorité
      nationale compétente NIS&nbsp;2 de l&apos;État membre de l&apos;UE dans
      lequel se trouve votre établissement principal.
    </>
  ),
  FournitureServicesUE: (
    <>
      Nous vous invitons à vous rapprocher de l&apos;autorité nationale
      compétente NIS&nbsp;2 des autres États membres de l&apos;UE dans lesquels
      vous fournissez vos services.
    </>
  ),
  EtablissementPrincipalUE: (
    <>
      Nous vous invitons à vous rapprocher de l&apos;autorité nationale
      compétente NIS&nbsp;2 de l&apos;État membre de l&apos;UE dans lequel se
      trouve votre établissement principal.
    </>
  ),
  EtabliUE: (
    <>
      Nous vous invitons à vous rapprocher de l&apos;autorité nationale
      compétente NIS&nbsp;2 de l&apos;État membre de l&apos;UE dans lequel vous
      êtes établi.
    </>
  ),
  RepresentantUE: (
    <>
      Nous vous invitons à vous rapprocher de l&apos;autorité nationale
      compétente NIS&nbsp;2 de l&apos;État membre de l&apos;UE dans lequel votre
      représentant est ou sera établi.
    </>
  ),
};
export const Precisions: Record<
  PointsAttentionPrecis,
  { titre: string; texte: ReactElement }
> = {
  ResilienceEntiteCritique: {
    titre: "REC",
    texte: (
      <>
        Toute entité concernée par{" "}
        <a
          href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32022L2557"
          target="_blank"
          rel="noreferrer"
        >
          la directive UE 2022/2557
        </a>{" "}
        de Résilience des Entités Critiques est également soumise à NIS 2.
      </>
    ),
  },
  SecuriteNationale: {
    titre: "Sécurité nationale",
    texte: (
      <>
        Si votre entité exerce une activité dans les domaines de la sécurité
        nationale, de la sécurité publique, de la défense, ou de
        l&apos;application de la loi, et n&apos;agit pas en tant que prestataire
        de confiance, vous pourriez être exempté de certaines obligations
        relatives à la directive NIS 2.
      </>
    ),
  },
  DORA: {
    titre: "DORA",
    texte: (
      <>
        Au vu des éléments saisis sur votre secteur d&apos;activité (secteur
        financier), votre entité pourrait également être concernée par le
        règlement (UE) DORA 2022/2054 pour la Résilience Opérationnelle
        Numérique qui sera applicable en l&apos;État dans tous les pays de
        l&apos;Union Européenne à partir du 17 janvier 2025.
      </>
    ),
  },
  EnregistrementNomsDeDomaines: {
    titre: "Enregistrement de noms de domaines",
    texte: (
      <>
        L&apos;enregistrement de noms de domaines étant l&apos;unique activité
        reconnue par la directive NIS 2 pratiquée par votre entité, seul
        l&apos;enregistrement et la mise à jour de vos données auprès de
        l&apos;ANSSI sera nécessaire.
      </>
    ),
  },
  CriteresDePossibleInclusion: {
    titre: "Critères de possible inclusion",
    texte: (
      <ul>
        <li>
          l&apos;entité est, dans un État membre, le seul prestataire d&apos;un
          service qui est essentiel au maintien d&apos;activités sociétales ou
          économiques critiques ;
        </li>
        <li>
          une perturbation du service fourni par l&apos;entité pourrait avoir un
          impact important sur la sécurité publique, la sûreté publique ou la
          santé publique ;
        </li>
        <li>
          une perturbation du service fourni par l&apos;entité pourrait induire
          un risque systémique important, en particulier pour les secteurs où
          cette perturbation pourrait avoir un impact transfrontière ;
        </li>
        <li>
          l&apos;entité est critique en raison de son importance spécifique au
          niveau national ou régional pour le secteur ou le type de service en
          question, ou pour d&apos;autres secteurs interdépendants dans
          l&apos;État membre ;
        </li>
      </ul>
    ),
  },
};
