import { BandeauBleuMarianne } from "../General/BandeauBleuMarianne.tsx";
import MiseEnPage from "../MiseEnPage.tsx";
import {
  DefaultComponentExtensible,
  PageEditoProps,
} from "../../Services/Props";
import { BandeauInformationRS } from "../Accueil";

const PageEdito: DefaultComponentExtensible<PageEditoProps> = ({
  titre,
  children,
}: PageEditoProps) => (
  <MiseEnPage page={titre}>
    <BandeauBleuMarianne>
      <h2>{titre}</h2>
    </BandeauBleuMarianne>
    <div className="fr-py-7w">
      <div className="fr-container">
        <div className="fr-grid-row  fr-my-0 fr-mx-auto">
          <div className="fr-col-offset-2 fr-col-8 texte-edito">{children}</div>
        </div>
      </div>
    </div>
    <BandeauInformationRS />
  </MiseEnPage>
);

export default PageEdito;
