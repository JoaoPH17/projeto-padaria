"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagem_url?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-padaria-i3yu.onrender.com";

export default function AdminPanel() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    const token = localStorage.getItem("tokenPadaria");
    
    if (!usuarioSalvo || !token) {
      router.push("/login");
      return;
    }
    
    const usuario = JSON.parse(usuarioSalvo);
    if (usuario.tipo_usuario !== "Administrador") {
      alert("Área restrita para administradores!");
      router.push("/catalogo");
      return;
    }

    carregarProdutos();
  }, [router]);

  const carregarProdutos = async () => {
    try {
      const res = await fetch(`${API_URL}/produtos/`);
      if (res.ok) {
        const data = await res.json();
        setProdutos(data);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setCarregando(false);
    }
  };

  const salvarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem("tokenPadaria");
    
    const produtoData = {
      nome,
      descricao,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
      imagem_url: imagemUrl || null
    };

    const url = editandoId 
      ? `${API_URL}/produtos/${editandoId}`
      : `${API_URL}/produtos/`;
      
    const method = editandoId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(produtoData)
      });

      if (res.ok) {
        alert(editandoId ? "Produto atualizado!" : "Produto criado com sucesso!");
        limparFormulario();
        carregarProdutos();
      } else {
        alert("Erro ao salvar o produto. Verifique suas permissões.");
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.");
    }
  };

  const deletarProduto = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    
    const token = localStorage.getItem("tokenPadaria");

    try {
      // 4. Trocamos o link fixo pela variável
      const res = await fetch(`${API_URL}/produtos/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.ok) {
        setProdutos(produtos.filter(p => p.id !== id));
      } else {
        alert("Erro ao excluir. Verifique sua permissão.");
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.");
    }
  };

  const prepararEdicao = (produto: Produto) => {
    setEditandoId(produto.id);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco.toString());
    setEstoque(produto.estoque.toString());
    setImagemUrl(produto.imagem_url || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limparFormulario = () => {
    setEditandoId(null);
    setNome("");
    setDescricao("");
    setPreco("");
    setEstoque("");
    setImagemUrl("");
  };

  if (carregando) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando Painel...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Painel do Administrador ⚙️</h1>
        <Link href="/catalogo" style={{ textDecoration: 'none', color: '#1976d2' }}>Voltar à Loja</Link>
      </div>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>{editandoId ? "✏️ Editar Produto" : "📦 Cadastrar Novo Produto"}</h2>
        <form onSubmit={salvarProduto} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input required placeholder="Nome do Produto" value={nome} onChange={e => setNome(e.target.value)} style={{ padding: '10px' }} />
          <textarea required placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} style={{ padding: '10px', minHeight: '80px' }} />
          <div style={{ display: 'flex', gap: '15px' }}>
            <input required type="number" step="0.01" placeholder="Preço (Ex: 10.50)" value={preco} onChange={e => setPreco(e.target.value)} style={{ padding: '10px', flex: 1 }} />
            <input required type="number" placeholder="Estoque Atual" value={estoque} onChange={e => setEstoque(e.target.value)} style={{ padding: '10px', flex: 1 }} />
          </div>
          <div>
            <input
              type="text"
              placeholder="Caminho da imagem (ex: /imagens/pao_frances.jpg)"
              value={imagemUrl}
              onChange={e => setImagemUrl(e.target.value)}
              style={{ padding: '10px', width: '100%' }}
            />
            <p style={{ fontSize: '0.8rem', color: '#888', margin: '5px 0 0 0' }}>
              Opcional. O arquivo de imagem precisa estar salvo dentro da pasta <code>public/imagens/</code> do projeto.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ background: '#4CAF50', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', cursor: 'pointer', flex: 1 }}>
              {editandoId ? "Salvar Alterações" : "Adicionar ao Catálogo"}
            </button>
            {editandoId && (
              <button type="button" onClick={limparFormulario} style={{ background: '#757575', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Cancelar Edição
              </button>
            )}
          </div>
        </form>
      </div>

      <h2>Estoque Atual</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#333', color: 'white' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Nome</th>
              <th style={{ padding: '12px' }}>Preço</th>
              <th style={{ padding: '12px' }}>Estoque</th>
              <th style={{ padding: '12px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px' }}>#{produto.id}</td>
                <td style={{ padding: '12px' }}>{produto.nome}</td>
                <td style={{ padding: '12px' }}>R$ {produto.preco.toFixed(2)}</td>
                <td style={{ padding: '12px', color: produto.estoque < 10 ? 'red' : 'black' }}>
                  {produto.estoque} un.
                </td>
                <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => prepararEdicao(produto)} style={{ background: '#ff9800', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                    Editar
                  </button>
                  <button onClick={() => deletarProduto(produto.id)} style={{ background: '#f44336', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}