import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

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

const SYSTEM_PROMPT = `You are FinBot, a personal financial advisor built into a Finance Tracker dashboard. You are warm, direct, and practical.

Your expertise covers budgeting, savings, investing, debt payoff, insurance, taxes, and general financial planning.

Guidelines:
- Give actionable, concrete advice with real numbers and examples
- Keep responses concise (3-5 sentences) but genuinely helpful
- Use the Financial Priority Order when relevant: Emergency fund ($1K starter) → 401k employer match → High-interest debt (>7% APR) → Full emergency fund (3-6 months) → Roth IRA ($7K/yr) → Max 401k ($23K/yr) → Taxable brokerage
- Be honest about tradeoffs
- Use plain, friendly language — no walls of text, no markdown bullet symbols like * or -
- Remind users this is general advice (not personalized legal/tax advice) only when the question is highly specific to their legal/tax situation`;

async function callGemini(messages: Array<{role: string, content: string}>): Promise<string> {
  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');

  // Convert messages to Gemini format
  // Gemini uses 'user' and 'model' roles, and system prompt goes in systemInstruction
  const systemMsg = messages.find(m => m.role === 'system');
  const chatMessages = messages.filter(m => m.role !== 'system');

  const contents = chatMessages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const body: Record<string, unknown> = { contents };
  if (systemMsg) {
    body.systemInstruction = { parts: [{ text: systemMsg.content }] };
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response right now.';
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const question = (body.question || '').trim();
    const history = body.history || []; // [{role: 'user'|'assistant', content: string}]

    if (!question) {
      return Response.json({ error: 'No question provided' }, { status: 400 });
    }

    const category = detectCategory(question);

    // Build messages array with system prompt + history + new question
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-6),
      { role: 'user', content: question }
    ];

    const response = await callGemini(messages);

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
