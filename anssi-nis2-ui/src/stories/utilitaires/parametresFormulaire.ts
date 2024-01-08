import { donneesFormulaireSimulateurVide } from "../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.constantes.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.ts";

export class ParametresDonneesFormulaire {
  constructor(
    public libelle: string,
    public donnees: IDonneesBrutesFormulaireSimulateur,
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
  ): IDonneesBrutesFormulaireSimulateur;

  protected construitDonneesPourField<TypeField extends string, TypeValeurs>(
    fieldName: TypeField,
    listeValeurs: TypeValeurs[],
  ): IDonneesBrutesFormulaireSimulateur {
    return {
      [fieldName as TypeField]: listeValeurs,
    } as unknown as IDonneesBrutesFormulaireSimulateur;
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
