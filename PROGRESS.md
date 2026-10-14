# 📋 NHẬT KÝ TIẾN ĐỘ DỰ ÁN (PROJECT PROGRESS)

**Dự án:** Portfolio Editorial & Creative Technology — Phan Trọng Khang  
**Repository:** [khang26042012/phantrongkhangg](https://github.com/khang26042012/phantrongkhangg)  
**Công nghệ:** Next.js 16.4 (Turbopack) • React 19 • Tailwind CSS v4 • HTML5 Canvas  
**Cập nhật lần cuối:** 14/10/2026

---

## 🚀 TRẠNG THÁI TỔNG QUAN

| Hạng mục | Trạng thái | Đánh giá / Kết quả |
| :--- | :---: | :--- |
| **1. Khởi tạo môi trường & Dependencies** | ✅ Hoàn thành | Next.js 16, React 19, Tailwind v4 hoạt động trơn tru. |
| **2. Tích hợp 5 Agent Skills quốc tế** | ✅ Hoàn thành | Đã lưu trữ trong thư mục `skills/` và khóa tại `skills-lock.json`. |
| **3. Khung mở đầu High-End Editorial** | ✅ Hoàn thành | Xóa sạch chi tiết rác (Anti-AI-Slop), phong cách tối giản sang trọng. |
| **4. Chuỗi 144 Frames Canvas (Scroll-linked)** | ✅ Hoàn thành | Cuộn êm ái 60 FPS bằng `requestAnimationFrame` + `lerp`, Retina/Cover. |
| **5. Kiểm thử tự động & Tải tài nguyên** | ✅ Hoàn thành | 144/144 frames tải thành công (0 lỗi 404, 0 lỗi console). |
| **6. Triển khai Local & Cloudflare Tunnel** | ✅ Hoàn thành | Đã mở link công khai HTTPS phục vụ preview đa thiết bị. |

---

## 📌 CHI TIẾT CÁC GIAI ĐOẠN ĐÃ THỰC HIỆN

### Giai đoạn 1: Thiết lập nền tảng & Tích hợp Skills chuẩn quốc tế
- [x] Clone mã nguồn từ GitHub về thư mục làm việc Desktop.
- [x] Cài đặt toàn bộ dependencies bằng npm (`364 packages audited, 0 build errors`).
- [x] Tải và cấu hình bộ **5 Agent Skills**:
  1. `frontend-design` (từ Anthropic): Nguyên lý thiết kế khác biệt, chống giao diện rập khuôn.
  2. `ui-ux-pro-max` (từ NextLevelBuilder): Quy chuẩn tỷ lệ, khoảng trống âm và phân cấp thị giác.
  3. `vercel-react-best-practices` (từ Vercel Engineering): Tối ưu hiệu năng React 19, triệt tiêu re-render thừa.
  4. `web-design-guidelines` (từ Vercel): Chuẩn giao diện phẳng, thanh lịch.
  5. `frontend-ui-animator` (từ Julian Romli): Diễn hoạt có chủ đích chỉ bằng GPU properties (`transform`, `opacity`).
- [x] Tạo thư mục [`skills/`](./skills/) lưu trữ toàn bộ file định nghĩa và khóa phiên bản tại [`skills-lock.json`](./skills-lock.json).

---

### Giai đoạn 2: Tái cấu trúc Hero Section (Strict Declutter & Editorial)
- [x] **Xóa sạch chi tiết thừa (Strict Declutter):**
  - Xóa bỏ các chi tiết HUD/Sci-fi giả tạo: đèn xanh `ONLINE`, đồng hồ giây `ICT`, mã `[ ED. 2026 // INTRO ]`, số thứ tự `01 / 01`, tọa độ `ORIGIN: 10°...`.
  - Xóa toàn bộ thanh kẻ ngang, đường viền chia cắt (`border-t`, `border-b`) và 4 dấu cộng (`+`) ở các góc.
  - Xóa bỏ quầng sáng gradient nhiều màu sau lưng chữ.
  - Tắt dev indicator overlay (nút chữ `N`) trong `next.config.ts`.
- [x] **Cấu trúc 3 tầng thông tin đắt giá:**
  1. **Top Bar:** Định danh tinh tế `CREATIVE DEVELOPER & SYSTEMS ARCHITECT` và link chữ `CONTACT ↗` kèm hover gạch chân vi mô.
  2. **Tâm điểm thị giác:** Oversized Typography `PHAN TRỌNG KHANG` (`text-[clamp(3.5rem,10.5vw,11.5rem)]`) với hiệu ứng trượt mặt nạ ẩn (Staggered Masked Reveal).
  3. **Bottom Row:** Đoạn văn triết lý ngắn gọn, sắc sảo và cặp outlink tối giản `GITHUB ↗` / `CLOUD ↗`.
- [x] **Chất liệu nền:** Nền đen sâu `#080808` phủ lớp nhiễu hạt phim mỹ thuật `bg-film-grain` (opacity 0.035).

---

### Giai đoạn 3: Tích hợp hiệu ứng chuỗi 144 Frames Canvas theo cuộn (Scroll-linked)
- [x] Tự động quét và xác minh **144 frames** (`ezgif-frame-001.jpg` $\rightarrow$ `ezgif-frame-144.jpg`, 1920 × 1080) trong thư mục [`public/frames/`](./public/frames/).
- [x] Gán chính xác hằng số `const TOTAL_FRAMES = 144;`.
- [x] **Xây dựng Canvas HTML5 toàn màn hình cố định:**
  - Vị trí ở lớp đáy (`z-0`) bên dưới toàn bộ typography và liên kết của Hero Section.
  - Preload thông minh: Vẽ Frame 1 ngay lập tức khi tải xong; tải ngầm 143 frames còn lại với cơ chế fallback tìm frame gần nhất, tuyệt đối không chớp nháy (zero-flicker).
  - Vòng lặp `requestAnimationFrame` kết hợp hàm nội suy `lerp` (`diff * 0.08`) tạo chuyển động mượt mà như quán tính của Apple.
  - Hỗ trợ màn hình Retina / High-DPI (`window.devicePixelRatio`) và thuật toán căn giữa `drawImageCover` chuẩn `object-fit: cover` trên cả Desktop lẫn Mobile.
  - Không sử dụng `useState` cho chỉ số frame trong lúc cuộn (zero re-render, đạt 60 FPS ổn định).
  - Tích hợp chuẩn trợ năng `prefers-reduced-motion`.
- [x] **Logic cuộn trang:**
  - Vùng cuộn cao `h-[400vh]`, khung nhìn Hero và `<canvas>` luôn ghim cố định (`sticky top-0 h-dvh max-h-dvh overflow-hidden`).
  - Ánh xạ trực tiếp từ 0% $\rightarrow$ 100% tương ứng Frame 1 $\rightarrow$ Frame 144.
  - Phủ lớp scrim đen mờ `bg-black/55` bảo toàn 100% độ tương phản sắc nét của chữ.

---

### Giai đoạn 4: Kiểm thử tự động (Audit) & Xác minh thực tế
- [x] Chạy kiểm thử tự động với Playwright / Chromium headless:
  - **144 / 144 frames** tải với mã trạng thái `200 OK` (0 lỗi 404).
  - **0 lỗi console**, 0 lỗi layout shift.
  - Đoạn cuộn đạt chuẩn `2700px` (tương đương 400vh).
- [x] Chụp ảnh màn hình nghiệm thu tại các nấc cuộn:
  - `audit-scroll-0.png` (0% - Frame 1: Cổng đền rừng cây)
  - `audit-scroll-33.png` (33% - Frame ~48: Tiến sâu vào lối đi đá)
  - `audit-scroll-66.png` (66% - Frame ~95: Góc máy ngước lên vòm di tích rực nắng)
  - `audit-scroll-100.png` (100% - Frame 144: Hai chú mèo ngộ nghĩnh trên mái ngói)
  - `audit-mobile-scroll-0.png`, `audit-mobile-scroll-50.png`, `audit-mobile-scroll-100.png` (Hiển thị dọc chuẩn xác trên iPhone 390 × 844).
- [x] Đồng bộ toàn bộ mã nguồn và tài liệu lên remote repository trên GitHub.

---

## 🛠️ HƯỚNG DẪN CHẠY DỰ ÁN

```bash
# 1. Cài đặt dependencies (nếu clone mới)
npm install

# 2. Khởi chạy Development Server
npm run dev

# 3. Kiểm tra TypeScript & ESLint
npm run lint

# 4. Build sản phẩm tối ưu hóa
npm run build
```

- **Môi trường cục bộ:** `http://localhost:3000`
- **Môi trường Internet (Tunnel):** `https://evaluations-brisbane-lone-talented.trycloudflare.com`
