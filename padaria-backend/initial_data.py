from models import SessionLocal, engine, Base, Produto, Usuario, Carrinho
 

Base.metadata.create_all(bind=engine)
 
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
        print(f"{len(usuarios)} usuários inseridos.")
    else:
        print("Já existem usuários no banco - pulei a inserção de usuários.")
 
 

    if db.query(Produto).count() == 0:
        produtos = [
            Produto(
                nome="Pão Francês",
                descricao="O tradicional pão quentinho e crocante, assado a cada "
                          "hora para garantir a melhor qualidade para o seu café da manhã.",
                preco=0.50,
                estoque=480,
            ),
            Produto(
                nome="Café Preto",
                descricao="Café quentinho passado na hora, forte e encorpado "
                          "para começar bem o dia.",
                preco=3.50,
                estoque=98,
            ),
            Produto(
                nome="Bolo de Cenoura",
                descricao="Clássico bolo de cenoura fofinho com uma generosa "
                          "cobertura de chocolate.",
                preco=15.00,
                estoque=48,
            ),
        ]
        db.add_all(produtos)
        print(f"{len(produtos)} produtos inseridos.")
    else:
        print("Já existem produtos no banco - pulei a inserção de produtos.")
 
    db.commit()
    print("Seed concluído com sucesso!")
 
except Exception as e:
    db.rollback()
    print("Erro ao popular o banco:", e)
    raise
finally:
    db.close()