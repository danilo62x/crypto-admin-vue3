<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-title-sm font-bold text-heading">Dashboard</h1>
        <p class="mt-1 text-sm text-muted">
          Visão geral do mercado cripto nos últimos 30 dias.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <select class="h-10 rounded-lg border border-themed bg-card-bg px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring surface-card">
          <option>Últimos 30 dias</option>
          <option>Últimos 7 dias</option>
          <option>Este mês</option>
          <option>Este ano</option>
        </select>
        <button class="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
          <IconBase name="plus" :size="16" /> Nova ordem
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard title="Volume (30d)" value="R$ 4,82M" icon="dollar" accent="brand" trend="up" trend-value="18,3%" />
      <StatsCard title="Ordens Executadas" value="12.874" icon="list" accent="success" trend="up" trend-value="7,6%" />
      <StatsCard title="Carteiras Ativas" value="3.291" icon="wallet" accent="warning" trend="up" trend-value="5,1%" />
      <StatsCard title="Traders Ativos" value="1.048" icon="users" accent="info" trend="down" trend-value="1,4%" />
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <CardComponent title="Volume negociado (mensal)" subtitle="Comparativo do semestre em R$" icon="chart" class="xl:col-span-2">
        <div class="space-y-4">
          <div v-for="row in volumeChart" :key="row.label" class="flex items-center gap-4">
            <span class="w-12 text-xs font-medium text-muted">{{ row.label }}</span>
            <div class="flex h-3 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                class="bg-brand-500 transition-all"
                :style="{ width: row.value + '%' }"
              />
            </div>
            <span class="w-24 text-right text-sm font-medium text-heading">
              R$ {{ row.amount }}
            </span>
          </div>
        </div>
      </CardComponent>

      <CardComponent title="Moedas mais negociadas" subtitle="Top 5 ativos do período" icon="coins">
        <ul class="space-y-4">
          <li v-for="coin in topCoins" :key="coin.symbol" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span
                class="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold"
                :class="coin.bg"
              >
                {{ coin.symbol }}
              </span>
              <div>
                <p class="text-sm font-medium text-heading">{{ coin.name }}</p>
                <p class="text-xs text-muted">{{ coin.volume }} vol.</p>
              </div>
            </div>
            <span
              class="text-xs font-semibold"
              :class="coin.delta.startsWith('-') ? 'text-error-500' : 'text-success-600'"
            >
              {{ coin.delta }}
            </span>
          </li>
        </ul>
      </CardComponent>
    </div>

    <CardComponent title="Transações recentes" subtitle="Últimas movimentações registradas" icon="swap">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-themed text-xs uppercase tracking-wide text-muted">
            <tr>
              <th class="py-3 pr-4 font-medium">Trader</th>
              <th class="py-3 pr-4 font-medium">Par</th>
              <th class="py-3 pr-4 font-medium">Tipo</th>
              <th class="py-3 pr-4 font-medium">Valor (BRL)</th>
              <th class="py-3 pr-4 font-medium">Status</th>
              <th class="py-3 pr-4 font-medium">Data</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-themed">
            <tr v-for="row in recentTransactions" :key="row.id" class="text-body">
              <td class="py-3 pr-4">
                <div class="flex items-center gap-3">
                  <span class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                    {{ row.initials }}
                  </span>
                  <span class="text-heading">{{ row.name }}</span>
                </div>
              </td>
              <td class="py-3 pr-4 font-mono text-xs font-semibold text-heading">{{ row.pair }}</td>
              <td class="py-3 pr-4">
                <span
                  :class="[
                    'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                    row.type === 'Compra'
                      ? 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
                      : 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500',
                  ]"
                >
                  {{ row.type }}
                </span>
              </td>
              <td class="py-3 pr-4 font-medium text-heading">R$ {{ row.amount }}</td>
              <td class="py-3 pr-4">
                <span
                  :class="[
                    'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                    statusClass(row.status),
                  ]"
                >
                  {{ row.status }}
                </span>
              </td>
              <td class="py-3 pr-4 text-muted">{{ row.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import StatsCard from '@/components/ui/StatsCard.vue'
import CardComponent from '@/components/ui/CardComponent.vue'
import IconBase from '@/components/ui/IconBase.vue'

const ui = useUiStore()

onMounted(() => ui.setPageTitle('Dashboard'))

const volumeChart = [
  { label: 'Jan', value: 55, amount: '620K' },
  { label: 'Fev', value: 70, amount: '812K' },
  { label: 'Mar', value: 48, amount: '541K' },
  { label: 'Abr', value: 85, amount: '1,03M' },
  { label: 'Mai', value: 100, amount: '1,38M' },
  { label: 'Jun', value: 78, amount: '910K' },
]

const topCoins = [
  { symbol: 'BTC', name: 'Bitcoin', volume: 'R$ 2,1M', delta: '+4,2%', bg: 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500' },
  { symbol: 'ETH', name: 'Ethereum', volume: 'R$ 1,3M', delta: '+2,8%', bg: 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400' },
  { symbol: 'SOL', name: 'Solana', volume: 'R$ 540K', delta: '+9,1%', bg: 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500' },
  { symbol: 'BNB', name: 'BNB Chain', volume: 'R$ 320K', delta: '-1,5%', bg: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500' },
  { symbol: 'MATIC', name: 'Polygon', volume: 'R$ 198K', delta: '+6,7%', bg: 'bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-500/15 dark:text-blue-light-500' },
]

const recentTransactions = [
  { id: 1, name: 'Marina Costa', initials: 'MC', pair: 'BTC/BRL', type: 'Compra', amount: '14.320,00', status: 'Concluída', date: 'Hoje, 09:42' },
  { id: 2, name: 'Lucas Pereira', initials: 'LP', pair: 'ETH/BRL', type: 'Venda', amount: '8.910,00', status: 'Pendente', date: 'Hoje, 08:55' },
  { id: 3, name: 'Aline Souza', initials: 'AS', pair: 'SOL/BRL', type: 'Compra', amount: '2.450,00', status: 'Concluída', date: 'Ontem, 17:22' },
  { id: 4, name: 'Rafael Lima', initials: 'RL', pair: 'BTC/BRL', type: 'Venda', amount: '52.800,00', status: 'Cancelada', date: '25/06/2026' },
  { id: 5, name: 'Bianca Rocha', initials: 'BR', pair: 'BNB/BRL', type: 'Compra', amount: '3.180,00', status: 'Concluída', date: '24/06/2026' },
]

function statusClass(status: string) {
  if (status === 'Concluída') return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
  if (status === 'Pendente') return 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
  return 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
}
</script>
