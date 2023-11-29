import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";

const baseUrlCyberGouv = "https://cyber.gouv.fr/";
const baseUrlAnssi = baseUrlCyberGouv; //"https://www.ssi.gouv.fr/";

export const liens: Record<string, Record<string, RegisteredLinkProps>> = {
  anssi: {
    site: {
      href: baseUrlAnssi,
      title: "Site de l'ANSSI",
      target: "_blank",
    },
    faq: {
      href: `${baseUrlAnssi}/directive-nis-2#intro`,
      title: "Foire Aux Questions à propos de NIS 2 sur le site de l'ANSSI",
      target: "_blank",
    },
    webinaire: {
      href: `${baseUrlAnssi}/directive-nis-2`,
      title: "Foire Aux Questions à propos de NIS 2 sur le site de l'ANSSI",
      target: "_blank",
    },
    guidesBonnesPratiques: {
      href: `${baseUrlAnssi}/bonnes-pratiques-protegez-vous`,
      title: "Guides de bonnes pratiques de l'ANSSI",
      target: "_blank",
    },
    mesuresPrioritaires: {
      href: `${baseUrlAnssi}/publications/les-mesures-cyber-preventives-prioritaires`,
      title: "Mesures Cyber Préventives Prioritaires sur le site de l'ANSSI",
      target: "_blank",
    },
    guideTPEPME: {
      href: `${baseUrlAnssi}/publications/la-cybersecurite-pour-les-tpepme-en-treize-questions`,
      title: "La cybersécurité pour les TPE/PME en treize questions",
      target: "_blank",
    },
    guideHygiene: {
      href: `${baseUrlAnssi}/publications/guide-dhygiene-informatique`,
      title: "Guide d’hygiène informatique",
      target: "_blank",
    },
  },
  legislation: {
    europa: {
      href: "https://eur-lex.europa.eu/legal-content/FR/TXT/PDF/?uri=CELEX:32022L2555",
      title:
        "DIRECTIVE (UE) 2022/2555 DU PARLEMENT EUROPÉEN ET DU CONSEIL \n" +
        "du 14 décembre 2022",
      target: "_blank",
    },
  },
  emails: {
    contactNis2: {
      href: "mailto:contact-monespacenis2@ssi.gouv.fr",
      title: "Nous écrire par courrier électronique",
    },
  },
};
