# Forum App - React + Redux + Automation Testing & CI/CD

Submission Proyek Kedua: **Menerapkan Automation Testing dan CI/CD pada Aplikasi Forum Diskusi**
Kelas: **Menjadi React Web Developer Expert** (Dicoding)

- **Repository GitHub**: [https://github.com/arighmt67-bit/forum-app-react-redux](https://github.com/arighmt67-bit/forum-app-react-redux)
- **Live / Deployment URL**: [https://arighmt67-bit.github.io/forum-app-react-redux/](https://arighmt67-bit.github.io/forum-app-react-redux/)

---

## 🎯 Kriteria Utama & Pemenuhan

| Kriteria | Status | Implementasi & Lokasi File |
|---|---|---|
| **1. Automation Testing** | ✅ Terpenuhi | • **Reducer tests (5 berkas)**: `src/states/**/reducer.test.js` (authUser, threads, users, isPreload, leaderboards)<br>• **Thunk tests (4 berkas)**: `src/states/**/action.test.js` (authUser, threads, users, shared)<br>• **Component tests (3 berkas)**: `src/components/*.test.jsx` (LoginInput, RegisterInput, VoteButton)<br>• **E2E tests (Cypress)**: `cypress/e2e/login.cy.js` (alur login sukses, gagal, validasi UI)<br>• Dilengkapi skenario deskriptif di setiap berkas test. |
| **2. CI/CD & Deployment** | ✅ Terpenuhi | • **Continuous Integration**: GitHub Actions workflow `.github/workflows/ci.yml` (lint, test, e2e cypress, build storybook, build vite)<br>• **Continuous Deployment**: GitHub Pages & Vercel (`vercel.json`)<br>• **Branch Protection**: Branch `master` diproteksi dengan syarat status check CI lolos.<br>• **Screenshots**: Dilampirkan pada folder `screenshots/` (`1_ci_check_error.png`, `2_ci_check_pass.png`, `3_branch_protection.png`). |
| **3. React Ecosystem** | ✅ Terpenuhi | • Menggunakan **Storybook** (`.storybook/main.js`, `src/components/*.stories.jsx`) untuk dokumentasi komponen UI. |
| **4. Mempertahankan Kriteria V1** | ✅ Terpenuhi | • Filter thread berdasarkan kategori<br>• Upvote / Downvote thread & komentar dengan optimistic updates<br>• Leaderboard pengguna teratas<br>• Indikator loading Redux<br>• Clean Architecture & Airbnb ESLint 0 error |

---

## 🚀 Skrip Perintah

- **Menjalankan Dev Server**: `npm run dev`
- **Menjalankan Linter**: `npm run lint`
- **Menjalankan Unit & Component Tests**: `npm test`
- **Menjalankan E2E Tests (Cypress Headless)**: `npm run e2e`
- **Membuka Cypress UI**: `npm run e2e:open`
- **Menjalankan Storybook**: `npm run storybook`
- **Build Storybook**: `npm run build-storybook`
- **Build Production**: `npm run build`
