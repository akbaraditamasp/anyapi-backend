import { Router } from "express";
import app from "../../modules/app.js";
const router = Router();
router.get("/", (_req, res) => {
    res.send("Hello world!");
});
app.use("/", router);
