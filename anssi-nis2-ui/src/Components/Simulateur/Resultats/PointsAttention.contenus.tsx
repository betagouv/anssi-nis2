import { ReactElement } from "react";
import {
  PointsAttentionPrecis,
  ResumesPointsAttention,
} from "../../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";

export const TextesDesResumes: Record<ResumesPointsAttention, ReactElement> = {
  MecanismeExemptionSecuriteNationale: (
    <>
      Des mécanismes d&apos;exemption pourront être mis en place au cas par cas
      par le gouvernement français pour certaines entités répondant à des
      critères spécifiques.
      <br />
      En effet, les entités qui exercent des activités dans les domaines de la
      sécurité nationale, de la sécurité publique, de la défense ou de
      l&apos;application de la loi, y compris la prévention et la détection des
      infractions pénales, ainsi que les enquêtes et les poursuites en la
      matière, ou qui fournissent des services exclusivement aux entités de
      l&apos;administration publique exerçant des activités dans les domaines
      susmentionnés peuvent être exemptées de certaines obligations relatives à
      la directive NIS&nbsp;2 lorsqu&apos;elles n&apos;agissent pas en tant que
      prestataire de services de confiance. Ces éventuelles exemptions seront
      connues à l&apos;issue du processus de transposition de la directive
      NIS&nbsp;2.
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
  NumeriqueEtabliEMUEhorsFrance: (
    <>
      Votre entité exerce des activités des secteurs «&nbsp;Infrastructure
      numérique&nbsp;», «&nbsp;Gestion des services TIC&nbsp;» et/ou
      «&nbsp;Fournisseurs numériques&nbsp;» pour lesquelles l&apos;établissement
      principal au sens de la directive NIS&nbsp;2 est dans l&apos;Union
      Européenne, hors de France. Pour ces activités-ci, votre entité dépend de
      l&apos;Etat membre de l&apos;Union Européenne dans lequel se trouve votre
      établissement principal, et, à ce titre, nous vous invitons à vous
      rapprocher de l&apos;autorité nationale compétente NIS&nbsp;2 associée.
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
  OSE: (
    <>
      Dans le cas où votre entité a été désignée Opérateur de Service Essentiel
      au titre de NIS&nbsp;1{" "}
      <a
        href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016L1148"
        target="_blank"
        rel="noreferrer"
      >
        (Directive (UE) 2016/1148)
      </a>
      , celle-ci sera désignée entité essentielle au titre de la réglementation
      NIS&nbsp;2.
    </>
  ),
};
export const Precisions: Record<
  PointsAttentionPrecis,
  { titre: string; texte: ReactElement }
> = {
  TelecomFranceEtAutresEMdelUE: {
    titre: "Juridiction",
    texte: (
      <>
        Au titre de votre activité de fournisseur de réseaux de communications
        électroniques publics et/ou de fournisseur de services de communications
        électroniques accessibles au public, votre entité relève, pour lesdites
        activités, de l&apos;ensemble des Etats membres de l&apos;Union
        Européenne (dont la France) dans lesquels vos services sont fournis et
        devra se conformer aux réglementations NIS&nbsp;2 en vigueur dans ces
        Etats membres-ci.
      </>
    ),
  },
  TelecomAutresEMdelUEUniquement: {
    titre: "Juridiction",
    texte: (
      <>
        Au titre de votre activité de fournisseur de réseaux de communications
        électroniques publics et/ou de fournisseur de services de communications
        électroniques accessibles au public, votre entité relève, pour lesdites
        activités, de l’ensemble des Etats membres de l’Union Européenne dans
        lesquels vos services sont fournis et devra se conformer aux
        réglementations NIS 2 en vigueur dans ces Etats membres-ci.
      </>
    ),
  },
  ResilienceEntiteCritique: {
    titre: "Directive REC",
    texte: (
      <>
        Toute entité régulée par{" "}
        <a
          href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32022L2557"
          target="_blank"
          rel="noreferrer"
        >
          la directive (UE) 2022/2557
        </a>{" "}
        concernant la Résilience des Entités Critiques (REC) sera également
        soumise à NIS&nbsp;2, en tant qu&apos;entité essentielle.
      </>
    ),
  },
  DORA: {
    titre: "Règlement DORA",
    texte: (
      <>
        Certaines entités exerçant dans le secteur financier (secteur bancaire,
        infrastructure des marchés financiers, assurances désignées opérateurs
        de services essentiels en France au titre de NIS&nbsp;1…) seront
        également concernées par{" "}
        <a
          href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32022R2554"
          target="_blank"
          rel="noreferrer"
        >
          le règlement (UE) DORA 2022/2554
        </a>{" "}
        pour la Résilience Opérationnelle Numérique, qui sera applicable en
        l&apos;état dans tous les pays de l&apos;Union Européenne à partir du 17
        janvier 2025.
        <br />
        Pour ces entités, les obligations de la directive DORA en matière de
        gestion de risques, de notification d&apos;incidents et de supervision
        se substitueront aux obligations de même type de la directive
        NIS&nbsp;2. En revanche, les autres obligations de la directive
        NIS&nbsp;2 (telles celles relatives à la désignation des CSIRT, au cadre
        national de gestion des crises de cybersécurité, et au registre des
        entités essentielles et importantes) demeureront pour les entités
        susmentionnées.
      </>
    ),
  },
  EnregistrementNomsDeDomaine: {
    titre: "Fournisseur de services d'enregistrement de noms de domaine",
    texte: (
      <>
        D&apos;après les éléments que vous avez renseignés, la fourniture de
        services d&apos;enregistrement de noms de domaines est la seule activité
        régulée par la directive NIS&nbsp;2 que votre entité exerce. Dans ce
        cas, vos seules obligations concerneront l&apos;enregistrement de votre
        entité auprès de l&apos;autorité nationale désignée ainsi que la mise à
        jour des données enregistrées, en cas de changement.
      </>
    ),
  },
  CriteresDePossibleInclusion: {
    titre:
      "Critères de désignation unitaire « Entité Essentielle » ou « Entité Importante »",
    texte: (
      <>
        Sur la base de critères exposés ci-après, des désignations unitaires
        peuvent être décidées par le gouvernement français, au cas par cas :
        <ul>
          <li>
            une entité a priori non incluse par défaut dans le périmètre des
            entités régulées NIS&nbsp;2 peut être désignée entité essentielle ou
            entité importante ;
          </li>
          <li>
            une entité a priori importante par défaut peut être désignée entité
            essentielle.
          </li>
        </ul>
        Les critères de désignation unitaire sont les suivants :
        <ul>
          <li>
            l&apos;entité est, dans un État membre, le seul prestataire
            d&apos;un service qui est essentiel au maintien d&apos;activités
            sociétales ou économiques critiques ;
          </li>
          <li>
            une perturbation du service fourni par l&apos;entité pourrait avoir
            un impact important sur la sécurité publique, la sûreté publique ou
            la santé publique ;
          </li>
          <li>
            une perturbation du service fourni par l&apos;entité pourrait
            induire un risque systémique important, en particulier pour les
            secteurs où cette perturbation pourrait avoir un impact
            transfrontière ;
          </li>
          <li>
            l&apos;entité est critique en raison de son importance spécifique au
            niveau national ou régional pour le secteur ou le type de service en
            question, ou pour d&apos;autres secteurs interdépendants dans
            l&apos;État membre.
          </li>
        </ul>
      </>
    ),
  },
};
