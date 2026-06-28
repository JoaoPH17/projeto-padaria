"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Checkout() {
  const router = useRouter();
  const [metodoPagamento, setMetodoPagamento] = useState("Pix");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [cliente, setCliente] = useState<any>(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      setCliente(JSON.parse(usuarioSalvo));
    }
  }, []);

  const finalizarCompra = async () => {
    if (!cliente) {
      setMensagem("⚠️ Erro: Precisa de estar logado para finalizar a compra.");
      return;
    }
    
    setCarregando(true);
    setMensagem("");

    const dadosPedido = {
      cliente_id: cliente.id, 
      metodo_pagamento: metodoPagamento
    };

    try {
      const resposta = await fetch(`${API_URL}/pedidos/finalizar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosPedido),
      });

      if (resposta.ok) {
        const pedido = await resposta.json();
        
        setMensagem(`Sucesso! Pedido #${pedido.pedido_id} criado. A redirecionar para o histórico...`);
        
        setTimeout(() => {
          router.push('/historico');
        }, 2500);

      } else {
        const erro = await resposta.json();
        setMensagem(`Erro: ${erro.detail}`);
        setCarregando(false);
      }
    } catch (error) {
      setMensagem("Erro ao ligar ao servidor. Verifique o terminal do VS Code onde o Python está a correr para ver o motivo!");
      setCarregando(false);
    }
  };

  if (!cliente) return <div style={{ padding: '50px', textAlign: 'center' }}>A carregar os dados do cliente...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Finalizar Pedido</h1>
      
      <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>1. Endereço de Entrega</h2>
        <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: 'bold' }}>
          {cliente.endereco_entrega ? cliente.endereco_entrega : "Endereço não registado."}
        </p>
        <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '5px' }}>
          Destinatário: {cliente.nome}
        </p>
      </div>

      <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>2. Método de Pagamento</h2>
        <select 
          value={metodoPagamento}
          onChange={(e) => setMetodoPagamento(e.target.value)}
          style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
        >
          <option value="Pix">Pix</option>
          <option value="Cartão de Crédito">Cartão de Crédito</option>
          <option value="Cartão de Débito">Cartão de Débito</option>
          <option value="Dinheiro na Entrega">Dinheiro na Entrega</option>
        </select>
      </div>

      {mensagem && (
        <div style={{ padding: '15px', marginBottom: '20px', borderRadius: '4px', background: mensagem.includes('Erro') ? '#ffebee' : '#e8f5e9', color: mensagem.includes('Erro') ? '#c62828' : '#2e7d32' }}>
          <strong>{mensagem}</strong>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/carrinho" style={{ textDecoration: 'none', color: '#ff9800' }}>← Voltar ao Carrinho</Link>
        <button 
          onClick={finalizarCompra}
          disabled={carregando}
          style={{ padding: '15px 30px', background: carregando ? '#9e9e9e' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: carregando ? 'not-allowed' : 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}
        >
          {carregando ? "A processar..." : "Confirmar Pedido"}
        </button>
      </div>
    </div>
  );
}