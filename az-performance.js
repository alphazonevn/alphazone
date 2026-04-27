/* Alpha Zone Mobile Max Performance
   Mục tiêu: giữ UI/chức năng, giảm hiệu ứng nặng trên điện thoại. */
:root{--az-perf-on:1}
@media (max-width: 900px), (hover:none), (pointer:coarse), (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto!important}
  *,*::before,*::after{
    animation:none!important;
    animation-duration:0s!important;
    animation-delay:0s!important;
    animation-iteration-count:1!important;
    transition:none!important;
    scroll-behavior:auto!important;
  }
  body, .glass, .card, .product-card, .soft-panel, .dock-btn, .az-right-dock, #alpha-right-dock,
  .modal-content, .popup-content, .az-admin-popup-tools, .az-admin-link-popup-manager{
    -webkit-backdrop-filter:none!important;
    backdrop-filter:none!important;
    filter:none!important;
    box-shadow:none!important;
    text-shadow:none!important;
  }
  body::before, body::after,
  .floating-ball, [style*="float-minimal"], [class*="float"], [class*="particle"], [class*="blob"],
  .order-chat-bubble, #order-message, #live-toast, .live-toast,
  .promo-popup, #promo-popup, [id*="promo"], [class*="promo"],
  .alpha-studio-popup, [class*="studio"], .social-proof, [class*="social-proof"],
  [id*="toast"], [class*="toast"]{
    display:none!important;
    visibility:hidden!important;
    pointer-events:none!important;
  }
  img{content-visibility:auto; contain-intrinsic-size:120px 120px}
  .product-card,.category-card,.service-card,.glass,.soft-panel{contain:layout paint style; transform:none!important}
  .product-card:hover,.glass:hover,.btn:hover,.dock-btn:hover{transform:none!important}
  .az-right-dock, #alpha-right-dock{contain:layout paint; transform:translateZ(0)}
  .modal,.popup,.drawer{will-change:auto!important}
  .page-section,.az-page,.panel,main,section{content-visibility:auto; contain-intrinsic-size:900px}
}
@media (max-width: 520px){
  .product-card,.category-card,.service-card{border-radius:18px!important}
  .az-right-dock, #alpha-right-dock{right:10px!important; max-height:78vh!important; overflow:auto!important}
  .az-right-dock .dock-btn, #alpha-right-dock .dock-btn{min-height:44px!important}
}
