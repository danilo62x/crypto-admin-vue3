<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-title-sm font-bold text-heading">Transações</h1>
      <p class="mt-1 text-sm text-muted">
        Histórico completo de movimentações cripto.
      </p>
    </div>

    <CardComponent title="Histórico de transações" subtitle="Filtre por tipo, status ou pesquise por trader" icon="swap">
      <template #toolbar>
        <div class="flex flex-wrap items-center gap-2">
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
            v-model="typeFilter"
            class="h-9 rounded-lg border border-themed bg-card-bg px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring surface-card"
          >
            <option value="">Todos os tipos</option>
            <option value="Compra">Compra</option>
            <option value="Venda">Venda</option>
            <option value="Transferência">Transferência</option>
          </select>
          <select
            v-model="statusFilter"
            class="h-9 rounded-lg border border-themed bg-card-bg px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring surface-card"
          >
            <option value="">Todos os status</option>
            <option value="Concluída">Concluída</option>
            <option value="Pendente">Pendente</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
      </template>

      <div v-if="selected.length > 0" class="mb-3 flex items-center justify-between rounded-lg bg-brand-50 px-4 py-2 text-sm dark:bg-brand-500/10">
        <span class="font-medium text-brand-700 dark:text-brand-400">
          {{ selected.length }} {{ selected.length === 1 ? 'transação selecionada' : 'transações selecionadas' }}
        </span>
        <div class="flex gap-2">
          <button class="rounded-md border border-brand-300 px-2.5 py-1 text-xs font-medium text-brand-700 hover:bg-brand-100 dark:border-brand-500/40 dark:text-brand-400 dark:hover:bg-brand-500/20">Exportar CSV</button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-themed text-xs uppercase tracking-wide text-muted">
            <tr>
              <th class="w-12 py-3">
                <input
                  type="checkbox"
                  :checked="allSelected"
                  class="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
                  @change="toggleAll"
                />
              </th>
              <th class="py-3 pr-4 font-medium">TX Hash</th>
              <th class="py-3 pr-4 font-medium">Trader</th>
              <th class="py-3 pr-4 font-medium">Par</th>
              <th class="py-3 pr-4 font-medium">Tipo</th>
              <th class="py-3 pr-4 font-medium">Quantidade</th>
              <th class="py-3 pr-4 font-medium">Valor (BRL)</th>
              <th class="py-3 pr-4 font-medium">Status</th>
              <th class="py-3 pr-4 font-medium">Data</th>
              <th class="py-3 pr-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-themed">
            <tr v-for="row in filteredRows" :key="row.id" class="text-body">
              <td class="py-3">
                <input
                  type="checkbox"
                  v-model="selected"
                  :value="row.id"
                  class="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
                />
              </td>
              <td class="py-3 pr-4 font-mono text-xs text-muted">{{ row.hash }}</td>
              <td class="py-3 pr-4 font-medium text-heading">{{ row.trader }}</td>
              <td class="py-3 pr-4 font-mono text-xs font-semibold text-heading">{{ row.pair }}</td>
              <td class="py-3 pr-4">
                <span
                  :class="[
                    'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                    row.type === 'Compra'
                      ? 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
                      : row.type === 'Venda'
                        ? 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
                        : 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400',
                  ]"
                >
                  {{ row.type }}
                </span>
              </td>
              <td class="py-3 pr-4 text-heading">{{ row.quantity }}</td>
              <td class="py-3 pr-4 font-medium text-heading">R$ {{ row.amount }}</td>
              <td class="py-3 pr-4">
                <span :class="['inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', statusClass(row.status)]">
                  {{ row.status }}
                </span>
              </td>
              <td class="py-3 pr-4 text-muted">{{ row.date }}</td>
              <td class="py-3 pr-4">
                <div class="flex items-center justify-end gap-1">
                  <button class="rounded-md p-1.5 text-muted hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-gray-800">
                    <IconBase name="eye" :size="16" />
                  </button>
                  <button class="rounded-md p-1.5 text-muted hover:bg-gray-100 hover:text-brand-500 dark:hover:bg-gray-800">
                    <IconBase name="copy" :size="16" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredRows.length === 0">
              <td colspan="10" class="py-8 text-center text-sm text-muted">
                Nenhuma transação encontrada.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template #footer>
        <div class="flex items-center justify-between text-xs text-muted">
          <span>Mostrando {{ filteredRows.length }} de {{ rows.length }} transações</span>
          <div class="flex items-center gap-1">
            <button class="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">Anterior</button>
            <button class="rounded-md bg-brand-500 px-2.5 py-1 text-white">1</button>
            <button class="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">2</button>
            <button class="rounded-md border border-themed px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">3</button>
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
onMounted(() => ui.setPageTitle('Transações'))

