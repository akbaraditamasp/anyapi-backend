import { RxJsonSchema } from "rxdb";

type ExtractAllDB<T> = T extends RxJsonSchema<infer U> ? U : never;

export default ExtractAllDB;
