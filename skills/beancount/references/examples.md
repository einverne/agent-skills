# Beancount Examples and Patterns

Common transaction patterns and workflows for this ledger (`~/Sync/beancount/`).

**Before writing any transaction, read `account/*.bean` to find exact account names.**

## Account Setup Patterns

### This Project's Account Structure

Key accounts (see `account/*.bean` for the full list):

```beancount
; === Options ===
option "title" "ledger"
option "operating_currency" "CNY"
option "operating_currency" "JPY"
option "operating_currency" "HKD"
option "operating_currency" "USD"
option "inferred_tolerance_default" "*:0.01"

; === Assets ===
2019-11-11 open Assets:Cash
2015-11-11 open Assets:Alipay:Balance
2010-01-01 open Assets:WeChat:Balance
2010-11-11 open Assets:DebitCard:CMB CNY,JPY          ; 招商银行
2021-06-03 open Assets:DebitCard:HSBC:HK HKD,EUR      ; 汇丰香港
2024-05-01 open Assets:DebitCard:SMBC:Olive JPY        ; 三井住友
2021-09-30 open Assets:Wise HKD,EUR,USD,GBP,AUD,SGD,JPY
2023-03-01 open Assets:PayPay:Balance JPY
2023-03-01 open Assets:PayPay:Point PT,JPY
2024-01-01 open Assets:DPoint JPY
2018-06-01 open Assets:Broker:Tiger:Cash
2018-06-01 open Assets:Broker:Tiger:Positions

; === Liabilities ===
2022-03-26 open Liabilities:CreditCard:CMB CNY,USD,JPY
2023-11-20 open Liabilities:CreditCard:EPOS:VISA JPY
2023-11-20 open Liabilities:CreditCard:AmazonPrimeCard JPY
2024-05-04 open Liabilities:CreditCard:PayPay JPY
2024-06-01 open Liabilities:CreditCard:Olive JPY

; === Income ===
2023-02-02 open Income:Salary
2020-01-01 open Income:Deposit:Interest
2021-01-01 open Income:SecondHand
2021-01-01 open Income:TaxRefund

; === Expenses ===
2010-11-11 open Expenses:Food:Restaurant
2010-11-11 open Expenses:Food:Takeout
2010-01-01 open Expenses:Food:Cooking
2010-01-01 open Expenses:Food:Daily
2010-11-11 open Expenses:House:Rent
2010-11-11 open Expenses:Transport:Public
2010-01-01 open Expenses:Fun:Subscription
2020-01-01 open Expenses:Digital:VPS:RackNerd
2020-01-01 open Expenses:Trade:Fee
2020-01-01 open Expenses:ConsumptionTax

; === Equity ===
2010-01-01 open Equity:OpeningBalances
```

## Opening Balances

### Using Pad (Recommended)

```beancount
2026-01-01 pad Assets:DebitCard:CMB Equity:OpeningBalances
2026-01-02 balance Assets:DebitCard:CMB 12500.00 CNY

2026-01-01 pad Assets:DebitCard:SMBC:Olive Equity:OpeningBalances
2026-01-02 balance Assets:DebitCard:SMBC:Olive 80000 JPY
```

### Explicit Opening Transaction

```beancount
2026-01-01 * "Opening Balances"
  Assets:DebitCard:CMB           12500.00 CNY
  Assets:DebitCard:HSBC:HK        8000.00 HKD
  Assets:Alipay:Balance            500.00 CNY
  Liabilities:CreditCard:CMB     -3200.00 CNY
  Equity:OpeningBalances
```

## Income Patterns

### Deposit Interest

```beancount
2026-05-31 * "招商银行" "活期利息"
  Assets:DebitCard:CMB     12.50 CNY
  Income:Deposit:Interest
```

### Second-hand Sale Income

```beancount
2026-06-01 * "Mercari" "断捨離 ゲーム売却"
  Assets:DebitCard:PayPayBank    3500 JPY
  Income:SecondHand
```

## Expense Patterns

### Daily convenience store (JPY, credit card)

```beancount
2026-06-03 * "ファミリーマート" "コンビニ"
  Expenses:Food:Daily              480 JPY
  Liabilities:CreditCard:PayPay
```

### Restaurant (JPY, cash)

```beancount
2026-06-03 * "丸亀製麺" "ランチ"
  Expenses:Food:Restaurant    850 JPY
  Assets:Cash
```

### Food delivery (CNY, Alipay)

