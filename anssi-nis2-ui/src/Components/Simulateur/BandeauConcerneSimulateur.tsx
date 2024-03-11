import { libellesAccueil } from "../../References/LibellesAccueil.ts";
import { DefaultComponent } from "../../Services/Props";
import { BandeauBleuMarianne } from "../General/BandeauBleuMarianne.tsx";

export const BandeauConcerneSimulateur: DefaultComponent = () => (
  <>
    <BandeauBleuMarianne>
      <h2 className="fr-mb-1w">{libellesAccueil.concerne.titre}</h2>
      <p className="fr-mb-0">{libellesAccueil.concerne.resume}</p>
    </BandeauBleuMarianne>
  </>
);
