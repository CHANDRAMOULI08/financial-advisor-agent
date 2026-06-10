#!/usr/bin/env python3
"""
Financial Advisor Skill
Provides general money advice, tips, and guidance across key financial topics.
"""

import sys
import json

def get_financial_advice(topic: str = "general") -> dict:
    """Returns financial tips and advice based on topic."""
    
    advice_library = {
        "budgeting": {
            "title": "💰 Budgeting Tips",
            "tips": [
                "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings/debt.",
                "Track every expense for at least 30 days to find hidden leaks.",
                "Pay yourself first — automate savings before spending.",
                "Review subscriptions monthly and cut what you don't use.",
                "Set a weekly 'money date' to review your spending."
            ]
        },
        "savings": {
            "title": "🏦 Savings Tips",
            "tips": [
                "Build a 3-6 month emergency fund before investing.",
                "Use a high-yield savings account (HYSA) — it beats a regular bank.",
                "Set specific savings goals (vacation, car, house) with deadlines.",
                "Automate transfers on payday so you never have to think about it.",
                "Save windfalls (bonuses, tax refunds) before spending them."
            ]
        },
        "investing": {
            "title": "📈 Investing Tips",
            "tips": [
                "Start early — even $50/month compounded over 30 years is powerful.",
                "Max out your 401(k) match first — it's free money.",
                "Diversify: don't put all eggs in one basket.",
                "Low-cost index funds (like S&P 500 ETFs) beat most active funds long term.",
                "Don't try to time the market — time IN the market beats timing."
            ]
        },
        "debt": {
            "title": "💳 Debt Management Tips",
            "tips": [
                "List all debts by interest rate and attack the highest rate first (avalanche method).",
                "Or pay smallest balances first for quick wins (snowball method).",
                "Always pay more than the minimum — even a little extra helps.",
                "Negotiate interest rates with your credit card company — it works more often than you think.",
                "Avoid taking new debt while paying off existing debt."
            ]
        },
        "insurance": {
            "title": "🛡️ Insurance Tips",
            "tips": [
                "Always have health insurance — one hospital visit can wipe out savings.",
                "Term life insurance is usually more cost-effective than whole life.",
                "Bundle home and auto insurance for discounts.",
                "Review coverage annually — your needs change over time.",
                "Raise your deductibles to lower premiums if you have a solid emergency fund."
            ]
        },
        "taxes": {
            "title": "🧾 Tax Tips",
            "tips": [
                "Contribute to tax-advantaged accounts: 401(k), IRA, HSA.",
                "Track deductible expenses year-round, not just at tax time.",
                "Consider a Roth IRA if you expect to be in a higher tax bracket later.",
                "Keep receipts for home office, education, or business expenses.",
                "File early to avoid fraud and get your refund faster."
            ]
        },
        "general": {
            "title": "💡 General Money Tips",
            "tips": [
                "Know your net worth: assets minus liabilities. Calculate it monthly.",
                "Live below your means — wealth is built on the gap between income and spending.",
                "Financial literacy is the best investment — read one money book a month.",
                "Avoid lifestyle inflation — when income goes up, don't let spending follow.",
                "Set clear financial goals: 1-year, 5-year, and 10-year targets.",
                "Talk about money openly with your partner — it prevents 90% of financial fights.",
                "Negotiate your salary — most people leave $5,000–$20,000 on the table."
            ]
        }
    }

    topic_lower = topic.lower()
    for key in advice_library:
        if key in topic_lower:
            return advice_library[key]
    
    return advice_library["general"]


def main():
    topic = sys.argv[1] if len(sys.argv) > 1 else "general"
    result = get_financial_advice(topic)
    
    print(f"\n{result['title']}\n")
    for i, tip in enumerate(result['tips'], 1):
        print(f"  {i}. {tip}")
    print()


if __name__ == "__main__":
    main()
