import { Link } from "react-router-dom";
import { DefaultComponent } from "../../Services/Props";
import BlocPrincipal from "../BlocPrincipal.tsx";

const BandeauConcerne: DefaultComponent = () => {
  return (
    <BlocPrincipal id="concernes" className="aucune-marge-basse">
      <div className="carte-concernes">
        <h2 className="texte-primaire">Mon entité est-elle concernée ?</h2>
        <p>
          Réalisez un test pour déterminer si votre entité est régulée par la
          directive NIS&nbsp;2 et à quelle catégorie elle appartient.
        </p>
        <Link to={"/simulateur"} className="fr-nis2-bouton-principal">
          Débuter le test
        </Link>
      </div>
    </BlocPrincipal>
  );
};

export default BandeauConcerne;
