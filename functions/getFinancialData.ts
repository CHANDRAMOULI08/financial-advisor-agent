import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SYMBOLS = [
  { symbol: "^GSPC", label: "S&P 500" },
  { symbol: "^DJI",  label: "Dow Jones" },
  { symbol: "^IXIC", label: "NASDAQ" },
  { symbol: "BTC-USD", label: "Bitcoin" },
  { symbol: "GC=F", label: "Gold" },
];

async function fetchMarketData() {
  const results = await Promise.all(
    SYMBOLS.map(async ({ symbol, label }) => {
      try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
        const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        const data = await res.json();
        const meta = data?.chart?.result?.[0]?.meta;
        const price = meta?.regularMarketPrice ?? null;
        const prev  = meta?.chartPreviousClose ?? null;
        const change = price && prev ? ((price - prev) / prev) * 100 : null;
        return {
          symbol, label, price,
          prev_close: prev,
          change_pct: change ? parseFloat(change.toFixed(2)) : null,
          direction: change ? (change >= 0 ? "up" : "down") : null,
        };
      } catch {
        return { symbol, label, price: null, prev_close: null, change_pct: null, direction: null };
      }
    })
  );
  return results;
}

async function fetchNews() {
  try {
    const url = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=^GSPC,BTC-USD,^DJI&region=US&lang=en-US";
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const xml = await res.text();

    const items: { title: string; link: string; description: string; pubDate: string }[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
      const block = match[1];
      const get = (tag: string) => {
        const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
        return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim() : '';
      };
      items.push({
        title: get('title'),
        link: get('link'),
        description: get('description'),
        pubDate: get('pubDate'),
      });
    }
    return items;
  } catch {
    return [];
  }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const [queries, market, news] = await Promise.all([
      base44.asServiceRole.entities.FinancialQuery.list(),
      fetchMarketData(),
      fetchNews(),
    ]);

    const stats = {
      total: queries.length,
      answered: queries.filter((q: any) => q.status === "Answered").length,
      byCategory: {} as Record<string, number>,
    };

    for (const q of queries) {
      if (q.category) {
        stats.byCategory[q.category] = (stats.byCategory[q.category] || 0) + 1;
      }
    }

    return Response.json({ queries, stats, market, news });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
