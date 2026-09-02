# Panduan Screenshot Bukti Deployment & Branch Protection

Dokumen ini berisi langkah mengambil **screenshot asli** dari antarmuka GitHub.
Semua tangkapan layar harus diambil langsung dari browser pada halaman GitHub yang
sesungguhnya — jangan menggunakan gambar hasil rekayasa atau mockup.

Simpan hasilnya di folder `screenshots/` dengan nama file persis seperti di bawah.

---

## 1. `1_branch_protection.png` — Konfigurasi Branch Protection

**URL:** https://github.com/arighmt67-bit/forum-app-react-redux/settings/branches

Pastikan yang terlihat dalam satu tangkapan layar:

- Judul halaman **Branch protection rules**
- Nama rule: `master`
- Centang aktif pada:
  - **Require a pull request before merging**
  - **Require status checks to pass before merging**
  - **Require branches to be up to date before merging**
  - Status check yang dipilih: **test**
  - **Do not allow bypassing the above settings** (enforce admins)
- Bilah alamat browser yang memperlihatkan URL repositori

Konfigurasi aktif saat ini (dapat diverifikasi lewat API):

```bash
gh api repos/arighmt67-bit/forum-app-react-redux/branches/master/protection
```

| Pengaturan | Nilai |
|---|---|
| `required_status_checks.strict` | `true` |
| `required_status_checks.contexts` | `["test"]` |
| `required_pull_request_reviews` | aktif, `dismiss_stale_reviews: true` |
| `enforce_admins` | `true` |
| `allow_force_pushes` | `false` |
| `allow_deletions` | `false` |
| `required_conversation_resolution` | `true` |

---

## 2. `2_push_rejected.png` — Bukti Branch Protection Bekerja

Jalankan perintah berikut di terminal, lalu ambil tangkapan layar terminalnya:

```bash
git checkout master
git commit --allow-empty -m "chore: probe branch protection"
git push origin master
```

Keluaran yang diharapkan (bukti penolakan oleh GitHub):

```
remote: error: GH006: Protected branch update failed for refs/heads/master.
remote:
remote: - Changes must be made through a pull request.
remote:
remote: - Required status check "test" is expected.
 ! [remote rejected] master -> master (protected branch hook declined)
```

Setelah selesai, batalkan commit percobaan tersebut:

```bash
git reset --hard HEAD~1
```

---

## 3. `3_pull_request_checks.png` — Status Check pada Pull Request

**URL:** https://github.com/arighmt67-bit/forum-app-react-redux/pull/2

Pastikan yang terlihat:

- Judul pull request
- Bagian **All checks have passed** dengan check `test` bertanda centang hijau
- Keterangan **Required** di sebelah check `test`
- Tombol **Merge pull request** dalam keadaan aktif (hijau)

---

## 4. `4_actions_workflow.png` — Riwayat GitHub Actions

**URL:** https://github.com/arighmt67-bit/forum-app-react-redux/actions

Pastikan yang terlihat:

- Daftar workflow run dengan status hijau pada run terakhir di branch `master`
- Nama workflow **Continuous Integration**

---

## 5. `5_deployment.png` — Aplikasi Ter-deploy

**URL:** https://arighmt67-bit.github.io/forum-app-react-redux/

Pastikan yang terlihat:

- Aplikasi berjalan dan menampilkan daftar diskusi
- Bilah alamat browser yang memperlihatkan URL deployment

---

## Catatan

Jangan menyertakan berkas `.env` ke dalam arsip ZIP submission. Gunakan perintah
berikut untuk membuat arsip yang bersih:

```bash
npm run build
zip -r submission.zip . \
  -x "node_modules/*" "dist/*" "storybook-static/*" ".git/*" \
     "cypress/videos/*" "cypress/screenshots/*" ".env" "*.zip"
```

Verifikasi isi arsip sebelum dikirim:

```bash
unzip -l submission.zip | grep -E "\.env|node_modules" || echo "arsip bersih"
```
