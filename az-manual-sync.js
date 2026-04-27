/* Alpha Zone Manual Sync Only
   Mục tiêu: chỉ đồng bộ dữ liệu 1 lần khi mở web. Sau đó chỉ cho gọi Apps Script khi người dùng bấm nút thao tác rõ ràng. */
(function(){
  if (window.__AZ_MANUAL_SYNC_ONLY_V3__) return;
  window.__AZ_MANUAL_SYNC_ONLY_V3__ = true;

  var STARTUP_SYNC_WINDOW_MS = 9000;
  var USER_ACTION_WINDOW_MS = 12000;
  var startupUntil = Date.now() + STARTUP_SYNC_WINDOW_MS;
  var manualUntil = 0;
  var lastManualReason = '';
  var blockedCount = 0;

  function text(v){ return String(v == null ? '' : v).replace(/\s+/g,' ').trim(); }
  function isAppsScriptUrl(input){
    try {
      var u = typeof input === 'string' ? input : (input && input.url) || '';
      return /script\.google\.com\/macros\//i.test(String(u));
    } catch(_) { return false; }
  }
  function isWriteRequest(init){
    var m = text(init && init.method || 'GET').toUpperCase();
    return m && m !== 'GET' && m !== 'HEAD';
  }
  function markManual(reason){
    lastManualReason = reason || 'manual';
    manualUntil = Date.now() + USER_ACTION_WINDOW_MS;
    window.__AZ_LAST_MANUAL_SYNC_REASON__ = lastManualReason;
  }
  window.azAllowNextSync = markManual;
  window.azManualSyncStatus = function(){
    return { startup: Date.now() <= startupUntil, manual: Date.now() <= manualUntil, reason: lastManualReason, blocked: blockedCount };
  };

  var ACTION_RE = /(tải|tai|nạp|nap|làm mới|lam moi|reload|refresh|sync|đồng bộ|dong bo|ping|lưu|luu|save|xóa|xoa|delete|duyệt|duyet|approve|từ chối|tu choi|reject|push|repair|sửa|sua|cập nhật|cap nhat|tra cứu|tra cuu|lọc|loc|kiểm tra|kiem tra|đăng ký|dang ky|gửi|gui|submit|thêm|them)/i;
  function isManualControl(el){
    if (!el || !el.closest) return false;
    var node = el.closest('button,a,[role="button"],input[type="button"],input[type="submit"],.btn,.tab-btn,.subtab-btn,.chip,.inline-chip,.az-admin-popup-btn,.az-smart-link-btn');
    if (!node) return false;
    var label = text(node.textContent || node.value || node.getAttribute('aria-label') || node.getAttribute('title') || node.id || node.className || '');
    var attrs = text([node.id,node.name,node.getAttribute('data-action'),node.getAttribute('data-tab'),node.getAttribute('data-subtab'),node.getAttribute('data-regtab'),node.getAttribute('href')].join(' '));
    return ACTION_RE.test(label + ' ' + attrs);
  }
  document.addEventListener('pointerdown', function(e){ if (isManualControl(e.target)) markManual('pointer:' + text(e.target && (e.target.textContent || e.target.id)).slice(0,40)); }, true);
  document.addEventListener('click', function(e){ if (isManualControl(e.target)) markManual('click:' + text(e.target && (e.target.textContent || e.target.id)).slice(0,40)); }, true);
  document.addEventListener('submit', function(){ markManual('submit'); }, true);

  // Chặn các listener cũ kiểu “mọi click/touch/change đều sync” nhưng không chặn handler nút thật.
  var origAdd = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options){
    try {
      var src = typeof listener === 'function' ? Function.prototype.toString.call(listener) : '';
      var lowSignal = /scheduleSync\s*\(|syncNow\s*\(|syncFromAppsScript\s*\(|syncDetailNow\s*\(/i.test(src);
      var globalInteraction = /^(click|touchstart|pointerdown|change|input)$/i.test(type);
      var tinyAnonymous = src.length < 180 && /scheduleSync\s*\(\s*(200|250|350|500|800|1200)?/i.test(src);
      if (globalInteraction && lowSignal && tinyAnonymous) {
        console.warn('[AZ manual-sync] Đã bỏ listener auto-sync theo thao tác chung:', type);
        return;
      }
    } catch(_) {}
    return origAdd.call(this, type, listener, options);
  };

  // Chặn polling đồng bộ nền. Vẫn cho interval UI ngắn như clock/animation nếu không gọi sync/fetch/load.
  var origSetInterval = window.setInterval;
  window.setInterval = function(fn, delay){
    var args = Array.prototype.slice.call(arguments,2);
    try {
      var src = typeof fn === 'function' ? Function.prototype.toString.call(fn) : text(fn);
      var d = Number(delay || 0);
      var syncish = /(syncNow|syncFromAppsScript|syncDetailNow|alphaAutoReload|loadAll|listProducts|listDrafts|CustomerLeads|WarrantyRequests|OrderRecords|fetch\s*\(|apiGet\s*\(|load\s*\(\s*\))/i.test(src);
      if (syncish && d >= 500) {
        console.warn('[AZ manual-sync] Đã tắt polling đồng bộ nền:', d);
        return 0;
      }
      if (d >= 7000 && /(sync|reload|refresh|load|fetch|Apps Script|API_URL)/i.test(src)) {
        console.warn('[AZ manual-sync] Đã tắt interval nền dài:', d);
        return 0;
      }
    } catch(_) {}
    return origSetInterval.apply(window, [fn, delay].concat(args));
  };

  // Cổng cuối: Apps Script chỉ được gọi khi mở web lần đầu hoặc sau click nút thao tác.
  var origFetch = window.fetch;
  window.fetch = function(input, init){
    try {
      if (isAppsScriptUrl(input)) {
        var now = Date.now();
        var allowed = now <= startupUntil || now <= manualUntil || isWriteRequest(init);
        if (!allowed) {
          blockedCount++;
          console.warn('[AZ manual-sync] Chặn fetch nền tới Apps Script. Dữ liệu chỉ sync khi mở web hoặc bấm nút thao tác.', input);
          return Promise.reject(new Error('AZ_MANUAL_SYNC_ONLY: background sync blocked'));
        }
      }
    } catch(_) {}
    return origFetch.apply(this, arguments);
  };

  // Direct page guard: nếu đang ở page thật thì không để hash nội bộ kéo trang nhảy lung tung, trừ admin cần hash tab.
  function page(){ return (location.pathname.split('/').pop() || 'index.html').toLowerCase(); }
  function cleanHash(){
    var p = page();
    if (p === 'admin.html') return;
    if (/^(shop|seller|support)\.html$/.test(p)) return;
    if (location.hash && /^(#home|#categories|#products|#engagement-hub|#marketplace|#seller-channel|#account|#warranty|#about-us)$/i.test(location.hash)) {
      try { history.replaceState(null, document.title, location.pathname + location.search); } catch(_) {}
    }
  }
  window.addEventListener('hashchange', function(){ setTimeout(cleanHash,0); }, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', cleanHash, {once:true}); else cleanHash();
})();
