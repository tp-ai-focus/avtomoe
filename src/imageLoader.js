export default function imageLoader({ src }) {
  const basePath = process.env.NODE_ENV === 'production' ? '/avtomoe' : '';
  if (src && src.startsWith('/')) {
    return `${basePath}${src}`;
  }
  return src;
}
