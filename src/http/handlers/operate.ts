import { createId } from "@paralleldrive/cuid2";
import { Router } from "express";
import { resolve } from "path";

const operate = Router();

operate.delete("/:key/:id", async (req, res) => {
  if (
    req.dataType === "single" ||
    !req.db!.data[req.params.key] ||
    !req.db!.data[req.params.key].find(
      (el: { id: string }) => el.id === req.params.id
    )
  )
    return res.sendStatus(404);

  const index = req.db!.data[req.params.key].findIndex(
    (el: { id: string }) => el.id === req.params.id
  );
  const data = req.db!.data[req.params.key][index];
  req.db!.data[req.params.key].splice(index, 1);

  return res.json(data);
});

operate.get("/:key/:id", async (req, res) => {
  if (
    req.dataType === "single" ||
    !req.db!.data[req.params.key] ||
    !req.db!.data[req.params.key].find(
      (el: { id: string }) => el.id === req.params.id
    )
  )
    return res.sendStatus(404);

  return res.json(
    req.db!.data[req.params.key].find(
      (el: { id: string }) => el.id === req.params.id
    )
  );
});

operate.put("/:key/:id", async (req, res) => {
  if (
    req.dataType === "single" ||
    !req.db!.data[req.params.key] ||
    !req.db!.data[req.params.key].find(
      (el: { id: string }) => el.id === req.params.id
    )
  )
    return res.sendStatus(404);

  const index = req.db!.data[req.params.key].findIndex(
    (el: { id: string }) => el.id === req.params.id
  );

  const newData = {
    ...req.body,
    id: req.db!.data[req.params.key][index].id,
  };
  req.db!.data[req.params.key][index] = newData;

  await req.db!.write();

  return res.json(newData);
});

operate.post("/:key", async (req, res) => {
  const data = {
    ...req.body,
    id: req.dataType === "single" ? undefined : createId(),
  };

  if (req.dataType === "single") {
    req.db!.data[req.params.key] = data;
  } else if (req.db!.data[req.params.key]) {
    req.db!.data[req.params.key].push(data);
  } else {
    req.db!.data[req.params.key] = [data];
  }

  await req.db?.write();

  return res.json(data);
});

operate.get("/:key", async (req, res) => {
  return res.json(
    req.db?.data[req.params.key] || (req.dataType === "single" ? {} : [])
  );
});

operate.post("/", async (req, res) => {
  req.db!.data = req.body;
  await req.db?.write();

  return res.json(req.db?.data);
});

operate.get("/", (req, res) => {
  return res.json(req.db?.data);
});

export default operate;
