import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/props.ts";
import { SelectOptions } from "../../Services/Simulateur/simulateurFrontServices.ts";
import { TValeursSousSecteursActivites } from "../../Domaine/Simulateur/ValeursCles.ts";
import { libellesSousSecteursActivite } from "../../Domaine/References/LibellesSousSecteursActivite.ts";
import {
  contientSousSecteur,
  estUnSecteurAvecDesSousSecteurs,
  LibellesSousSecteurs,
  TValeursSecteursAvecSousSecteurs,
} from "../../Domaine/Simulateur/SousSecteurs.ts";
import { libellesSecteursActivite } from "../../Domaine/References/LibellesSecteursActivite.ts";
import { transformateurSousSecteurActivite } from "../../Services/Simulateur/Transformateurs.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";

const entreesLibellesSousSecteurs = Object.entries(
  libellesSousSecteursActivite,
) as [TValeursSousSecteursActivites, string][];

const reducteurCleValeurVersObjet = (
  libellesSousSecteurDuSecteur: LibellesSousSecteurs,
  [sousSecteur, libelle]: [TValeursSousSecteursActivites, string],
) => ({
  ...libellesSousSecteurDuSecteur,
  [sousSecteur]: libelle,
});

const fabriqueSecteurContientLeSousSecteur =
  (secteur: TValeursSecteursAvecSousSecteurs) =>
  ([sousSecteur]: [TValeursSousSecteursActivites, string]) =>
    estUnSecteurAvecDesSousSecteurs(secteur) &&
    contientSousSecteur(secteur, sousSecteur);
const reducteurSecteursVersOptions =
  (
    gereChangement: (event: React.ChangeEvent<HTMLInputElement>) => void,
    donneesFormulaire: DonneesFormulaireSimulateur,
  ) =>
  (
    secteursAvecOptionsSousSecteurs: [
      TValeursSecteursAvecSousSecteurs,
      SelectOptions,
    ][],
    secteur: TValeursSecteursAvecSousSecteurs,
  ): [TValeursSecteursAvecSousSecteurs, SelectOptions][] => {
    const sousSecteurActivite = transformateurSousSecteurActivite(
      entreesLibellesSousSecteurs
        .filter(fabriqueSecteurContientLeSousSecteur(secteur))
        .reduce(reducteurCleValeurVersObjet, {}),
      gereChangement,
      donneesFormulaire,
    );
    return [...secteursAvecOptionsSousSecteurs, [secteur, sousSecteurActivite]];
  };
const transformeSousSecteurEnOptions = (
  donneesFormulaire: SimulateurContenuEtapeProps["donneesFormulaire"],
  gereChangement: (event: React.ChangeEvent<HTMLInputElement>) => void,
): [TValeursSecteursAvecSousSecteurs, SelectOptions][] => {
  return (
    donneesFormulaire.secteurActivite as TValeursSecteursAvecSousSecteurs[]
  ).reduce(reducteurSecteursVersOptions(gereChangement, donneesFormulaire), []);
};

const SousSecteurCheckbox = ({
  secteur,
  optionsSousSecteur,
}: {
  secteur: TValeursSecteursAvecSousSecteurs;
  optionsSousSecteur: SelectOptions;
}) => {
  return (
    <Checkbox
      legend={libellesSecteursActivite[secteur]}
      options={optionsSousSecteur}
    />
  );
};

const EtapeSousSecteurActivite = ({
  propageActionSimulateur,
  donneesFormulaire,
}: SimulateurContenuEtapeProps) => {
  const gereChangement = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as TValeursSousSecteursActivites;
      propageActionSimulateur({
        type: "checkMulti",
        name: "sousSecteurActivite",
        newValue: newValue,
      });
    },
    [propageActionSimulateur],
  );

  const [optionsSousSecteurActivite, setOptionsSousSecteurActivite] = useState<
    [TValeursSecteursAvecSousSecteurs, SelectOptions][]
  >([]);

  const memoizedOptionsSousSecteurActivite = useMemo(() => {
    return transformeSousSecteurEnOptions(donneesFormulaire, gereChangement);
  }, [donneesFormulaire, gereChangement]);

  useEffect(() => {
    setOptionsSousSecteurActivite(memoizedOptionsSousSecteurActivite);
  }, [memoizedOptionsSousSecteurActivite]);

  return (
    <FormSimulateur>
      <legend className="fr-text--medium">
        Précisez les sous-secteurs concernés :
      </legend>
      <div className="fr-fieldset__element">
        {optionsSousSecteurActivite.map(
          ([secteur, optionsSousSecteur], index) => (
            <SousSecteurCheckbox
              secteur={secteur}
              optionsSousSecteur={optionsSousSecteur}
              key={`sousSecteurs-${secteur}-${index}`}
            />
          ),
        )}
      </div>
    </FormSimulateur>
  );
};

export default EtapeSousSecteurActivite;
