# 💰 Financial Advisor Agent

A personal financial advisor agent built on Base44. Provides general money advice, tips, and tracks financial queries — with a live Finance Tracker dashboard.

---

## 🚀 How to Run This Project

### Option 1 — Use the Live Dashboard *(No setup needed)*

Just open the Finance Tracker page directly in your browser:

👉 [Finance Tracker Dashboard](https://base44.app/api/apps/6a279a127eaa6c84a96e3e3d/files/mp/public/6a279a127eaa6c84a96e3e3d/ba13f2fa5_finance-tracker.html)

It connects to the live backend automatically — no login, no install required.

---

### Option 2 — Local Setup & Run

#### Prerequisites

Make sure you have these installed before you begin:

| Tool       | Version  | Install Link                          |
|------------|----------|---------------------------------------|
| Python     | 3.7+     | https://www.python.org/downloads/     |
| Git        | Latest   | https://git-scm.com/downloads         |

#### Step-by-step Setup

```bash
# Step 1 — Clone the repository
git clone https://github.com/CHANDRAMOULI08/financial-advisor-agent.git

# Step 2 — Navigate into the project folder
cd financial-advisor-agent

# Step 3 — Verify Python is installed correctly
python3 --version
# Expected output: Python 3.x.x

# Step 4 — Run the financial advisor skill
# Replace <topic> with any topic from the table below
python3 skills/financial_advisor.py general
python3 skills/financial_advisor.py investing
python3 skills/financial_advisor.py budgeting
python3 skills/financial_advisor.py savings
python3 skills/financial_advisor.py debt
python3 skills/financial_advisor.py taxes
python3 skills/financial_advisor.py insurance

# Step 5 — Open the Finance Tracker dashboard locally
open finance-tracker.html        # macOS
start finance-tracker.html       # Windows
xdg-open finance-tracker.html   # Linux
```

#### Available Topic Arguments

| Argument     | Description                        |
|--------------|------------------------------------|
| `general`    | Top money tips & mindset           |
| `budgeting`  | 50/30/20 rule, expense tracking    |
| `savings`    | Emergency funds, HYSAs             |
| `investing`  | Index funds, 401(k), IRA           |
| `debt`       | Avalanche vs snowball method       |
| `insurance`  | Coverage tips                      |
| `taxes`      | Tax-advantaged accounts            |

#### Example Output

```bash
$ python3 skills/financial_advisor.py investing

📈 Investing Tips

  1. Start early — even $50/month compounded over 30 years is powerful.
  2. Max out your 401(k) match first — it's free money.
  3. Diversify: don't put all eggs in one basket.
  4. Low-cost index funds (like S&P 500 ETFs) beat most active funds long term.
  5. Don't try to time the market — time IN the market beats timing.
```

> **Note:** The Finance Tracker dashboard (`finance-tracker.html`) fetches live data from the Base44 backend. Query history and stats will only show if you've used the AI agent to ask financial questions.

---

### Option 3 — Chat with the AI Agent *(Full experience)*

Ask financial questions directly to the agent:

👉 [Open Agent Chat](https://app.base44.com/superagent/6a279a127eaa6c84a96e3e3d)

Example questions:
- *"How should I start investing with $500/month?"*
- *"I have $8,000 in credit card debt — what should I do?"*
- *"Give me budgeting tips"*
- *"What is the 50/30/20 rule?"*

Every question is automatically logged and shows up on the Finance Tracker dashboard in real time.

---

## 📁 Project Structure

```
financial-advisor-agent/
├── finance-tracker.html            # Frontend dashboard UI
├── functions/
│   └── getFinancialData.ts         # Backend API (Deno / Base44 serverless)
├── skills/
│   └── financial_advisor.py        # Core advice engine (Python)
├── rules/
│   └── financial_advisor_rules.md  # Agent behavior & rules
└── entities/
    └── FinancialQuery.json          # Database schema
```

---

## 🛠 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Vanilla HTML / CSS / JS           |
| Backend    | Deno (Base44 serverless functions)|
| Database   | Base44 entity store               |
| AI Agent   | Base44 Superagent platform        |

---

## 💡 Features

- General money advice & tips across 7 categories
- Financial Priority Stack (7-step wealth building order)
- Auto-logs all financial Q&A to a tracker database
- Live Finance Tracker dashboard with query history & stats
- Category breakdown with visual bar charts

---

## ⚠️ Disclaimer

This agent provides general financial education — not personalized legal, tax, or investment advice for your specific situation. Always consult a licensed financial advisor for major decisions.
