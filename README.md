
# 🏥 EduCare - Sistema de Comunicação e Monitoramento de Doenças

Sistema integrado para monitoramento de saúde escolar, facilitando a comunicação entre escolas, médicos e responsáveis.

## 🚀 Como Executar o Projeto

Você pode rodar o EduCare de duas formas: usando **Docker** (recomendado para rapidez) ou **Manualmente** (para desenvolvimento).

### 🐳 1. Via Docker (Modo Rápido)

Certifique-se de ter o [Docker](https://www.docker.com/) instalado.

1. **Configure as variáveis:** O projeto já possui um arquivo `.env` configurado para o ambiente Docker.
2. **Suba os containers:**
```bash
docker-compose build --no-cache
docker-compose up 
```


3. **Acesse:**
* **Frontend:** `http://localhost:5173`
* **Backend (API):** `http://localhost:8080`
* **Banco (PostgreSQL):** Porta `5433` (conforme definido no seu `.env`).



---

### 🛠️ 2. Execução Manual (Desenvolvimento)

#### **Pré-requisitos**

* **Java 17 ou 21** 

* **Node.js 20+** 

* **PostgreSQL 16** 

* **Maven**

#### **Passo 1: Banco de Dados**

Crie um banco de dados chamado `educare`. No seu terminal ou ferramenta SQL:

```sql
CREATE DATABASE educare;

```

As credenciais padrão no seu `.env` são: Usuário `teste` e Senha `teste123`.

#### **Passo 2: Backend (Spring Boot)**

1. Navegue até a pasta: `cd backend/EduCare`
2. Instale e rode:
```bash
./mvnw spring-boot:run

```



#### **Passo 3: Frontend (React + Vite)**

1. Navegue até a pasta: `cd frontend`
2. Instale as dependências:
```bash
npm install

```


3. Inicie o servidor de desenvolvimento:
```bash
npm run dev

```



---

## ⚙️ Configurações (.env)

O sistema utiliza as seguintes variáveis principais:

| Variável | Descrição | Valor Padrão |
| --- | --- | --- |
| `POSTGRES_PORT` | Porta do Banco | `5433` |
| `SPRING_PORT` | Porta da API | `8080` |
| `VITE_API_URL` | URL base para o Front | `http://localhost:8080` |
| `JWT_SECRET` | Chave de segurança | `segredo-super-forte-...` |

---

## 📚 Tecnologias Utilizadas

### **Backend**

* **Java 17/21** com **Spring Boot 4.0.1**
* **Spring Security + JWT** (Autenticação)
* **Spring Data JPA** (Persistência)
* **PostgreSQL 16** (Banco de dados) 
* **Lombok** (Produtividade)

### **Frontend**

* **React 19** 
* **TypeScript**
* **Vite** (Build tool rápida)
* **Axios** (Consumo de API)

---

## 📁 Estrutura de Pastas

* `/backend`: API REST em Java.
* `/frontend`: Interface Web em React.
* `docker-compose.yml`: Orquestração dos serviços (db, backend, frontend).
