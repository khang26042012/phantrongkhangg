# Phan Trọng Khang

**Creative Developer & Systems Architect**

- 🌐 **Ecosystem**: KhangSMP & Cloud Infrastructure
- ⚡ **Focus**: High-performance systems, WebGL & Interactive Experiences
- 🛠️ **Stack**: Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, HTML5 Canvas
- 📋 **Nhật ký tiến độ chi tiết**: Xem file [PROGRESS.md](./PROGRESS.md)

---

## 🌟 Tính năng nổi bật (Key Features)

- **High-End Editorial Aesthetics**: Thiết kế tối giản, tập trung vào kiểu chữ thương hiệu cực lớn (`PHAN TRỌNG KHANG`), loại bỏ hoàn toàn các chi tiết rác (Anti-AI-Slop).
- **144-Frame Canvas Sequence Animation**: Hiệu ứng chuyển động chuỗi 144 frames theo thao tác cuộn chuột (Scroll-linked Canvas) đạt chuẩn 60 FPS, sử dụng hàm nội suy mượt `lerp` và hỗ trợ màn hình Retina / High-DPI (`object-fit: cover`).
- **Zero React Re-render lúc cuộn**: Toàn bộ tiến trình tính toán và vẽ lại frame được điều phối độc quyền qua `useRef` và `requestAnimationFrame`.
- **Hỗ trợ Trợ năng (a11y)**: Tự động điều chỉnh hiệu ứng khi người dùng bật chế độ `prefers-reduced-motion`.
- **Tích hợp 5 Agent Skills quốc tế**: Nằm trong thư mục [`skills/`](./skills/) và được khóa tại [`skills-lock.json`](./skills-lock.json).

---

## 🚀 Khởi chạy dự án (Getting Started)

Cài đặt dependencies và chạy development server:

```bash
npm install
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để trải nghiệm.

### Kiểm tra Build & Lint

```bash
# Kiểm tra lint
npm run lint

# Tạo bản build tối ưu
npm run build
```

---

## 📸 Hình ảnh kiểm thử cuộn trang (Audit Screenshots)

- **0% Scroll (Frame 1):** [`audit-scroll-0.png`](./audit-scroll-0.png)
- **33% Scroll (~Frame 48):** [`audit-scroll-33.png`](./audit-scroll-33.png)
- **66% Scroll (~Frame 95):** [`audit-scroll-66.png`](./audit-scroll-66.png)
- **100% Scroll (Frame 144):** [`audit-scroll-100.png`](./audit-scroll-100.png)
- **Mobile Viewport (iPhone 390x844):** [`audit-mobile-scroll-0.png`](./audit-mobile-scroll-0.png), [`audit-mobile-scroll-100.png`](./audit-mobile-scroll-100.png)

---

*Cập nhật chi tiết xem tại [PROGRESS.md](./PROGRESS.md).*
