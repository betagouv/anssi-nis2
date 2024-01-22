import {
  FrontMatter,
  InformationsSection,
} from "../../../src/Services/Markdown/Markdown.declarations";

export const extraitFaq = `
---
source: Agence Nationale de la Sécurité des Systèmes d’Information
titre: FAQ - NIS&nbsp;2
---

Alors que la menace complexe, professionnelle et en constante évolution ne faiblit pas et que les systèmes d’information
restent pour partie vulnérables, la directive NIS&nbsp;2, publiée au Journal Officiel de l'Union Européenne en décembre
2022, représente une opportunité unique. Sa mise en application va permettre à des milliers d’entités, importantes pour
le quotidien des citoyens, de mieux se protéger.

La directive NIS&nbsp;2 s’appuie sur les acquis de la directive NIS 1 pour marquer un réel changement de paradigme, tant
à l’échelon national qu’à l’échelon européen.

Face à des acteurs malveillants toujours plus performants et mieux outillés, touchant de plus en plus d’entités trop
souvent mal protégées, la directive NIS&nbsp;2 élargit en effet ses objectifs et son périmètre d’applicabilité pour
apporter davantage de protection. Cette extension du périmètre prévue par NIS&nbsp;2 est sans précédent en matière de
réglementation cyber.

Elle amène aussi les Etats membres à renforcer leur coopération en matière de gestion de crise cyber, en donnant
notamment un cadre formel au réseau CyCLONe qui rassemble l’ANSSI et ses homologues européens.

L’ANSSI communiquera sur la directive NIS&nbsp;2 tout au long de la transposition à l’échelle nationale, partageant à
l’ensemble du public le fruit de ses travaux.

Dans l’intervalle, l’ANSSI met à disposition la FAQ ci-dessous, qui sera prochainement publiée sur son site web. Cette
FAQ est évolutive, et sera complétée au fil des questions reçues.

Dernière mise à jour de cette FAQ&nbsp;: 07/07/2023

---
titreCourt: Introduction
---

# Introduction

---
titreCourt: En quoi consistait la directive NIS 1&nbsp;?
---

## 1. En 2016, le Parlement et le Conseil de l’UE ont adopté une première série de mesures concernant la cybersécurité du marché européen. En quoi consistait exactement cette directive connue sous le nom de NIS 1&nbsp;?

La transformation numérique des sociétés européennes et l’interconnexion des pays membres ont exposé le marché
européen à de nouvelles cybermenaces. Il devenait alors urgent de garantir, collectivement, les conditions de
sécurité adéquates pour toute l’Union européenne. C’est pourquoi le Parlement européen et le Conseil de l’Union
européenne ont adopté, en juillet 2016, la directive « Network and Information Security » (NIS). Transposée au niveau
national en 2018, cette directive avait pour objectif d’augmenter le niveau de cybersécurité des acteurs majeurs de
dix secteurs d’activité (ce qui représente quelques centaines d’entités en France). Avec ce premier dispositif, ces
grands acteurs ont été soumis à l’obligation de déclarer leurs incidents de sécurité à l’ANSSI, et de mettre en œuvre
les mesures de sécurité nécessaires pour réduire fortement l’exposition de leurs systèmes les plus critiques aux
risques cybers.
`;

export const extraitFaqFrontMatter: FrontMatter & {
  sections: readonly InformationsSection<{ source?: string }>[];
} = {
  source: "Agence Nationale de la Sécurité des Systèmes d’Information",
  titre: "FAQ - NIS&nbsp;2",
  sections: [
    {
      titre: "Introduction",
      niveau: 1,
      titreCourt: "Introduction",
    },
    {
      titre:
        "1. En 2016, le Parlement et le Conseil de l’UE ont adopté une première série de mesures concernant la cybersécurité du marché européen. En quoi consistait exactement cette directive connue sous le nom de NIS 1&nbsp;?",
      niveau: 2,
      titreCourt: "En quoi consistait la directive NIS 1&nbsp;?",
    },
  ],
};
