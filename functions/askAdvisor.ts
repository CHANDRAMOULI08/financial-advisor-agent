import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const FINANCIAL_CATEGORIES = ['Budgeting', 'Savings', 'Investing', 'Debt', 'Insurance', 'Taxes', 'General'];

function detectCategory(question: string): string {
  const q = question.toLowerCase();
  if (q.match(/invest|stock|etf|roth|401k|portfolio|robinhood|index|dividend|brokerage/)) return 'Investing';
  if (q.match(/debt|credit card|loan|apr|interest|payoff|balance transfer/)) return 'Debt';
  if (q.match(/budget|spend|expense|50\/30|track|cut cost/)) return 'Budgeting';
  if (q.match(/sav|emergency fund|hysa|high.yield|rainy day/)) return 'Savings';
  if (q.match(/tax|ira|deduct|401|roth|filing|w2|1099/)) return 'Taxes';
  if (q.match(/insur|health|life|auto|home|coverage|premium/)) return 'Insurance';
  return 'General';
}

function generateAdvice(question: string): string {
  const q = question.toLowerCase();

  if (q.match(/credit card debt|cc debt/)) {
    return "Stop adding charges. Check your APR — if above 20%, this is your #1 priority. Call to negotiate a lower rate. Best move: balance transfer to 0% APR card, pay it off in 12–18 months. Use the avalanche method otherwise — highest interest first.";
  }
  if (q.match(/start invest|how to invest|begin invest|new to invest/)) {
    return "Start with your employer's 401(k) to get the full match (free money!). Then open a Roth IRA and invest in VOO or VTI (S&P 500 index ETFs). Low fees, diversified, proven long-term. Automate monthly contributions and don't touch it.";
  }
  if (q.match(/emergency fund/)) {
    return "Start with $1,000 as a starter fund, then build to 3–6 months of expenses. Keep it in a High-Yield Savings Account (HYSA) earning 4–5% APY — not a regular checking account. Don't invest this money — it needs to be accessible.";
  }
  if (q.match(/budget|how.*save|saving money/)) {
    return "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings/debt. Automate your savings on payday so you never see it. Track spending weekly — awareness alone cuts expenses by 10–15% for most people.";
  }
  if (q.match(/roth ira|roth/)) {
    return "Roth IRA is one of the best wealth-building tools available. Contribute up to $7,000/year (2024). Invest in index funds like VOO. Your money grows 100% tax-free — no taxes on withdrawals in retirement. Open one at Fidelity, Vanguard, or Schwab today.";
  }
  if (q.match(/401k|401\(k\)/)) {
    return "Always contribute at least enough to get your full employer match — that's an instant 50–100% return. Max contribution is $23,000/year (2024). Invest in low-cost index funds inside your 401(k). It's the single best tax-advantaged account most people have access to.";
  }
  if (q.match(/pay off.*debt|debt.*pay|student loan/)) {
    return "Use the avalanche method: list all debts by interest rate, pay minimums on all, throw every extra dollar at the highest rate first. This saves the most money. Alternatively, the snowball method (lowest balance first) builds motivation faster. Either works — pick one and commit.";
  }
  if (q.match(/stock|robinhood|portfolio|etf|index fund/)) {
    return "Shift toward low-cost index ETFs like VOO (S&P 500) or VTI (total market). They beat 90% of active fund managers over 10+ years. Avoid over-concentrating in single stocks (no more than 20% in one). Enable dividend reinvestment (DRIP). Check monthly, not daily.";
  }
  if (q.match(/house|mortgage|buy a home|real estate/)) {
    return "Before buying: clear high-interest debt, save 20% down to avoid PMI, and have 3–6 months emergency fund intact. Rule of thumb: home price should be ≤3x your annual income. Don't forget closing costs (2–5%), property taxes, insurance, and maintenance (~1% of home value/year).";
  }
  if (q.match(/retire|retirement/)) {
    return "The rule of thumb: save 15% of income for retirement. Max your 401(k) ($23,000/year) and Roth IRA ($7,000/year). The 4% rule says you need 25x your annual expenses saved to retire. Start early — $10K invested at 25 is worth ~$170K at 65 at 7% avg return.";
  }
  if (q.match(/net worth/)) {
    return "Net worth = Assets − Liabilities. Track it monthly. Average net worth by 30 is ~$120K, but the median is much lower. Focus on increasing income, investing consistently, and reducing debt. Use a simple spreadsheet or an app like Personal Capital to track it.";
  }
  if (q.match(/crypto|bitcoin|btc|ethereum|eth/)) {
    return "Treat crypto as high-risk speculation — not core investing. Most advisors suggest no more than 5–10% of your portfolio in crypto. Never invest money you can't afford to lose. Don't let FOMO drive decisions. If you hold BTC, use a hardware wallet for large amounts.";
  }

  return `Great question about ${question.split(' ').slice(0, 5).join(' ')}... The key principles: build your emergency fund first ($1K starter), get your full 401(k) match, pay off high-interest debt (>7% APR), then invest in low-cost index funds via Roth IRA. Automate everything, live below your means, and let compound interest do the heavy lifting. What specific aspect would you like to dig into?`;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const question = (body.question || '').trim();

    if (!question) {
      return Response.json({ error: 'No question provided' }, { status: 400 });
    }

    const category = detectCategory(question);
    const response = generateAdvice(question);

    // Save to FinancialQuery entity
    await base44.asServiceRole.entities.FinancialQuery.create({
      question,
      category,
      response,
      status: 'Answered',
    });

    return Response.json({ question, category, response });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
