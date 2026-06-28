"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const fazerCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    const novoUsuario = {
      nome: nome,
      email: email,
      senha: senha,
      tipo_usuario: "Cliente",
      telefone: telefone,
      endereco_entrega: endereco
    };

    try {
      const res = await fetch(`${API_URL}/usuarios/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario)
      });

      if (res.ok) {
        alert("Conta criada com sucesso! Faça login para continuar.");
        router.push("/login");
      } else {
        const erro = await res.json();
        setMensagem(erro.detail || "Erro ao criar a conta. Talvez o email já exista.");
      }
    } catch (error) {
      setMensagem("Erro de conexão com o servidor. Verifique se o back-end está ligado.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f9f9f9' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#ff9800' }}>Criar Conta</h1>
        
        {mensagem && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center' }}>
            {mensagem}
          </div>
        )}

        <form onSubmit={fazerCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome Completo</label>
            <input required type="text" value={nome} onChange={e => setNome(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>E-mail</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Senha</label>
            <input required type="password" value={senha} onChange={e => setSenha(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Telefone</label>
            <input required type="tel" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(87) 99999-9999" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Endereço de Entrega</label>
            <input required type="text" value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Rua, Número, Bairro" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <button type="submit" disabled={carregando} style={{ background: carregando ? '#ccc' : '#4CAF50', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', cursor: carregando ? 'not-allowed' : 'pointer', fontSize: '1.1rem', fontWeight: 'bold', marginTop: '10px' }}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ color: '#666' }}>Já tem uma conta? </span>
          <Link href="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
            Faça Login
          </Link>
        </div>
      </div>
    </div>
  );
}