export const dansIntervalle = (x: number, debut: number, fin: number) =>
  (x - debut) * (x - fin) <= 0;

export class Intervalle extends Array<number> {
  constructor(debut: number, fin: number) {
    super(
      ...Array.from(Array(Math.abs(fin - debut) + 1).keys()).map(
        (x) => x + Math.min(debut, fin)
      )
    );
  }

  contient(x: number) {
    return this.includes(x);
  }
}
