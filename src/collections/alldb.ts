import { RxJsonSchema } from "rxdb";
import AllDB from "../types/AllDB.js";

const alldb: RxJsonSchema<AllDB> = {
  version: 0,
  primaryKey: "host",
  type: "object",
  properties: {
    host: {
      type: "string",
      maxLength: 100,
    },
    db: {},
  },
  required: ["host", "db"],
};

export default alldb;
