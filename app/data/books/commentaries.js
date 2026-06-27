import {
  BINDINGS,
  COMMENTARY_TEMPLATE,
  LANGUAGES,
  SUBJECTS,
} from "../standards";

export const commentaries = {

  comparativeStudyNewCriminalLaws: {
    ...COMMENTARY_TEMPLATE,
    code: "CM001",
    englishTitle:
      "Comparative Study of the New Criminal Laws Subject-wise & Section-wise",
    hindiTitle:
      "नवीन दण्ड विधियों का तुलनात्मक अध्ययन विषय-वार तथा धारा-वार",
    edition: "2025 Edition",
    publicationYear: "2025",
    letter: "C",
    subject: SUBJECTS.CRIMINAL_LAW,
    mrp: 295,
    salePrice: 148,
    cover: "/covers/alp-placeholder.jpg",
    description:
      "Comparative study of the new criminal laws arranged subject-wise and section-wise.",
    keywords:
      "new criminal laws comparative study bns bnss bsa subject wise section wise",
  },

  newCriminalLawsManualLarge: {
    ...COMMENTARY_TEMPLATE,
    code: "CM002",
    englishTitle: "Narula & Rai — New Criminal Laws Manual",
    hindiTitle: "नरूला एवं राय — नवीन दण्ड विधि संग्रह",
    letter: "N",
    subject: SUBJECTS.CRIMINAL_LAW,
    binding: "Hardbound Large",
    mrp: 1650,
    salePrice: 825,
    cover: "/covers/alp-placeholder.jpg",
    description:
      "Diglot edition of Narula & Rai New Criminal Laws Manual (Hardbound Large Edition).",
    keywords:
      "narula rai new criminal laws manual bns bnss bsa hardbound large",
  },

  newCriminalLawsManualPocket: {
    ...COMMENTARY_TEMPLATE,
    code: "CM003",
    englishTitle: "Narula & Rai — New Criminal Laws Manual",
    hindiTitle: "नरूला एवं राय — नवीन दण्ड विधि संग्रह",
    letter: "N",
    subject: SUBJECTS.CRIMINAL_LAW,
    binding: "Hardbound Pocket",
    mrp: 995,
    salePrice: 498,
    cover: "/covers/alp-placeholder.jpg",
    description:
      "Diglot edition of Narula & Rai New Criminal Laws Manual (Hardbound Pocket Edition).",
    keywords:
      "narula rai new criminal laws manual bns bnss bsa hardbound pocket",
  },

  newCriminalLawsManualHindiLarge: {
    ...COMMENTARY_TEMPLATE,
    code: "CM004",
    englishTitle: "Narula & Rai — New Criminal Laws Manual",
    hindiTitle: "नरूला एवं राय — नवीन दण्ड विधि संग्रह",
    letter: "N",
    language: LANGUAGES.HINDI,
    subject: SUBJECTS.CRIMINAL_LAW,
    binding: "Paperback Large",
    mrp: 995,
    salePrice: 498,
    cover: "/covers/alp-placeholder.jpg",
    description:
      "Hindi edition of Narula & Rai New Criminal Laws Manual (Paperback Large Edition).",
    keywords:
      "narula rai new criminal laws manual hindi paperback large",
  },

  newCriminalLawsManualHindiPocket: {
    ...COMMENTARY_TEMPLATE,
    code: "CM005",
    englishTitle: "Narula & Rai — New Criminal Laws Manual",
    hindiTitle: "नरूला एवं राय — नवीन दण्ड विधि संग्रह",
    letter: "N",
    language: LANGUAGES.HINDI,
    subject: SUBJECTS.CRIMINAL_LAW,
    binding: "Paperback Pocket",
    mrp: 645,
    salePrice: 323,
    cover: "/covers/alp-placeholder.jpg",
    description:
      "Hindi edition of Narula & Rai New Criminal Laws Manual (Paperback Pocket Edition).",
    keywords:
      "narula rai new criminal laws manual hindi paperback pocket",
  },

};