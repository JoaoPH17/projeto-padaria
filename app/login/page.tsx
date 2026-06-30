"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-padaria-gcfu.onrender.com";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (resposta.ok) {
        const dadosUsuario = await resposta.json();

        localStorage.setItem("tokenPadaria", dadosUsuario.access_token);
        localStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario.usuario));

        if (dadosUsuario.usuario.tipo_usuario.toLowerCase() === "administrador") {
          router.push("/admin");
        } else {
          router.push("/catalogo");
        }

      } else {
        const erro = await resposta.json();
        const mensagemErro = typeof erro.detail === "string"
          ? erro.detail
          : "Não foi possível fazer login. Verifique seus dados.";
        setMensagem(mensagemErro);
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Acesse sua Conta</h1>
      <p style={{ color: '#6d6d6d', marginBottom: '20px' }}>Faça login para finalizar seu pedido.</p>

      <form 
        onSubmit={handleLogin}
        style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '350px', gap: '15px' }}
      >
        <input 
          type="email" 
          placeholder="Seu E-mail" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} 
        />
        
        <input 
          type="password" 
          placeholder="Sua Senha" 
          required 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} 
        />

        {mensagem && (
          <div style={{ color: '#c62828', background: '#ffebee', padding: '10px', borderRadius: '4px', textAlign: 'center', fontSize: '0.9rem' }}>
            {mensagem}
          </div>
        )}

        <button 
          type="submit" 
          disabled={carregando}
          style={{ width: '100%', padding: '12px', background: '#ff9800', color: 'white', border: 'none', borderRadius: '4px', cursor: carregando ? 'not-allowed' : 'pointer', fontSize: '1.1rem' }}
        >
          {carregando ? "Autenticando..." : "Entrar"}
        </button>

        <span style={{ color: '#706f6f' }}>Ainda não tem conta? </span>
        <Link href="/cadastro" style={{ color: '#ff9800', textDecoration: 'none', fontWeight: 'bold' }}>Crie uma agora!</Link>
      </form>
    </div>
  );
}