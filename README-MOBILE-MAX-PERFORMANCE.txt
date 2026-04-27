Alpha Zone - Mobile Max Performance

Gói này tối ưu tốc độ trên điện thoại mà không đổi API/Google Sheet/checkout/admin.

Đã làm:
- Tắt hiệu ứng animation/transition/backdrop-filter/shadow nặng trên mobile.
- Tắt popup/promo/toast/floating/social-proof trang trí gây lag.
- Chặn các interval trang trí chạy nền.
- Throttle MutationObserver để tránh quét DOM liên tục.
- Lazy-load/async decode ảnh, giảm tải ảnh ngoài màn hình.
- Giữ nguyên checkout, admin, marketplace, Apps Script và dữ liệu.

File mới/cập nhật:
- az-performance.css
- az-performance.js
- các trang HTML đã được gắn 2 file trên.

Sau khi upload GitHub: Commit -> chờ Pages deploy -> Ctrl + F5 trên điện thoại/trình duyệt.
