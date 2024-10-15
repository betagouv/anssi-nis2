export class ErreurLectureDeRegle extends Error {
  constructor(valeurErreur: string, typeDeSpecification: string) {
    super(
      `La valeur ${valeurErreur} est invalide pour la règle ${typeDeSpecification}`,
    );
  }
}
