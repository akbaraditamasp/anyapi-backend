import vine from "@vinejs/vine";
import { Router } from "express";
import { Domain } from "../../models/domain.js";
import { createId } from "@paralleldrive/cuid2";

const domain = Router();

domain.post("/", async (req, res) => {
  const { name } = await vine.validate({
    schema: vine.object({
      name: vine.string().regex(/^(?!-)[a-z0-9-]{6,63}(?<!-)$/),
    }),
    data: req.body || {},
  });

  let domain = await Domain.findOneBy({ name });
  if (domain) return res.sendStatus(422);

  domain = new Domain();
  domain.name = `${name}.${process.env.MAIN_DOMAIN}`;
  domain.secret = createId();

  await domain.save();

  return res.json(domain.serialize());
});

export default domain;
