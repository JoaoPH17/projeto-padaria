import Link from 'next/link';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
}

export default async function Catalogo() {
  
  const resposta = await fetch("http://127.0.0.1:8000/produtos/", {
    cache: "no-store"
  });
  
  const produtos: Produto[] = await resposta.json();

  return (
    <div>
      <h1 style={{ color: '#333' }}>Nosso Catálogo</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        
        {produtos.map((produto) => (
          <div key={produto.id} style={{ border: '1px solid #eaeaea', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h2>{produto.nome}</h2>
            
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>
              {produto.descricao}
            </p>
            
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              R$ {produto.preco.toFixed(2)}
            </p>
            
            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '15px' }}>
              Estoque: {produto.estoque} un
            </p>
            
            <Link href={`/produto/${produto.id}`}>
              <button style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Ver Detalhes
              </button>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}