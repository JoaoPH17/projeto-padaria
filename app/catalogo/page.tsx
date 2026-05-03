import Link from 'next/link';

export default function Catalogo() {
  return (
    <div>
      <h1 style={{ color: '#333' }}>Nosso Catálogo</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={{ border: '1px solid #eaeaea', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Pão Francês</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>R$ 0,50 / un</p>
          <Link href="/produto/produto-pao">
            <button style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Ver Detalhes
            </button>
          </Link>
        </div>
        <div style={{ border: '1px solid #eaeaea', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Bolo de Cenoura</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>R$ 15,00</p>
          <Link href="/produto/produto-bolo">
            <button style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Ver Detalhes
            </button>
          </Link>
        </div>
        <div style={{ border: '1px solid #eaeaea', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Café Expresso</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>R$ 5,00</p>
          <Link href="/produto/produto-cafe">
            <button style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Ver Detalhes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}