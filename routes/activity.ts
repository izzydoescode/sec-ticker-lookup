import { Router, Request, Response } from "express";
import { store } from "../memory/store";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	const result = Object.fromEntries(store.activity);
	return res.status(200).json(result);
});

export default router;
