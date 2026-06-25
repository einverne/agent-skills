---
name: Beancount Accounting
description: This skill should be used when the user asks to "add a transaction", "create a beancount entry", "record an expense", "balance my accounts", "query my finances", "check account balances", "categorize spending", "write beancount", "edit .beancount files", "run a BQL query", "reconcile accounts", or mentions beancount, double-entry accounting, or ledger files. Provides comprehensive beancount syntax, directives, and query language expertise.
---

# Beancount Accounting Skill

Beancount is a plain-text double-entry accounting system. This skill provides expertise for creating, editing, and querying beancount files.

## This Project's Setup

**ALWAYS read the account definition files first before writing any transaction.**
Inventing account names causes `bean-check` errors. The correct names are in `account/*.bean`.

| Item | Value |
|------|-------|
| Main file | `~/Sync/beancount/main.bean` |
| Account definitions | `~/Sync/beancount/account/*.bean` |
| Monthly entries | `~/Sync/beancount/beans/<year>/<month>.bean` (e.g. `beans/2026/06.bean`) |
| File extension | `.bean` (not `.beancount`) |
| Operating currencies | CNY (primary), JPY, HKD, USD, TWD, TRY |
| Web interface | Fava (`fava ~/Sync/beancount/main.bean`) |
| Rounding tolerance | `inferred_tolerance_default "*:0.01"` — small CNY rounding ignored |

### Key Account Prefixes (actual names, not generic examples)

**Assets** — `Assets:DebitCard:CMB`, `Assets:Alipay:Balance`, `Assets:WeChat:Balance`,
`Assets:DebitCard:HSBC:HK`, `Assets:Broker:Tiger:Cash`, `Assets:Wise`,
`Assets:PayPay:Balance`, `Assets:Cash`, `Assets:Crypto:BTC`, …

**Liabilities** — `Liabilities:CreditCard:CMB`, `Liabilities:CreditCard:EPOS:VISA`,
`Liabilities:CreditCard:AmazonPrimeCard`, `Liabilities:CreditCard:PayPay`,
`Liabilities:CreditCard:Olive`, `Liabilities:Amex:Hilton`, …

**Income** — `Income:Deposit:Interest`, `Income:SecondHand`, `Income:Reward`, `Income:TaxRefund`, …

**Expenses** — `Expenses:Food:Restaurant`, `Expenses:Food:Daily`, `Expenses:Transport:Public`,
`Expenses:House:Rent`, `Expenses:Digital:VPS:*`, `Expenses:Fun:Subscription`,
`Expenses:Trade:Fee`, `Expenses:ConsumptionTax`, …

**Points/Loyalty** (Japan) — `Assets:PayPay:Point`, `Assets:DPoint`, `Assets:Ponta:Point`,
`Assets:Rakuten:Point`, `Assets:Yamada:Point`, `Assets:BicCamera:Point`, …

## Workflow: Adding a Transaction

1. **Read account files** — `account/assets.bean`, `account/liabilities.bean`, `account/expenses.bean` to find exact account names
2. **Find the target monthly file** — `beans/<year>/<month>.bean` matching the transaction date
3. **Write the transaction** using exact existing account names and the correct currency
4. **Run validation** — `bean-check ~/Sync/beancount/main.bean`
5. **Fix any errors** before finishing (never leave a failing file)

## Core Concepts

### Double-Entry Accounting

Every transaction must balance to zero. Money flows between accounts:
- **Debits** increase Assets/Expenses, decrease Liabilities/Income/Equity
- **Credits** decrease Assets/Expenses, increase Liabilities/Income/Equity

### Five Account Types

| Type | Purpose | Normal Balance |
|------|---------|----------------|
| `Assets` | What you own (bank accounts, investments) | Positive |
| `Liabilities` | What you owe (credit cards, loans) | Negative |
| `Income` | Money coming in (salary, interest) | Negative |
| `Expenses` | Money going out (food, rent) | Positive |
| `Equity` | Net worth, opening balances | Negative |

### Account Naming

Use colon-separated hierarchical names starting with capital letters:
```
Type:Institution:SubAccount
```

