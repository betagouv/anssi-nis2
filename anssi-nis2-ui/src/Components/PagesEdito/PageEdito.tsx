import { BandeauBleuMarianne } from "../General/BandeauBleuMarianne.tsx";
import MiseEnPage from "../MiseEnPage.tsx";
import {
  DefaultComponentExtensible,
  PageEditoProps,
} from "../../Services/Props";

const PageEdito: DefaultComponentExtensible<PageEditoProps> = ({
  titre,
  children,
}: PageEditoProps) => (
  <MiseEnPage page={titre}>
    <BandeauBleuMarianne>
      <h2>{titre}</h2>
    </BandeauBleuMarianne>
    <div className="fr-py-5w">
      <div className="fr-container">
        <div className="fr-grid-row  fr-my-0 fr-mx-auto fr-px-13w">
          <div className="fr-col texte-edito">{children}</div>
        </div>
      </div>
    </div>
  </MiseEnPage>
);

export default PageEdito;
