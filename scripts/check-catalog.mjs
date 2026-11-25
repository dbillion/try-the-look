import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const match = html.match(/<script id="runway-catalog" type="application\/json">([\s\S]*?)<\/script>/);
assert.ok(match, 'Inline runway catalogue must exist');

const catalog = JSON.parse(match[1]);
const assetHost = 'https://reel-ref-try-the-look.vercel.app/assets/';
const shopHost = 'https://nike-makknzjs.myshopify.com/';
const expectedLooks = [
  ['The City Edit', ['tatum-5-orbit-copy', 'tshirt', 'sweatshirt']],
  ['Gallery Opening', ['tatum-5-orbit', 'hoodie-black', 'tshirt']],
  ['Gallery Opening', ['sweatshirt-plus', 'tatum-5-orbit', 'tshirt']],
  ['Studio Day', ['hoodie-black', 'tatum-5-orbit-copy', 'tshirt']],
  ['Studio Day', ['sweatshirt', 'tatum-5-orbit', 'tshirt']],
  ['Studio Day', ['hoodie', 'air-jordan-12-retro-copy', 'tshirt']],
];
const expected = {
  'tatum-5-orbit-copy': { name: 'Air Jordan 12 Retro', price: 149, sizes: ['40','41','42','43','44','45','46'], ids: [57015167025457,57015167058225,57015167090993,57015167123761,57015167156529,57015167189297,57015167222065] },
  'tshirt': { name: 'Tshirt', price: 199, sizes: ['S','L','M','XL'], ids: [56835911582001,56835911614769,56835911647537,56835911680305] },
  'sweatshirt': { name: 'Sweatshirt', price: 199, sizes: ['S','L','M','XL'], ids: [56835806396721,56835806429489,56835806462257,56835806495025] },
  'tatum-5-orbit': { name: 'Tatum 5 Orbit', price: 149, sizes: ['40','41','42','43','44','45','46'], ids: [57015166730545,57015166763313,57015166796081,57015166828849,57015166861617,57015166894385,57015166927153] },
  'hoodie-black': { name: 'Hoodie Black', price: 199, sizes: ['S','L','M','XL'], ids: [56836251681073,56836251713841,56836251746609,56836251779377] },
  'sweatshirt-plus': { name: 'Sweatshirt Plus', price: 199, sizes: ['S','L','M','XL'], ids: [56836143743281,56836143776049,56836143808817,56836143841585] },
  'hoodie': { name: 'Hoodie', price: 199, sizes: ['S','L','M','XL'], ids: [56836002185521,56836002218289,56836002251057,56836002283825] },
  'air-jordan-12-retro-copy': { name: 'Luka 5', price: 149, sizes: ['40','41','42','43','44','45','46'], ids: [57015176364337,57015176397105,57015176429873,57015176462641,57015176495409,57015176528177,57015176560945] },
};

assert.equal(catalog.looks.length, 6, 'Exactly six looks are required');
assert.equal(catalog.items.length, 8, 'Exactly eight unique products are required');
assert.deepEqual(catalog.looks.map(({ name, products }) => [name, products]), expectedLooks);

const seenVariants = new Set();
for (const product of catalog.items) {
  const truth = expected[product.id];
  assert.ok(truth, 'Unexpected product id: ' + product.id);
  assert.equal(product.name, truth.name, product.id + ': product name changed');
  assert.equal(product.price, truth.price, product.id + ': price changed');
  assert.deepEqual(product.sizes, truth.sizes, product.id + ': size order changed');
  assert.deepEqual(product.variants.map(v => v.id), truth.ids, product.id + ': variant IDs changed');
  assert.ok(product.image.startsWith(assetHost), product.id + ': image must use the approved asset host');
  assert.ok(product.url.startsWith(shopHost + 'products/'), product.id + ': product URL host/path changed');
  for (const variant of product.variants) {
    assert.ok(Number.isSafeInteger(variant.id), product.id + ': unsafe variant ID');
    assert.ok(!seenVariants.has(variant.id), 'Duplicate variant ID ' + variant.id);
    seenVariants.add(variant.id);
  }
}
assert.equal(seenVariants.size, 41, 'Expected 41 distinct variant IDs');
for (const look of catalog.looks) {
  assert.ok(look.image.startsWith(assetHost), look.name + ': look image must use the approved asset host');
  assert.equal(look.products.length, 3, look.name + ': every look must contain three products');
}
assert.ok(html.includes('Nikey | Password: 1'), 'Literal source shoe vendor label must be preserved');
assert.ok(html.includes('$492.30'), 'Display-only 10% bundle price must remain visible');
assert.ok(!/fetch\s*\(\s*['"]native-catalog\.json/.test(readFileSync(new URL('../app.js', import.meta.url), 'utf8')), 'Catalogue must not be fetched at runtime');
assert.ok(html.includes('https://reel-ref-try-the-look.vercel.app/assets/'), 'Approved external image host must be present');

console.log('Catalogue verified: ' + catalog.looks.length + ' looks, ' + catalog.items.length + ' products, ' + seenVariants.size + ' variants.');
