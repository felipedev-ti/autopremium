# AutoPremium

Sistema modular de gestão automóvel focado em performance e tipagem rigorosa. Implementa uma arquitetura de frontend escalável com gestão de estado global para autenticação e integração em tempo real com base de dados PostgreSQL.

## Stack Tecnológica

* **Core:** React 19, TypeScript
* **Routing:** React Router v7
* **Build & Tooling:** Vite, Oxlint
* **Styling:** Tailwind CSS
* **Backend & Auth:** Supabase (PostgreSQL)

## Arquitetura

O projeto segue um padrão de separação de responsabilidades (Clean Code):

* `/src/components/`: Componentes visuais reutilizáveis e agnósticos.
* `/src/contexts/`: Gestão de estado global (ex: `AuthContext`).
* `/src/pages/`: Componentes de nível de rota (Views).
* `/src/lib/`: Configurações de serviços externos e clientes de API.

## Configuração Local

1. Clone o repositório:
```bash
git clone [https://github.com/felipedev-ti/autopremium.git](https://github.com/felipedev-ti/autopremium.git)
