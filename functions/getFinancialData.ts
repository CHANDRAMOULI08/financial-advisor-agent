import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const queries = await base44.asServiceRole.entities.FinancialQuery.list();

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

    return Response.json({ queries, stats });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
