#!/bin/bash
# Verifikasi bukti screenshot submission sebelum ZIP dirakit.
# Memeriksa kelengkapan berkas SEKALIGUS isinya lewat OCR (tesseract).
# Pakai: bash scripts/cek-screenshot.sh

cd "$(dirname "$0")/.." || exit 1
DIR="screenshots"
OK=0
FAIL=0

has_ocr() { command -v tesseract >/dev/null 2>&1; }

# format: "berkas|kata_kunci_OCR|keterangan"
periksa() {
  local f="$1" kunci="$2" ket="$3"
  local path="$DIR/$f"

  if [ ! -f "$path" ]; then
    printf "%-34s %-8s %-11s %s\n" "$f" "HILANG" "-" "$ket"
    FAIL=$((FAIL+1)); return
  fi

  local bytes dim
  bytes=$(stat -f%z "$path" 2>/dev/null || stat -c%s "$path")
  dim=$(sips -g pixelWidth -g pixelHeight "$path" 2>/dev/null \
        | awk '/pixelWidth/{w=$2} /pixelHeight/{h=$2} END{print w"x"h}')

  if [ "$bytes" -lt 20000 ]; then
    printf "%-34s %-8s %-11s %s\n" "$f" "RAGU" "$dim" "berkas <20KB, mungkin terpotong"
    FAIL=$((FAIL+1)); return
  fi

  if has_ocr && [ -n "$kunci" ]; then
    if ! tesseract "$path" stdout 2>/dev/null | grep -qiE "$kunci"; then
      printf "%-34s %-8s %-11s %s\n" "$f" "ISI?" "$dim" "OCR tak menemukan: $kunci"
      FAIL=$((FAIL+1)); return
    fi
  fi

  printf "%-34s %-8s %-11s %s\n" "$f" "OK" "$dim" "$ket"
  OK=$((OK+1))
}

printf "%-34s %-8s %-11s %s\n" "BERKAS" "STATUS" "UKURAN" "KETERANGAN"
printf '%.0s-' {1..100}; echo

# Bukti 1 boleh dipecah jadi 1a + 1b bila checkbox tak muat satu layar.
if [ -f "$DIR/1a_branch_protection.png" ] || [ -f "$DIR/1b_branch_protection_lanjutan.png" ]; then
  periksa "1a_branch_protection.png" "require|protect" "Rule master bagian atas (Require PR & status checks)"
  periksa "1b_branch_protection_lanjutan.png" "bypass|conversation" "Rule master bagian bawah (Do not allow bypassing)"
else
  periksa "1_branch_protection.png" "require|protect" "Halaman EDIT rule master (checkbox terlihat)"
fi

periksa "2_push_rejected.png"        "GH006|GH@@6|rejected"      "Terminal: push ke master ditolak GH006"
periksa "3_pull_request_checks.png"  "check|pull"                "Tab Checks PR: status check sukses"
periksa "4_actions_workflow.png"     "continuous|integration"    "Tab Actions: run master hijau"
periksa "5_deployment.png"           "forum|thread|diskusi"      "Aplikasi live di GitHub Pages"

echo
has_ocr || echo "CATATAN: tesseract tidak terpasang - isi gambar tidak diperiksa."
echo "Lolos: $OK   Bermasalah: $FAIL"

if [ "$FAIL" -gt 0 ]; then
  echo "BELUM SIAP - lengkapi/perbaiki berkas di atas sebelum merakit ZIP."
  exit 1
fi

echo "SIAP - semua bukti tersedia dan isinya terverifikasi. Lanjut rakit ZIP."
