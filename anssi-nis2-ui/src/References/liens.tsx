import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";

const baseUrlAnssi = "https://www.ssi.gouv.fr/";

export const liens: Record<string, Record<string, RegisteredLinkProps>> = {
  anssi: {
    site: {
      href: baseUrlAnssi,
      title: "Site de l'ANSSI",
      target: "_blank",
    },
    faq: {
      href: `${baseUrlAnssi}/directive-nis-2/#intro`,
      title: "Foire Aux Questions à propos de NIS 2 sur le site de l'ANSSI",
      target: "_blank",
    },
    webinaire: {
      href: `${baseUrlAnssi}/directive-nis-2/`,
      title: "Foire Aux Questions à propos de NIS 2 sur le site de l'ANSSI",
      target: "_blank",
    },
    guidesBonnesPratiques: {
      href: `${baseUrlAnssi}/administration/bonnes-pratiques/`,
      title: "Guides de bonnes pratiques de l'ANSSI",
      target: "_blank",
    },
    mesuresPrioritaires: {
      href: `${baseUrlAnssi}/administration/guide/les-mesures-cyber-preventives-prioritaires/`,
      title: "Mesures Cyber Préventives Prioritaires sur le site de l'ANSSI",
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
