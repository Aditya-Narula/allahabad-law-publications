import { AUTHORS } from "./authors";
import { BINDINGS } from "./bindings";
import { CATEGORIES } from "./categories";
import { DEFAULTS } from "./defaults";
import { LANGUAGES } from "./languages";
import { PUBLISHERS } from "./publishers";

export const BOOK_TEMPLATE = {

  code: "",

  englishTitle: "",
  hindiTitle: "",

  author: AUTHORS.RK_NARULA,

  publisher: PUBLISHERS.ALP,

  edition: DEFAULTS.EDITION,

  publicationYear: DEFAULTS.PUBLICATION_YEAR,

  category: "",

  subject: "",

  language: LANGUAGES.DIGLOT,

  binding: BINDINGS.PAPERBACK,

  pages: DEFAULTS.PAGES,

  isbn: "",

  mrp: 0,

  salePrice: 0,

  stock: DEFAULTS.STOCK,

  featured: DEFAULTS.FEATURED,

  newArrival: DEFAULTS.NEW_ARRIVAL,

  letter: "",

  cover: DEFAULTS.COVER,

  description: "",

  keywords: "",

};

export const BARE_ACT_TEMPLATE = {
  ...BOOK_TEMPLATE,
  category: CATEGORIES.BARE_ACTS,
};

export const COMMENTARY_TEMPLATE = {
  ...BOOK_TEMPLATE,
  category: CATEGORIES.COMMENTARIES,
};

export const CRIMINAL_LAW_TEMPLATE = {
  ...BOOK_TEMPLATE,
  category: CATEGORIES.CRIMINAL_LAWS,
};

export const CIVIL_LAW_TEMPLATE = {
  ...BOOK_TEMPLATE,
  category: CATEGORIES.CIVIL_LAWS,
};

export const LABOUR_LAW_TEMPLATE = {
  ...BOOK_TEMPLATE,
  category: CATEGORIES.LABOUR_LAWS,
};

export const JUDICIAL_SERVICE_TEMPLATE = {
  ...BOOK_TEMPLATE,
  category: CATEGORIES.JUDICIAL_SERVICE,
};

export const LLB_TEMPLATE = {
  ...BOOK_TEMPLATE,
  category: CATEGORIES.LLB,
};

export const AIBE_TEMPLATE = {
  ...BOOK_TEMPLATE,
  category: CATEGORIES.AIBE,
};