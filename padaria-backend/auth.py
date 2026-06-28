from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY = "chave_super_secreta_da_padaria"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def criar_token(dados: dict):
    to_encode = dados.copy()
    expiracao = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expiracao})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verificar_admin(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        tipo_usuario = payload.get("tipo_usuario")
        
        if tipo_usuario != "Administrador":
            raise HTTPException(status_code=403, detail="Acesso negado. Apenas Administradores podem realizar esta ação.")
            
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Crachá (Token) inválido ou expirado.")