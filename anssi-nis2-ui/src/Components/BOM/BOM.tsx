import { DefaultComponent } from "../../Services/Props";

export const BOM: DefaultComponent = () => {
  return (
    <lab-anssi-centre-aide
      nomService="MonEspaceNIS2"
      liens={JSON.stringify([
        {
          texte: "💬 Nous contacter",
          href: "https://aide.monespacenis2.cyber.gouv.fr/fr/article/nous-contacter-1mvyy9f/",
        },
        {
          texte: "🙌 Consulter la FAQ",
          href: "https://aide.monespacenis2.cyber.gouv.fr/",
        },
      ])}
    ></lab-anssi-centre-aide>
  );
};
