import Link from 'next/link';

export default function ProdutoCafeExpresso() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Link href="/catalogo" style={{ textDecoration: 'none', color: '#ff9800' }}>← Voltar ao Catálogo</Link>
      <div style={{ border: '1px solid #eee', padding: '30px', marginTop: '20px', borderRadius: '8px' }}>
        <h1 style={{ marginTop: 0 }}>Café Expresso</h1>
        <p style={{ color: '#555', lineHeight: '1.6' }}>Café expresso tradicional, com grãos selecionados e moídos na hora. Aroma intenso e sabor marcante.</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>R$ 5,00</p>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '20px' }}>
          <input type="number" defaultValue="1" min="1" style={{ padding: '10px', width: '60px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <Link href="/carrinho">
            <button style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
              Adicionar ao Carrinho
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}