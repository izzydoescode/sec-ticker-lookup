import express, { Request, Response } from "express";
import tickersRouter from "./routes/tickers";
import activityRouter from "./routes/activity";
import { loadSECdata } from "./memory/loadData";

const app = express();
app.use(express.json());
app.use("/tickers", tickersRouter);
app.use("/activity", activityRouter);
(async () => {
	await loadSECdata();
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
})();

app.post("/", (req: Request, res: Response) => {
	return res.send("OK");
});
