import { Button } from "@codegouvfr/react-dsfr/Button";
import ImageLocalisation from "../../../assets/localisation-france.svg";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { TitresEtapes } from "../TitresEtapes.ts";

export const EtapePrealable = ({ onValider }: { onValider: () => void }) => (
  <BlocPrincipal className="fond-gris" id="prealable">
    <h2>{TitresEtapes["prealable"]}</h2>
    <div className="conteneur-description">
      <div className="conteneur-paragraphes">
        <p>
          Ce test permet de cerner si votre entité sera concernée par la
          directive NIS 2, et ce dès 2024. Nous le tiendrons à jour au fil des
          précisions apportées par la transposition en droit français.
        </p>
        <p>
          <b>
            Si votre entité appartient à un groupe d’entreprises aux activités
            variées, ce test peut être réalisé pour chaque entreprise filiale,
            ou pour le groupe si celui-ci mène une activité économique.
          </b>
        </p>
      </div>
      <div className="conteneur-image">
        <img
          src={ImageLocalisation}
          alt="Illustration localisations en France"
        />
      </div>
    </div>
    <div className="conteneur-information">
      <p>
        Les résultats du test sont strictement indicatifs, dans l&apos;attente
        de l&apos;adoption définitive des textes législatifs et réglementaires
        de transposition de la directive NIS 2.
      </p>
    </div>
    <div className="conteneur-actions">
      <a href="/" className="fr-nis2-bouton-tertiaire">
        Revenir à l&apos;accueil
      </a>
      <Button onClick={() => onValider()} className="fr-nis2-bouton-secondaire">
        Débuter le test
      </Button>
    </div>
  </BlocPrincipal>
);
