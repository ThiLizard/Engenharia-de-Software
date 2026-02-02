# 🏥 EduCare - Sistema de Comunicação e Monitoramento de Doenças no Ambiente Escolar

Sistema completo para comunicação e monitoramento de saúde no ambiente escolar, desenvolvido com React + TypeScript no frontend e Java Spring Boot no backend.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Documentação](#documentação)

## 🎯 Sobre o Projeto

O EduCare é um sistema integrado que facilita a comunicação entre escolas, profissionais de saúde e responsáveis, permitindo o monitoramento eficiente de doenças no ambiente escolar.

### Tipos de Usuário

- **🏫 Escola**: Gestão e monitoramento escolar
- **👨‍⚕️ Médico**: Profissionais de saúde
- **👤 Responsável**: Pais e responsáveis pelos alunos
- **📊 Admin**: Administradores do sistema

## 🚀 Tecnologias

### Backend
- Java 17
- Spring Boot 4.0.1
- Spring Security (JWT)
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- Axios
- Lucide React

## 📋 Pré-requisitos

### Backend
- Java JDK 17+
- Maven 3.6+
- PostgreSQL 12+

### Frontend
- Node.js 18+
- npm ou yarn

## 🔧 Instalação e Execução

### 1. Configurar o Banco de Dados

```bash
# Conectar ao PostgreSQL e criar o banco
createdb educare
```

Ou via SQL:
```sql
CREATE DATABASE educare;
```

### 2. Configurar o Backend

```bash
# Navegar para o diretório do backend
cd backend/EduCare

# Copiar o arquivo de exemplo de variáveis de ambiente
cp .env.example .env

# Editar o arquivo .env com suas credenciais do PostgreSQL
# DB_PASSWORD=sua_senha_aqui
```

**Executar o backend:**

```bash
# Usando Maven Wrapper (recomendado)
./mvnw spring-boot:run

# Ou usando Maven instalado
mvn spring-boot:run
```

O backend estará disponível em `http://localhost:8080`

### 3. Configurar o Frontend

```bash
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
Engenharia-de-Software/
├── backend/
│   └── EduCare/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/software_engineering/EduCare/
│       │   │   │   ├── config/      # Configurações
│       │   │   │   ├── controller/  # Controllers REST
│       │   │   │   ├── dto/         # Data Transfer Objects
│       │   │   │   ├── model/       # Entidades
│       │   │   │   ├── repository/  # Repositórios
│       │   │   │   ├── service/     # Serviços
│       │   │   │   └── util/        # Utilitários
│       │   │   └── resources/
│       │   │       └── application.properties
│       │   └── test/
│       ├── .env.example
│       ├── pom.xml
│       └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/      # Componentes reutilizáveis
    │   ├── contexts/        # Contextos React
    │   ├── pages/           # Páginas
    │   ├── services/        # Serviços de API
    │   ├── styles/          # Estilos CSS
    │   └── App.tsx
    ├── package.json
    └── README.md
```

## ✨ Funcionalidades

### Autenticação
- ✅ Login com email e senha
- ✅ Registro de novos usuários
- ✅ Autenticação JWT
- ✅ Proteção de rotas

### Dashboard
- ✅ Painel personalizado por tipo de usuário
- ✅ Menu de navegação
- ✅ Visualização de atividades recentes

### Monitoramento
- ✅ Registro de sintomas
- ✅ Comunicação via chat
- ✅ Alertas de surtos

## 📚 Documentação

Para informações detalhadas sobre cada parte do projeto:

- **[Backend README](backend/EduCare/README.md)** - Documentação completa da API, endpoints, configuração
- **[Frontend README](frontend/README.md)** - Guia de desenvolvimento, estrutura, deploy

### Endpoints Principais da API

```
POST   /api/auth/register  - Registrar novo usuário
POST   /api/auth/login     - Fazer login
GET    /api/auth/me        - Obter usuário atual
```

## 🚀 Quick Start

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd Engenharia-de-Software

# 2. Configure o PostgreSQL
createdb educare

# 3. Configure e inicie o backend
cd backend/EduCare
cp .env.example .env
# Edite o .env com suas credenciais
./mvnw spring-boot:run

# 4. Em outro terminal, configure e inicie o frontend
cd ../../frontend
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador!

## 🐳 Docker (Opcional)

Para executar o PostgreSQL via Docker:

```bash
docker run --name educare-postgres \
  -e POSTGRES_DB=educare \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15
```

## 🧪 Testes

### Backend
```bash
cd backend/EduCare
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 📝 Licença

Este projeto é parte do trabalho de Engenharia de Software.

## 👥 Equipe

Desenvolvido como projeto acadêmico de Engenharia de Software.

## 📞 Suporte

Para problemas ou dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para a disciplina de Engenharia de Software**
