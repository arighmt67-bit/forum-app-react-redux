# Bukti Deployment & Branch Protection

Seluruh berkas di folder ini adalah **tangkapan layar asli** dari antarmuka GitHub,
Terminal, dan aplikasi yang berjalan. Tidak ada gambar hasil rekayasa, mockup, atau
render HTML. Isi tiap berkas diverifikasi ulang dengan OCR lewat
`scripts/cek-screenshot.sh`.

## Daftar Bukti

| Berkas | Sumber | Yang Dibuktikan |
|---|---|---|
| `1a_branch_protection.png` | `/settings/branch_protection_rules` | Rule `master` bagian atas: Require pull request, Require status checks, Require branches up to date |
| `1b_branch_protection_lanjutan.png` | halaman rule yang sama (gulir bawah) | Required status check `test` (GitHub Actions), Require conversation resolution, **Do not allow bypassing the above settings** |
| `2_push_rejected.png` | Terminal | Push langsung ke `master` **ditolak** GitHub dengan `GH006` |
| `3_pull_request_checks.png` | `/pull/2/checks` | Status check `test` berhasil pada pull request |
| `4_actions_workflow.png` | `/actions` | Riwayat workflow **Continuous Integration** hijau di branch `master` |
| `5_deployment.png` | GitHub Pages | Aplikasi berjalan live |

## Konfigurasi Branch Protection Aktif

Dapat diverifikasi siapa pun dengan:

```bash
gh api repos/arighmt67-bit/forum-app-react-redux/branches/master/protection
```

| Pengaturan | Nilai |
|---|---|
| `required_status_checks.contexts` | `["test"]` |
| `required_status_checks.strict` | `true` |
| `required_pull_request_reviews` | aktif (`dismiss_stale_reviews: true`) |
| `enforce_admins` | `true` |
| `required_conversation_resolution` | `true` |
| `allow_force_pushes` | `false` |
| `allow_deletions` | `false` |

## Bukti Proteksi Benar-benar Bekerja

Konfigurasi yang aktif belum tentu berfungsi. Karena itu proteksi diuji langsung —
sebuah commit kosong dicoba di-push ke `master` dan **ditolak oleh GitHub**:

```
$ git commit --allow-empty -m "chore: probe branch protection"
$ git push origin master

remote: error: GH006: Protected branch update failed for refs/heads/master.
remote:
remote: - Changes must be made through a pull request.
remote:
remote: - Required status check "test" is expected.
To https://github.com/arighmt67-bit/forum-app-react-redux.git
 ! [remote rejected] master -> master (protected branch hook declined)
```

Commit percobaan dibatalkan setelahnya dengan `git reset --hard HEAD~1`.

Pengujian ini dapat diulang kapan saja:

```bash
bash scripts/bukti-push-ditolak.sh
```

## Memverifikasi Ulang Kelengkapan Bukti

```bash
bash scripts/cek-screenshot.sh
```

Script memeriksa keberadaan berkas, ukurannya, **dan** isinya lewat OCR — sehingga
tangkapan layar yang salah halaman akan tertangkap sebelum ZIP dirakit.
