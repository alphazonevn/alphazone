Alpha Zone - gói hoàn hảo để upload GitHub Pages

Cách upload:
1. Giải nén zip.
2. Upload toàn bộ file/thư mục bên trong lên GitHub, không upload nguyên file zip.
3. Giữ file CNAME hiện có trên GitHub nếu đang dùng domain alphazone.io.vn.
4. Commit changes, chờ GitHub Pages deploy.
5. Mở web và bấm Ctrl+F5.

Cấu trúc chính:
- index.html / home.html: trang chủ thật.
- categories.html: trang danh mục thật.
- products.html: trang sản phẩm thật.
- engagement-hub.html: trang tăng tương tác thật.
- marketplace.html: trang marketplace thật.
- seller-channel.html: trang kênh người bán thật.
- warranty.html: trang bảo hành thật.
- about-us.html: trang giới thiệu thật.
- account.html: trang tài khoản thật.
- admin.html: admin tổng.
- checkout.html: checkout thật.
- shop.html, seller.html, support.html: chỉ redirect legacy hash sang trang thật, không render nội dung cũ.
- assets/az-config.js: cấu hình API mới ở một chỗ.

Đã tắt popup promo và luồng tin nhắn đặt hàng cũ. Mọi thao tác mua hàng dẫn về checkout.html.
