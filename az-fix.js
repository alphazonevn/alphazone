(function(){if(window.__AZ_SMART_IMAGE_POPUP_FIX__)return;window.__AZ_SMART_IMAGE_POPUP_FIX__=true;var STORE_POPUPS='azSmartPopupsEnabled',STORE_LAST_LINK='azLastProductLink';function enc(s){return'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)}function enabled(){return localStorage.getItem(STORE_POPUPS)!=='0'}window.azSmartPopupsEnabled=enabled;window.azSetSmartPopups=function(v){localStorage.setItem(STORE_POPUPS,v?'1':'0');window.azSmartPopupsEnabled=enabled;return enabled()};function t(v){return String(v==null?'':v).trim()}function bad(s){s=t(s);return!s||s==='#'||s==='undefined'||s==='null'||/^javascript:/i.test(s)}function fallback(label,type){label=t(label)||(type==='category'?'Danh mục':'Sản phẩm');var ini=label.split(/\s+/).filter(Boolean).slice(0,2).map(function(w){return w[0]||''}).join('').toUpperCase()||(type==='category'?'DM':'SP');ini=ini.replace(/[<>&]/g,'');return enc('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#ddd"/></linearGradient></defs><rect width="240" height="240" rx="54" fill="url(#g)"/><circle cx="120" cy="102" r="52" fill="#111" opacity=".9"/><text x="120" y="119" text-anchor="middle" font-family="Arial" font-size="38" font-weight="900" fill="#fff">'+ini+'</text><text x="120" y="184" text-anchor="middle" font-family="Arial" font-size="18" font-weight="800" fill="#555">'+(type==='category'?'DANH MỤC':'SẢN PHẨM')+'</text></svg>')}function mark(img){if(!img||img.dataset.azSmartImg==='1')return;img.dataset.azSmartImg='1';img.loading=img.loading||'lazy';img.decoding='async';img.referrerPolicy=img.referrerPolicy||'no-referrer';var data=String(img.className||'')+' '+String(img.alt||'')+' '+String(img.src||'');var type=/category|danh\s*mục|dm|alpha-category|categoryImage/i.test(data)?'category':'product';function apply(){if(img.dataset.azFallbackApplied==='1')return;img.dataset.azFallbackApplied='1';img.dataset.azBrokenOriginal=img.getAttribute('src')||'';img.src=fallback(img.alt||img.title,type);img.classList.add('az-img-fallback')}if(bad(img.getAttribute('src')))apply();img.addEventListener('error',apply,true)}function optimize(root){(root||document).querySelectorAll('img').forEach(mark)}window.azOptimizeImages=optimize;function getProductById(id){id=t(id);if(!id)return null;var pools=[];['brands','allProducts','products','marketplaceProducts','items'].forEach(function(k){if(Array.isArray(window[k]))pools.push(window[k])});for(var i=0;i<pools.length;i++){var f=pools[i].find(function(x){return t(x&&x.id)===id});if(f)return f}return null}function plink(o){return o?t(o.link||o.page||o.url||o.productUrl||o.productLink||o.sourceUrl||o.href):''}function remember(o){var l=plink(o);if(l)localStorage.setItem(STORE_LAST_LINK,l);return l}function addBtn(c,l,label){if(!c||!l)return;if(!/^https?:\/\//i.test(l)&&!/\.html(\?|#|$)/i.test(l))return;var old=c.querySelector('[data-az-smart-link-btn]');if(old)old.remove();var a=document.createElement('a');a.href=l;a.target=/^https?:\/\//i.test(l)?'_blank':'_self';a.rel='noopener';a.className='az-smart-link-btn';a.dataset.azSmartLinkBtn='1';a.innerHTML='<i class="fa-solid fa-arrow-up-right-from-square"></i> '+(label||'Mở link');c.appendChild(a)}function enhance(p){var l=remember(p)||localStorage.getItem(STORE_LAST_LINK)||'';addBtn(document.getElementById('modal-actions'),l,'Mở link sản phẩm');var b=document.getElementById('detail-buy-btn');if(b&&b.parentElement)addBtn(b.parentElement,l,'Xem link gốc')}function guard(){var sm=window.showMiniPopup;if(typeof sm==='function'&&!sm.__azGuard){window.showMiniPopup=function(id){if(!enabled())return false;return sm.apply(this,arguments)};window.showMiniPopup.__azGuard=true}['openModal','openProductModal','showProductModal'].forEach(function(fn){var old=window[fn];if(typeof old==='function'&&!old.__azGuard){window[fn]=function(id){if(!enabled()){var p=getProductById(id),l=remember(p);if(l)location.href=l;return false}var r=old.apply(this,arguments);setTimeout(function(){enhance(getProductById(id));optimize(document)},80);return r};window[fn].__azGuard=true}});var gd=window.goToDetail;if(typeof gd==='function'&&!gd.__azGuard){window.goToDetail=function(id){var r=gd.apply(this,arguments);setTimeout(function(){enhance(getProductById(id));optimize(document)},100);return r};window.goToDetail.__azGuard=true}}function adminPanel(){if(!/^admin(\-|\.html|$)/i.test((location.pathname.split('/').pop()||'')))return;if(document.getElementById('az-admin-popup-tools'))return;var box=document.createElement('div');box.id='az-admin-popup-tools';box.className='az-admin-popup-tools';box.innerHTML='<div class="az-admin-popup-head"><span>Popup thông minh</span><button type="button" class="az-admin-popup-btn" data-c>Thu gọn</button></div><div class="az-admin-popup-body"><div class="az-admin-popup-status" data-s></div><div class="az-admin-popup-row"><button type="button" class="az-admin-popup-btn" data-on>Bật popup</button><button type="button" class="az-admin-popup-btn" data-off>Tắt popup</button><a class="az-admin-popup-btn" href="products.html">Trang sản phẩm</a><a class="az-admin-popup-btn" href="marketplace.html">Marketplace</a><a class="az-admin-popup-btn" href="seller-channel.html">Kênh người bán</a></div><div>Lưu trên cùng domain; dùng để admin test popup và link trực tiếp.</div></div>';document.body.appendChild(box);function sync(){var on=enabled();box.querySelector('[data-s]').textContent=on?'Đang bật: bấm sản phẩm sẽ mở popup.':'Đang tắt: popup bị chặn, ưu tiên mở link sản phẩm nếu có.';box.querySelector('[data-on]').classList.toggle('active',on);box.querySelector('[data-off]').classList.toggle('active',!on)}box.querySelector('[data-on]').onclick=function(){window.azSetSmartPopups(true);sync()};box.querySelector('[data-off]').onclick=function(){window.azSetSmartPopups(false);sync()};box.querySelector('[data-c]').onclick=function(){box.classList.toggle('az-collapsed');this.textContent=box.classList.contains('az-collapsed')?'Mở':'Thu gọn'};sync()}function boot(){optimize(document);guard();adminPanel();setInterval(function(){optimize(document);guard()},1200);try{new MutationObserver(function(m){m.forEach(function(x){Array.prototype.forEach.call(x.addedNodes||[],function(n){if(n.nodeType===1)optimize(n)})})}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();})();

/* Alpha Zone split-admin / checkout / independent-catalog patch */
(function(){
  if(window.__AZ_SPLIT_ADMIN_CHECKOUT_V1__) return;
  window.__AZ_SPLIT_ADMIN_CHECKOUT_V1__ = true;
  var ROUTES = {home:'home.html',categories:'categories.html',products:'products.html','engagement-hub':'engagement-hub.html',marketplace:'marketplace.html','seller-channel':'seller-channel.html',account:'account.html',warranty:'warranty.html','about-us':'about-us.html',checkout:'checkout.html',admin:'admin.html',records:'admin.html#records',smart:'admin.html#smart',registration:'admin.html#registration'};
  function pathName(){ return (location.pathname.split('/').pop() || 'index.html').toLowerCase(); }
  function ctx(){ var p=pathName(); var h=(location.hash||'').replace(/^#/,''); if(/^(shop|seller|support)\.html$/.test(p) && h) return h; if(p==='shop.html') return 'home'; if(p==='seller.html') return 'seller-channel'; if(p==='support.html') return 'warranty'; if(p==='index.html') return 'home'; return p.replace(/\.html$/,''); }
  function val(x){ return String(x==null?'':x).trim(); }
  function hay(p){ return [p&&p.source,p&&p.publishTarget,p&&p.marketplaceOnly,p&&p.hideFromProductPage,p&&p.approvalStatus,p&&p.sellerId,p&&p.sellerUsername,p&&p.sellerName,p&&p.category,p&&p.scope].join(' ').toLowerCase(); }
  function isMarket(p){ var h=hay(p); return /seller_marketplace|marketplace_product_approved/.test(h) || (p&&((p.marketplaceOnly===true)||(p.hideFromProductPage===true)||val(p.publishTarget).toLowerCase()==='marketplace'||val(p.source).toLowerCase()==='seller_marketplace'||val(p.sellerId)||val(p.sellerUsername))); }
  function isEngage(p){ var h=hay(p)+' '+[p&&p.name,p&&p.platformName,p&&p.id].join(' ').toLowerCase(); return /engagement|tuong tac|tương tác|like|follow|follower|view|subscriber|traffic/.test(h) || val(p&&p.publishTarget).toLowerCase()==='engagement'; }
  function keep(p){ var c=ctx(); if(!p) return false; if(c==='marketplace') return isMarket(p); if(c==='engagement-hub') return !isMarket(p) && isEngage(p); if(c==='products'||c==='categories'||c==='home') return !isMarket(p) && !isEngage(p); return true; }
  function filterList(list){ return Array.isArray(list) ? list.filter(keep) : list; }
  window.azCatalogFilter = filterList;
  window.azIsMarketplaceProduct = isMarket;
  window.azIsEngagementProduct = isEngage;
  function installCatalogFilter(){
    if(typeof window.renderProducts === 'function' && !window.renderProducts.__azCatalogFilter){ var old = window.renderProducts; window.renderProducts = function(list){ return old.call(this, filterList(Array.isArray(list)?list:(window.brands||[]))); }; window.renderProducts.__azCatalogFilter = true; }
    if(typeof window.getProductsSafe === 'function' && !window.getProductsSafe.__azCatalogFilter){ var oldG = window.getProductsSafe; window.getProductsSafe = function(){ return filterList(oldG.apply(this, arguments)); }; window.getProductsSafe.__azCatalogFilter = true; }
  }
  function routeFor(id){ return ROUTES[id] || (id ? id + '.html' : ''); }
  function smartGo(url,id){ var file=url.split('#')[0]; if(pathName()===file){ if(typeof window.__AZ_TRUE_PAGE_OPEN__==='function'){ try{window.__AZ_TRUE_PAGE_OPEN__()}catch(_){} } return; } location.href=file; } function installDockRouter(){ if(window.__AZ_CLUSTER_DOCK_ROUTER__)return; window.__AZ_CLUSTER_DOCK_ROUTER__=true; document.addEventListener('click', function(e){ var btn = e.target && e.target.closest && e.target.closest('#alpha-right-dock .dock-btn[data-page]'); if(!btn) return; var id = btn.getAttribute('data-page'); var url = routeFor(id); if(!url) return; e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation(); smartGo(url,id); }, true); }
  function productSnapshot(){ var p=null; try{ if(typeof window.getCurrentProduct==='function') p=window.getCurrentProduct(); }catch(_){} p=p||window.__alphaLastPaymentSnapshot||window.__alphaLastDetailSnapshot||window.lastSelectedProduct||window.currentProduct||{}; var id=val(p.id||p.productId||window.currentSelectedId||window.selectedProductId||(document.getElementById('detail-id')||{}).textContent||(document.getElementById('modal-product-id')||{}).textContent); var name=val(p.name||p.productName||p.platformName||(document.getElementById('detail-title')||{}).textContent||(document.getElementById('modal-title')||{}).textContent); var price=val(p.price||(document.getElementById('detail-price')||{}).textContent||(document.getElementById('modal-price')||{}).textContent); var logo=val(p.logo||p.categoryImage||(document.querySelector('#product-detail img')||{}).src); var out={}; for(var k in p) out[k]=p[k]; out.id=id; out.productId=id; out.name=name; out.productName=name; out.price=price; out.logo=logo; return out; }
  function saveCheckoutProduct(){ try{ localStorage.setItem('azCheckoutProduct', JSON.stringify(productSnapshot())); }catch(_){} }
  function installCheckoutLink(){ if(ctx()==='checkout') return; document.addEventListener('click', function(e){ var btn = e.target && e.target.closest && e.target.closest('#detail-buy-btn, [data-checkout], .az-checkout-link'); if(!btn) return; var label = val(btn.textContent).toLowerCase(); if(btn.id!=='detail-buy-btn' && !btn.hasAttribute('data-checkout') && !/đặt hàng|checkout|thanh toán/.test(label)) return; saveCheckoutProduct(); e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation(); location.href='checkout.html'; }, true); }
  function hydrateCheckout(){ if(ctx()!=='checkout') return; document.title='Checkout - Alpha Zone Việt Nam'; try{ var raw=localStorage.getItem('azCheckoutProduct'); var p=raw?JSON.parse(raw):{}; window.__alphaLastPaymentSnapshot=p; var set=function(id,v){ var el=document.getElementById(id); if(el&&val(v)) el.textContent=v; }; set('order-message-product',p.productName||p.name); set('order-message-product-id',p.productId||p.id); set('order-message-price',p.price); var short=document.getElementById('order-message-short-preview'); var full=document.getElementById('order-message-full-preview'); if(short&&(p.productName||p.name)) short.textContent='Em muốn đặt '+(p.productName||p.name)+', nhờ anh/chị hỗ trợ giúp em.'; if(full&&(p.productName||p.name)) full.textContent='Chào anh/chị, em gửi thông tin đặt hàng: '+(p.productName||p.name)+' - mã '+(p.productId||p.id||'')+' - giá '+(p.price||'')+'. Nhờ anh/chị hỗ trợ kích hoạt giúp em.'; }catch(_){} function open(){ if(typeof window.showPage==='function'){ try{window.showPage('order-message');}catch(_){} } document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');}); var o=document.getElementById('order-message'); if(o)o.classList.add('active'); var dock=document.getElementById('alpha-right-dock'); if(dock)dock.style.display='none'; } if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',open,{once:true}); else open(); setTimeout(open,400); setTimeout(open,1200); }
  function adminLinks(){ if(!/^admin(\-|\.html|$)/i.test(pathName())) return; if(document.getElementById('az-admin-unified-links')) return; var box=document.createElement('div'); box.id='az-admin-unified-links'; box.style.cssText='position:fixed;left:14px;bottom:14px;z-index:99999;display:flex;gap:8px;flex-wrap:wrap;max-width:calc(100vw - 28px)'; box.innerHTML='<a href="admin.html#products" style="padding:9px 12px;border-radius:999px;background:#111;color:#fff;text-decoration:none;font-size:12px">Admin tổng</a><a href="products.html" style="padding:9px 12px;border-radius:999px;background:#fff;color:#111;text-decoration:none;border:1px solid #ddd;font-size:12px">Products</a><a href="marketplace.html" style="padding:9px 12px;border-radius:999px;background:#fff;color:#111;text-decoration:none;border:1px solid #ddd;font-size:12px">Marketplace</a><a href="checkout.html" style="padding:9px 12px;border-radius:999px;background:#fff;color:#111;text-decoration:none;border:1px solid #ddd;font-size:12px">Checkout</a>'; document.body.appendChild(box); }
  function openHashPage(){ var p=pathName(), h=(location.hash||'').replace(/^#/,''); if(!/^(shop|seller|support)\.html$/.test(p) || !h) return; setTimeout(function(){ if(typeof window.showPage==='function'){ try{window.showPage(h)}catch(_){} } installCatalogFilter(); },120); } window.addEventListener('hashchange',openHashPage); function boot(){ installDockRouter(); installCatalogFilter(); installCheckoutLink(); hydrateCheckout(); adminLinks(); openHashPage(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot, {once:true}); else boot(); setInterval(installCatalogFilter,900);
})();

/* Alpha Zone checkout separation hard guard: no activation/order popup on shop pages */
(function(){
  if(window.__AZ_CHECKOUT_SEPARATION_GUARD_V2__) return;
  window.__AZ_CHECKOUT_SEPARATION_GUARD_V2__ = true;
  function fileName(){return (location.pathname.split('/').pop()||'index.html').toLowerCase();}
  function isCheckout(){return fileName()==='checkout.html';}
  function text(v){return String(v==null?'':v).trim();}
  function snapshot(){
    var p={};
    try{ if(typeof window.getCurrentProduct==='function') p=window.getCurrentProduct()||{}; }catch(_){ }
    p=p||{};
    p.id=text(p.id||p.productId||window.currentSelectedId||window.selectedProductId||(document.getElementById('detail-id')||{}).textContent||(document.getElementById('modal-product-id')||{}).textContent);
    p.productId=p.id;
    p.name=text(p.name||p.productName||p.platformName||(document.getElementById('detail-title')||{}).textContent||(document.getElementById('modal-title')||{}).textContent);
    p.productName=p.name;
    p.price=text(p.price||(document.getElementById('detail-price')||{}).textContent||(document.getElementById('modal-price')||{}).textContent);
    try{localStorage.setItem('azCheckoutProduct',JSON.stringify(p));}catch(_){ }
  }
  function goCheckout(){snapshot(); if(!isCheckout()) location.href='checkout.html';}
  function shouldCheckoutPopup(id){return /activation|order|payment|receipt|checkout/i.test(String(id||''));}
  function wrap(){
    var sm=window.showMiniPopup;
    if(typeof sm==='function' && !sm.__azCheckoutHardGuard){
      window.showMiniPopup=function(id){
        if(!isCheckout() && shouldCheckoutPopup(id)){goCheckout(); return false;}
        return sm.apply(this,arguments);
      };
      window.showMiniPopup.__azCheckoutHardGuard=true;
    }
  }
  document.addEventListener('click',function(e){
    var el=e.target&&e.target.closest&&e.target.closest('#detail-buy-btn,[data-checkout],.az-checkout-link,[onclick*="activation-popup"],[onclick*="generateReceipt"],[onclick*="payment"]');
    if(!el || isCheckout()) return;
    var label=text(el.textContent).toLowerCase();
    var onclick=text(el.getAttribute&&el.getAttribute('onclick')).toLowerCase();
    if(el.id==='detail-buy-btn'||el.hasAttribute('data-checkout')||/đặt|mua|thanh toán|checkout|kích hoạt|xac nhan|xác nhận/.test(label+' '+onclick)){
      e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation)e.stopImmediatePropagation(); goCheckout();
    }
  },true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wrap,{once:true});else wrap();
  setInterval(wrap,700);
})();

/* AZ UI Safety Patch: button visibility, dock touch expansion, overlap cleanup */
(function(){
  if(window.__AZ_UI_SAFETY_PATCH_V3__) return;
  window.__AZ_UI_SAFETY_PATCH_V3__ = true;
  function one(sel,root){return (root||document).querySelector(sel)}
  function all(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel))}
  function text(v){return String(v==null?'':v).trim()}
  function isVisible(el){return !!(el&&el.getClientRects&&el.getClientRects().length)}
  function safeTitle(btn){
    if(!btn || btn.__azSafeTitle) return;
    btn.__azSafeTitle = true;
    var label = text(btn.getAttribute('aria-label')||btn.getAttribute('title')||btn.textContent||btn.dataset.page||btn.href);
    if(label && !btn.getAttribute('title')) btn.setAttribute('title', label);
    if(label && !btn.getAttribute('aria-label') && /^button$/i.test(btn.tagName)) btn.setAttribute('aria-label', label);
  }
  function cleanDuplicates(){
    var docks=all('#alpha-right-dock');
    docks.forEach(function(d,i){ if(i>0){ d.dataset.azHiddenBySafety='1'; } });
    var ids={};
    all('[id]').forEach(function(el){ var id=el.id; if(!id) return; ids[id]=ids[id]||[]; ids[id].push(el); });
    Object.keys(ids).forEach(function(id){ if(!/^az-admin-unified-links|az-admin-popup-tools$/.test(id)) return; ids[id].forEach(function(el,i){ if(i>0) el.dataset.azHiddenBySafety='1'; }); });
  }
  function dockTouch(){
    var dock=one('#alpha-right-dock');
    if(!dock || dock.__azTouchReady) return;
    dock.__azTouchReady=true;
    var timer=null;
    function expand(){ dock.classList.add('az-touch-expanded'); clearTimeout(timer); timer=setTimeout(function(){dock.classList.remove('az-touch-expanded')},4200); }
    dock.addEventListener('pointerenter',expand,{passive:true});
    dock.addEventListener('touchstart',expand,{passive:true});
    dock.addEventListener('focusin',expand);
    dock.addEventListener('pointerleave',function(){ clearTimeout(timer); timer=setTimeout(function(){dock.classList.remove('az-touch-expanded')},900); },{passive:true});
  }
  function keepActionsUsable(root){
    all('button,a,[role="button"],.btn,.tab-btn,.subtab-btn,.chip,.inline-chip,.dock-btn',root).forEach(function(btn){
      safeTitle(btn);
      if(btn.matches('[hidden],.hidden,.hidden-pane *')) return;
      btn.style.pointerEvents='auto';
      if(!btn.style.position) btn.style.position='relative';
      if(!btn.style.zIndex) btn.style.zIndex='2';
    });
    all('.azm-actions,.hero-actions,.inline-chip-row',root).forEach(function(row){ row.style.overflow='visible'; row.style.flexWrap='wrap'; });
  }
  function avoidAdminOverlap(){
    var links=one('#az-admin-unified-links'), panel=one('#az-admin-popup-tools');
    if(links && panel && isVisible(links) && isVisible(panel)){
      links.style.bottom = panel.classList.contains('az-collapsed') ? '70px' : '110px';
    }
  }
  function boot(){ cleanDuplicates(); dockTouch(); keepActionsUsable(document); avoidAdminOverlap(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
  setInterval(boot,1200);
  try{ new MutationObserver(function(ms){ ms.forEach(function(m){ Array.prototype.forEach.call(m.addedNodes||[],function(n){ if(n.nodeType===1){ keepActionsUsable(n); cleanDuplicates(); dockTouch(); avoidAdminOverlap(); } }); }); }).observe(document.documentElement,{childList:true,subtree:true}); }catch(_){ }
})();
/* AZ Deep Feature Patch: custom link buttons + top page popup + action visibility safety */
(function(){
  if (window.__AZ_DEEP_LINK_POPUP_FIX_V2__) return;
  window.__AZ_DEEP_LINK_POPUP_FIX_V2__ = true;

  var STORE_LINKS = 'azCustomLinkButtons';
  var STORE_POPUP = 'azTopPagePopup';
  var STORE_POPUP_DISMISSED = 'azTopPagePopupDismissedAt';

  function qs(s,r){ return (r||document).querySelector(s); }
  function qsa(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
  function txt(v){ return String(v == null ? '' : v).trim(); }
  function esc(v){ return txt(v).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function safeUrl(u){
    u = txt(u);
    if (!u || /^javascript:/i.test(u) || /^data:/i.test(u)) return '';
    if (/^(https?:|mailto:|tel:)/i.test(u)) return u;
    if (/^[a-z0-9._~!$&'()*+,;=:@%/-]+\.html([?#].*)?$/i.test(u)) return u;
    if (/^[./#]/.test(u)) return u;
    return 'https://' + u.replace(/^\/+/, '');
  }
  function readJson(key, fallback){
    try { var v = JSON.parse(localStorage.getItem(key) || ''); return v == null ? fallback : v; } catch(_) { return fallback; }
  }
  function writeJson(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
  function isAdminPage(){ return /(^|\/)admin(\.html|-.+\.html)?$/i.test(location.pathname); }

  function getLinks(){
    var arr = readJson(STORE_LINKS, []);
    if (!Array.isArray(arr)) arr = [];
    return arr.filter(function(x){ return x && x.enabled !== false && txt(x.label) && safeUrl(x.url); });
  }
  function saveLinks(arr){ writeJson(STORE_LINKS, Array.isArray(arr) ? arr : []); renderLinkBar(true); renderAdminFeaturePanel(); }
  function getPopup(){
    var p = readJson(STORE_POPUP, null);
    if (!p || typeof p !== 'object') return null;
    p.enabled = p.enabled !== false;
    p.title = txt(p.title || 'Thông báo');
    p.message = txt(p.message || '');
    p.buttonLabel = txt(p.buttonLabel || 'Mở link');
    p.buttonUrl = safeUrl(p.buttonUrl || '');
    p.updatedAt = p.updatedAt || String(Date.now());
    return p;
  }
  function savePopup(p){
    p = p || {};
    writeJson(STORE_POPUP, {
      enabled: p.enabled !== false,
      title: txt(p.title || 'Thông báo'),
      message: txt(p.message || ''),
      buttonLabel: txt(p.buttonLabel || 'Mở link'),
      buttonUrl: safeUrl(p.buttonUrl || ''),
      mode: txt(p.mode || 'always'),
      updatedAt: String(Date.now())
    });
    localStorage.removeItem(STORE_POPUP_DISMISSED);
    renderTopPopup(true);
    renderAdminFeaturePanel();
  }

  window.azAddCustomLinkButton = function(label, url){
    var arr = readJson(STORE_LINKS, []); if (!Array.isArray(arr)) arr = [];
    var u = safeUrl(url);
    if (!txt(label) || !u) return false;
    arr.push({ id: 'link-' + Date.now(), label: txt(label), url: u, enabled: true, createdAt: new Date().toISOString() });
    saveLinks(arr); return true;
  };
  window.azSetTopPagePopup = savePopup;
  window.azClearTopPagePopup = function(){ localStorage.removeItem(STORE_POPUP); localStorage.removeItem(STORE_POPUP_DISMISSED); renderTopPopup(true); renderAdminFeaturePanel(); };

  function renderLinkBar(force){
    var links = getLinks();
    var old = qs('#az-custom-link-bar');
    if (!links.length) { if (old) old.remove(); document.documentElement.style.setProperty('--az-linkbar-height','0px'); return; }
    var bar = old || document.createElement('nav');
    bar.id = 'az-custom-link-bar';
    bar.className = 'az-custom-link-bar';
    bar.setAttribute('aria-label','Nút link tùy chỉnh');
    bar.innerHTML = links.map(function(x){
      var target = /^https?:/i.test(x.url) ? ' target="_blank" rel="noopener"' : '';
      return '<a class="az-custom-link-btn" href="'+esc(x.url)+'"'+target+'><span>'+esc(x.label)+'</span><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>';
    }).join('');
    if (!old) document.body.appendChild(bar);
    setTimeout(function(){ document.documentElement.style.setProperty('--az-linkbar-height', (bar.getBoundingClientRect().height || 0) + 'px'); },50);
  }

  function popupDismissed(p){
    if (!p) return true;
    if (p.mode !== 'once') return false;
    return localStorage.getItem(STORE_POPUP_DISMISSED) === String(p.updatedAt);
  }
  function renderTopPopup(force){
    var p = getPopup();
    var old = qs('#az-top-page-popup');
    if (!p || !p.enabled || popupDismissed(p)) { if (old) old.remove(); document.documentElement.style.setProperty('--az-popup-height','0px'); return; }
    var box = old || document.createElement('section');
    box.id = 'az-top-page-popup';
    box.className = 'az-top-page-popup';
    box.innerHTML = '<div class="az-top-popup-content"><div class="az-top-popup-text"><strong>'+esc(p.title)+'</strong>'+(p.message?'<span>'+esc(p.message)+'</span>':'')+'</div><div class="az-top-popup-actions">'+(p.buttonUrl?'<a class="az-top-popup-link" href="'+esc(p.buttonUrl)+'" '+(/^https?:/i.test(p.buttonUrl)?'target="_blank" rel="noopener"':'')+'>'+esc(p.buttonLabel||'Mở link')+'</a>':'')+'<button type="button" class="az-top-popup-close" aria-label="Đóng thông báo">×</button></div></div>';
    if (!old) document.body.prepend(box);
    qs('.az-top-popup-close', box).onclick = function(){ localStorage.setItem(STORE_POPUP_DISMISSED, String(p.updatedAt)); renderTopPopup(true); };
    setTimeout(function(){ document.documentElement.style.setProperty('--az-popup-height', (box.getBoundingClientRect().height || 0) + 'px'); },50);
  }

  function renderAdminFeaturePanel(){
    if (!isAdminPage()) return;
    var host = qs('#az-admin-link-popup-manager');
    var root = qs('.max-w-7xl') || document.body;
    var links = readJson(STORE_LINKS, []); if (!Array.isArray(links)) links = [];
    var p = getPopup() || { enabled:false, title:'', message:'', buttonLabel:'', buttonUrl:'', mode:'always' };
    var html = ''+
      '<section id="az-admin-link-popup-manager" class="glass card az-admin-link-popup-manager">'+
      '<div class="az-admin-lp-head"><div><h2 class="section-title">Nút link & popup đầu trang</h2><p class="small muted mt-1">Quản lý nhanh nút gắn link và popup đầu trang. Lưu trong trình duyệt/domain hiện tại, không ảnh hưởng API hay dữ liệu sản phẩm.</p></div><button type="button" class="btn px-4 py-3 rounded-2xl font-medium" data-az-lp-collapse>Thu gọn</button></div>'+
      '<div class="az-admin-lp-body">'+
      '<div class="soft-panel az-admin-lp-grid"><div><div class="font-semibold mb-2">Thêm nút gắn link</div><input class="field" id="az-lp-label" placeholder="Tên nút, ví dụ: Zalo hỗ trợ"><input class="field mt-2" id="az-lp-url" placeholder="Link, ví dụ: https://... hoặc seller-channel.html"><button type="button" class="btn btn-primary px-4 py-3 rounded-2xl font-medium mt-2" id="az-lp-add">Thêm nút</button></div><div><div class="font-semibold mb-2">Danh sách nút hiện có</div><div id="az-lp-list" class="az-lp-list">'+(links.length?links.map(function(x,i){ return '<div class="az-lp-item"><a href="'+esc(safeUrl(x.url))+'" target="_blank" rel="noopener">'+esc(x.label||'Link')+'</a><button type="button" data-az-lp-del="'+i+'">Xóa</button></div>'; }).join(''):'<div class="muted text-sm">Chưa có nút tùy chỉnh.</div>')+'</div></div></div>'+
      '<div class="soft-panel"><div class="font-semibold mb-2">Popup đầu trang</div><div class="grid md:grid-cols-2 gap-3"><input class="field" id="az-popup-title" placeholder="Tiêu đề popup" value="'+esc(p.title||'')+'"><input class="field" id="az-popup-btn-label" placeholder="Tên nút popup" value="'+esc(p.buttonLabel||'')+'"><input class="field md:col-span-2" id="az-popup-url" placeholder="Link nút popup" value="'+esc(p.buttonUrl||'')+'"><textarea class="area md:col-span-2" id="az-popup-msg" placeholder="Nội dung popup">'+esc(p.message||'')+'</textarea></div><div class="az-admin-popup-row mt-3"><button type="button" class="az-admin-popup-btn" id="az-popup-save">Lưu & bật popup</button><button type="button" class="az-admin-popup-btn" id="az-popup-off">Tắt popup</button><button type="button" class="az-admin-popup-btn" id="az-popup-clear">Xóa popup</button><label class="az-popup-once"><input type="checkbox" id="az-popup-once" '+(p.mode==='once'?'checked':'')+'> Chỉ hiện 1 lần sau khi khách đóng</label></div></div>'+
      '</div></section>';
    if (host) { host.outerHTML = html; host = qs('#az-admin-link-popup-manager'); }
    else {
      var anchor = root.children[1] || root.firstElementChild;
      var tmp = document.createElement('div'); tmp.innerHTML = html;
      root.insertBefore(tmp.firstElementChild, anchor ? anchor.nextSibling : null);
      host = qs('#az-admin-link-popup-manager');
    }
    if (!host) return;
    qs('#az-lp-add',host).onclick = function(){
      if (!window.azAddCustomLinkButton(qs('#az-lp-label',host).value, qs('#az-lp-url',host).value)) alert('Vui lòng nhập tên nút và link hợp lệ.');
    };
    qsa('[data-az-lp-del]',host).forEach(function(b){ b.onclick = function(){ var arr=readJson(STORE_LINKS,[]); arr.splice(parseInt(b.getAttribute('data-az-lp-del'),10),1); saveLinks(arr); }; });
    qs('#az-popup-save',host).onclick = function(){ savePopup({ enabled:true, title:qs('#az-popup-title',host).value, message:qs('#az-popup-msg',host).value, buttonLabel:qs('#az-popup-btn-label',host).value, buttonUrl:qs('#az-popup-url',host).value, mode:qs('#az-popup-once',host).checked?'once':'always' }); };
    qs('#az-popup-off',host).onclick = function(){ var cur=getPopup()||{}; cur.enabled=false; savePopup(cur); };
    qs('#az-popup-clear',host).onclick = window.azClearTopPagePopup;
    qs('[data-az-lp-collapse]',host).onclick = function(){ host.classList.toggle('az-collapsed'); this.textContent = host.classList.contains('az-collapsed') ? 'Mở' : 'Thu gọn'; };
  }

  function deepRevealActions(root){
    root = root || document;
    var selectors = [
      'button:not([hidden])','a[href]:not([hidden])','[role="button"]:not([hidden])','.btn','.tab-btn','.subtab-btn','.chip','.inline-chip','.dock-btn',
      '[data-tab]','[data-page]','[data-section]','[data-action]','[onclick]','#modal-actions a','#modal-actions button','.azm-actions button','.hero-actions button'
    ].join(',');
    qsa(selectors, root).forEach(function(el){
      if (!el || el.closest('[hidden],.hidden-pane,.hidden,[aria-hidden="true"]')) return;
      el.classList.add('az-action-safe');
      el.style.pointerEvents = 'auto';
      if (!el.style.position || el.style.position === 'static') el.style.position = 'relative';
      if (!el.style.zIndex) el.style.zIndex = '5';
      if ((el.offsetWidth < 8 || el.offsetHeight < 8) && !el.closest('#alpha-right-dock')) el.classList.add('az-action-minsize');
    });
    qsa('.actions,.action,.action-row,.azm-actions,.hero-actions,.inline-chip-row,#modal-actions,[id$="Actions"],[class*="actions"]', root).forEach(function(row){
      if (row.closest('[hidden],.hidden-pane,.hidden,[aria-hidden="true"]')) return;
      row.classList.add('az-action-row-safe');
    });
  }

  function boot(){ renderTopPopup(); renderLinkBar(); renderAdminFeaturePanel(); deepRevealActions(document); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true}); else boot();
  setInterval(function(){ renderTopPopup(); renderLinkBar(); deepRevealActions(document); }, 1600);
  try { new MutationObserver(function(ms){ ms.forEach(function(m){ Array.prototype.forEach.call(m.addedNodes||[],function(n){ if(n.nodeType===1) { deepRevealActions(n); } }); }); }).observe(document.documentElement,{childList:true,subtree:true}); } catch(_){} 
})();

/* AZ True Real Pages Guard */
(function(){if(window.__AZ_TRUE_REAL_PAGES_GUARD__)return;window.__AZ_TRUE_REAL_PAGES_GUARD__=true;var MAP={home:'home.html',categories:'categories.html',products:'products.html','engagement-hub':'engagement-hub.html',marketplace:'marketplace.html','seller-channel':'seller-channel.html',warranty:'warranty.html','about-us':'about-us.html',account:'account.html',admin:'admin.html'};function file(){return(location.pathname.split('/').pop()||'index.html').toLowerCase()}function pg(){return({'index.html':'home','home.html':'home','categories.html':'categories','products.html':'products','engagement-hub.html':'engagement-hub','marketplace.html':'marketplace','seller-channel.html':'seller-channel','warranty.html':'warranty','about-us.html':'about-us','account.html':'account','checkout.html':'checkout'})[file()]||'home'}function open(){var id=pg();if(/^admin(\.html|-)/i.test(file()))return;if(location.hash){try{history.replaceState(null,'',location.pathname+location.search)}catch(_){}}try{if(typeof window.showPage==='function')window.showPage(id)}catch(_){}var el=document.getElementById(id);if(el){document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active')});el.classList.add('active')}document.querySelectorAll('#alpha-right-dock .dock-btn[data-page]').forEach(function(btn){btn.classList.toggle('active',btn.getAttribute('data-page')===id)})}window.__AZ_TRUE_PAGE_OPEN__=open;document.addEventListener('click',function(e){var b=e.target&&e.target.closest&&e.target.closest('#alpha-right-dock .dock-btn[data-page]');if(!b)return;var id=b.getAttribute('data-page'),url=MAP[id];if(!url)return;e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();if(file()===url.toLowerCase())open();else location.href=url},true);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',open,{once:true});else open();setTimeout(open,300);setTimeout(open,1000);setTimeout(open,2200);})();

/* AZ Promo-Off + Deep Interaction Fix */
(function(){
  if(window.__AZ_PROMO_OFF_INTERACTION_FIX__) return;
  window.__AZ_PROMO_OFF_INTERACTION_FIX__ = true;
  var PROMO_SELECTORS = [
    '#promoPopup','.promo-popup-overlay','.promo-popup-box','.az-top-page-popup','[data-az-promo]',
    '.az-promo','.promo-modal','.promotion-modal','.marketing-popup','#az-admin-popup-tools'
  ].join(',');
  function killPromo(){
    try{ document.body && document.body.classList.remove('popup-open'); }catch(_){ }
    try{ localStorage.setItem('azSmartPopupsEnabled','0'); localStorage.removeItem('azTopPagePopup'); localStorage.removeItem('azTopPagePopupDismissedAt'); }catch(_){ }
    document.querySelectorAll(PROMO_SELECTORS).forEach(function(el){
      if(!el) return;
      el.classList.remove('show','active','open');
      el.setAttribute('aria-hidden','true');
      el.style.setProperty('display','none','important');
      el.style.setProperty('visibility','hidden','important');
      el.style.setProperty('opacity','0','important');
      el.style.setProperty('pointer-events','none','important');
    });
    document.documentElement.style.setProperty('--az-popup-height','0px');
  }
  function safeActions(root){
    root = root || document;
    root.querySelectorAll('button,a,[role="button"],input,select,textarea,.btn,.tab-btn,.subtab-btn,.chip,.inline-chip,.dock-btn,[data-page],[data-route],[data-tab],[data-subtab]').forEach(function(el){
      if(el.closest && el.closest(PROMO_SELECTORS)) return;
      el.style.setProperty('pointer-events','auto','important');
      if(!el.style.position) el.style.position='relative';
      if(!el.style.zIndex) el.style.zIndex='5';
      var label=(el.getAttribute('aria-label')||el.getAttribute('title')||el.textContent||el.dataset.page||'').trim();
      if(label && !el.getAttribute('title')) el.setAttribute('title',label);
    });
    root.querySelectorAll('.hero-actions,.azm-actions,.inline-chip-row,.tab-row,.filter-row,.quick-row,.action-row,.modal-actions,#modal-actions').forEach(function(row){
      row.style.setProperty('display','flex','important');
      row.style.setProperty('flex-wrap','wrap','important');
      row.style.setProperty('overflow','visible','important');
      row.style.setProperty('max-height','none','important');
    });
  }
  window.azSetTopPagePopup = function(){ killPromo(); return false; };
  window.azClearTopPagePopup = function(){ killPromo(); return true; };
  function boot(){ killPromo(); safeActions(document); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
  window.addEventListener('load',boot,{once:true});
  window.addEventListener('pageshow',boot);
  setTimeout(boot,300); setTimeout(boot,1200); setTimeout(boot,3000);
  try{ new MutationObserver(function(ms){ ms.forEach(function(m){ Array.prototype.forEach.call(m.addedNodes||[],function(n){ if(n.nodeType===1){ killPromo(); safeActions(n); } }); }); }).observe(document.documentElement,{childList:true,subtree:true}); }catch(_){ }
})();

/* AZ Checkout Only Final Fix: remove order-message flow and route all buying to checkout.html */
(function(){
  if(window.__AZ_CHECKOUT_ONLY_FINAL__) return;
  window.__AZ_CHECKOUT_ONLY_FINAL__ = true;
  var CHECKOUT = 'checkout.html';
  function file(){ return (location.pathname.split('/').pop() || 'index.html').toLowerCase(); }
  function isCheckout(){ return file() === 'checkout.html'; }
  function isAdmin(){ return /^admin(\.|-|$)/i.test(file()); }
  function clean(v){ return String(v == null ? '' : v).trim(); }
  function text(el){ return clean((el && (el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || el.value)) || '').replace(/\s+/g,' '); }
  function first(ids){ for(var i=0;i<ids.length;i++){ var el=document.getElementById(ids[i]); if(el){ var v=('value' in el?el.value:el.textContent); if(clean(v) && clean(v) !== '—') return clean(v); } } return ''; }
  function currentProduct(el){
    var p={};
    try{ if(typeof window.getCurrentProduct==='function') p=window.getCurrentProduct() || {}; }catch(_){}
    p=p||{};
    [window.__alphaLastPaymentSnapshot,window.__alphaLastDetailSnapshot,window.lastSelectedProduct,window.currentProduct,window.selectedProduct].forEach(function(x){ if(x&&typeof x==='object') Object.keys(x).forEach(function(k){ if(!p[k]) p[k]=x[k]; }); });
    var card=el && el.closest && el.closest('[data-product-id],[data-id],.product-card,.service-card,.brand-card,.app-card,.product-item');
    if(card){
      p.id=p.id||card.getAttribute('data-product-id')||card.getAttribute('data-id')||'';
      p.name=p.name||clean((card.querySelector('[data-product-name],.product-title,h3,h4,.title')||{}).textContent);
      p.price=p.price||clean((card.querySelector('[data-product-price],.price,.product-price,.font-price')||{}).textContent);
      var img=card.querySelector('img'); if(img) p.logo=p.logo||img.getAttribute('src');
    }
    p.id=p.id||first(['order-message-product-id','modal-product-id','selected-product-id','product-detail-id']);
    p.name=p.name||p.productName||first(['order-message-product','modal-title','detail-title','product-detail-name','payment-product-name']);
    p.price=p.price||first(['order-message-price','modal-price','detail-price','payment-amount-main','payment-amount-secondary']);
    return p;
  }
  function saveProduct(p){ try{ localStorage.setItem('azCheckoutProduct', JSON.stringify(p||{})); }catch(_){} }
  window.azGoCheckout = function(product){ saveProduct(product || currentProduct(document.activeElement)); if(!isCheckout()) location.href = CHECKOUT; return false; };
  function hideOld(){
    if(!isCheckout()){
      document.querySelectorAll('#order-message,.order-chat-page,.order-chat-shell,.order-chat-window,.order-chat-actions-grid').forEach(function(el){
        el.style.setProperty('display','none','important'); el.style.setProperty('visibility','hidden','important'); el.style.setProperty('pointer-events','none','important');
      });
    }
    document.querySelectorAll('[data-page="order-message"]').forEach(function(el){ el.setAttribute('data-page','checkout'); if(el.tagName==='A') el.setAttribute('href',CHECKOUT); });
    document.querySelectorAll('a[href*="order-message"],a[href*="#order-message"]').forEach(function(a){ a.setAttribute('href',CHECKOUT); });
  }
  function looksBuy(el){
    if(!el || isCheckout() || isAdmin()) return false;
    if(el.closest && el.closest('#alpha-right-dock,.az-admin-popup-tools,#az-admin-link-popup-manager,[data-az-no-checkout]')) return false;
    var hay=(text(el)+' '+clean(el.id)+' '+clean(el.className)+' '+clean(el.getAttribute('data-action'))+' '+clean(el.getAttribute('data-page'))).toLowerCase();
    return /(tiến hành đặt hàng|dat hang|đặt hàng|mua ngay|mua hàng|thanh toán|checkout|order-message|detail-buy-btn|buy-btn|order-btn)/i.test(hay);
  }
  function wrapShowPage(){ var oldShow = window.showPage; if(typeof oldShow === 'function' && !oldShow.__azCheckoutOnly){ window.showPage = function(id){ if(String(id)==='order-message' || String(id)==='checkout'){ return window.azGoCheckout(currentProduct(document.activeElement)); } return oldShow.apply(this, arguments); }; window.showPage.__azCheckoutOnly = true; } }
  document.addEventListener('click', function(e){
    var el=e.target && e.target.closest && e.target.closest('button,a,[role="button"],[onclick],.btn,.buy-btn,.order-btn');
    if(!looksBuy(el)) return;
    e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    window.azGoCheckout(currentProduct(el));
  }, true);
  function boot(){ hideOld(); wrapShowPage(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot, {once:true}); else boot();
  window.addEventListener('pageshow', boot); setTimeout(boot,300); setTimeout(boot,1500); setInterval(wrapShowPage,1200);
  try{ new MutationObserver(boot).observe(document.documentElement,{childList:true,subtree:true}); }catch(_){}
})();
