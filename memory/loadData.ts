import axios from "axios";
import { store } from "./store";
import { Ticker } from "../types/Ticker";

export const loadSECdata = async (): Promise<void> => {
	const resp = await axios.get(
		"https://www.sec.gov/files/company_tickers_exchange.json",
		{
			headers: {
				"User-Agent": "John Doe (test@example.com)",
			},
		}
	);

	const raw = resp.data;

	if (!raw.fields || !raw.data) throw new Error("Invalid SEC data format");

	const [CIK_IDX, NAME_IDX, TICKER_IDX, EXCHANGE_IDX] = [
		raw.fields.indexOf("cik"),
		raw.fields.indexOf("name"),
		raw.fields.indexOf("ticker"),
		raw.fields.indexOf("exchange"),
	];

	const tickers: Ticker[] = raw.data.map((row: any[]) => ({
		cik: row[CIK_IDX],
		name: row[NAME_IDX],
		ticker: row[TICKER_IDX],
		exchange: row[EXCHANGE_IDX],
	}));

	store.data = tickers;
	console.log(
		`✅ Loaded ${store.data.length} tickers to store from ${tickers.length} SEC data rows`
	);
};