This project uses institution abbreviations (CMB, HSBC, SMBC…) not generic names:
```
Assets:DebitCard:CMB
Assets:Alipay:Balance
Liabilities:CreditCard:EPOS:VISA
Expenses:Food:Restaurant
```

## Transaction Syntax

### Basic Format

```beancount
YYYY-MM-DD flag "Payee" "Narration"
  Account1    Amount Currency
  Account2    Amount Currency  ; optional comment
```

### Flags

- `*` - Cleared/completed transaction
- `!` - Pending/needs review

### Examples

Simple expense (JPY, credit card):
```beancount
2026-06-03 * "ファミリーマート" "コンビニ"
  Expenses:Food:Daily           480 JPY
  Liabilities:CreditCard:PayPay
```

Simple expense (CNY, Alipay):
```beancount
2026-06-03 * "美团" "午餐外卖"
  Expenses:Food:Takeout    35.50 CNY
  Assets:Alipay:Balance
```

### Amount Interpolation

One posting amount can be omitted - beancount calculates it:
```beancount
2026-01-03 * "Grocery Store" "Weekly groceries"
  Expenses:Food:Groceries    125.43 USD
  Assets:Checking:Main  ; Amount calculated as -125.43 USD
```

## Essential Directives

### open / close

Declare account lifecycle:
```beancount
2026-01-01 open Assets:Checking:Main USD
2028-12-31 close Assets:Checking:Main
```

### balance

Assert account balance at start of day (catches errors):
```beancount
2026-01-31 balance Assets:Checking:Main 4583.84 USD
```

### pad

Auto-generate balancing entry between two dates:
```beancount
2026-01-01 pad Assets:Checking:Main Equity:Opening-Balances
2026-01-02 balance Assets:Checking:Main 4583.84 USD
```

### include

Split files for organization (this project uses `.bean` extension):
```beancount
include "account/*.bean"
include "beans/2026/*.bean"
include "prices/*.bean"
```

### option

Configure beancount behavior:
```beancount
option "title" "ledger"
option "operating_currency" "CNY"
option "operating_currency" "JPY"
option "operating_currency" "HKD"
option "operating_currency" "USD"
option "inferred_tolerance_default" "*:0.01"  ; ignore sub-cent rounding
```

## Metadata and Tags

### Metadata

Attach key-value pairs to directives or postings:
```beancount
2026-01-03 * "Amazon" "Office supplies"
  order-id: "123-456-789"
  Expenses:Office    45.00 USD
    category: "equipment"
  Liabilities:Card:Chase
```

### Tags and Links

Group related transactions:
```beancount
2026-01-15 * "Hotel" "Conference lodging" #work-travel #conference-2026
  Expenses:Travel:Lodging    299.00 USD
  Liabilities:Card:Chase

2026-02-01 * "Expense Report" "Reimbursement" ^conference-2026
  Assets:Checking:Main    299.00 USD
  Income:Reimbursements
```

## BQL Queries

Beancount Query Language (BQL) provides SQL-like queries. Run with `bean-query`:

```bash
bean-query ~/Sync/beancount/main.bean "SELECT account, sum(position) WHERE account ~ 'Expenses' GROUP BY 1"
```

### Common Queries

Account balance:
```sql
SELECT account, sum(position)
WHERE account ~ 'Assets:Checking'
GROUP BY 1
```

Monthly expenses by category:
```sql
SELECT MONTH(date), account, sum(position)
WHERE account ~ 'Expenses' AND year = 2026
GROUP BY 1, 2
ORDER BY 1, 2
```

Transactions for an account:
```sql
SELECT date, narration, payee, position, balance
WHERE account = 'Assets:Checking:Centennial:Joint'
ORDER BY date
```

### Key BQL Functions

| Function | Purpose |
|----------|---------|
| `SUM(position)` | Aggregate amounts |
| `YEAR(date)`, `MONTH(date)` | Extract date parts |
| `COST(position)` | Get cost basis |
| `account ~ 'pattern'` | Regex match account |

## Fava Web Interface

This project uses **Fava** as the primary interface, not the legacy `bean-web`.

```bash
fava ~/Sync/beancount/main.bean
```

### Fava Custom Directives

