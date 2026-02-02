# EduCare Backend

Sistema de Comunicação e Monitoramento de Doenças no Ambiente Escolar - Backend API

## 🚀 Tecnologias

- **Java 17**
- **Spring Boot 4.0.1**
- **Spring Security** (JWT Authentication)
- **Spring Data JPA**
- **PostgreSQL**
- **Lombok**
- **Maven**

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Java JDK 17+](https://www.oracle.com/java/technologies/downloads/)
- [Maven 3.6+](https://maven.apache.org/download.cgi)
- [PostgreSQL 12+](https://www.postgresql.org/download/)

## 🔧 Configuração do Banco de Dados

### 1. Instalar PostgreSQL

Se ainda não tiver o PostgreSQL instalado, instale-o seguindo as instruções do site oficial.

### 2. Criar o Banco de Dados

Conecte-se ao PostgreSQL e crie o banco de dados:

```sql
CREATE DATABASE educare;
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do PostgreSQL:

```env
DB_URL=jdbc:postgresql://localhost:5432/educare
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_DDL_AUTO=update
DB_SHOW_SQL=true

SERVER_PORT=8080

JWT_SECRET=sua_chave_secreta_jwt_aqui_mude_em_producao
JWT_EXPIRATION=86400000
```

> ⚠️ **IMPORTANTE**: Nunca commite o arquivo `.env` no Git! Ele já está no `.gitignore`.

## 🏃 Como Executar

### Opção 1: Usando Maven Wrapper (Recomendado)

```bash
# No diretório backend/EduCare
./mvnw spring-boot:run
```

### Opção 2: Usando Maven instalado

```bash
# No diretório backend/EduCare
mvn spring-boot:run
```

### Opção 3: Compilar e executar o JAR

```bash
# Compilar
mvn clean package

# Executar
java -jar target/EduCare-0.0.1-SNAPSHOT.jar
```

O servidor será iniciado em `http://localhost:8080`

## 📡 Endpoints da API

### Autenticação

#### Registrar Usuário
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "name": "Nome do Usuário",
  "userType": "RESPONSAVEL"
}
```

**Tipos de usuário disponíveis:**
- `ESCOLA`
- `MEDICO`
- `RESPONSAVEL`
- `ADMIN`

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@exemplo.com",
    "name": "Nome do Usuário",
    "userType": "RESPONSAVEL"
  }
}
```

#### Obter Usuário Atual
```http
GET /api/auth/me
Authorization: Bearer {token}
```

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Após o login, inclua o token no header de todas as requisições protegidas:

```
Authorization: Bearer {seu_token_jwt}
```

## 🗄️ Estrutura do Projeto

```
src/main/java/com/software_engineering/EduCare/
├── config/          # Configurações (Security, CORS)
├── controller/      # Controllers REST
├── dto/            # Data Transfer Objects
├── model/          # Entidades JPA
├── repository/     # Repositórios JPA
├── service/        # Lógica de negócio
└── util/           # Utilitários (JWT)
```

## 🛠️ Desenvolvimento

### Executar em modo de desenvolvimento

O Spring Boot DevTools está incluído, permitindo hot reload:

```bash
./mvnw spring-boot:run
```

### Verificar logs do SQL

Os logs SQL estão habilitados por padrão (configurável via `DB_SHOW_SQL` no `.env`).

## 📦 Build para Produção

```bash
# Compilar sem executar testes
mvn clean package -DskipTests

# Compilar com testes
mvn clean package
```

O arquivo JAR será gerado em `target/EduCare-0.0.1-SNAPSHOT.jar`

## 🐳 Docker (Opcional)

Se preferir usar Docker para o PostgreSQL:

```bash
docker run --name educare-postgres \
  -e POSTGRES_DB=educare \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15
```

## ⚙️ Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DB_URL` | URL de conexão do PostgreSQL | `jdbc:postgresql://localhost:5432/educare` |
| `DB_USERNAME` | Usuário do banco de dados | `postgres` |
| `DB_PASSWORD` | Senha do banco de dados | `postgres` |
| `DB_DDL_AUTO` | Estratégia de criação de schema | `update` |
| `DB_SHOW_SQL` | Exibir SQL nos logs | `true` |
| `SERVER_PORT` | Porta do servidor | `8080` |
| `JWT_SECRET` | Chave secreta para JWT | (valor padrão) |
| `JWT_EXPIRATION` | Tempo de expiração do token (ms) | `86400000` (24h) |

## 🧪 Testes

```bash
# Executar todos os testes
mvn test

# Executar com cobertura
mvn test jacoco:report
```

## 📝 Licença

Este projeto é parte do trabalho de Engenharia de Software.

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para problemas ou dúvidas, abra uma issue no repositório.
