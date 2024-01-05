export const toujoursVrai = () => true;
export const toujoursFaux = () => false;
export const toujourNegatif = () => -1;

export const estTableauNonVide = <T>(tableau: T[]): tableau is T[] =>
  tableau.length > 0;
