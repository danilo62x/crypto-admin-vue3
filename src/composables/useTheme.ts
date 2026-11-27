import { watch } from 'vue'
import { useUiStore } from '@/stores/ui'

export function useTheme() {
  const ui = useUiStore()

  function init() {
    ui.applyTheme()
    document.title = 'Tailwind CoinPanel'
  }

  watch(
    () => ui.darkMode,
    () => ui.applyTheme()
  )

  return { init }
}
