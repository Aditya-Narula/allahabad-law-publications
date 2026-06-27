import { bareActs } from "./books/bareActs";
import { commentaries } from "./books/commentaries";
import { criminalLaws } from "./books/criminalLaws";
import { civilLaws } from "./books/civilLaws";
import { labourLaws } from "./books/labourLaws";
import { judicialService } from "./books/judicialService";
import { llbTextbooks } from "./books/llbTextbooks";
import { aibe } from "./books/aibe";

export const books = {
  ...bareActs,
  ...commentaries,
  ...criminalLaws,
  ...civilLaws,
  ...labourLaws,
  ...judicialService,
  ...llbTextbooks,
  ...aibe,
};