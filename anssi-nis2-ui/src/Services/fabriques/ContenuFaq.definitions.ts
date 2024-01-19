export type ContenuFaq = {
  titre: string;
  contenu: string;
  chapitres: {
    ancre: string;
    titreCourt: string;
  }[];
};
