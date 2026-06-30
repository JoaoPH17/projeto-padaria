"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const salvo = localStorage.getItem("usuarioLogado");
    if (salvo) {
      setUsuarioLogado(JSON.parse(salvo));
    }
    setCarregando(false);
  }, []);

  return (
    <div style={{ padding: '50px 20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        flexWrap: 'wrap',
        maxWidth: '1300px',
        margin: '0 auto'
      }}>


        <div style={{
          position: 'relative',
          width: '350px',
          height: '300px',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          flexShrink: 0
        }}>
          <Image
            src="/imagens/padaria_vitrine.jpg"
            alt="Vitrine da padaria"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', color: '#333' }}>Bem-vindo à Padaria!</h1>

          <p style={{ fontSize: '1.2rem', color: '#707070', margin: '15px auto 0 auto', lineHeight: '1.6' }}>
            Pães artesanais saindo do forno a toda hora, bolos caseiros fresquinhos, salgados irresistíveis e cafés especiais passados na hora. Tudo preparado com muito carinho para o seu dia a dia!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '30px' }}>

            <Link href="/catalogo">
              <button style={{ padding: '15px 30px', fontSize: '1.1rem', background: '#ff9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '250px' }}>
                Ver Catálogo de Produtos
              </button>
            </Link>

            {!carregando && (
              usuarioLogado ? (
                <div style={{ padding: '12px 20px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '5px', border: '1px solid #c8e6c9', width: 'fit-content' }}>
                  Você já está logado como <strong>{usuarioLogado.nome}</strong>!
                </div>
              ) : (
                <Link href="/login">
                  <button style={{ padding: '15px 30px', fontSize: '1.1rem', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '250px' }}>
                    Fazer Login
                  </button>
                </Link>
              )
            )}
          </div>
        </div>


        <div style={{
          position: 'relative',
          width: '350px',
          height: '300px',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          flexShrink: 0
        }}>
          <Image
            src="/imagens/padaria_bolo_vitrine.jpg"
            alt="Bolo na vitrine da padaria"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

      </div>
    </div>
  );
}