```beancount
2026-06-03 * "美团" "午餐外卖"
  Expenses:Food:Takeout    35.50 CNY
  Assets:Alipay:Balance
```

### Grocery shopping (JPY)

```beancount
2026-06-05 * "イオン" "食料品"
  Expenses:Food:Cooking    3200 JPY
  Liabilities:CreditCard:EPOS:VISA
```

### Subscription (USD)

```beancount
2026-06-01 * "Anthropic" "Claude Pro"
  Expenses:Digital:Claude    20.00 USD
  Liabilities:CreditCard:CMB
```

### VPS / Server (USD)

```beancount
2026-06-01 * "VPS" "VPS annual renewal"
  Expenses:Digital:VPS:RackNerd    15.99 USD
  Assets:DebitCard:HSBC:US
```

### Split Transaction

```beancount
2026-06-05 * "コストコ" "食料品 + 日用品"
  Expenses:Food:Cooking       8500 JPY
  Expenses:Daily:Commodity    2200 JPY
  Liabilities:CreditCard:Olive
```

### Consumption tax (消費税) — record separately when needed

```beancount
2026-06-10 * "家電量販店" "カメラ購入"
  Expenses:Digital:Device    45000 JPY
  Expenses:ConsumptionTax     4500 JPY  ; 10%
  Liabilities:CreditCard:BicCameraSuica
```

### Utility Bill (Rent)

```beancount
2026-06-27 * "管理会社" "7月家賃"
  Expenses:House:Rent    85000 JPY
  Assets:DebitCard:SMBC:Olive
```

## Credit Card Payment Patterns

### JPY credit card auto-debit

```beancount
2026-06-27 * "PayPayカード" "5月分引き落とし"
  Liabilities:CreditCard:PayPay    35800 JPY
  Assets:DebitCard:PayPayBank
```

### USD credit card payment

```beancount
2026-06-15 * "Amex" "Hilton card payment"
  Liabilities:Amex:Hilton    350.00 USD
  Assets:DebitCard:HSBC:US
```

### Balance assertion after payment

```beancount
2026-06-27 balance Liabilities:CreditCard:PayPay 0 JPY
```

## Transfer Patterns

### Between own accounts (CNY)

```beancount
2026-06-10 * "CMB→Alipay 充值"
  Assets:Alipay:Balance     500.00 CNY
  Assets:DebitCard:CMB     -500.00 CNY
```

### Currency exchange via Wise

```beancount
2026-06-10 * "Wise 換匯 HKD→JPY"
  Assets:Wise:JPY        50000 JPY
  Assets:Wise           -2500 HKD
```

### Wire transfer CNY→JPY via bank

```beancount
2026-06-05 * "招商银行 购汇" "CNY 换 JPY"
  Assets:DebitCard:CMB      -3000.00 CNY
  Assets:DebitCard:SMBC:Olive  30000 JPY
  Expenses:Transfer:Fee        15.00 CNY  ; 汇款手续费
```

## Japan Points / Loyalty Patterns

Points accounts use JPY as the unit. Earning and spending are separate postings.

### Earning points at checkout

```beancount
2026-06-03 * "ヤマダ電機" "家電購入"
  Expenses:Digital:Device        15000 JPY
  Assets:Yamada:Point             -750 JPY   ; 5% ポイント還元
  Liabilities:CreditCard:BicCameraSuica
```

### Redeeming points as payment

```beancount
2026-06-10 * "d払い" "ポイント利用"
  Expenses:Food:Daily    500 JPY
  Assets:DPoint         -500 JPY
```

### Point expiry (write off to Expenses:Other)

```beancount
2026-03-31 * "ポイント失効"
  Expenses:Other      200 JPY
  Assets:Moppy       -200 JPY
```

## Investment Patterns

### Buy shares (Tiger broker, USD)

```beancount
2026-06-10 * "Tiger" "Buy QQQ 5 shares"
  Assets:Broker:Tiger:Positions    5 QQQ {450.00 USD}
  Assets:Broker:Tiger:Cash        -2250.00 USD
  Expenses:Trade:Fee                  0.99 USD
```

### Sell shares (with capital gain)

```beancount
2026-09-15 * "Tiger" "Sell QQQ 5 shares"
  Assets:Broker:Tiger:Positions    -5 QQQ {450.00 USD} @ 480.00 USD
  Assets:Broker:Tiger:Cash         2400.00 USD
  Income:Stock                     ; Auto-calculated: -150.00 USD
```

### Deposit to broker

