import { defineStore } from 'pinia'

export interface MenuItem {
  label: string
  icon: string
  href?: string
  action?: string
  children?: MenuItem[]
  badge?: string
}

export interface MenuSection {
  title: string
  items: MenuItem[]
}

export const useMenuStore = defineStore('menu', () => {
  const sections: MenuSection[] = [
    {
      title: 'Menu',
      items: [
        { label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
      ],
    },
    {
      title: 'Cripto',
      items: [
        { label: 'Carteiras', icon: 'wallet', href: '/wallets' },
        { label: 'Transações', icon: 'swap', href: '/transactions' },
        { label: 'Moedas', icon: 'coins', href: '/coins' },
        { label: 'Ordens', icon: 'list', href: '/orders' },
      ],
    },
    {
      title: 'Gestão',
      items: [
        { label: 'Usuários', icon: 'users', href: '/users' },
        { label: 'Caixa de entrada', icon: 'mail', href: '/inbox', badge: '3' },
        {
          label: 'Financeiro',
          icon: 'dollar',
          children: [
            { label: 'Faturas', icon: 'dollar', href: '/invoice' },
            { label: 'Cobrança', icon: 'tag', href: '/billing' },
          ],
        },
      ],
    },
    {
      title: 'Sistema',
      items: [
        { label: 'Analytics', icon: 'chart', href: '/charts' },
        { label: 'Configurações', icon: 'settings', href: '/settings' },
        { label: 'Perfil', icon: 'user', href: '/profile' },
      ],
    },
  ]

  const footerItems: MenuItem[] = [{ label: 'Sair', icon: 'logout', action: 'logout' }]

  return { sections, footerItems }
})
