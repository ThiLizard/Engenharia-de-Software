# EduCare Frontend

Interface web do Sistema de Comunicação e Monitoramento de Doenças no Ambiente Escolar.

## 🚀 Tecnologias

- **React 19**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **Axios**
- **Lucide React** (ícones)

## 📋 Pré-requisitos

- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🔧 Instalação

### 1. Instalar Dependências

```bash
npm install
```

ou

```bash
yarn install
```

## 🏃 Como Executar

### Modo Desenvolvimento

```bash
npm run dev
```

ou

```bash
yarn dev
```

A aplicação será iniciada em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

ou

```bash
yarn build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Preview da Build de Produção

```bash
npm run preview
```

## 🔗 Configuração da API

O frontend está configurado para se conectar ao backend em `http://localhost:8080/api`

Para alterar a URL da API, edite o arquivo `src/services/api.ts`:

```typescript
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  // ...
});
```

## 📱 Funcionalidades

### Páginas Disponíveis

- **Landing Page** (`/`) - Página inicial do projeto
- **Login** (`/login`) - Autenticação de usuários
- **Dashboard** (`/dashboard`) - Painel principal (requer autenticação)
- **Registro de Sintomas** (`/sintomas`) - Registro de sintomas (requer autenticação)
- **Chat** (`/chat`) - Comunicação (requer autenticação)

### Tipos de Usuário

O sistema suporta 4 tipos de usuários:

1. **🏫 Escola** - Gestão escolar
2. **👨‍⚕️ Médico** - Profissionais de saúde
3. **👤 Responsável** - Pais/responsáveis
4. **📊 Admin** - Administradores do sistema

## 🗂️ Estrutura do Projeto

```
src/
├── @types/          # Definições de tipos TypeScript
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes reutilizáveis
│   ├── Navbar.tsx   # Menu de navegação
│   └── ProtectedRoute.tsx  # Proteção de rotas
├── contexts/        # Contextos React (AuthContext)
├── hooks/           # Custom hooks
├── pages/           # Páginas da aplicação
│   ├── Cadastro/
│   ├── Chat/
│   ├── Dashboard/
│   ├── Login/
│   ├── LandingPage.tsx
│   └── RegistroSintomas.tsx
├── services/        # Serviços de API
│   ├── api.ts       # Configuração do Axios
│   └── authService.ts  # Serviços de autenticação
├── styles/          # Arquivos CSS
├── utils/           # Funções utilitárias
├── App.tsx          # Componente principal
└── main.tsx         # Ponto de entrada
```

## 🔐 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação:

1. Usuário faz login com email e senha
2. Backend retorna um token JWT
3. Token é armazenado no `localStorage`
4. Token é enviado automaticamente em todas as requisições via interceptor do Axios
5. Rotas protegidas verificam a presença do token

### Fluxo de Autenticação

```typescript
// Login
const response = await authService.login(email, password);
localStorage.setItem('authToken', response.token);

// Requisições autenticadas (automático)
api.get('/endpoint-protegido'); // Token incluído automaticamente
```

## 🎨 Estilos

O projeto usa CSS modular com variáveis CSS para temas consistentes:

- `Variables.css` - Variáveis de cores, fontes e espaçamentos
- `Global.css` - Estilos globais
- Arquivos CSS específicos por componente/página

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run preview` | Preview da build de produção |
| `npm run lint` | Executa o linter (ESLint) |

## 🔄 Integração com Backend

### Pré-requisitos

Certifique-se de que o backend está rodando em `http://localhost:8080`

### Endpoints Utilizados

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `GET /api/auth/me` - Obter usuário atual

## 🐛 Troubleshooting

### Erro de CORS

Se encontrar erros de CORS, verifique se:
1. O backend está rodando
2. A configuração de CORS no backend permite `http://localhost:5173`

### Erro de Conexão com API

Verifique se:
1. O backend está rodando em `http://localhost:8080`
2. A URL da API em `src/services/api.ts` está correta

### Problemas com Dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 📦 Build e Deploy

### Build de Produção

```bash
npm run build
```

### Deploy

Os arquivos da pasta `dist/` podem ser servidos por qualquer servidor web estático:

- **Netlify**: Arraste a pasta `dist/` para o Netlify
- **Vercel**: `vercel --prod`
- **GitHub Pages**: Configure o workflow do GitHub Actions
- **Servidor próprio**: Copie os arquivos de `dist/` para o servidor

### Variáveis de Ambiente para Produção

Crie um arquivo `.env.production`:

```env
VITE_API_URL=https://sua-api.com/api
```

E atualize `src/services/api.ts`:

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  // ...
});
```

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm test
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
