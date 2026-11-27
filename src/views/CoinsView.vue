<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-title-sm font-bold text-heading">Moedas</h1>
      <p class="mt-1 text-sm text-muted">
        Ativos cripto disponíveis para negociação na plataforma.
      </p>
    </div>

    <CardComponent title="Listagem de moedas" subtitle="Pesquise por nome ou símbolo e filtre por categoria" icon="coins">
      <template #toolbar>
        <div class="flex items-center gap-2">
          <div class="relative">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IconBase name="search" :size="16" />
            </span>
            <input
              v-model="search"
              type="text"
              placeholder="Buscar..."
              class="h-9 w-44 rounded-lg border border-themed bg-gray-50 pl-9 pr-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
            />
          </div>
          <select
            v-model="categoryFilter"
            class="h-9 rounded-lg border border-themed bg-card-bg px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring surface-card"
          >
            <option value="">Todas</option>
            <option value="Layer 1">Layer 1</option>
            <option value="Layer 2">Layer 2</option>
            <option value="DeFi">DeFi</option>
            <option value="Stablecoin">Stablecoin</option>
          </select>
          <select
            v-model="statusFilter"
            class="h-9 rounded-lg border border-themed bg-card-bg px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring surface-card"
          >
            <option value="">Todos status</option>
            <option value="Ativo">Ativo</option>
            <option value="Suspenso">Suspenso</option>
          </select>
        </div>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-themed text-xs uppercase tracking-wide text-muted">
            <tr>
              <th class="py-3 pr-2 font-medium">#</th>
              <th class="py-3 pr-4 font-medium">Moeda</th>
              <th class="py-3 pr-4 font-medium">Símbolo</th>
              <th class="py-3 pr-4 font-medium">Categoria</th>
              <th class="py-3 pr-4 font-medium">Preço (BRL)</th>
              <th class="py-3 pr-4 font-medium">Variação 24h</th>
              <th class="py-3 pr-4 font-medium">Cap. Mercado</th>
              <th class="py-3 pr-4 font-medium">Status</th>
              <th class="py-3 pr-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-themed">
            <tr v-for="(row, index) in filteredRows" :key="row.id" class="text-body">
              <td class="py-3 pr-2 text-xs text-muted font-medium">{{ index + 1 }}</td>
              <td class="py-3 pr-4">
                <div class="flex items-center gap-3">
                  <span
                    class="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold"
                    :class="coinBg(row.symbol)"
                  >
                    {{ row.symbol.slice(0, 3) }}
                  </span>
                  <span class="font-medium text-heading">{{ row.name }}</span>
                </div>
              </td>
              <td class="py-3 pr-4 font-mono text-xs font-semibold text-muted">{{ row.symbol }}</td>
              <td class="py-3 pr-4">
                <span :class="['inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', categoryClass(row.category)]">
                  {{ row.category }}
                </span>
              </td>
              <td class="py-3 pr-4 font-medium text-heading">R$ {{ row.price }}</td>
              <td class="py-3 pr-4">
                <span
                  class="text-xs font-semibold"
                  :class="row.change.startsWith('-') ? 'text-error-500' : 'text-success-600'"
                >
                  {{ row.change }}
                </span>
              </td>
              <td class="py-3 pr-4 text-muted">{{ row.marketCap }}</td>
              <td class="py-3 pr-4">
                <span :class="['inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', statusClass(row.status)]">
                  {{ row.status }}
                </span>
              </td>
              <td class="py-3 pr-4">
                <div class="flex items-center justify-end gap-1">
                  <button class="rounded-md p-1.5 text-muted hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-gray-800">
                    <IconBase name="eye" :size="16" />
                  </button>
                  <button class="rounded-md p-1.5 text-muted hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-gray-800">
                    <IconBase name="edit" :size="16" />
                  </button>
                  <button class="rounded-md p-1.5 text-muted hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/15">
                    <IconBase name="trash" :size="16" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredRows.length === 0">
              <td colspan="9" class="py-8 text-center text-sm text-muted">
                Nenhuma moeda encontrada.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template #footer>
        <div class="flex items-center justify-between text-xs text-muted">
          <span>Mostrando {{ filteredRows.length }} de {{ rows.length }} moedas</span>
          <div class="flex items-center gap-1">
            <button class="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">Anterior</button>
            <button class="rounded-md bg-brand-500 px-2.5 py-1 text-white">1</button>
            <button class="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">Próximo</button>
          </div>
        </div>
      </template>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'
import IconBase from '@/components/ui/IconBase.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Moedas'))

const rows = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', category: 'Layer 1', price: '621.400,00', change: '+4,2%', marketCap: 'R$ 12,3T', status: 'Ativo' },
  { id: '2', name: 'Ethereum', symbol: 'ETH', category: 'Layer 1', price: '18.720,00', change: '+2,8%', marketCap: 'R$ 2,2T', status: 'Ativo' },
  { id: '3', name: 'Solana', symbol: 'SOL', category: 'Layer 1', price: '942,50', change: '+9,1%', marketCap: 'R$ 430B', status: 'Ativo' },
  { id: '4', name: 'BNB', symbol: 'BNB', category: 'Layer 1', price: '2.890,00', change: '-1,5%', marketCap: 'R$ 420B', status: 'Ativo' },
  { id: '5', name: 'Polygon', symbol: 'MATIC', category: 'Layer 2', price: '4,12', change: '+6,7%', marketCap: 'R$ 41B', status: 'Ativo' },
  { id: '6', name: 'Arbitrum', symbol: 'ARB', category: 'Layer 2', price: '3,84', change: '+3,4%', marketCap: 'R$ 19B', status: 'Ativo' },
  { id: '7', name: 'Uniswap', symbol: 'UNI', category: 'DeFi', price: '58,30', change: '-0,8%', marketCap: 'R$ 44B', status: 'Ativo' },
  { id: '8', name: 'Aave', symbol: 'AAVE', category: 'DeFi', price: '1.240,00', change: '+5,2%', marketCap: 'R$ 18B', status: 'Ativo' },
  { id: '9', name: 'USDT', symbol: 'USDT', category: 'Stablecoin', price: '5,72', change: '+0,0%', marketCap: 'R$ 627B', status: 'Ativo' },
  { id: '10', name: 'USD Coin', symbol: 'USDC', category: 'Stablecoin', price: '5,72', change: '+0,0%', marketCap: 'R$ 182B', status: 'Suspenso' },
]

const search = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')

const filteredRows = computed(() =>
  rows.filter((r) => {
    if (search.value && !r.name.toLowerCase().includes(search.value.toLowerCase()) && !r.symbol.toLowerCase().includes(search.value.toLowerCase())) return false
    if (categoryFilter.value && r.category !== categoryFilter.value) return false
    if (statusFilter.value && r.status !== statusFilter.value) return false
    return true
  })
)

function statusClass(status: string) {
  if (status === 'Ativo') return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
  return 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
}

function categoryClass(cat: string) {
  if (cat === 'Layer 1') return 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
  if (cat === 'Layer 2') return 'bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-500/15 dark:text-blue-light-500'
  if (cat === 'DeFi') return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
  return 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
}

function coinBg(symbol: string) {
  if (symbol === 'BTC') return 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
  if (symbol === 'ETH') return 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
  if (symbol === 'SOL') return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
  if (symbol === 'BNB') return 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400'
  return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
}
</script>
