#!/bin/bash
# Bukti branch protection BEKERJA: push langsung ke master ditolak GitHub.
# Jalankan di Terminal.app, lalu screenshot jendelanya (Cmd+Shift+4 lalu Spasi).
# Simpan hasilnya sebagai: screenshots/2_push_rejected.png

cd "$(dirname "$0")/.." || exit 1

clear
echo "=== BUKTI BRANCH PROTECTION: PUSH LANGSUNG KE master DITOLAK ==="
echo "Repo: arighmt67-bit/forum-app-react-redux"
echo

set -x
git checkout master
git commit --allow-empty -m "chore: probe branch protection"
git push origin master
set +x

echo
echo "=== Membatalkan commit percobaan ==="
git reset --hard HEAD~1

echo
echo "=== SELESAI - screenshot jendela ini sekarang ==="
