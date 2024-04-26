import {
  PointsAttentionPrecis,
  ResumesPointsAttention,
} from "../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { ReactElement } from "react";

export const TextesDesResumes: Record<ResumesPointsAttention, ReactElement> = {
  MecanismesExemption: (
    <>
      Des mécanismes d&apos;exemption ou de désignation pourront également être
      mis en place au cas par cas par le gouvernement français pour certaines
      entités et qui seront connus au plus tard le 18 octobre 2024.
    </>
  ),
  TelcoAutreEtatMembre: (
    <>
      En tant que fournisseur de réseaux de communications électroniques publics
      ou fournisseur de services de communications électroniques accessibles au
      public, nous vous invitons à vous rapprocher des autorités nationales
      compétentes NIS 2 de l&apos;ensemble des États membres de l&apos;UE dans
      lesquels vous fournissez vos services.
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
        L’enregistrement de noms de domaines étant l&apos;unique activité
        reconnue par la directive NIS 2 pratiquée par votre entité, seul
        l&apos;enregistrement et la mise à jour de vos données auprès de
        l&apos;ANSSI sera nécessaire.
      </>
    ),
  },
};
