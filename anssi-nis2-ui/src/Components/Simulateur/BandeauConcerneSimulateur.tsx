import { DefaultComponent } from "../../Services/Props";
import { BandeauBleuMarianne } from "../General/BandeauBleuMarianne.tsx";

export const BandeauConcerneSimulateur: DefaultComponent = () => (
  <>
    <BandeauBleuMarianne>
      <h2 className="fr-mb-1w">Mon organisation est-elle concernée ?</h2>
      <p className="fr-mb-0">
        Réalisez un test pour déterminer si votre organisation est assujettie à
        la directive NIS&nbsp;2
      </p>
    </BandeauBleuMarianne>
  </>
);
