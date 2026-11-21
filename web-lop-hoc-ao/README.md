# Lớp học ảo Khoa học Trái Đất (GE1013)

Web tĩnh, không cần máy chủ. Nội dung soạn từ slide bài giảng của môn.

## Có gì bên trong

| Thư mục / tệp | Nội dung |
|---|---|
| `index.html`, `assets/` | Khung web, giao diện, chatbot, tìm kiếm |
| `chapters/` | 16 chương diễn giải chi tiết + `tong-on.html` (Ôn tập tổng) |
| `data/qa.json` | 230 câu hỏi đáp cho trợ lý (có thể thêm câu mới) |
| `data/quiz.json` | Ngân hàng 460 câu trắc nghiệm từ 4 bài LMS cho mục Ôn luyện |
| `img/slides/` | Hình trích từ slide |
| `manifest.webmanifest`, `sw.js` | Cho phép cài thành app trên điện thoại và học offline |

## Đưa lên GitHub Pages

1. Vào github.com, bấm **New repository**, đặt tên (ví dụ `khoa-hoc-trai-dat`), chọn **Public**, bấm **Create repository**.
2. Trong repo mới, bấm **uploading an existing file**. Kéo **toàn bộ nội dung bên trong** thư mục này (không kéo chính thư mục) vào, rồi bấm **Commit changes**.
   Tệp `index.html` phải nằm ở ngoài cùng của repo.
3. Vào **Settings → Pages**. Ở mục *Build and deployment*, chọn **Deploy from a branch**, branch **main**, thư mục **/ (root)**, bấm **Save**.
4. Đợi 1–2 phút, web sẽ có ở địa chỉ `https://<tên-tài-khoản>.github.io/<tên-repo>/`.

## Cài thành app trên điện thoại (Chrome, Android)

1. Mở địa chỉ web ở trên bằng Chrome.
2. Bấm nút **Cài app** ở thanh trên cùng (hiện ra khi Chrome cho phép cài), hoặc menu ⋮ → **Thêm vào màn hình chính / Cài đặt ứng dụng**.
3. Muốn học khi không có mạng: mở app một lần khi có mạng, rồi mở menu ☰ và bấm **Tải hết hình để học offline** ở cuối danh sách chương.

Trên iPhone (Safari): nút Chia sẻ → **Thêm vào MH chính**.

## Khi sửa nội dung sau này

- Thêm câu hỏi cho trợ lý: thêm một mục vào `data/qa.json` theo mẫu
  `{"c": "c05", "q": "Câu hỏi?", "a": "<p>Trả lời (HTML)</p>", "k": "từ khoá", "alt": ["cách hỏi khác"]}`.
- Sau mỗi lần sửa, đổi `VERSION` trong `sw.js` (ví dụ `khtd-v1` → `khtd-v2`) để app trên điện thoại tải bản mới.
- Xem thử trên máy: trong thư mục này chạy `python -m http.server 8000`, rồi mở `http://localhost:8000`.
  Mở trực tiếp `index.html` bằng cách nhấp đúp sẽ không chạy, vì trình duyệt chặn đọc tệp.
