import { DefaultComponent } from "../../Services/Props";
import BlocPrincipal from "../BlocPrincipal.tsx";
import CarteSePreparer from "./CarteSePreparer.tsx";

import Directive from "../../assets/home-directive.svg";
import Assujeti from "../../assets/home-assujeti.svg";
import Declarer from "../../assets/home-declarer.svg";
import { Link } from "react-router-dom";

const BandeauSePreparer: DefaultComponent = () => {
  return (
    <BlocPrincipal id="preparation" className="fond-blanc">
      <h2 className="texte-primaire">
        Comment se préparer avec MonEspaceNIS2 ?
      </h2>
      <div className="conteneur-cartes-se-preparer">
        <CarteSePreparer
          image={Directive}
          numero={1}
          titre="Découvrir la directive NIS&nbsp;2 et rester informé"
          contenu="Retrouvez les informations concernant la directive NIS 2 et restez informés concernant les évolutions de la transposition de la directive et les nouveautés relatives aux services proposés par l’ANSSI."
        />
        <CarteSePreparer
          image={Assujeti}
          numero={2}
          titre="Savoir si votre entité est assujettie"
          contenu="Réalisez un test en ligne pour déterminer si votre entité est assujettie à la directive NIS&nbsp;2 et à quelle catégorie elle appartient."
        />
        <CarteSePreparer
          image={Declarer}
          prochainement={true}
          numero={3}
          titre="Se déclarer auprès de l’ANSSI"
          contenu="Un service d’enregistrement en ligne permettra de communiquer simplement les informations demandées par la directive NIS&nbsp;2."
        />
        <Link to={"/simulateur"} className="fr-nis2-bouton-principal">
          Débuter le test
        </Link>
      </div>
    </BlocPrincipal>
  );
};

export default BandeauSePreparer;
