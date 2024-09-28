import { Low } from "lowdb";

export default interface AllDB {
  host: string;
  db: () => Low<Record<string, any>>;
}
