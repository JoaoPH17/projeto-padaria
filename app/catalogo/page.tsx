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

  if (carregando) return <div className="p-10 text-center">Carregando os produtos fresquinhos...</div>;
  if (erro) return <div className="p-10 text-center text-red-500">Não foi possível carregar o catálogo.</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Nosso Catálogo</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {produtos.map(produto => (
          <div key={produto.id} className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow bg-white flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{produto.nome}</h2>
              <p className="text-gray-600 mt-2 mb-4 text-sm">{produto.descricao}</p>
            </div>
            <div>
              <p className="text-2xl font-black text-orange-600 mb-1">
                R$ {produto.preco.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mb-4">Estoque: {produto.estoque} un</p>
              <Link
                href={`/produto/${produto.id}`}
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
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