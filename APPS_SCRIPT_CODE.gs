/* Alpha Zone Apps Script API - migrated to the new Google Sheet.
 * Paste this file into Apps Script as Code.gs, then Deploy > Manage deployments > Edit > New version.
 */

const SPREADSHEET_ID = '1B2FMQ9pKHFQpY4eFMIqnEEHEqvgqq72USV86HgH6d5E';

const SHEETS = {
  products: 'products',
  drafts: 'drafts',
  leads: 'customer_leads',
  warranty: 'warranty_requests',
  orders: 'order_records'
};

const HEADERS = {
  products: ['id','name','platformName','logo','categoryImage','category','price','shortDescription','detailedDescription','warranty','link','page','updatedAt'],
  drafts: ['draftId','scope','dataJson','updatedAt'],
  leads: ['leadId','fullName','contact','email','note','productId','productName','sourcePage','updatedAt'],
  warranty: ['requestId','ticketCode','orderCode','contact','product','issue','statusText','productId','sourcePage','updatedAt'],
  orders: ['orderId','orderCode','productId','productName','price','shortMessage','fullMessage','statusText','customerName','customerContact','customerEmail','customerNote','sourcePage','updatedAt']
};

function doGet(e) {
  return handle_(e && e.parameter ? e.parameter : {});
}

function doPost(e) {
  var body = {};
  try { body = JSON.parse(e && e.postData && e.postData.contents || '{}'); } catch (_) { body = {}; }
  return handle_(body || {});
}

