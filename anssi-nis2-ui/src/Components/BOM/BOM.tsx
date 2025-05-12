import { Fragment } from "react";
import { DefaultComponent } from "../../Services/Props";

export const BOM: DefaultComponent = () => {
  const urlFAQ = import.meta.env.VITE_CRISP_URL_FAQ;
  if (!urlFAQ) return <Fragment />;

  return (
    <lab-anssi-centre-aide
      nomService="MonEspaceNIS2"
      liens={JSON.stringify([
        {
          texte: "💬 Nous contacter par chat",
          href: "https://aide.monespacenis2.cyber.gouv.fr/",
        },
        {
          texte: "🙌 Consulter la FAQ",
          href: urlFAQ,
        },
      ])}
    ></lab-anssi-centre-aide>
  );
};
