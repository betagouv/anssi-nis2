export const bandeauMscPasEncoreVisible = () => {
  const estDansLeFutur = (dateString: string) =>
    new Date(dateString) > new Date();

  return (
    !import.meta.env.VITE_MSC_BANDEAU_PROMOTION_DATE_DEBUT ||
    estDansLeFutur(import.meta.env.VITE_MSC_BANDEAU_PROMOTION_DATE_DEBUT)
  );
};
