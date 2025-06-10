import express, { Request, Response } from "express";
import tickersRouter from "./routes/tickers";
import activityRouter from "./routes/activity";
import { loadSECdata } from "./memory/loadData";

const app = express();
app.use(express.json());
app.use("/tickers", tickersRouter);
app.use("/activity", activityRouter);
(async () => {
	try {
		await loadSECdata();
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (e) {
		console.error("Failed to load SEC data: ", e);
	}
})();

app.post("/", (req: Request, res: Response) => {
	return res.send("OK");
});
