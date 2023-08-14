import { Router } from "express";
import config from "../config";
import langchain from "../api/langchain";

const router: Router = Router();

router.post('/', async (req, res) => {
    const { question } = req.body;
    const docs = await langchain.question(question);
    console.log(docs);
    return res.send(docs);
}
);

module.exports = router;