```beancount
; UI options
2016-04-14 custom "fava-option" "language" "zh_CN"
2016-04-14 custom "fava-option" "auto-reload" "true"
2016-04-14 custom "fava-option" "indent" "2"

; Sidebar quick links
2099-01-01 custom "fava-sidebar-link" "This Month" "/jump?time=month"
2099-01-01 custom "fava-sidebar-link" "Last Month" "/jump?time=month-1"

; Extensions
2010-01-01 custom "fava-extension" "fava_dashboards" "{'config': 'dashboards.yml'}"
```

## Japan Points / Loyalty Accounts

Points accounts (`Assets:*:Point`) use JPY as the unit to track monetary value.

Earning points at checkout:
```beancount
2026-06-03 * "ヤマダ電機" "家電購入 + ポイント獲得"
  Expenses:Digital:Device         15000 JPY
  Assets:Yamada:Point              -750 JPY   ; 5% ポイント還元
  Liabilities:CreditCard:BicCameraSuica
```

Redeeming points:
```beancount
2026-06-10 * "d 払い" "ポイント利用"
  Expenses:Food:Daily    500 JPY
  Assets:DPoint         -500 JPY
```

Point expiry (write off to Expenses:Other):
```beancount
2026-03-31 * "ポイント失効"
  Expenses:Other             200 JPY
  Assets:Moppy             -200 JPY
```

## Working with Beancount Files

### Reading Files

Before editing, always read:
1. `account/assets.bean` — find correct asset account names
2. `account/liabilities.bean` — find correct credit card names
3. `account/expenses.bean` — find correct expense category
4. The target monthly file `beans/<year>/<month>.bean` to see existing style

### Adding Transactions

1. Read account definition files to find exact names
2. Open `beans/<year>/<month>.bean` matching the transaction date
3. Append in chronological order, matching existing narration style
4. Use the correct operating currency for each account
5. Run `bean-check ~/Sync/beancount/main.bean` to validate

### Validation

```bash
bean-check ~/Sync/beancount/main.bean
```

### Common Patterns

Credit card payment (JPY card):
```beancount
2026-06-27 * "PayPay" "クレカ引き落とし"
  Liabilities:CreditCard:PayPay    35000 JPY
  Assets:DebitCard:PayPayBank
```

Credit card payment (USD card):
```beancount
2026-06-15 * "Amex" "Hilton card payment"
  Liabilities:Amex:Hilton    350.00 USD
  Assets:DebitCard:HSBC:US
```

Investment purchase (Tiger broker):
```beancount
2026-06-10 * "Tiger" "Buy QQQ"
  Assets:Broker:Tiger:Positions    5 QQQ {450.00 USD}
  Assets:Broker:Tiger:Cash       -2250.00 USD
```

Foreign currency transaction with exchange rate:
```beancount
2026-06-03 * "Wise" "HKD→JPY 換匯"
  Assets:Wise:JPY       50000 JPY
  Assets:Wise:GBP        -253 GBP @ 197.6 JPY
```

## Best Practices

### File Organization

- Use `include` to split by month or category
- Keep account definitions in main file
- Add transactions to appropriate include files

### Account Hierarchy

- Be consistent with naming depth
- Use specific subcategories for visibility
- Group related accounts logically

### Balance Assertions

- Add monthly balance assertions for bank accounts
- Reconcile against actual statements
- Catches data entry errors early

### Error Prevention

- Always run `bean-check` after edits
- Use balance assertions frequently
- Keep transactions in chronological order

## Additional Resources

### Reference Files

For detailed syntax and patterns, consult:
- **`references/syntax.md`** - Complete directive reference with all options
- **`references/bql.md`** - Full BQL query language documentation
- **`references/examples.md`** - Common transaction patterns and workflows

### Command Line Tools

Use the project main file path (`~/Sync/beancount/main.bean`) for all commands:

| Command | Purpose |
|---------|---------|
| `bean-check ~/Sync/beancount/main.bean` | Validate syntax (run after every edit) |
| `bean-query ~/Sync/beancount/main.bean "QUERY"` | Run BQL query |
| `bean-report ~/Sync/beancount/main.bean balances` | Balance report |
| `fava ~/Sync/beancount/main.bean` | Web interface (Fava, not bean-web) |
