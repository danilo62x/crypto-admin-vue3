# CoinPanel — Cripto & Web3 / Vue 3

[Read in English](./README.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE) ![Free](https://img.shields.io/badge/price-free-brightgreen)

Painel administrativo Vue 3 + Tailwind para o nicho "Cripto & Web3". Dashboard com KPIs do segmento, sidebar do nicho, páginas de listagem (Carteiras, Transações, Moedas, Ordens) com dados mock pt-BR, dark mode e layout responsivo. Mesmo design da família Tailwind Admin, adaptado ao vertical.

## Destaques

- Admin Vue 3 + Tailwind CSS 4 (mesmo visual da família)
- Dashboard com KPIs/gráfico do nicho Cripto & Web3
- Páginas de listagem: Carteiras, Transações, Moedas, Ordens
- Sidebar do nicho + dark mode + responsivo
- Dados mock pt-BR realistas

## Telas em destaque

- Dashboard: KPIs e gráfico do nicho
- Listagens: Tabelas com filtros e badges
- Login: Auth + tema claro/escuro

## Stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS 4

## Requisitos

- Node.js 20 ou mais novo, com npm

## Como rodar

```bash
npm install
npm run dev
```

O servidor de desenvolvimento mostra a URL local para abrir.

Conta de demonstração:

- `admin@template.com` / `admin123`
- `user@template.com` / `user123`

## Build de produção

```bash
npm run build
```

Gera o pacote de produção em `dist/`; para conferir localmente, `npm run preview`. Qualquer hospedagem estática serve; para as rotas no cliente, redirecione caminhos desconhecidos para `index.html`.

## Estrutura do projeto

```
src/
├── assets/  styles
├── components/  landing, layout, ui
├── composables/
├── i18n/  locales
├── router/
├── stores/
├── views/
```

## Outras tecnologias

Este template também existe em outras 4 tecnologias. Todas são gratuitas:

- React 19: https://github.com/danilo62x/crypto-admin-react
- Angular 19: https://github.com/danilo62x/crypto-admin-angular
- Laravel 11 + Filament v3: https://github.com/danilo62x/crypto-admin-laravel
- HTML estático: https://github.com/danilo62x/crypto-admin-html

Mais templates gratuitos (painéis admin, sistemas por segmento e apps Flutter): https://github.com/danilo62x?tab=repositories

## Licença

[MIT](./LICENSE), copyright 2026 Danilo Quinelato.
