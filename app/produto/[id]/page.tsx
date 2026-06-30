"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-padaria-gcfu.onrender.com";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagem_url?: string;
}

export default function ProdutoDetalhes() {
  const params = useParams();
  const id = params.id;
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/produtos/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduto(data);
        setCarregando(false);
      })
      .catch(() => {
        setMensagem("Erro ao carregar o produto.");
        setCarregando(false);
      });
  }, [id]);

  const adicionarAoCarrinho = async () => {
    setMensagem("Processando...");
    
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (!usuarioSalvo) {
      setMensagem("⚠️ Você precisa fazer login para adicionar itens ao carrinho.");
      return;
    }
    
    const usuario = JSON.parse(usuarioSalvo);
    const clienteId = usuario.id;

    const dados = {
      produto_id: parseInt(id as string),
      quantidade: quantidade
    };

    try {
      const res = await fetch(`${API_URL}/carrinho/${clienteId}/adicionar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      if (res.ok) {
        setMensagem("Sucesso! Adicionado ao carrinho. 🛒");
      } else {
        const erro = await res.json();
        setMensagem(`Erro: ${erro.detail}`);
      }
    } catch (e) {
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  if (carregando) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando...</div>;
  
  if (!produto || (produto as any).detail) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Produto não encontrado.</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Link href="/catalogo" style={{ textDecoration: 'none', color: '#ff9800' }}>← Voltar ao Catálogo</Link>
      
      <div style={{ border: '1px solid #eee', padding: '30px', marginTop: '20px', borderRadius: '8px' }}>

        <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          
          {produto.imagem_url && (
            <div style={{
              position: 'relative',
              width: '220px',
              height: '220px',
              borderRadius: '8px',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <Image
                src={produto.imagem_url}
                alt={produto.nome}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          <div style={{ flex: 1, minWidth: '200px' }}>
            <h1 style={{ marginTop: 0 }}>{produto.nome}</h1>
            <p style={{ color: '#555', lineHeight: '1.6' }}>{produto.descricao}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
              R$ {produto.preco.toFixed(2)}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#888' }}>
              Disponível: {produto.estoque} un
            </p>
          </div>

        </div>

        {mensagem && (
          <div style={{ padding: '10px', marginTop: '20px', marginBottom: '15px', borderRadius: '4px', background: mensagem.includes('Erro') ? '#ffebee' : '#e8f5e9', color: mensagem.includes('Erro') ? '#c62828' : '#2e7d32' }}>
            {mensagem}
          </div>
        )}

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '20px' }}>
          <input 
            type="number" 
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value))}
            min="1" 
            max={produto.estoque}
            style={{ padding: '10px', width: '60px', borderRadius: '4px', border: '1px solid #ccc' }} 
          />
          
          <button 
            onClick={adicionarAoCarrinho}
            style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}