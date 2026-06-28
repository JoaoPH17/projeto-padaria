"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-padaria-i3yu.onrender.com";

interface ItemPedido {
  nome_produto: string;
  quantidade: number;
  preco_unitario: number;
}

interface Pedido {
  pedido_id: number;
  data: string;
  valor_total: number;
  status: string;
  metodo_pagamento: string;
  itens: ItemPedido[];
}

export default function HistoricoPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (!usuarioSalvo) {
      setMensagem("⚠️ Você precisa fazer login para visualizar seu histórico.");
      setCarregando(false);
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    fetch(`${API_URL}/pedidos/${usuario.id}/historico`)
      .then(res => res.json())
      .then(data => {
        setPedidos(data);
        setCarregando(false);
      })
      .catch(() => {
        setMensagem("Erro ao conectar com o servidor.");
        setCarregando(false);
      });
  }, []);

  if (carregando) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando seu histórico...</div>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Meus Pedidos 📜</h1>
        <Link href="/catalogo" style={{ textDecoration: 'none', color: '#ff9800' }}>Ir para o Catálogo</Link>
      </div>

      {mensagem && (
        <div style={{ padding: '15px', background: '#ffebee', color: '#c62828', borderRadius: '4px', textAlign: 'center' }}>
          {mensagem}
        </div>
      )}

      {!mensagem && pedidos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', border: '1px dashed #ccc', borderRadius: '8px' }}>
          <p style={{ color: '#666' }}>Você ainda não realizou nenhum pedido na nossa padaria.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {pedidos.map((pedido) => (
            <div key={pedido.pedido_id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Pedido #{pedido.pedido_id}</span>
                  <p style={{ margin: '3px 0 0 0', color: '#666', fontSize: '0.85rem' }}>{pedido.data}</p>
                </div>
                <span style={{ padding: '5px 10px', borderRadius: '20px', background: '#e8f5e9', color: '#2e7d32', fontWeight: 'bold', fontSize: '0.85rem', alignSelf: 'center' }}>
                  {pedido.status}
                </span>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#888', fontWeight: 'bold' }}>ITENS:</p>
                {pedido.itens.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', margin: '3px 0' }}>
                    <span>{item.quantidade}x {item.nome_produto}</span>
                    <span style={{ color: '#555' }}>R$ {(item.quantidade * item.preco_unitario).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px dashed #eee', fontSize: '0.9rem', color: '#555' }}>
                <span>Pagamento: <strong>{pedido.metodo_pagamento}</strong></span>
                <span style={{ fontSize: '1.1rem', color: '#000' }}>
                  Total: <strong style={{ color: '#2e7d32' }}>R$ {pedido.valor_total.toFixed(2)}</strong>
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}