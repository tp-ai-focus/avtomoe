export default function imageLoader({ src, width, quality }) {
  const basePath = process.env.NODE_ENV === 'production' ? '/avtomoe' : '';
  let url = src;
  if (src && src.startsWith('/')) {
    url = `${basePath}${src}`;
  }
  return `${url}?w=${width}&q=${quality || 75}`;
}
