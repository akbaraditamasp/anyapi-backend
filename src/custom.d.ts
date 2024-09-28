import { Low } from "lowdb";
import { Domain } from "./models/domain.ts";

declare global {
  namespace Express {
    interface Request {
      db?: Low<Record<string, any>>;
      dataType?: "single" | "collection";
      domain?: Domain;
    }
  }
}
