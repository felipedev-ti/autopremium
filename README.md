# 🚗 AutoPremium

Um sistema profissional e moderno para gestão automóvel. O **AutoPremium** permite listar veículos, pesquisar por marca ou especificações e gerir utilizadores através de um sistema de autenticação seguro.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as melhores e mais recentes práticas de Engenharia de Software para Frontend:

* **[React 19](https://react.dev/)** - Biblioteca principal para a construção da interface de utilizador.
* **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para um código mais seguro e previsível.
* **[Vite](https://vitejs.dev/)** - *Bundler* super-rápido para o ambiente de desenvolvimento.
* **[Supabase](https://supabase.com/)** - Backend-as-a-Service (BaaS) utilizado para a base de dados PostgreSQL e Autenticação.
* **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utilitário para um design responsivo e moderno.
* **[React Router DOM](https://reactrouter.com/)** - Gestão de rotas e navegação da aplicação.

## ✨ Funcionalidades (Features)

- **Arquitetura Limpa:** Código organizado em `pages`, `components`, `contexts` e `lib`.
- **Autenticação Global:** Sistema de *Login/Logout* gerido por um `AuthContext` dedicado, evitando chamadas redundantes à base de dados.
- **Interface Modular:** Componentes reutilizáveis (como o `Header` dinâmico) baseados no estado do utilizador.
- **Integração com Base de Dados:** Leitura de veículos em tempo real utilizando o cliente Supabase.

## 🚀 Como correr o projeto localmente

1. Clone o repositório:
```bash
git clone [https://github.com/SEU_USUARIO/autopremium.git](https://github.com/SEU_USUARIO/autopremium.git)


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
