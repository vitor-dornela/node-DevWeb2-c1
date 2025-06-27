# 🚀 C2-Web2 - Aplicação Prisma + TypeScript + Vercel

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://c2-web2.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Database](https://img.shields.io/badge/Database-Neon%20PostgreSQL-green?style=for-the-badge&logo=postgresql)](https://neon.tech)
[![ORM](https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)

## 📋 Sobre o Projeto

Esta é uma aplicação web moderna desenvolvida como demonstração de uma stack completa usando as melhores tecnologias do mercado. O projeto implementa um sistema básico de gerenciamento de usuários e posts, com foco em performance, type safety e facilidade de deployment.

## ✨ Funcionalidades

- 📊 **Dashboard Principal**: Visualização de estatísticas do banco de dados
- 👥 **Gerenciamento de Usuários**: API para listagem de usuários
- 📝 **Sistema de Posts**: API para gerenciamento de posts
- 🔗 **Relacionamentos**: Usuários podem ter múltiplos posts
- 🌐 **API RESTful**: Endpoints bem estruturados e documentados

## 🛠️ Tecnologias Utilizadas

### Frontend & Backend
- **[Next.js 14](https://nextjs.org)** - Framework React com App Router
- **[TypeScript](https://typescriptlang.org)** - Tipagem estática para JavaScript
- **[React 18](https://react.dev)** - Biblioteca para interfaces de usuário

### Banco de Dados & ORM
- **[Prisma](https://prisma.io)** - ORM moderno e type-safe
- **[Neon PostgreSQL](https://neon.tech)** - Banco de dados PostgreSQL serverless
- **[Prisma Client](https://prisma.io/client)** - Cliente auto-gerado para acesso ao banco

### Deploy & Infraestrutura
- **[Vercel](https://vercel.com)** - Plataforma de deploy e hosting
- **[GitHub](https://github.com)** - Controle de versão e CI/CD

## 🏗️ Arquitetura do Projeto

```
c2-web2/
├── 📁 app/                    # App Router do Next.js
│   ├── 📁 api/               # API Routes
│   │   ├── 📁 users/         # Endpoints de usuários
│   │   └── 📁 posts/         # Endpoints de posts
│   ├── 📄 layout.tsx         # Layout principal
│   └── 📄 page.tsx           # Página inicial
├── 📁 lib/                   # Utilitários e configurações
│   └── 📄 prisma.ts          # Cliente Prisma singleton
├── 📁 prisma/                # Configurações do Prisma
│   ├── 📄 schema.prisma      # Schema do banco de dados
│   └── 📄 seed.ts            # Script de seed
├── 📄 package.json           # Dependências do projeto
├── 📄 vercel.json            # Configurações do Vercel
└── 📄 README.md              # Este arquivo
```

## 🗄️ Modelo de Dados

### Usuário (User)
```typescript
{
  id: string        // ID único
  email: string     // Email único
  name?: string     // Nome opcional
  createdAt: Date   // Data de criação
  updatedAt: Date   // Data de atualização
  posts: Post[]     // Posts do usuário
}
```

### Post
```typescript
{
  id: string        // ID único
  title: string     // Título do post
  content?: string  // Conteúdo opcional
  published: boolean // Status de publicação
  authorId: string  // ID do autor
  author: User      // Relação com usuário
  createdAt: Date   // Data de criação
  updatedAt: Date   // Data de atualização
}
```

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn
- Conta no Neon (para banco de dados)

### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/c2-web2.git
cd c2-web2
```

2. **Instale as dependências**
```bash
npm install --legacy-peer-deps
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env.local
echo "DATABASE_URL=sua_url_do_neon_aqui" > .env.local
```

4. **Configure o banco de dados**
```bash
# Gere o cliente Prisma
npx prisma generate

# Execute as migrações (se necessário)
npx prisma db push

# Popule o banco com dados de exemplo
npx prisma db seed
```

5. **Execute o projeto**
```bash
npm run dev
```

6. **Acesse a aplicação**
```
http://localhost:3000
```

## 📡 Endpoints da API

### Usuários
- `GET /api/users` - Lista todos os usuários com seus posts

### Posts
- `GET /api/posts` - Lista todos os posts com informações do autor

### Exemplo de Resposta
```json
{
  "id": "user_123",
  "email": "usuario@exemplo.com",
  "name": "João Silva",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "posts": [
    {
      "id": "post_456",
      "title": "Meu Primeiro Post",
      "content": "Conteúdo do post...",
      "published": true,
      "authorId": "user_123",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## 🌐 Deploy

A aplicação está automaticamente configurada para deploy no Vercel:

1. **Push para o GitHub** - Qualquer push para a branch `main` dispara o deploy
2. **Build automático** - O Vercel executa `prisma generate` e `next build`
3. **Variáveis de ambiente** - Configuradas automaticamente via integração Neon

### URL de Produção
🔗 **[https://c2-web2-vitor-dornela.vercel.app/](https://c2-web2-vitor-dornela.vercel.app/)**

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Gera build de produção
npm run start        # Executa build de produção
npm run lint         # Executa linting do código
```

## 📈 Próximos Passos

- [ ] Implementar autenticação de usuários
- [ ] Adicionar formulários para criação de usuários e posts
- [ ] Implementar paginação nas listagens
- [ ] Adicionar sistema de busca
- [ ] Melhorar o design com Tailwind CSS
- [ ] Implementar testes automatizados
- [ ] Adicionar validação de dados com Zod

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento web moderno.

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**
