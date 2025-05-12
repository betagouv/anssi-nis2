import { DefaultComponent } from "../../Services/Props";

export const BOM: DefaultComponent = () => {
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
          href: "https://aide.monespacenis2.cyber.gouv.fr/",
        },
      ])}
    ></lab-anssi-centre-aide>
  );
};
