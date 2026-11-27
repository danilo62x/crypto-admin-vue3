# CoinPanel: Crypto & Web3 / Vue 3

[Leia em português](./README.pt-BR.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE) ![Free](https://img.shields.io/badge/price-free-brightgreen)

An admin panel for crypto & web3 in Vue 3 and Tailwind CSS: a dashboard with the segment's KPIs and chart, a sidebar for the niche and listing pages for wallets, transactions, coins and orders, with realistic mock data, dark mode and a responsive layout. It shares the design of the Tailwind Admin family.

Everything runs on mock data, so no backend, external API or service is needed.

## Highlights

- Light and dark themes
- Responsive layout from phone to desktop
- Mock data in Portuguese (Brazil), easy to replace with a real API

## Tech stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS 4

## Requirements

- Node.js 20 or newer and npm

## Getting started

```bash
npm install
npm run dev
```

The dev server prints the local URL to open.

Demo account:

- `admin@template.com` / `admin123`
- `user@template.com` / `user123`

## Build for production

```bash
npm run build
```

Writes the production bundle to `dist/`; preview it locally with `npm run preview`. Any static host works; for client-side routes, point unknown paths to `index.html`.

## Project structure

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

## Other stacks

This template also exists in 4 other stacks. All of them are free:

- React 19: https://github.com/danilo62x/crypto-admin-react
- Angular 19: https://github.com/danilo62x/crypto-admin-angular
- Laravel 11 + Filament v3: https://github.com/danilo62x/crypto-admin-laravel
- Static HTML: https://github.com/danilo62x/crypto-admin-html

More free templates (admin dashboards, vertical systems and Flutter apps): https://github.com/danilo62x?tab=repositories

## License

[MIT](./LICENSE), copyright 2026 Danilo Quinelato.
