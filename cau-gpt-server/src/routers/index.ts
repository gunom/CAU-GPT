import { Router } from "express";

const router: Router = Router();

router.use("/langchain", require("./langchain"));

module.exports = router;