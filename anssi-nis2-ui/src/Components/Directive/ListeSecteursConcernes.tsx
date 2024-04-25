import { DefaultComponent } from "../../Services/Props";
import { ItemSecteurConcerne } from "./ItemSecteurConcerne.tsx";

import AdministrationsPubliques from "../../assets/secteurs-concernes/administrations-publiques.svg";
import EauxPotable from "../../assets/secteurs-concernes/eaux-potables.svg";
import EauxUsees from "../../assets/secteurs-concernes/eaux-usees.svg";
import Energies from "../../assets/secteurs-concernes/energies.svg";
import Espace from "../../assets/secteurs-concernes/espace.svg";
import Communication from "../../assets/secteurs-concernes/communication.svg";
import Financier from "../../assets/secteurs-concernes/financiers.svg";
import Numerique from "../../assets/secteurs-concernes/infrastructures.svg";
import Sante from "../../assets/secteurs-concernes/sante.svg";
import Bancaire from "../../assets/secteurs-concernes/bancaire.svg";
import Transports from "../../assets/secteurs-concernes/transport.svg";
import Chimique from "../../assets/secteurs-concernes/produits-chimiques.svg";
import FournisseursNumerique from "../../assets/secteurs-concernes/fournisseur-numerique.svg";
import Dechets from "../../assets/secteurs-concernes/dechets.svg";
import Manufacture from "../../assets/secteurs-concernes/manufacture.svg";
import Alimentaire from "../../assets/secteurs-concernes/alimentaires.svg";
import Recherche from "../../assets/secteurs-concernes/recherche.svg";
import Postaux from "../../assets/secteurs-concernes/postaux.svg";

export const ListeSecteursConcernes: DefaultComponent = () => {
  return (
    <div className="conteneur-secteurs-concernes">
      <div>
        <h4>Secteurs hautement critiques</h4>
        <ul className="liste-secteurs-concernes">
          <ItemSecteurConcerne
            image={AdministrationsPubliques}
            titre="Administrations publiques"
          />
          <ItemSecteurConcerne image={EauxPotable} titre="Eaux potable" />
          <ItemSecteurConcerne image={EauxUsees} titre="Eaux usées" />
          <ItemSecteurConcerne image={Energies} titre="Énergies" />
          <ItemSecteurConcerne image={Espace} titre="Espace" />
          <ItemSecteurConcerne
            image={Communication}
            titre="Gestion des services Technologies de l’Information et de la Communication (interentreprises)"
          />
          <ItemSecteurConcerne
            image={Financier}
            titre="Infrastructures des marchés financiers"
          />
          <ItemSecteurConcerne
            image={Numerique}
            titre="Infrastructures numériques"
          />
          <ItemSecteurConcerne image={Sante} titre="Santé" />
          <ItemSecteurConcerne image={Bancaire} titre="Secteur bancaire" />
          <ItemSecteurConcerne image={Transports} titre="Transports" />
        </ul>
      </div>
      <div>
        <h4>Autres secteurs critiques</h4>
        <ul className="liste-secteurs-concernes">
          <ItemSecteurConcerne
            image={Chimique}
            titre="Fabrication, production et distribution de produits chimiques"
          />
          <ItemSecteurConcerne
            image={FournisseursNumerique}
            titre="Fournisseurs numériques"
          />
          <ItemSecteurConcerne image={Dechets} titre="Gestion des déchets" />
          <ItemSecteurConcerne
            image={Manufacture}
            titre="Industrie manufacturière"
          />
          <ItemSecteurConcerne
            image={Alimentaire}
            titre="Production, transformation et distribution de denrées alimentaires"
          />
          <ItemSecteurConcerne image={Recherche} titre="Recherche" />
          <ItemSecteurConcerne
            image={Postaux}
            titre="Services postaux et d’expédition"
          />
        </ul>
      </div>
    </div>
  );
};
