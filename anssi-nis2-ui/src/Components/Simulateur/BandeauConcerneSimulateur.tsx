import { DefaultComponent } from "../../Services/Props";
import { BandeauBleuMarianne } from "../General/BandeauBleuMarianne.tsx";

export const BandeauConcerneSimulateur: DefaultComponent = () => (
  <>
    <BandeauBleuMarianne>
      <h2 className="fr-mb-1w">Suis-je concerné ?</h2>
      <p className="fr-mb-0">
        Découvrez si la directive NIS&nbsp;2 s’appliquera à votre entité
      </p>
    </BandeauBleuMarianne>
  </>
);
