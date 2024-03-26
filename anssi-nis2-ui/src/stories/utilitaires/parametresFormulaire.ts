import { donneesFormulaireSimulateurVide } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes.ts";
import { DonneesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";

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

  protected construitDonneesPourField<
    TypeField extends keyof DonneesFormulaireSimulateur,
    TypeValeurs,
  >(
    fieldName: TypeField,
    listeValeurs: TypeValeurs[],
  ): DonneesFormulaireSimulateur {
    return {
      [fieldName as keyof DonneesFormulaireSimulateur]:
        listeValeurs as DonneesFormulaireSimulateur[TypeField][],
    } as unknown as DonneesFormulaireSimulateur;
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
