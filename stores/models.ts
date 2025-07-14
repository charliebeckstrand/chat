import type { Model } from '@/types/model'

export const useModelsStore = defineStore('models', () => {
	const models = ref<Model[]>([])

	models.value = ['gpt-4o', 'gpt-4-turbo']

	const searchTerm = ref('')

	return {
		models,
		searchTerm
	}
})
