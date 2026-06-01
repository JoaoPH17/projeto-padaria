"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [logado, setLogado] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    setLogado(!!usuarioSalvo);
  }, [pathname]);

  const fazerLogout = () => {
    localStorage.removeItem("usuarioLogado");
    setLogado(false);
    router.push("/");
  };

  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9f9f9' }}>
        <header style={{ padding: '1rem 2rem', background: '#ff9800', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
          
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>🏠 Home</Link>
            <Link href="/catalogo" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>🍞 Catálogo</Link>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/carrinho" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>🛒 Carrinho</Link>
            
            {logado ? (
              <>
                <Link href="/perfil" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>👤 Meu Perfil</Link>
                <button onClick={fazerLogout} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  🚪 Sair
                </button>
              </>
            ) : (
              <Link href="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>🔑 Entrar</Link>
            )}
          </div>

        </header>
        
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}