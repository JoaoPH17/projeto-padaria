"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ItemCarrinho {
  id: number;
  produto_id: number;
  nome_produto: string;
  preco_unitario: number;
  quantidade: number;
  subtotal: number;
}

export default function Carrinho() {
  const router = useRouter();
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [clienteId, setClienteId] = useState<number | null>(null);
  const carregarCarrinho = (id: number) => {
    fetch(`http://127.0.0.1:8000/carrinho/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Carrinho vazio ou não encontrado.");
        return res.json();
      })
      .then(data => {
        setItens(data.itens);
        setCarregando(false);
      })
      .catch(err => {
        setMensagem(err.message);
        setCarregando(false);
      });
  };

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (!usuarioSalvo) {
      setMensagem("Você precisa fazer login para ver o carrinho.");
      setCarregando(false);
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);
    setClienteId(usuario.id);
    carregarCarrinho(usuario.id);
  }, []);

  const removerItem = async (itemId: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/carrinho/item/${itemId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItens(itens.filter(item => item.id !== itemId));
        if (itens.length === 1) {
            setMensagem("Carrinho vazio ou não encontrado.");
        }
      } else {
        alert("Erro ao remover o item.");
      }
    } catch (e) {
      alert("Erro de conexão com o servidor.");
    }
  };

  const esvaziarCarrinho = async () => {
    if (!clienteId) return;
    
    if (!window.confirm("Tem certeza que deseja esvaziar todo o carrinho?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/carrinho/${clienteId}/limpar`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItens([]);
        setMensagem("Carrinho vazio ou não encontrado.");
      } else {
        alert("Erro ao limpar o carrinho.");
      }
    } catch (e) {
      alert("Erro de conexão com o servidor.");
    }
  };

  const valorTotal = itens.reduce((soma, item) => soma + item.subtotal, 0);

  if (carregando) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando seu carrinho...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Seu Carrinho de Compras 🛒</h1>
      
      {itens.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', border: '1px dashed #ccc', borderRadius: '8px', marginTop: '20px' }}>
          <p style={{ color: '#666', fontSize: '1.2rem' }}>{mensagem || "Seu carrinho está vazio."}</p>
          <Link href="/catalogo">
            <button style={{ marginTop: '20px', padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Ir para o Catálogo
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div style={{ marginTop: '20px' }}>
            {itens.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '15px 0' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0' }}>{item.nome_produto}</h3>
                  <p style={{ margin: 0, color: '#757575', fontSize: '0.9rem' }}>
                    {item.quantidade}x de R$ {item.preco_unitario.toFixed(2)}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    R$ {item.subtotal.toFixed(2)}
                  </div>
                  <button 
                    onClick={() => removerItem(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#d32f2f' }}
                    title="Remover item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button 
              onClick={esvaziarCarrinho}
              style={{ background: 'transparent', border: '1px solid #d32f2f', color: '#d32f2f', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Esvaziar Carrinho
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>Total da Compra:</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2e7d32' }}>
              R$ {valorTotal.toFixed(2)}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            <Link href="/catalogo" style={{ textDecoration: 'none', color: '#ff9800', padding: '15px 0' }}>
              ← Continuar Comprando
            </Link>
            
            <button 
              onClick={() => router.push('/checkout')}
              style={{ padding: '15px 30px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              Avançar para Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}