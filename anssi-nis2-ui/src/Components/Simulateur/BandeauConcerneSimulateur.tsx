import { DefaultComponent } from "../../Services/Props.ts";
import { BandeauBleuMarianne } from "../BandeauBleuMarianne.tsx";

export const BandeauConcerneSimulateur: DefaultComponent = () => (
  <>
    <BandeauBleuMarianne>
      <h2 className="fr-mb-1w">Suis-je concerné·e ?</h2>
      <p className="fr-mb-0">
        Découvrez si la directive NIS&nbsp;2 s’appliquera à votre entité
      </p>
    </BandeauBleuMarianne>
  </>
);
