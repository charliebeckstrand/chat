export default defineNuxtRouteMiddleware(() => {
	const { newConversation } = useConversationStore()
	const { conversations } = storeToRefs(useConversationStore())

	if (!conversations.value.length) {
		newConversation()
	}
})
