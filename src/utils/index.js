export function showFormattedDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Date(date).toLocaleDateString('id-ID', options);
}

export function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diffInSeconds = Math.floor((now - posted) / 1000);

  const units = [
    { label: 'tahun', seconds: 31536000 },
    { label: 'bulan', seconds: 2592000 },
    { label: 'hari', seconds: 86400 },
    { label: 'jam', seconds: 3600 },
    { label: 'menit', seconds: 60 },
  ];

  const unit = units.find(({ seconds }) => diffInSeconds >= seconds);

  if (!unit) {
    return 'baru saja';
  }

  return `${Math.floor(diffInSeconds / unit.seconds)} ${unit.label} yang lalu`;
}

export function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}

export function truncate(text, maxLength = 160) {
  const clean = stripHtml(text);
  return clean.length > maxLength ? `${clean.slice(0, maxLength)}...` : clean;
}
