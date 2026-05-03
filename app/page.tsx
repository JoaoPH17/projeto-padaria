import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333' }}>Bem-vindo à Padaria</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>Pães quentinhos e deliciosos todos os dias!</p>
      <Link href="/catalogo">
        <button style={{ padding: '15px 30px', fontSize: '1.1rem', background: '#ff9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>
          Ver Catálogo de Produtos
        </button>
      </Link>
    </div>
  );
}