```beancount
2026-06-01 * "Tiger 入金"
  Assets:Broker:Tiger:Cash    1000.00 USD
  Assets:DebitCard:HSBC:US   -1000.00 USD
```

## Reimbursement Patterns

### Work expense reimbursement (with link)

```beancount
2026-05-10 * "出張" "大阪 新幹線" ^osaka-trip-2026
  Expenses:Transport:Railway    13000 JPY
  Liabilities:CreditCard:EPOS:VISA

2026-05-25 * "会社" "出張精算" ^osaka-trip-2026
  Assets:DebitCard:SMBC:Olive    13000 JPY
  Income:TaxRefund
```

## Travel Patterns

### Overseas trip with pushtag

```beancount
pushtag #taiwan-2026

2026-08-01 * "China Airlines" "台湾 航空券"
  Expenses:Travel:Fare    35000 JPY
  Liabilities:CreditCard:EPOS:VISA

2026-08-03 * "台北 ホテル" "3泊"
  Expenses:Travel:Hotel    6000 TWD @ 4.8 JPY
  Liabilities:CreditCard:CMB

poptag #taiwan-2026
```

### Multi-currency hotel payment

```beancount
2026-08-03 * "Hotel" "HKD payment in Japan"
  Expenses:Travel:Hotel    200 HKD @ 20.5 JPY
  Liabilities:CreditCard:HSBC:HK
```

## File Organization

### Directory structure

```
~/Sync/beancount/
├── main.bean              ← entry point (includes everything)
├── account/
│   ├── assets.bean        ← all Assets:* open directives
│   ├── liabilities.bean   ← all Liabilities:* open directives
│   ├── expenses.bean      ← all Expenses:* open directives
│   ├── income.bean        ← all Income:* open directives
│   ├── equity.bean
│   └── commodity.bean
├── beans/
│   ├── 2024/
│   ├── 2025/
│   └── 2026/
│       ├── 01.bean
│       ├── 02.bean
│       └── 06.bean        ← add transactions here for June 2026
└── prices/
    └── *.bean
```

### main.bean structure

```beancount
option "title" "ledger"
option "operating_currency" "CNY"
option "operating_currency" "JPY"
; ... more options

include "account/*.bean"
include "beans/*.bean"
include "prices/*.bean"
```

### Monthly file (e.g. `beans/2026/06.bean`)

```beancount
; June 2026 transactions — append in chronological order

2026-06-01 * "Netflix" "月額"
  Expenses:Fun:Subscription    1490 JPY
  Liabilities:CreditCard:PayPay

2026-06-03 * "ファミリーマート" "コンビニ"
  Expenses:Food:Daily    580 JPY
  Liabilities:CreditCard:PayPay

; Month-end balance assertions
2026-06-30 balance Assets:DebitCard:SMBC:Olive  125000 JPY
2026-06-30 balance Assets:DebitCard:CMB         18500.00 CNY
```

## Reconciliation Workflow

### Monthly reconciliation

```beancount
; 1. Check bank app for ending balance
; 2. Enter any missing transactions
; 3. Add balance assertion at month end
2026-06-30 balance Assets:DebitCard:SMBC:Olive 125000 JPY

; 4. Run bean-check to verify
; bean-check ~/Sync/beancount/main.bean
; If error, the diff shows the discrepancy amount
```

### Credit card statement reconciliation

```beancount
; Statement closing date balance
2026-06-25 balance Liabilities:CreditCard:PayPay -35800 JPY

; After auto-debit posts
2026-06-27 balance Liabilities:CreditCard:PayPay 0 JPY
```

## Common Queries

### Monthly spending by category (JPY)

```sql
SELECT MONTH(date), ROOT(account, 2), SUM(CONVERT(position, 'JPY'))
WHERE account ~ "Expenses" AND year = 2026
GROUP BY 1, 2
ORDER BY 1, 2
```

### Credit card balance (all cards)

```sql
SELECT account, SUM(position)
WHERE account ~ "Liabilities:CreditCard"
GROUP BY 1
```

### Points balance

```sql
SELECT account, SUM(position)
WHERE account ~ "Assets.*Point"
GROUP BY 1
```

### Net worth

```sql
SELECT SUM(CONVERT(position, 'JPY'))
FROM CLOSE
WHERE account ~ "Assets|Liabilities"
```

### All transactions for a specific account

```sql
SELECT date, narration, payee, position, balance
WHERE account = 'Assets:Alipay:Balance'
ORDER BY date
```

### Vacation total (by tag)

```sql
SELECT SUM(position)
WHERE "taiwan-2026" IN tags
```
