import Link from 'next/link';

export default function Checkout() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Finalizar Pedido</h1>
      
      <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>1. Endereço de Entrega</h2>
        <p style={{ color: '#555' }}>Rua Fictícia, 123 - Bairro Centro</p>
      </div>

      <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>2. Método de Pagamento</h2>
        <select style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}>
          <option>Pix</option>
          <option>Cartão de Crédito</option>
          <option>Cartão de Débito</option>
          <option>Dinheiro na Entrega</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/carrinho" style={{ textDecoration: 'none', color: '#ff9800' }}>← Voltar ao Carrinho</Link>
        <Link href="/">
          <button style={{ padding: '15px 30px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}>
            Confirmar Pedido
          </button>
        </Link>
      </div>
    </div>
  );
}