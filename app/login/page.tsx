import Link from 'next/link';

export default function Login() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Acesse sua Conta</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>Faça login para finalizar seu pedido.</p>
      
      <form style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '350px', gap: '15px' }}>
        <input type="email" placeholder="Seu E-mail" required style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        <input type="password" placeholder="Sua Senha" required style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        
        <Link href="/checkout" style={{ width: '100%' }}>
          <button type="button" style={{ width: '100%', padding: '12px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem' }}>
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}