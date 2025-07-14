import type { Conversation } from '@/types/conversation'
import type { Message } from '@/types/message'

export const useConversationStore = defineStore('conversation', () => {
	const conversations = ref<Conversation[]>([])
	const selectedConversation = ref<Conversation | null>(null)

	const searchTerm = ref('')
	const showMobileConversationsSidebar = ref(false)
	const showModelsSidebar = ref(false)

	const selectConversation = (conversation: Conversation) => {
		selectedConversation.value = conversation
	}

	const newConversation = () => {
		const generateTitle = () => {
			const randomNumber = Math.floor(Math.random() * 10000)

			return `Conversation ${randomNumber}`
		}

		const conversation: Conversation = {
			id: crypto.randomUUID(),
			title: generateTitle(),
			model: 'gpt-4o',
			createdAt: new Date(),
			messages: [
				{
					id: crypto.randomUUID(),
					role: 'assistant',
					content: 'Hello! How can I assist you today?',
					createdAt: new Date()
				}
			]
		}

		conversations.value.unshift(conversation)

		selectedConversation.value = conversation
	}

	const addConversation = (conversation: Conversation) => {
		conversations.value.unshift(conversation)
	}

	const removeConversation = (conversationId: string) => {
		const index = conversations.value.findIndex(
			(c) => c.id === conversationId
		)

		if (selectedConversation.value?.id === conversationId) {
			const fallback =
				conversations.value[index - 1] ??
				conversations.value[index + 1] ??
				null

			selectedConversation.value = fallback
		}

		conversations.value = conversations.value.filter(
			(c) => c.id !== conversationId
		)
	}

	const addMessage = (message: Message) => {
		if (!selectedConversation.value) return

		selectedConversation.value.messages?.push(message)
	}

	return {
		conversations,
		selectedConversation,
		searchTerm,
		showMobileConversationsSidebar,
		showModelsSidebar,
		selectConversation,
		newConversation,
		addConversation,
		removeConversation,
		addMessage
	}
})
