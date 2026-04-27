# Alpha Zone Live Apps Script Integration

Bộ file này giữ nguyên cụm trang thông minh Alpha Zone và thêm lớp hiển thị dữ liệu Apps Script trực tiếp trên web.

## File chính
- `index.html` redirect về `shop.html#home`.
- `shop.html`, `seller.html`, `support.html`, `checkout.html`, `admin.html` là các trang giao diện.
- `az-fix.css` và `az-fix.js` giữ các fix ảnh/popup/link thông minh từ file bạn gửi.
- `az-appscript-live.js` tự đọc Apps Script, đưa sản phẩm vào `window.brands/window.allProducts`, render lại web và hiển thị panel Apps Script Live.
- `az-appscript-live.css` là style cho panel live.
- `Code.gs` là backend Apps Script mới, hỗ trợ:
  - GET: `ping`, `listProducts`, `listCustomerLeads`, `listWarrantyRequests`, `listOrderRecords`, `listDrafts`, `dashboard`, `schema`
  - POST: `createOrder`, `saveCustomerLead`, `saveWarrantyRequest`, `saveDraft`, `upsertProduct`, `deleteProduct`, `pushAllProducts`

## Cách deploy
1. Upload toàn bộ file HTML/CSS/JS/CNAME lên GitHub Pages.
2. Vào Google Apps Script, thay toàn bộ code bằng `Code.gs`.
3. Deploy > New deployment > Web app.
4. Chọn `Execute as: Me`, `Who has access: Anyone`.
5. Copy URL `/exec`. Nếu URL khác URL mặc định, mở web và chạy trong Console:

```js
AZAppsScriptLive.setUrl('https://script.google.com/macros/s/XXXXX/exec')
AZAppsScriptLive.syncAll()
```

Panel `Apps Script Live` sẽ hiển thị trực tiếp số sản phẩm, đơn hàng, lead, bảo hành và các record mới nhất ngay trên web.
