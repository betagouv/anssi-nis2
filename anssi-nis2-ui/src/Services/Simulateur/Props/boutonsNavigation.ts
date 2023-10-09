export class BoutonsNavigation {
  constructor(
    public readonly precedent: React.MouseEventHandler,
    public readonly suivant: React.MouseEventHandler,
  ) {}
}