Alpha Zone - Manual Sync Only

Đã chỉnh để web chỉ đồng bộ dữ liệu 1 lần khi mở trang.
Sau đó, các lần gọi Apps Script chỉ chạy khi người dùng bấm nút thao tác rõ ràng như Tải lại, Nạp danh sách, Đồng bộ, Lưu, Xóa, Duyệt, Ping, Tra cứu, Lọc.

Điểm chính:
- Thêm az-manual-sync.js vào toàn bộ page.
- Chặn polling nền 30 giây / auto sync theo click chung.
- Admin không còn tự reload mỗi 30 giây.
- Không đổi API_URL, Google Sheet, checkout, marketplace hoặc dữ liệu hiện có.

Upload toàn bộ file trong gói này lên GitHub và Ctrl+F5 sau khi deploy.
