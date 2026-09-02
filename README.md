# Forum App - React + Redux + Automation Testing & CI/CD

Submission Proyek Kedua: **Menerapkan Automation Testing dan CI/CD pada Aplikasi Forum Diskusi**
Kelas: **Menjadi React Web Developer Expert** (Dicoding)

- **Repository GitHub**: [https://github.com/arighmt67-bit/forum-app-react-redux](https://github.com/arighmt67-bit/forum-app-react-redux)
- **Live / Deployment URL**: [https://arighmt67-bit.github.io/forum-app-react-redux/](https://arighmt67-bit.github.io/forum-app-react-redux/)

---

## 🎯 Kriteria Utama & Pemenuhan

| Kriteria | Status | Implementasi & Lokasi File |
|---|---|---|
| **1. Automation Testing** | ✅ Terpenuhi | • **Reducer tests (5 berkas)**: `src/states/**/reducer.test.js` (authUser, threads, users, isPreload, leaderboards)<br>• **Thunk tests (4 berkas)**: `src/states/**/action.test.js` (authUser, threads, users, shared)<br>• **Component tests (5 berkas)**: `src/components/atoms/Badge.test.jsx`, `src/components/molecules/{VoteButton,CategoryFilter}.test.jsx`, `src/components/organisms/{LoginInput,RegisterInput}.test.jsx`<br>• **E2E tests (Cypress)**: `cypress/e2e/login.cy.js`<br>• Setiap berkas test memuat skenario deskriptif pada komentar di bagian atas. |
| **2. CI/CD & Deployment** | ✅ Terpenuhi | • **Continuous Integration**: `.github/workflows/ci.yml` (lint → unit test → e2e cypress → build storybook → build vite)<br>• **Continuous Deployment**: GitHub Pages<br>• **Branch Protection**: branch `master` wajib melalui pull request dengan status check `test` lolos, berlaku juga untuk admin.<br>• **Bukti**: lihat folder `screenshots/` dan `screenshots/PANDUAN.md`. |
| **3. React Ecosystem** | ✅ Terpenuhi | • **Storybook** (`.storybook/main.js`) dengan stories pada tiap tingkat atomic: `atoms/Badge.stories.jsx`, `molecules/VoteButton.stories.jsx`, `organisms/LoginInput.stories.jsx`. |
| **4. Arsitektur Aplikasi** | ✅ Terpenuhi | • **Atomic Design**: komponen dikelompokkan menjadi `atoms` → `molecules` → `organisms` → `templates` → `pages`. Rincian pada tabel di bawah. |
| **5. Mempertahankan Kriteria V1** | ✅ Terpenuhi | • Filter thread berdasarkan kategori<br>• Upvote / downvote thread & komentar dengan optimistic update<br>• Leaderboard pengguna teratas<br>• Indikator loading Redux<br>• Airbnb ESLint 0 error |

---

## 🧬 Arsitektur Komponen (Atomic Design)

Komponen dipisahkan berdasarkan tingkat kompleksitas. Setiap komponen memiliki satu
tanggung jawab yang jelas sehingga mudah digunakan ulang dan diuji secara terpisah.

```
src/components/
├── atoms/        # elemen terkecil, tanpa ketergantungan komponen lain
├── molecules/    # gabungan beberapa atoms menjadi satu unit fungsional
├── organisms/    # bagian antarmuka utuh yang tersusun dari molecules & atoms
└── templates/    # kerangka tata letak halaman, menerima data lewat props
src/pages/        # penghubung Redux (state & dispatch), presentasi didelegasikan
```

| Tingkat | Komponen |
|---|---|
| **Atoms** | `Avatar`, `Badge`, `Button`, `EmptyState`, `LoadingBar`, `TextInput`, `TextArea` |
| **Molecules** | `FormField`, `TextAreaField`, `UserProfile`, `PageHeader`, `NavigationMenu`, `CategoryFilter`, `LeaderboardItem`, `VoteButton` |
| **Organisms** | `Navigation`, `LoginInput`, `RegisterInput`, `ThreadItem`, `ThreadList`, `ThreadDetail`, `ThreadForm`, `CommentItem`, `CommentList`, `CommentInput`, `LeaderboardList` |
| **Templates** | `AppLayout`, `AuthTemplate`, `HomeTemplate`, `ThreadDetailTemplate`, `PreloadTemplate` |
| **Pages** | `HomePage`, `ThreadDetailPage`, `AddThreadPage`, `LeaderboardsPage`, `LoginPage`, `RegisterPage`, `NotFoundPage` |

Contoh alur penyusunan pada halaman beranda:

```
HomePage (Redux state)
└── HomeTemplate
    ├── PageHeader        (molecule)
    ├── CategoryFilter    (molecule) → Badge (atom)
    ├── ThreadList        (organism) → ThreadItem (organism)
    │                                   ├── Badge        (atom)
    │                                   ├── Button       (atom)
    │                                   ├── VoteButton   (molecule) → Button (atom)
    │                                   └── UserProfile  (molecule) → Avatar (atom)
    └── Button            (atom)
```

---

## 🔒 Branch Protection

Branch `master` dilindungi dengan pengaturan berikut:

| Pengaturan | Nilai |
|---|---|
| Require a pull request before merging | aktif |
| Require status checks to pass (`test`) | aktif |
| Require branches to be up to date | aktif |
| Do not allow bypassing (enforce admins) | aktif |
| Allow force pushes | nonaktif |
| Allow deletions | nonaktif |

Verifikasi konfigurasi:

```bash
gh api repos/arighmt67-bit/forum-app-react-redux/branches/master/protection
```

Percobaan push langsung ke `master` akan ditolak oleh GitHub:

```
remote: error: GH006: Protected branch update failed for refs/heads/master.
remote: - Changes must be made through a pull request.
remote: - Required status check "test" is expected.
 ! [remote rejected] master -> master (protected branch hook declined)
```

Seluruh perubahan karena itu digabungkan melalui pull request, misalnya
[PR #2](https://github.com/arighmt67-bit/forum-app-react-redux/pull/2).

---

## 🚀 Skrip Perintah

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Menjalankan development server |
| `npm run lint` | Menjalankan ESLint (konfigurasi Airbnb) |
| `npm test` | Menjalankan unit & component test (Vitest) |
| `npm run e2e` | Menjalankan E2E test Cypress secara headless |
| `npm run e2e:open` | Membuka antarmuka Cypress |
| `npm run storybook` | Menjalankan Storybook |
| `npm run build-storybook` | Membangun Storybook statis |
| `npm run build` | Membangun aplikasi untuk produksi |

---

## ✅ Hasil Pengujian Terakhir

| Pemeriksaan | Hasil |
|---|---|
| ESLint | 0 error |
| Unit & component test | 39 lulus / 39 (14 berkas) |
| Cypress E2E | 3 lulus / 3 |
| `npm run build` | sukses |
| `npm run build-storybook` | sukses |
| GitHub Actions pada `master` | sukses |
