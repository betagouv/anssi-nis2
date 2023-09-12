import {
  emptySimulateurFormData,
  SimulateurFormData,
} from "../../Services/simulateurFrontServices.ts";

export class ParametresDonneesFormulaire {
  constructor(
    public libelle: string,
    public donnees: SimulateurFormData,
  ) {}
}

export class ParametresDonneesSpecifiqueField<
  TypeValeurs,
> extends ParametresDonneesFormulaire {
  constructor(libelle: string, listeEtatsMembres: TypeValeurs[]) {
    super(
      libelle,
      ParametresDonneesSpecifiqueField.construitDonnees(listeEtatsMembres),
    );
  }

  protected static construitDonnees<TypeValeurs>(
    listeEtatsMembres: TypeValeurs[],
  ) {
    return this.construitDonneesPourField("etatMembre", listeEtatsMembres);
  }

  protected static construitDonneesPourField<TypeField, TypeValeurs>(
    fieldName: TypeField,
    listeEtatsMembres: TypeValeurs[],
  ): SimulateurFormData {
    return {
      ...emptySimulateurFormData,
      [fieldName as string]: listeEtatsMembres,
    };
  }
}

export class CollectionParametresDonnees<TypeDonnees> extends Array<
  ParametresDonneesSpecifiqueField<TypeDonnees>
> {
  getOptions = () => Object.keys(this);
  getDonnees = () => this.map(({ donnees }) => donnees);
  getLibelles = () => this.map(({ libelle }) => libelle);
}
