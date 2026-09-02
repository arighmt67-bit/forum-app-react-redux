# Forum Diskusi — Submission Proyek: Membangun Aplikasi React dengan Redux

Aplikasi Forum Diskusi berbasis **React + Redux (Redux Toolkit)** yang mengonsumsi
[Dicoding Forum API](https://forum-api.dicoding.dev/v1).

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build produksi
npm run lint    # ESLint (Airbnb Style Guide) — 0 error
```

## Pemenuhan Kriteria

### Kriteria Utama 1 — Fungsionalitas Aplikasi
| Butir | Implementasi |
|---|---|
| Registrasi akun | `/register` — `RegisterPage` + `asyncRegisterUser` |
| Login akun | `/login` — `LoginPage` + `asyncSetAuthUser` (token disimpan di localStorage) |
| Daftar thread | `/` — `HomePage` + `ThreadList` |
| Detail thread + komentar | `/threads/:id` — `ThreadDetailPage` |
| Membuat thread | `/new` — `AddThreadPage` (wajib login) |
| Membuat komentar | `CommentInput` di halaman detail (wajib login) |
| Loading indicator | `react-redux-loading-bar` di setiap thunk async |

Item thread menampilkan **judul, potongan body, waktu pembuatan, jumlah komentar, dan
nama + avatar pembuat**. Halaman detail menampilkan **judul, body, waktu, nama + avatar
pemilik, serta komentar** lengkap dengan konten, waktu, nama, dan avatar pengomentar.

### Kriteria Utama 2 — Bugs Highlighting
- Berkas konfigurasi ESLint: `.eslintrc.json`
- Code convention: **Airbnb JavaScript Style Guide** (`eslint-config-airbnb` + `airbnb/hooks`)
- `npm run lint` menghasilkan **0 error**
- **React Strict Mode** aktif di `src/index.jsx`

### Kriteria Utama 3 — Arsitektur Aplikasi
- Seluruh state dari API disimpan di **Redux Store** (`src/states/`): `authUser`, `isPreload`,
  `users`, `threads`, `threadDetail`, `leaderboards`, `categoryFilter`, `loadingBar`.
- Tidak ada pemanggilan REST API di dalam komponen — semua request dibungkus **thunk**
  (`src/states/**/action.js`) dan dipanggil lewat `dispatch`.
- Pemisahan folder: **UI** di `src/components` & `src/pages`, **state** di `src/states`,
  **utilitas/API** di `src/utils`.
- Komponen modular & reusable (`VoteButton`, `ThreadItem`, `CommentItem`, dll).

### Saran yang Diterapkan (target bintang 5)
1. **Votes pada thread & komentar** — up/down vote, indikasi warna saat sudah vote,
   jumlah votes, dan **Optimistically Apply Actions** (state diperbarui lebih dulu, di-rollback bila API gagal).
2. **Leaderboard** — halaman `/leaderboards` menampilkan nama, avatar, dan score.
3. **Filter thread berdasarkan kategori** — murni sisi front-end lewat manipulasi state Redux.

## Struktur Folder

```
src/
├── components/   # komponen UI reusable
├── pages/        # halaman (route)
├── hooks/        # custom hook (useInput)
├── states/       # Redux: action, reducer, store
├── styles/       # CSS
└── utils/        # api.js + helper
```
