# 💰 Financial Advisor Agent

A personal financial advisor agent built on Base44, powered by **Google Gemini 2.5 Flash AI**. Ask any money question via the live chat, get real AI-powered advice, and track everything on the Finance Tracker dashboard — with live market data, real-time news, and auto-refresh every 60 seconds.

---

## 🚀 How to Use

### Option 1 — Live Dashboard *(No setup needed)*

Open the Finance Tracker directly in your browser:

👉 [Finance Tracker Dashboard](https://base44.app/api/apps/6a279a127eaa6c84a96e3e3d/files/mp/public/6a279a127eaa6c84a96e3e3d/82c58bcec_finance-tracker.html)

- Live market ticker: S&P 500, Dow, NASDAQ, Bitcoin, Gold
- Real-time financial news feed
- AI-powered chat advisor (bottom-right corner 💬)
- Query history & category breakdown
- Auto-refreshes every 60 seconds

---

### Option 2 — Chat with the AI Agent

Ask financial questions directly:

👉 [Open Agent Chat](https://app.base44.com/superagent/6a279a127eaa6c84a96e3e3d)

Example questions:
- *"I make $75k, have $12k in student loans at 5%, and want to retire early — where do I start?"*
- *"Should I pay off debt or invest in a Roth IRA first?"*
- *"How do I build a 6-month emergency fund?"*
- *"What's the best way to invest $500/month?"*

Every answer is auto-logged and appears on the dashboard in real time.

---

### Option 3 — Local Setup

#### Prerequisites

| Tool   | Version | Install Link                      |
|--------|---------|-----------------------------------|
| Python | 3.7+    | https://www.python.org/downloads/ |
| Git    | Latest  | https://git-scm.com/downloads     |

#### Setup Steps

```bash
# 1. Clone the repo
git clone https://github.com/CHANDRAMOULI08/financial-advisor-agent.git
cd financial-advisor-agent

# 2. Run the financial advisor skill locally
python3 .agents/skills/financial_advisor.py general
python3 .agents/skills/financial_advisor.py investing
python3 .agents/skills/financial_advisor.py budgeting
python3 .agents/skills/financial_advisor.py savings
python3 .agents/skills/financial_advisor.py debt
python3 .agents/skills/financial_advisor.py taxes
python3 .agents/skills/financial_advisor.py insurance

# 3. Open the dashboard locally
open finance-tracker.html        # macOS
start finance-tracker.html       # Windows
xdg-open finance-tracker.html   # Linux
```

#### Available Topics

| Argument    | Description                     |
|-------------|---------------------------------|
| `general`   | Top money tips & mindset        |
| `budgeting` | 50/30/20 rule, expense tracking |
| `savings`   | Emergency funds, HYSAs          |
| `investing` | Index funds, 401(k), IRA        |
| `debt`      | Avalanche vs snowball method    |
| `insurance` | Coverage tips                   |
| `taxes`     | Tax-advantaged accounts         |

#### Example Output

```bash
$ python3 .agents/skills/financial_advisor.py investing

📈 Investing Tips

  1. Start early — even $50/month compounded over 30 years is powerful.
  2. Max out your 401(k) match first — it's free money.
  3. Diversify: don't put all eggs in one basket.
  4. Low-cost index funds (like S&P 500 ETFs) beat most active funds long term.
  5. Don't try to time the market — time IN the market beats timing.
```

---

## 🤖 Gemini AI Setup (for self-hosting)

The chat advisor is powered by **Google Gemini 2.5 Flash** — free via Google AI Studio.

### Get your free API key

1. Go to 👉 [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API key"**
4. Copy the key (starts with `AIza...`)

### Configure the environment

Create a `.env` file in the project root:

```bash
GEMINI_API_KEY=AIzaYourKeyHere
```

> ⚠️ Never commit your `.env` file. It's already in `.gitignore`.

### How the AI works

The `functions/askAdvisor.ts` backend function:
1. Receives the user's question + conversation history from the dashboard
2. Sends it to Gemini 2.5 Flash with a financial advisor system prompt
3. Returns the AI response with a detected category (Investing, Debt, Savings, etc.)
4. Auto-saves every Q&A to the `FinancialQuery` database entity
5. Falls back through model versions if a newer one isn't available yet

---

## 📁 Project Structure

```
financial-advisor-agent/
├── finance-tracker.html              # Frontend dashboard (live market + AI chat)
├── functions/
│   ├── askAdvisor.ts                 # Gemini AI chat backend (Deno / Base44)
│   └── getFinancialData.ts           # Live market data + news feed backend
├── .agents/
│   ├── skills/
│   │   └── financial_advisor.py      # Core advice engine (Python CLI)
│   └── rules/
│       └── financial_advisor_rules.md # Agent behavior rules
├── entities/
│   └── FinancialQuery.json           # Database schema for query tracking
└── README.md
```

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Vanilla HTML / CSS / JS             |
| Backend    | Deno (Base44 serverless functions)  |
| AI Model   | Google Gemini 2.5 Flash (free tier) |
| Database   | Base44 entity store                 |
| Agent      | Base44 Superagent platform          |
| Market Data| Yahoo Finance (RSS + API)           |

---

## 💡 Features

- 🤖 **Real AI chat** — Google Gemini 2.5 Flash answers any financial question
- 💬 **Conversation memory** — follow-up questions work naturally within a session
- 📈 **Live market ticker** — S&P 500, Dow Jones, NASDAQ, Bitcoin, Gold
- 📰 **Real-time news feed** — latest financial headlines, auto-refreshed
- 🔄 **Auto-refresh** — dashboard updates every 60 seconds
- 📊 **Query history** — every Q&A logged with category badge
- 🗂 **7 categories** — Investing, Debt, Budgeting, Savings, Taxes, Insurance, General
- 💰 **Priority stack** — 7-step wealth building order always visible

---

## 🏦 Financial Priority Stack

This is the order you should tackle your finances:

1. 🟢 Build a $1,000 starter emergency fund
2. 🟢 Get full employer 401(k) match (free money!)
3. 🟡 Pay off high-interest debt (> 7% APR)
4. 🟡 Build 3–6 month full emergency fund
5. 🔵 Max out Roth IRA ($7,000/year)
6. 🔵 Max out 401(k) ($23,000/year)
7. 🟣 Invest in taxable brokerage / real estate

---

## ⚠️ Disclaimer

This project provides general financial education — not personalized legal, tax, or investment advice for your specific situation. Always consult a licensed financial advisor for major decisions.
