import {
  donneesFormulaireSimulateurVide,
  DonneesFormulaireSimulateur,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";

export class ParametresDonneesFormulaire {
  constructor(
    public libelle: string,
    public donnees: DonneesFormulaireSimulateur,
  ) {}
}

export abstract class ParametresDonneesSpecifiqueField<
  TypeValeurs,
> extends ParametresDonneesFormulaire {
  constructor(libelle: string, listeValeurs: TypeValeurs[]) {
    super(libelle, donneesFormulaireSimulateurVide);
    this.donnees = this.construitDonnees(listeValeurs);
  }

  protected abstract construitDonnees<TypeValeurs>(
    valeurs: TypeValeurs[],
  ): DonneesFormulaireSimulateur;

  protected construitDonneesPourField<TypeField, TypeValeurs>(
    fieldName: TypeField,
    listeValeurs: TypeValeurs[],
  ): DonneesFormulaireSimulateur {
    return {
      ...donneesFormulaireSimulateurVide,
      [fieldName as string]: listeValeurs,
    };
  }
}

export class CollectionParametresDonnees<TypeDonnees> extends Array<
  ParametresDonneesSpecifiqueField<TypeDonnees>
> {
  public getOptions() {
    return Object.keys(this);
  }

  public getDonnees() {
    return this.map(({ donnees }) => donnees);
  }

  public getLibelles() {
    return this.map(({ libelle }) => libelle);
  }

  public getFormData() {
    return {
      options: this.getOptions(),
      mapping: this.getDonnees(),
      control: {
        type: "select",
        labels: this.getLibelles(),
      },
    };
  }
}
