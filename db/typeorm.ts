import "dotenv/config";
import { config } from "../src/modules/orm.js";
import { DataSource, DataSourceOptions } from "typeorm";

export default new DataSource({
  ...config,
  migrations: ["db/migrations/**/*.ts"],
  cli: {
    migrationsDir: "db/migrations",
  },
} as unknown as DataSourceOptions);
