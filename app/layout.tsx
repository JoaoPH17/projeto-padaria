import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <header style={{ padding: '1rem 2rem', background: '#ff9800', display: 'flex', gap: '1.5rem', color: '#fff' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
          <Link href="/catalogo" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Catálogo</Link>
          <Link href="/carrinho" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Carrinho</Link>
          <Link href="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
        </header>
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}