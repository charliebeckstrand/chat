export const useChatStore = defineStore('chat', () => {
	const conversations = ref<
		Record<string, { message: string; files: any[] }>
	>({})

	const searchTerm = ref('')

	const loading = ref(false)

	const setConversationMessage = (id: string, message: string) => {
		if (conversations.value[id]) {
			conversations.value[id].message = message
		} else {
			conversations.value[id] = { message, files: [] }
		}
	}

	return {
		conversations,
		searchTerm,
		loading,
		setConversationMessage
	}
})
