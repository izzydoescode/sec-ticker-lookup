import { Router, Request, Response } from "express";
import { store } from "../memory/store";

const router = Router();

router.get("/:tickerId", (req: Request, res: Response) => {
	try {
		const { tickerId } = req.params;
		if (!tickerId) return res.status(400).json({ error: "Ticker missing" });

		// record activity
		const count = store.activity.get(tickerId) ?? 0;
		store.activity.set(tickerId, count + 1);

		// look up ticker in store
		const company = store.data.find(
			(co) => co.ticker.toUpperCase() === tickerId.toUpperCase()
		);

		// if not found, return 404
		if (!company) {
			return res.status(404).json({ error: "Ticker not found!" });
		}

		const { cik, name, ticker, exchange } = company;
		return res.status(200).json({ cik, name, ticker, exchange });
	} catch (err) {
		console.error("GET /tickers/:tickerId failed", err);
		return res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
