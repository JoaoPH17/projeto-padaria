import os
from models import SessionLocal, Produto, Usuario

def popular_banco():
    print(f"DEBUG: Conectando no banco: {os.getenv('DATABASE_URL')}")
    db = SessionLocal()
    try:
        if db.query(Usuario).count() == 0:
            usuarios = [
                Usuario(
                    nome="Cliente Teste",
                    email="cliente@padaria.com",
                    senha="123",
                    tipo_usuario="Cliente",
                    telefone="87999999999",
                    endereco_entrega="Rua do Pão, 123",
                ),
                Usuario(
                    nome="Chefe da Padaria",
                    email="admin@padaria.com",
                    senha="123",
                    tipo_usuario="Administrador",
                    telefone=None,
                    endereco_entrega=None,
                ),
            ]
            db.add_all(usuarios)
            db.flush()
            print("Usuários inseridos.")
        
        if db.query(Produto).count() == 0:
            produtos = [
                Produto(
                    nome="Pão Francês",
                    descricao="O tradicional pão quentinho e crocante.",
                    preco=0.50,
                    estoque=400,
                ),
                Produto(
                    nome="Café Preto",
                    descricao="Café quentinho passado na hora.",
                    preco=3.50,
                    estoque=200,
                ),
                Produto(
                    nome="Bolo de Cenoura",
                    descricao="Clássico bolo de cenoura fofinho.",
                    preco=15.00,
                    estoque=50,
                ),
            ]
            db.add_all(produtos)
            print("Produtos inseridos.")
        
        db.commit()
        print("Seed concluído com sucesso!")
    except Exception as e:
        db.rollback()
        print("Erro ao popular o banco:", e)
    finally:
        db.close()