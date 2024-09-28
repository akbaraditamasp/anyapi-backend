import "reflect-metadata";
import Module from "../types/Module.js";
import { DataSource, DataSourceOptions } from "typeorm";
import { Domain } from "../models/domain.js";

export const config = {
  type: "postgres",
  url: process.env.DB_CONNECTION_STRING,
  entities: [Domain],
  synchronize: process.env.NODE_ENV !== "production",
  logging: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
} as DataSourceOptions;

const orm = () => {
  const mod: Module<DataSource> = new DataSource(config);

  mod.boot = async () => {
    await mod.initialize();
  };

  return mod;
};

export default orm();
