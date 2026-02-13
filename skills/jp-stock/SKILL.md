---
name: jp-stock
description: Deep research reports for Japanese stocks (日本株/日股/JPX/TSE/Tokyo Stock Exchange/TOPIX/Nikkei). Use when the user asks to analyze a Japanese listed company by name or ticker (e.g., 4661, 4661.T, 9984, 7203) and wants a structured investment research report with macro/industry, financials, valuation, shareholder benefits (株主優待), dividends, risks/opportunities, and an investment recommendation. Requires web search for up-to-date data and cites sources.
---

# jp-stock

Generate a deep Japanese stock research report in Markdown for a given **company name / ticker**.

## Workflow

1) Clarify input
- Ask for: ticker (preferred), company name, time horizon (short/mid/long), risk preference.
- Confirm market if ambiguous: TSE Prime/Standard/Growth.

2) Collect data (must use web tools)
- Use `web_search` to find authoritative sources (JPX, company IR, EDINET, credible financial media, investor relations PDFs).
- Use `web_fetch` to extract key numbers and statements from those pages.
- Keep a short list of sources to cite per section.

3) Write the report (Markdown)
- Start with a one-sentence **core view + rating** summary.
- Use headings without chapter numbers.
- Include tables where helpful, and label them as “Table 1”, “Table 2”, etc.
- For every key number, add a data source note.

## Required sections

- Company overview
- Macro and industry background (Japan GDP/inflation/rates + industry competition)
- Financial analysis (3 years or last 4 quarters; revenue, net profit, gross margin, ROE, leverage/debt)
- Valuation analysis (P/E, P/B, DCF if feasible; compare to peers/industry)
- Risks and opportunities
- Shareholder benefits (株主優待) and dividend policy / payout
- Investment recommendation (rating, target range, key risks)

## Output template

Use this structure:

- Summary (core view + conclusion)
- Company overview
- Macro and industry background
- Financial analysis
- Valuation analysis
- Risks and opportunities
- Shareholder benefits and dividends
- Investment recommendation
- Sources

## Notes

- Prefer primary sources first (company IR / EDINET), then secondary.
- If data is missing, say what is missing and what you used as proxy.
- Avoid giving definitive financial advice; present as research with assumptions.
