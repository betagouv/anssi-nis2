export type CanvasFindByRole = {
  findByRole: (
    role: string,
    options: {
      name: string;
    },
  ) => Promise<HTMLElement>;
};
