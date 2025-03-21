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
        Il est préférable d’associer des compétences juridiques à la démarche d’auto-évaluation du statut de l’entité afin de déterminer si celle-ci entre dans le périmètre des entités régulées par la directive NIS 2. 
        En tout état de cause, recourir au simulateur, dont le résultat est dépendant de l’exactitude des données fournies en entrée, ne dispense pas d’une analyse au vu des textes en vigueur et des circonstances propres à chaque entité. 
        Les résultats du test sont strictement indicatifs, dans l'attente de l'adoption définitive des textes législatifs et réglementaires de transposition de la directive NIS 2.
        Cet outil est un simulateur qui permet d'obtenir une estimation du statut d'une entité, conformément aux textes actuellement en vigueur. 
        Ce service ne permet pas de s'acquitter de la future obligation d'enregistrement qui incomberont aux entités concernées par la directive NIS 2 en France.
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
