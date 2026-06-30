"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-padaria-gcfu.onrender.com";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
}

export default function Catalogo() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/produtos/`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar");
        return res.json();
      })
      .then(data => {
        setProdutos(data);
        setCarregando(false);
      })
      .catch(err => {
        console.error(err);
        setErro(true);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <div style={{ padding: '40px', textAlign: 'center' }}>Carregando os produtos fresquinhos...</div>;
  if (erro) return <div style={{ padding: '40px', textAlign: 'center', color: '#d32f2f' }}>Não foi possível carregar o catálogo.</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#333', marginBottom: '30px' }}>Nosso Catálogo</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {produtos.map(produto => (
          <div
            key={produto.id}
            style={{
              border: '1px solid #e5e5e5',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'center'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>{produto.nome}</h2>
              <p style={{ color: '#777777', marginTop: '8px', marginBottom: '15px', fontSize: '0.9rem' }}>{produto.descricao}</p>
            </div>
            <div>
              <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ff9800', marginBottom: '5px' }}>
                R$ {produto.preco.toFixed(2)}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '15px' }}>Estoque: {produto.estoque} un</p>
              <Link
                href={`/produto/${produto.id}`}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  background: '#ff9800',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
              >
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}