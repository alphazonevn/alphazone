# Alpha Zone - cụm trang sạch để chỉnh sửa trên GitHub

## Trang chính
- `index.html` -> `shop.html#home`
- `shop.html` -> home / categories / products / engagement-hub / marketplace
- `seller.html` -> seller-channel / account
- `support.html` -> warranty / about-us
- `admin.html` -> admin tổng
- `checkout.html` -> checkout riêng

## Chỗ cần sửa khi đổi API
Sửa duy nhất file:

```text
assets/az-config.js
```

API đang dùng:

```text
https://script.google.com/macros/s/AKfycbyOKHxckN5jE6xIfkxwumUp7x6Kc7nh5QjpNC550-p4Gmeyf1dVm9tADo3jfHDCXy4nww/exec
```

Google Sheet:

```text
https://docs.google.com/spreadsheets/d/1B2FMQ9pKHFQpY4eFMIqnEEHEqvgqq72USV86HgH6d5E/edit?gid=2022037670#gid=2022037670
```

## File redirect cũ
`products.html`, `marketplace.html`, `seller-channel.html`, `warranty.html`... chỉ là redirect để link cũ không chết. Không sửa chức năng trong các file này.
