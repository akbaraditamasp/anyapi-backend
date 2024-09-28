import { RxCollection, RxDatabase, createRxDatabase } from "rxdb";
import collections from "../collections/index.js";
import ExtractAllDB from "../types/ExtractCollection.js";
import Module from "../types/Module.js";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";

function rxdb() {
  let db: RxDatabase<{
    [key in keyof typeof collections]: RxCollection<
      ExtractAllDB<(typeof collections)[key]["schema"]>
    >;
  }>;
  let mod: Module<() => typeof db>;

  mod = () => db;
  mod.boot = async () => {
    if (db) return;
    db = await createRxDatabase({
      name: "db",
      storage: getRxStorageMemory(),
    });

    await db.addCollections(collections);
  };

  return mod;
}

export default rxdb();
