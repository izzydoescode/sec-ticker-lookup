import express from "express";
import request from "supertest";
import { store } from "../memory/store";
import tickersRouter from "../routes/tickers";
import activityRouter from "../routes/activity";

const app = express();
app.use(express.json());
app.use("/tickers", tickersRouter);
app.use("/activity", activityRouter);

const testCompany = { cik: 1, name: "Apple", ticker: "AAPL", exchange: "NYSE" };

beforeEach(() => {
	store.activity.clear();
	store.data = [testCompany];
});

describe("Ticker API", () => {
	it("returns 200 and increments activity", async () => {
		const res = await request(app).get(`/tickers/${testCompany.ticker}`);
		expect(res.status).toBe(200);
		expect(res.body).toEqual(testCompany);

		const activity = await request(app).get("/activity");
		expect(activity.body.AAPL).toBe(1);
	});

	it("returns a 404 if ticker is not found", async () => {
		const res = await request(app).get("/tickers/XXXX");
		expect(res.status).toBe(404);
	});

	it("returns an empty activity map initially", async () => {
		const res = await request(app).get("/activity");

		expect(res.status).toBe(200);
		expect(res.body).toEqual({});
	});

	it("increments activity count on repeated calls", async () => {
		await request(app).get(`/tickers/${testCompany.ticker}`);
		await request(app).get(`/tickers/${testCompany.ticker}`);
		await request(app).get(`/tickers/${testCompany.ticker}`);

		const res = await request(app).get("/activity");
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ AAPL: 3 });
	});

	it("handles lowercase ticker", async () => {
		const res = await request(app).get(
			`/tickers/${testCompany.ticker.toLowerCase()}`
		);
		expect(res.status).toBe(200);
		expect(res.body).toEqual(testCompany);
	});

	it("handles malformed or numeric ticker gracefully", async () => {
		const res = await request(app).get("/tickers/123456");
		expect(res.status).toBe(404);
	});

	it("returns valid fields for known ticker", async () => {
		const res = await request(app).get(`/tickers/${testCompany.ticker}`);
		expect(res.status).toBe(200);
		expect(res.body).toEqual(
			expect.objectContaining({
				cik: expect.any(Number),
				name: expect.any(String),
				ticker: testCompany.ticker,
				exchange: expect.any(String),
			})
		);
	});
});
