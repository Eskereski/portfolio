# Demétrius Eskereski | Portfolio

<img width="1125" height="662" alt="Portfolio Preview" src="https://github.com/user-attachments/assets/6c1f50d9-5e29-4279-b67e-8fb0639bc8f9" />

Um portfólio pessoal construído não apenas para exibir projetos, mas para demonstrar **fundamentos sólidos de arquitetura web**. Desenvolvido com **Next.js**, **TypeScript** e **Tailwind CSS**, o sistema utiliza uma abordagem **serverless** para consumir, enriquecer e fazer cache dinâmico de dados da **API do GitHub**.

---

## ✨ Destaques de Engenharia

Em vez de um site estático tradicional, este projeto implementa uma **arquitetura híbrida de consumo de dados**:

- **🔗 Data Enrichment Híbrido** — Consome dados brutos (stars, repos, languages) da GitHub REST API v3 e os mescla no servidor com metadados locais customizados (imagens, tags descritivas).

- **🔄 Revalidação Baseada em Eventos** — Implementação de um webhook que escuta eventos de push no GitHub e aciona a revalidação do cache (On-Demand Revalidation) validando a autenticidade da requisição via assinatura criptográfica **HMAC-SHA256**.

- **⚡ Estratégia de Cache (ISR)** — Otimização de performance e proteção contra rate limits da API através de Incremental Static Regeneration, garantindo respostas quase instantâneas.

- **🌍 Internacionalização (i18n)** — Suporte integrado para renderização em português (PT) e inglês (EN).

---

## 🛠️ Tech Stack

| Camada | Tecnologia |
|--------|-----------|
| **Frontend UI** | Next.js (App Router), React, Tailwind CSS, Framer Motion |
| **Backend & APIs** | Node.js (Route Handlers Serverless) |
| **Integração** | GitHub REST API |
| **Infra & Deploy** | Vercel |
| **Validação** | Zod |

---

## 📁 Arquitetura do Sistema

```
src/
├── app/
│   ├── api/
│   │   └── projects/route.ts      # Backend: Endpoint de agregação e Webhook de revalidação
│   ├── projects/page.tsx          # Server Component: Consome a API local e renderiza a view
│   ├── layout.tsx                 # Root layout com injeção de metadata SEO
│   └── ...
├── components/                    # Componentes modulares e reutilizáveis (Header, UI, etc)
├── lib/
│   ├── projects.ts                # Dicionário local para data enrichment (imagens, descrições)
│   ├── i18n.ts                    # Lógica de internacionalização
│   └── utils.ts                   # Helpers e validações
├── public/
│   └── images/                    # Assets estáticos otimizados
```

---

## 🔧 Fluxo de Dados (Data Flow)

1. **Requisição** — O Server Component da página de projetos faz uma chamada interna para a rota `/api/projects`.

2. **Fetch** — O Route Handler autentica com um **Fine-grained PAT** e busca os repositórios atualizados do GitHub.

3. **Enrichment** — A função de agregação faz o merge dos dados da API com o array estático em `src/lib/projects.ts`, inserindo imagens de capa e classificando os projetos em destaque.

4. **Cache** — O resultado é formatado e enviado ao frontend, onde sofre cache. O cache só é rompido quando o webhook do GitHub dispara um POST validado para o endpoint.

---

## 🎯 Roadmap e Próximos Passos

A evolução deste projeto foi planejada desde o início com etapas claramente definidas. Abaixo está o progresso até o momento:

### ✅ Etapas Concluídas

- [x] **Estrutura Inicial do Site** — Página home com hero section, animações e CTA buttons
- [x] **Menu Header Responsivo** — Navegação com suporte mobile, hamburger menu e dark mode toggle
- [x] **Páginas Essenciais** — About, Contact, Projects (layout pronto)
- [x] **Internacionalização (i18n)** — Suporte português (PT) e inglês (EN)
- [x] **Integração à GitHub API** — Fetch de repositórios com Fine-grained PAT autenticado
- [x] **Data Enrichment** — Merge de dados da API com metadata local customizada
- [x] **On-Demand Revalidation** — Webhook com validação HMAC-SHA256
- [x] **Route Handler /api/projects** — Backend serverless para agregação de dados
- [x] **Página Projects Dinâmica** — Server Component consumindo API interna
- [x] **Dark Mode & Responsividade** — Tailwind CSS com suporte completo a light/dark themes

### 📋 Próximas Implementações

A evolução do projeto continua com foco em observabilidade e automação:

- [ ] **Integração de Analytics** — Configuração do Vercel Analytics para monitoramento de tráfego e comportamento do usuário.
- [ ] **CI/CD Pipeline** — Implementação de GitHub Actions para rotinas de validação de código (lint/typecheck/formatting) antes do deploy.
- [ ] **Testes Automatizados** — Cobertura de testes unitários com Vitest nas funções de agregação de dados e validação de schemas.
- [ ] **Otimizações de SEO Avançado** — Injeção dinâmica de Schema.org (JSON-LD), sitemap.xml automatizado e robots.txt.
- [ ] **Blog/Artigos** — Integração com MDX para publicação de conteúdo técnico e documentação de aprendizados.

---

## 📋 Referência de Manutenção Interna

Esta seção serve como documentação para manutenção do ambiente de produção.

### Variáveis de Ambiente Necessárias

| Variável | Descrição | Escopo |
|----------|-----------|--------|
| `GITHUB_TOKEN` | Fine-grained PAT (Permissão: `Contents: Read-only`) | ✅ Obrigatória |
| `GITHUB_USERNAME` | Handle do usuário GitHub | ✅ Obrigatória |
| `REVALIDATION_SECRET` | Chave simétrica para HMAC do Webhook | ✅ Obrigatória |

### Adição de Novos Projetos

1. Criar repositório público no GitHub
2. Adicionar metadados em `src/lib/projects.ts`:
```typescript
{
  repoName: 'meu-novo-projeto',
  image: '/images/meu-novo-projeto.png',
  tags: ['React', 'Node.js', 'TypeScript'],
  description: 'Descrição do projeto...',
  featured: true,
}
```

3. Realizar commit e push
4. O Webhook cuidará da revalidação do cache automaticamente em produção

### Configurar Webhook no GitHub

1. Repo → **Settings** → **Webhooks** → **Add webhook**
2. **Payload URL:** `https://seu-domain/api/projects?secret=SEU_SECRET`
3. **Content type:** `application/json`
4. **Events:** `Push`
5. **Secret:** Mesmo valor que `REVALIDATION_SECRET`

---

## 📚 Build & Deploy

### Build Local
```bash
npm run build
npm run start
```

### Deploy em Vercel

1. Conectar repositório no [Vercel Dashboard](https://vercel.com)
2. Adicionar **Environment Variables**:
   - `GITHUB_TOKEN`
   - `GITHUB_USERNAME`
   - `REVALIDATION_SECRET`
3. Deploy automático ao fazer push para `master`

---

Construído por **Demétrius Eskereski** | [GitHub](https://github.com/Eskereski) | [LinkedIn](https://linkedin.com)