const rows = [
  { id: '1', hash: '0x4a9f...d1e2', trader: 'Marina Costa', pair: 'BTC/BRL', type: 'Compra', quantity: '0,2314 BTC', amount: '14.320,00', status: 'Concluída', date: 'Hoje, 09:42' },
  { id: '2', hash: '0x7b2c...f8a1', trader: 'Lucas Pereira', pair: 'ETH/BRL', type: 'Venda', quantity: '3,85 ETH', amount: '8.910,00', status: 'Pendente', date: 'Hoje, 08:55' },
  { id: '3', hash: '0x1d8e...c3b4', trader: 'Aline Souza', pair: 'SOL/BRL', type: 'Compra', quantity: '18,72 SOL', amount: '2.450,00', status: 'Concluída', date: 'Ontem, 17:22' },
  { id: '4', hash: '0x9e3a...7f2c', trader: 'Rafael Lima', pair: 'BTC/BRL', type: 'Venda', quantity: '0,8500 BTC', amount: '52.800,00', status: 'Cancelada', date: '25/06/2026' },
  { id: '5', hash: '0x2c5b...a9d1', trader: 'Bianca Rocha', pair: 'BNB/BRL', type: 'Compra', quantity: '12,30 BNB', amount: '3.180,00', status: 'Concluída', date: '24/06/2026' },
  { id: '6', hash: '0x6f1d...e4b8', trader: 'Pedro Alves', pair: 'ETH/BRL', type: 'Transferência', quantity: '1,00 ETH', amount: '2.315,00', status: 'Concluída', date: '23/06/2026' },
  { id: '7', hash: '0x3a7c...b2f5', trader: 'Carla Mendes', pair: 'SOL/BRL', type: 'Venda', quantity: '45,00 SOL', amount: '5.940,00', status: 'Pendente', date: '22/06/2026' },
  { id: '8', hash: '0x8d4e...c1a9', trader: 'Felipe Santos', pair: 'BTC/BRL', type: 'Compra', quantity: '0,1020 BTC', amount: '6.340,00', status: 'Concluída', date: '21/06/2026' },
]

const search = ref('')
const typeFilter = ref('')
const statusFilter = ref('')
const selected = ref<string[]>([])

const filteredRows = computed(() =>
  rows.filter((r) => {
    if (search.value && !r.trader.toLowerCase().includes(search.value.toLowerCase()) && !r.hash.toLowerCase().includes(search.value.toLowerCase())) return false
    if (typeFilter.value && r.type !== typeFilter.value) return false
    if (statusFilter.value && r.status !== statusFilter.value) return false
    return true
  })
)

const allSelected = computed(
  () => filteredRows.value.length > 0 && filteredRows.value.every((r) => selected.value.includes(r.id))
)

function toggleAll() {
  if (allSelected.value) selected.value = []
  else selected.value = filteredRows.value.map((r) => r.id)
}

function statusClass(status: string) {
  if (status === 'Concluída') return 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
  if (status === 'Pendente') return 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'
  return 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
}
</script>
