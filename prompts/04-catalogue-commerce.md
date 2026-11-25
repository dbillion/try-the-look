# P04 — Catalogue, Product Variants and Local Styling Bag

## Goal
Keep the product catalogue exact and implement a transparent local shortlist experience. Never imply that the static GitHub Pages site is a real Shopify checkout.

## Immutable look data

| # | Look | Model | Product IDs in row order |
|---|---|---|---|
| 01 | The City Edit | model-1 / original-look-1 | tatum-5-orbit-copy, tshirt, sweatshirt |
| 02 | Gallery Opening | model-5 / original-look-5 | tatum-5-orbit, hoodie-black, tshirt |
| 03 | Gallery Opening | model-4 / original-look-4 | sweatshirt-plus, tatum-5-orbit, tshirt |
| 04 | Studio Day | model-6 / original-look-6 | hoodie-black, tatum-5-orbit-copy, tshirt |
| 05 | Studio Day | model-3 / original-look-3 | sweatshirt, tatum-5-orbit, tshirt |
| 06 | Studio Day | model-2 / original-look-2 | hoodie, air-jordan-12-retro-copy, tshirt |

Descriptions, in order:
1. A charcoal knit and easy denim.
2. A clean white tee and relaxed denim.
3. Olive knitwear. A grounded palette.
4. Black, white and laid-back denim.
5. Burgundy layers. A tailored perspective.
6. A grey crew and your favourite denim.

## Immutable product data

| ID | Display name | Vendor line | Price | Options in exact order | Shopify path |
|---|---|---|---:|---|---|
| tatum-5-orbit-copy | Air Jordan 12 Retro | Nikey \| Password: 1 | $149.00 | 40, 41, 42, 43, 44, 45, 46 | /products/tatum-5-orbit-copy |
| tshirt | Tshirt | Nike | $199.00 | S, L, M, XL | /products/tshirt |
| sweatshirt | Sweatshirt | Nike | $199.00 | S, L, M, XL | /products/sweatshirt |
| tatum-5-orbit | Tatum 5 Orbit | Nikey \| Password: 1 | $149.00 | 40, 41, 42, 43, 44, 45, 46 | /products/tatum-5-orbit |
| hoodie-black | Hoodie Black | Nike | $199.00 | S, L, M, XL | /products/hoodie-black |
| sweatshirt-plus | Sweatshirt Plus | Nike | $199.00 | S, L, M, XL | /products/sweatshirt-plus |
| hoodie | Hoodie | Nike | $199.00 | S, L, M, XL | /products/hoodie |
| air-jordan-12-retro-copy | Luka 5 | Nikey \| Password: 1 | $149.00 | 40, 41, 42, 43, 44, 45, 46 | /products/air-jordan-12-retro-copy |

The vendor label for the three shoe records is literally "Nikey | Password: 1". Do not normalize or correct it. Apparel size order is S, L, M, XL, not S, M, L, XL.

## Exact variant IDs

| Product | Variant IDs, in option order |
|---|---|
| Air Jordan 12 Retro | 40: 57015167025457; 41: 57015167058225; 42: 57015167090993; 43: 57015167123761; 44: 57015167156529; 45: 57015167189297; 46: 57015167222065 |
| Tatum 5 Orbit | 40: 57015166730545; 41: 57015166763313; 42: 57015166796081; 43: 57015166828849; 44: 57015166861617; 45: 57015166894385; 46: 57015166927153 |
| Luka 5 | 40: 57015176364337; 41: 57015176397105; 42: 57015176429873; 43: 57015176462641; 44: 57015176495409; 45: 57015176528177; 46: 57015176560945 |
| Tshirt | S: 56835911582001; L: 56835911614769; M: 56835911647537; XL: 56835911680305 |
| Sweatshirt | S: 56835806396721; L: 56835806429489; M: 56835806462257; XL: 56835806495025 |
| Sweatshirt Plus | S: 56836143743281; L: 56836143776049; M: 56836143808817; XL: 56836143841585 |
| Hoodie | S: 56836002185521; L: 56836002218289; M: 56836002251057; XL: 56836002283825 |
| Hoodie Black | S: 56836251681073; L: 56836251713841; M: 56836251746609; XL: 56836251779377 |

## Pin mapping

Pin positions are percentages of the active figure box, in product-row order.

| Look | Pin 1 | Pin 2 | Pin 3 |
|---|---|---|---|
| 1 | Air Jordan 12 Retro 47% / 27% | Tshirt 48% / 58% | Sweatshirt 45% / 96% |
| 2 | Tatum 5 Orbit 50% / 28% | Hoodie Black 48% / 58% | Tshirt 45% / 88% |
| 3 | Sweatshirt Plus 50% / 28% | Tatum 5 Orbit 48% / 58% | Tshirt 45% / 88% |
| 4 | Hoodie Black 50% / 28% | Air Jordan 12 Retro 48% / 58% | Tshirt 45% / 88% |
| 5 | Sweatshirt 50% / 28% | Tatum 5 Orbit 48% / 58% | Tshirt 45% / 88% |
| 6 | Hoodie 50% / 28% | Luka 5 48% / 58% | Tshirt 45% / 88% |

## Bundle maths

Each look has one shoe at $149 and two apparel pieces at $199 each. Reference subtotal: $547.00. Displayed 10% bundle price: $492.30. The discount is display-only. The bag adds each chosen variant at its full catalogue price; do not calculate a discounted bag total.

## Local bag contract

- Storage key: runway-styling-bag-v3.
- Store selected variant IDs and quantities; validate safe integers and quantity limits.
- Do not add an item until a shopper confirms a size.
- The default checked size is not a shopper choice until they change or confirm it.
- Support add one, add full look, remove, persistent counter, reference subtotal and text shortlist export.
- Every storage read/write is guarded against unavailable or malformed localStorage.
- Every product link must resolve to nike-makknzjs.myshopify.com.
- The dialog must say that the bag is a local shortlist and no order or payment is collected.

## Output and acceptance

Keep the canonical JSON inline in index.html. Add tests that assert six looks, eight unique products, three products per look, exact variant IDs, prices, sizes, product hosts and pin mapping. Any mismatch is a release blocker.
