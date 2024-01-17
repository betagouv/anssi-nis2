type ContenuFAQ = {
  titre: string;
  contenu: string;
  chapitres: {
    ancre: string;
    titreCourt: string;
  }[];
};

export const fabriqueContenuFAQ = (contenuBrut: string): ContenuFAQ => ({
  titre: "FAQ NIS 2",
  contenu: contenuBrut,
  chapitres: [],
});

export const contenuFaqParDefaut: ContenuFAQ = {
  titre: "",
  contenu: "",
  chapitres: [],
};