function handle_(req) {
  try {
    ensureAllSheets_();
    var action = String(req.action || '').trim();
    switch (action) {
      case 'ping': return json_({ ok: true, time: new Date().toISOString(), spreadsheetId: SPREADSHEET_ID });
      case 'listProducts': return json_({ ok: true, items: readObjects_('products').filter(function (x) { return !isMarketplaceOnly_(x); }) });
      case 'upsertProduct': return json_({ ok: true, item: upsertByKey_('products', normalizeProduct_(req.item || req.data || {}), 'id') });
      case 'deleteProduct': deleteByKey_('products', String(req.id || (req.item && req.item.id) || '').trim(), 'id'); return json_({ ok: true });
      case 'pushAllProducts': return json_({ ok: true, items: replaceProducts_(req.items || []) });
      case 'listCustomerLeads': return json_({ ok: true, items: readObjects_('leads') });
      case 'saveCustomerLead': return json_({ ok: true, item: upsertByKey_('leads', normalizeLead_(req.data || req.item || {}), 'leadId') });
      case 'listWarrantyRequests': return json_({ ok: true, items: readObjects_('warranty') });
      case 'saveWarrantyRequest': return json_({ ok: true, item: upsertByKey_('warranty', normalizeWarranty_(req.data || req.item || {}), 'requestId') });
      case 'listOrderRecords': return json_({ ok: true, items: readObjects_('orders') });
      case 'saveOrderRecord': return json_({ ok: true, item: upsertByKey_('orders', normalizeOrder_(req.data || req.item || {}), 'orderId') });
      case 'listDrafts': return json_({ ok: true, items: readObjects_('drafts') });
      case 'saveDraft': return json_({ ok: true, item: upsertByKey_('drafts', normalizeDraft_(req.data || req.item || {}), 'draftId') });
      case 'deleteDraft': deleteByKey_('drafts', String(req.draftId || '').trim(), 'draftId'); return json_({ ok: true });
      case 'listMarketplaceProducts': return json_({ ok: true, items: listMarketplaceProducts_() });
      default: return json_({ ok: false, error: 'Unknown action: ' + action });
    }
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

function ss_() { return SpreadsheetApp.openById(SPREADSHEET_ID); }

function ensureAllSheets_() {
  Object.keys(SHEETS).forEach(function (key) { sheet_(key); });
}

function sheet_(key) {
  var ss = ss_();
  var name = SHEETS[key];
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  var headers = HEADERS[key];
  var first = sh.getRange(1, 1, 1, Math.max(headers.length, sh.getLastColumn() || headers.length)).getValues()[0].map(String);
  var missing = headers.filter(function (h) { return first.indexOf(h) < 0; });
  if (sh.getLastRow() === 0 || !first[0]) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  } else if (missing.length) {
    sh.getRange(1, first.length + 1, 1, missing.length).setValues([missing]);
  }
  return sh;
}

function headerMap_(sh) {
  var n = Math.max(sh.getLastColumn(), 1);
  var headers = sh.getRange(1, 1, 1, n).getValues()[0].map(String);
  var map = {};
  headers.forEach(function (h, i) { if (h) map[h] = i; });
  return { headers: headers, map: map };
}

function readObjects_(key) {
  var sh = sheet_(key);
  var hm = headerMap_(sh);
  var last = sh.getLastRow();
  if (last < 2) return [];
  return sh.getRange(2, 1, last - 1, hm.headers.length).getValues().map(function (row) {
    var obj = {};
    hm.headers.forEach(function (h, i) { if (h) obj[h] = row[i]; });
    return obj;
  }).filter(function (obj) {
    return Object.keys(obj).some(function (k) { return k !== 'updatedAt' && String(obj[k] || '').trim() !== ''; });
  }).map(parseDraftData_);
}

function writeObjects_(key, items) {
  var sh = sheet_(key);
  var headers = HEADERS[key];
  sh.clearContents();
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (!items.length) return [];
  var rows = items.map(function (obj) { return headers.map(function (h) { return obj[h] == null ? '' : obj[h]; }); });
  sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
  return items;
}

function upsertByKey_(key, item, keyField) {
  if (!item[keyField]) item[keyField] = key.toUpperCase() + '-' + Date.now();
  item.updatedAt = item.updatedAt || new Date().toISOString();
  var sh = sheet_(key);
  var hm = headerMap_(sh);
  var col = hm.map[keyField] + 1;
  if (!col) throw new Error('Missing key header: ' + keyField);
  var values = sh.getLastRow() > 1 ? sh.getRange(2, col, sh.getLastRow() - 1, 1).getValues() : [];
  var rowIndex = -1;
  values.some(function (r, i) { if (String(r[0]) === String(item[keyField])) { rowIndex = i + 2; return true; } return false; });
  var headers = hm.headers;
  var row = headers.map(function (h) { return item[h] == null ? '' : item[h]; });
  if (rowIndex > -1) sh.getRange(rowIndex, 1, 1, headers.length).setValues([row]);
  else sh.appendRow(row);
  return item;
}

function deleteByKey_(key, value, keyField) {
  if (!value) return;
  var sh = sheet_(key);
  var hm = headerMap_(sh);
  var col = hm.map[keyField] + 1;
  if (!col || sh.getLastRow() < 2) return;
  var values = sh.getRange(2, col, sh.getLastRow() - 1, 1).getValues();
  for (var i = values.length - 1; i >= 0; i--) {
    if (String(values[i][0]) === String(value)) sh.deleteRow(i + 2);
  }
}

function replaceProducts_(items) {
  var normalized = asArray_(items).map(normalizeProduct_).filter(function (x) { return x.id; });
  normalized = normalized.filter(function (x) { return !isMarketplaceOnly_(x); });
  return writeObjects_('products', normalized);
}

function normalizeProduct_(x) {
  x = x || {};
  return keep_(HEADERS.products, {
    id: str_(x.id),
    name: str_(x.name),
    platformName: str_(x.platformName || x.name),
    logo: str_(x.logo || x.categoryImage),
    categoryImage: str_(x.categoryImage || x.logo),
    category: str_(x.category),
    price: str_(x.price),
    shortDescription: str_(x.shortDescription),
    detailedDescription: str_(x.detailedDescription),
    warranty: str_(x.warranty),
    link: str_(x.link || x.page),
    page: str_(x.page || x.link),
    updatedAt: str_(x.updatedAt || new Date().toISOString())
  });
}

function normalizeDraft_(x) {
  x = x || {};
  var data = x.dataJson || x.data || x;
  return keep_(HEADERS.drafts, {
    draftId: str_(x.draftId || (data && data.draftId) || ('DRAFT-' + Date.now())),
    scope: str_(x.scope || (data && data.scope) || 'general'),
    dataJson: typeof data === 'string' ? data : JSON.stringify(data || {}),
    updatedAt: str_(x.updatedAt || new Date().toISOString())
  });
}

function normalizeLead_(x) {
  x = x || {};
  return keep_(HEADERS.leads, {
    leadId: str_(x.leadId || x.email || x.contact || ('LEAD-' + Date.now())),
    fullName: str_(x.fullName || x.name),
    contact: str_(x.contact || x.phone),
    email: str_(x.email || x.mail),
    note: str_(x.note),
    productId: str_(x.productId),
    productName: str_(x.productName || x.product),
    sourcePage: str_(x.sourcePage),
    updatedAt: str_(x.updatedAt || new Date().toISOString())
  });
}

function normalizeWarranty_(x) {
  x = x || {};
  return keep_(HEADERS.warranty, {
    requestId: str_(x.requestId || x.ticketCode || ('WR-' + Date.now())),
    ticketCode: str_(x.ticketCode),
    orderCode: str_(x.orderCode),
    contact: str_(x.contact || x.phone),
    product: str_(x.product || x.productName),
    issue: str_(x.issue),
    statusText: str_(x.statusText || 'đang tiếp nhận'),
    productId: str_(x.productId),
    sourcePage: str_(x.sourcePage),
    updatedAt: str_(x.updatedAt || new Date().toISOString())
  });
}

function normalizeOrder_(x) {
  x = x || {};
  return keep_(HEADERS.orders, {
    orderId: str_(x.orderId || x.orderCode || ('ORD-' + Date.now())),
    orderCode: str_(x.orderCode || x.orderId),
    productId: str_(x.productId),
    productName: str_(x.productName || x.product),
    price: str_(x.price),
    shortMessage: str_(x.shortMessage),
    fullMessage: str_(x.fullMessage),
    statusText: str_(x.statusText || 'new'),
    customerName: str_(x.customerName || x.fullName || x.name),
    customerContact: str_(x.customerContact || x.contact || x.phone),
    customerEmail: str_(x.customerEmail || x.email),
    customerNote: str_(x.customerNote || x.note),
    sourcePage: str_(x.sourcePage),
    updatedAt: str_(x.updatedAt || new Date().toISOString())
  });
}

function listMarketplaceProducts_() {
  return readObjects_('drafts').filter(function (d) {
    return String(d.scope || '').indexOf('marketplace_product_approved') > -1;
  }).map(function (d) {
    var data = d.data || {};
    return data.product || data;
  }).filter(Boolean);
}

function parseDraftData_(obj) {
  if (obj && obj.dataJson) {
    try { obj.data = JSON.parse(obj.dataJson); } catch (_) { obj.data = {}; }
  }
  return obj;
}

function isMarketplaceOnly_(x) {
  var s = [x.source, x.publishTarget, x.marketplaceOnly, x.hideFromProductPage, x.sellerId, x.sellerUsername, x.sellerName].join(' ').toLowerCase();
  return /seller_marketplace|marketplace|true/.test(s) && /seller|marketplace|true/.test(s);
}

function keep_(headers, obj) {
  var out = {};
  headers.forEach(function (h) { out[h] = obj[h] == null ? '' : obj[h]; });
  return out;
}
function str_(v) { return v == null ? '' : String(v).trim(); }
function asArray_(v) { if (Array.isArray(v)) return v; try { var x = JSON.parse(v); return Array.isArray(x) ? x : []; } catch (_) { return []; } }
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
