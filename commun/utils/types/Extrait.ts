export type ExtraitAutre<T> = T extends `autre${string}` ? T : never;
