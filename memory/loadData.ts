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

	const tickers: Ticker[] = Object.values(raw).map((e: any) => ({
		cik: e.cik,
		name: e.title,
		ticker: e.ticker,
		exchange: e.exchange,
	}));

	store.data = tickers;
};
