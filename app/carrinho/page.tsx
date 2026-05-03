import Link from 'next/link';

export default function Carrinho() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Seu Carrinho</h1>
      <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Produto</span>
          <span style={{ fontWeight: 'bold' }}>Subtotal</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <span>10x Pão Francês</span>
          <span>R$ 5,00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <span>1x Café Expresso</span>
          <span>R$ 5,00</span>
        </div>
      </div>
      
      <h2 style={{ textAlign: 'right' }}>Total: R$ 10,00</h2>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
        <Link href="/catalogo">
          <button style={{ padding: '12px 24px', background: '#f1f1f1', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
            Continuar Comprando
          </button>
        </Link>
        <Link href="/login">
          <button style={{ padding: '12px 24px', background: '#ff9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Avançar
          </button>
        </Link>
      </div>
    </div>
  );
}