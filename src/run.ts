import "dotenv/config";
import app from "./modules/app.js";
import logger from "./modules/logger.js";
import rxdb from "./modules/rxdb.js";
import error from "./http/middlewares/error.js";
import notFound from "./http/middlewares/not-found.js";
import orm from "./modules/orm.js";
import validation from "./http/middlewares/validation.js";

(async () => {
  const port = process.env.PORT || 5270;
  await orm.boot!();
  await rxdb.boot!();
  await app.boot!();

  await import("./start/route.js");

  app.use(validation);
  app.use(notFound);
  app.use(error);
  app.listen(port, () => {
    logger.info("Server running on port " + port);
  });
})();
