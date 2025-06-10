# 🌐 SEC Ticker Lookup API + Activity Tracker

A fully-typed Node.js + TypeScript API that lets users:

- 🔍 Look up real-time company info by stock ticker (powered by SEC EDGAR)
- 📈 Track and display lookup activity per ticker

Inspired by a real interview challenge from Haven, this app is production-ready, test-covered, and deployable.

---

## ⚙️ Features

- 🧠 In-memory view tracking with auto-increment
- ⚡ Real-time data from the [SEC EDGAR Tickers API](https://www.sec.gov/files/company_tickers_exchange.json)
- 📦 Typed with TypeScript and tested with Jest + Supertest
- ✅ Express RESTful endpoints
- 🧪 Unit + integration tests included

---

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io) + [Supertest](https://github.com/ladjs/supertest)

---

## 🔧 API Endpoints

| Method | Endpoint           | Description                                 |
| ------ | ------------------ | ------------------------------------------- |
| GET    | `/tickers/:ticker` | Returns company info by ticker (e.g. AAPL)  |
| GET    | `/activity`        | Shows how many times each ticker was viewed |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Run tests
npm test
```

---

## 📦 Example

```bash
curl http://localhost:3000/tickers/AAPL | jq .
```

Returns:

```json
{
	"ticker": "AAPL",
	"name": "Apple Inc.",
	"cik": "0000320193",
	"exchange": "NASDAQ"
}
```

```bash
curl http://localhost:3000/activity | jq .
```

Returns:

```json
{
	"AAPL": 3
}
```

## ✨ Next: Add a UI (Coming Soon!)

To make the project more accessible to non-developers and recruiters, I’ll be adding a minimal React UI that:

- Lets users search for tickers
- Shows company info in real time
- Displays a leaderboard of the most viewed companies

## Author

Made with ❤️ by [Israel D. Matos](https://github.com/izzydoesit) | Connect with me on [LinkedIn](https://www.linkedin.com/in/izzy-matos/)
