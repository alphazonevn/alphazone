img[data-az-smart-img="1"]{max-width:100%;object-fit:contain;background:rgba(255,255,255,.08)}
img.az-img-fallback{padding:10%;border-radius:inherit;background:linear-gradient(135deg,rgba(255,255,255,.72),rgba(0,0,0,.04))}
.az-admin-popup-tools{position:fixed;right:18px;bottom:18px;z-index:99999;width:min(330px,calc(100vw - 36px));border:1px solid rgba(0,0,0,.12);border-radius:22px;padding:14px;background:rgba(255,255,255,.92);backdrop-filter:blur(18px);box-shadow:0 24px 70px rgba(0,0,0,.16);font-family:Plus Jakarta Sans,system-ui,sans-serif;color:#111}
.az-admin-popup-tools.az-collapsed{width:auto;padding:10px 12px;border-radius:999px}.az-admin-popup-tools.az-collapsed .az-admin-popup-body{display:none}.az-admin-popup-head{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}.az-admin-popup-body{display:grid;gap:10px;margin-top:12px;font-size:12px;line-height:1.45;color:#555}.az-admin-popup-row{display:flex;flex-wrap:wrap;gap:8px}.az-admin-popup-btn{border:1px solid rgba(0,0,0,.14);border-radius:999px;background:#fff;color:#111;padding:9px 11px;font-size:12px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px}.az-admin-popup-btn.active{background:#111;color:#fff}.az-admin-popup-status{padding:10px 12px;border-radius:16px;background:#f4f4f2;color:#333}.az-smart-link-btn{border:1px solid rgba(0,0,0,.12)!important;border-radius:999px!important;background:#111!important;color:#fff!important;padding:12px 14px!important;font-size:12px!important;font-weight:900!important;text-decoration:none!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;white-space:nowrap!important}.az-smart-link-btn:hover{filter:brightness(.92)}
body.dark .az-admin-popup-tools{background:rgba(15,15,15,.92);color:#fff;border-color:rgba(255,255,255,.12)}body.dark .az-admin-popup-btn{background:#151515;color:#fff;border-color:rgba(255,255,255,.14)}body.dark .az-admin-popup-btn.active{background:#fff;color:#111}body.dark .az-admin-popup-status{background:#222;color:#ddd}

/* AZ UI Safety Patch: keep action buttons visible and prevent floating controls overlapping */
:root{--az-dock-safe-width:210px;--az-dock-safe-gap:18px;--az-bottom-safe:86px}
button,a,[role="button"],.btn,.tab-btn,.subtab-btn,.chip,.inline-chip,.dock-btn,.az-admin-popup-btn,.az-smart-link-btn{position:relative;z-index:2;pointer-events:auto;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
button:not([hidden]),a:not([hidden]),.btn:not([hidden]),.tab-btn:not([hidden]),.subtab-btn:not([hidden]),.chip:not([hidden]),.inline-chip:not([hidden]){opacity:1;visibility:visible}
.hero-actions,.azm-actions,.inline-chip-row,.grid[class*="grid-cols"],.flex.flex-wrap{min-width:0}
.azm-actions,.hero-actions,.inline-chip-row{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:10px!important;overflow:visible!important}
.azm-actions button,.hero-actions button,.inline-chip,.btn,.tab-btn,.subtab-btn,.chip{min-height:40px;max-width:100%;white-space:normal!important;overflow:visible!important;text-overflow:clip!important}
.product-card,.soft-panel,.card,.card-tight,.glass{min-width:0}
.glass.card,.glass.card-tight,.soft-panel:has(button),.product-card:has(button){overflow:visible!important}
#alpha-right-dock{position:fixed!important;right:18px!important;top:50%!important;bottom:auto!important;transform:translateY(-50%)!important;z-index:2147482000!important;display:flex!important;flex-direction:column!important;pointer-events:auto!important;overflow:visible!important;max-height:calc(100vh - 32px)!important;overflow-y:auto!important;scrollbar-width:none!important}
#alpha-right-dock::-webkit-scrollbar{display:none!important}
#alpha-right-dock .dock-btn{display:flex!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important;flex-shrink:0!important;box-sizing:border-box!important}
#alpha-right-dock .dock-icon,#alpha-right-dock .dock-label{pointer-events:none!important}
@media (min-width:901px){
  body:has(#alpha-right-dock){padding-right:calc(var(--az-dock-safe-width) + var(--az-dock-safe-gap))!important}
  #alpha-right-dock{width:var(--az-dock-safe-width)!important;padding:10px!important;gap:10px!important;border-radius:24px!important;align-items:stretch!important}
  #alpha-right-dock .dock-btn{width:100%!important;min-width:100%!important;justify-content:flex-start!important;gap:12px!important;padding:0 14px!important;height:44px!important;min-height:44px!important;overflow:visible!important;white-space:nowrap!important}
  #alpha-right-dock .dock-label{display:inline-block!important;opacity:1!important;visibility:visible!important;max-width:150px!important;overflow:visible!important;transform:none!important;white-space:nowrap!important;color:inherit!important}
}
@media (max-width:900px){
  body:has(#alpha-right-dock){padding-right:70px!important}
  #alpha-right-dock{right:8px!important;width:56px!important;padding:7px!important;gap:8px!important;border-radius:20px!important;overflow:hidden!important}
  #alpha-right-dock.expanded,#alpha-right-dock.az-touch-expanded{width:min(190px,calc(100vw - 20px))!important;overflow:visible!important}
  #alpha-right-dock.expanded .dock-btn,#alpha-right-dock.az-touch-expanded .dock-btn{justify-content:flex-start!important;gap:10px!important;padding:0 12px!important}
  #alpha-right-dock .dock-label{opacity:0!important;visibility:hidden!important;max-width:0!important;overflow:hidden!important}
  #alpha-right-dock.expanded .dock-label,#alpha-right-dock.az-touch-expanded .dock-label{opacity:1!important;visibility:visible!important;max-width:120px!important;overflow:visible!important;transform:none!important}
}
body.modal-open #alpha-right-dock,.az-modal-open #alpha-right-dock{display:none!important}
#az-admin-popup-tools{z-index:2147480900!important}
#az-admin-unified-links{z-index:2147480800!important;bottom:calc(var(--az-bottom-safe) + 12px)!important;left:14px!important;right:auto!important;max-width:min(520px,calc(100vw - 28px))!important}
#az-admin-unified-links a{box-shadow:0 10px 30px rgba(0,0,0,.12)}
.az-admin-popup-tools{bottom:14px!important;right:14px!important;max-height:calc(100vh - 28px)!important;overflow:auto!important}
@media (max-width:768px){
  #az-admin-unified-links{position:static!important;margin:14px 0!important;display:flex!important;max-width:100%!important}
  .az-admin-popup-tools{left:10px!important;right:10px!important;bottom:10px!important;width:auto!important;max-width:none!important}
  .az-admin-popup-tools:not(.az-collapsed){max-height:46vh!important}
}
/* prevent duplicated floating layers from blocking main actions */
#alpha-right-dock ~ #alpha-right-dock{display:none!important}
[data-az-hidden-by-safety="1"]{display:none!important}

/* AZ Deep Feature Patch: top popup, custom link buttons, stronger action safety */
:root{--az-popup-height:0px;--az-linkbar-height:0px}
.az-top-page-popup{position:fixed;left:14px;right:14px;top:12px;z-index:2147482600;pointer-events:none;font-family:Plus Jakarta Sans,system-ui,sans-serif}
.az-top-popup-content{pointer-events:auto;margin:0 auto;max-width:min(980px,calc(100vw - 28px));display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px;border:1px solid rgba(0,0,0,.12);border-radius:22px;background:rgba(255,255,255,.94);backdrop-filter:blur(18px);box-shadow:0 18px 60px rgba(0,0,0,.16);color:#111}
.az-top-popup-text{display:grid;gap:3px;min-width:0}.az-top-popup-text strong{font-size:14px;line-height:1.25}.az-top-popup-text span{font-size:12px;color:#555;line-height:1.35}.az-top-popup-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.az-top-popup-link,.az-top-popup-close{display:inline-flex;align-items:center;justify-content:center;min-height:36px;border-radius:999px;border:1px solid rgba(0,0,0,.14);font-size:12px;font-weight:800;text-decoration:none;cursor:pointer}.az-top-popup-link{padding:0 13px;background:#111;color:#fff}.az-top-popup-close{width:36px;background:#fff;color:#111}
.az-custom-link-bar{position:fixed;left:14px;top:calc(18px + var(--az-popup-height));z-index:2147482400;display:flex;flex-wrap:wrap;gap:8px;max-width:min(760px,calc(100vw - 260px));pointer-events:none;font-family:Plus Jakarta Sans,system-ui,sans-serif}.az-custom-link-btn{pointer-events:auto;display:inline-flex;align-items:center;gap:8px;min-height:38px;padding:0 13px;border-radius:999px;border:1px solid rgba(0,0,0,.12);background:rgba(255,255,255,.92);color:#111;text-decoration:none;font-size:12px;font-weight:900;box-shadow:0 12px 32px rgba(0,0,0,.10);backdrop-filter:blur(14px)}.az-custom-link-btn:hover{transform:translateY(-1px)}
body:has(.az-top-page-popup){scroll-padding-top:calc(var(--az-popup-height) + 24px)}
.az-admin-link-popup-manager{overflow:visible!important}.az-admin-lp-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}.az-admin-lp-body{display:grid;gap:14px;margin-top:14px}.az-admin-link-popup-manager.az-collapsed .az-admin-lp-body{display:none}.az-admin-lp-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.az-lp-list{display:grid;gap:8px}.az-lp-item{display:flex;align-items:center;justify-content:space-between;gap:10px;border:1px solid var(--line,rgba(0,0,0,.12));border-radius:16px;padding:10px;background:rgba(255,255,255,.34)}.az-lp-item a{font-size:13px;font-weight:800;color:inherit;text-decoration:none;min-width:0;overflow-wrap:anywhere}.az-lp-item button{border:1px solid var(--line,rgba(0,0,0,.12));border-radius:999px;background:var(--input,#fff);padding:8px 11px;font-size:12px}.az-popup-once{display:inline-flex;align-items:center;gap:8px;font-size:12px;color:var(--muted,#555);padding:8px 10px;border:1px solid var(--line,rgba(0,0,0,.12));border-radius:999px}
.az-action-safe{opacity:1!important;visibility:visible!important;pointer-events:auto!important;overflow:visible!important}.az-action-minsize{min-width:36px!important;min-height:36px!important}.az-action-row-safe{display:flex!important;flex-wrap:wrap!important;gap:10px!important;align-items:center!important;overflow:visible!important;max-height:none!important;clip-path:none!important}.az-action-row-safe>*{flex-shrink:0}.glass:has(.az-action-row-safe),.soft-panel:has(.az-action-row-safe),.product-card:has(.az-action-row-safe),.card:has(.az-action-row-safe){overflow:visible!important}.az-top-page-popup+*,.az-custom-link-bar+*{pointer-events:auto}
body.dark .az-top-popup-content,body.dark .az-custom-link-btn{background:rgba(16,16,16,.94);color:#fff;border-color:rgba(255,255,255,.14)}body.dark .az-top-popup-text span{color:#cfcfcf}body.dark .az-top-popup-close{background:#191919;color:#fff;border-color:rgba(255,255,255,.14)}body.dark .az-top-popup-link{background:#fff;color:#111}
@media (max-width:900px){.az-top-page-popup{left:10px;right:74px;top:10px}.az-top-popup-content{align-items:flex-start;flex-direction:column;border-radius:20px}.az-top-popup-actions{width:100%;justify-content:space-between}.az-top-popup-link{flex:1}.az-custom-link-bar{left:10px;right:74px;top:calc(12px + var(--az-popup-height));max-width:none;max-height:92px;overflow:auto}.az-admin-lp-grid{grid-template-columns:1fr}.az-admin-lp-head{flex-direction:column}.az-custom-link-btn{max-width:100%;overflow:hidden}.az-custom-link-btn span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}

/* AZ Promo-Off + Deep Interaction Fix */
html,body{max-width:100%!important;overflow-x:hidden!important}
body.popup-open{overflow:auto!important}
#promoPopup,.promo-popup-overlay,.promo-popup-box,.promo-popup-content,.az-top-page-popup,[data-az-promo],.az-promo,.promo-modal,.promotion-modal,.marketing-popup{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}
#az-admin-popup-tools{display:none!important;visibility:hidden!important;pointer-events:none!important}
.az-custom-link-bar{z-index:2147481200!important;pointer-events:none!important}.az-custom-link-bar a{pointer-events:auto!important}
button,a,[role="button"],input,select,textarea,.btn,.tab-btn,.subtab-btn,.chip,.inline-chip,.dock-btn,.product-card,[data-page],[data-route],[data-tab],[data-subtab]{pointer-events:auto!important;visibility:visible;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
button,.btn,.tab-btn,.subtab-btn,.chip,.inline-chip,.dock-btn,.az-action-safe,[data-page],[data-route]{min-height:36px;position:relative;z-index:5}
.hero-actions,.azm-actions,.inline-chip-row,.tab-row,.filter-row,.quick-row,.action-row,.modal-actions,#modal-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;align-items:center!important;overflow:visible!important;max-height:none!important;clip-path:none!important}
.glass,.card,.card-tight,.soft-panel,.product-card,.modal-card,.mini-popup-card{overflow:visible}
.product-title,.product-desc,.card-title,.line-clamp{overflow-wrap:anywhere;word-break:break-word}
img{max-width:100%;height:auto}.product-visual img,.category-card img,.product-card img{object-fit:contain!important}
#alpha-right-dock{z-index:2147481500!important;pointer-events:auto!important}.dock-btn{opacity:1!important}
@media(max-width:900px){#alpha-right-dock{right:8px!important}.az-custom-link-bar{left:8px!important;right:72px!important;max-width:none!important;max-height:96px!important;overflow:auto!important}.glass,.card,.soft-panel{max-width:100%!important}.modal-card,.mini-popup-card{max-width:calc(100vw - 24px)!important}}
