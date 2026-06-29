"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-padaria-i3yu.onrender.com";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
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

  if (carregando) return <div className="p-10 text-center">Carregando os produtos fresquinhos...</div>;
  if (erro) return <div className="p-10 text-center text-red-500">Não foi possível carregar o catálogo.</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Nosso Catálogo</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {produtos.map(produto => (
          <div key={produto.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{produto.nome}</h2>
            <p className="text-gray-600 my-2">{produto.descricao}</p>
            <p className="text-lg font-semibold mb-4">R$ {produto.preco.toFixed(2)}</p>
            <Link href={`/produto/${produto.id}`} className="bg-orange-500 text-white px-4 py-2 rounded">
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}