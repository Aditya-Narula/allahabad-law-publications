import { bareActs } from "./books/bareActs";
import { commentaries } from "./books/commentaries";
import { criminalLaws } from "./books/criminalLaws";
import { civilLaws } from "./books/civilLaws";
import { labourLaws } from "./books/labourLaws";
import { judicialService } from "./books/judicialService";
import { llbTextbooks } from "./books/llbTextbooks";
import { aibe } from "./books/aibe";

export const DEFAULT_DISCOUNT_PERCENT = 40;

const rawBooks = {
  ...bareActs,
  ...commentaries,
  ...criminalLaws,
  ...civilLaws,
  ...labourLaws,
  ...judicialService,
  ...llbTextbooks,
  ...aibe,
};

export const books = Object.fromEntries(
  Object.entries(rawBooks).map(([slug, book]) => {
    const mrp = Number(book.mrp) || 0;

    const discountPercent =
      book.discountPercent !== undefined
        ? Number(book.discountPercent)
        : DEFAULT_DISCOUNT_PERCENT;

    const validDiscountPercent = Math.min(
      100,
      Math.max(0, discountPercent)
    );

    const salePrice =
      mrp > 0
        ? Math.round(
            mrp * (1 - validDiscountPercent / 100)
          )
        : 0;

    return [
      slug,
      {
        ...book,
        discountPercent: validDiscountPercent,
        salePrice,
      },
    ];
  })
);