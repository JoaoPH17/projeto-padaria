"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Perfil() {
  const router = useRouter();
  const [cliente, setCliente] = useState<any>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (!usuarioSalvo) {
      router.push("/login");
      return;
    }
    const usuario = JSON.parse(usuarioSalvo);
    setCliente(usuario);
    
    setNome(usuario.nome || "");
    setEmail(usuario.email || "");
    setTelefone(usuario.telefone || "");
    setEndereco(usuario.endereco_entrega || "");
  }, [router]);

  const salvarAlteracoes = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    const dadosAtualizados = {
      nome: nome,
      email: email || "email@mantido.com",
      senha: senha || "123",
      telefone: telefone,
      endereco_entrega: endereco
    };

    try {
      const res = await fetch(`http://127.0.0.1:8000/usuarios/${cliente.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados)
      });

      if (res.ok) {
        const usuarioNovo = await res.json();
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioNovo));
        setMensagem("✅ Perfil atualizado com sucesso!");
      } else {
        const erro = await res.json();
        setMensagem(`Erro: ${erro.detail}`);
      }
    } catch (error) {
      setMensagem("Erro ao conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  };

  if (!cliente) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
      
      <div style={{ flex: '1', minWidth: '250px' }}>
        <h1 style={{ marginTop: 0 }}>Meu Perfil</h1>
        <p style={{ color: '#666' }}>Olá, <strong>{cliente.nome}</strong>!</p>
        
        <div style={{ marginTop: '30px', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3 style={{ marginTop: 0 }}>Meus Pedidos</h3>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Acompanhe o status e o histórico das suas compras na padaria.</p>
          <Link href="/historico">
            <button style={{ width: '100%', padding: '12px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              📜 Ver Histórico Completo
            </button>
          </Link>
        </div>
      </div>

      <div style={{ flex: '2', minWidth: '300px', background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Atualizar Dados</h2>
        
        <form onSubmit={salvarAlteracoes} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '5px' }}>Nome Completo</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '5px' }}>Telefone</label>
            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '5px' }}>Endereço de Entrega (Rua, Número, Bairro)</label>
            <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ borderTop: '1px dashed #ccc', paddingTop: '15px', marginTop: '5px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '5px' }}>Nova Senha (deixe em branco para não alterar)</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="******" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          {mensagem && (
            <div style={{ padding: '10px', borderRadius: '4px', background: mensagem.includes('Erro') ? '#ffebee' : '#e8f5e9', color: mensagem.includes('Erro') ? '#c62828' : '#2e7d32', textAlign: 'center', fontWeight: 'bold' }}>
              {mensagem}
            </div>
          )}

          <button type="submit" disabled={carregando} style={{ padding: '15px', background: carregando ? '#999' : '#ff9800', color: '#fff', border: 'none', borderRadius: '4px', cursor: carregando ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px' }}>
            {carregando ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </div>

    </div>
  );
}