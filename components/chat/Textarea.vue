<script setup lang="ts">
const { selectedConversation } = storeToRefs(useConversationStore())
const { addMessage } = useConversationStore()
const { setConversationMessage } = useChatStore()
const { conversations, loading } = storeToRefs(useChatStore())

const selectedConversationId = computed(
	() => selectedConversation.value?.id ?? ''
)

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const message = computed({
	get: () => conversations.value[selectedConversationId.value]?.message ?? '',
	set: (value) => {
		setConversationMessage(selectedConversationId.value, value)
	}
})

const handleKeydown = (event: KeyboardEvent) => {
	if (event.key === 'Enter' && !event.shiftKey) {
		event.preventDefault()

		sendMessage()
	}
}

const sendMessage = () => {
	loading.value = true

	addMessage({
		id: crypto.randomUUID(),
		role: 'user',
		content: message.value,
		createdAt: new Date()
	})

	message.value = ''

	setTimeout(() => {
		loading.value = false

		addMessage({
			id: crypto.randomUUID(),
			role: 'assistant',
			content: 'This is a simulated response.',
			createdAt: new Date()
		})

		nextTick(() => {
			textareaRef.value?.focus()
		})
	}, 3000)
}
</script>

<template>
	<div
		class="flex items-center bg-gray-100 border border-gray-200 rounded-lg"
	>
		<textarea
			ref="textareaRef"
			v-model="message"
			:class="[
				'flex-1 w-full p-5 resize-none border-0 focus:outline-none transition-all',
				{ 'opacity-50': loading }
			]"
			placeholder="Send message"
			:rows="1"
			:disabled="loading"
			@keydown="handleKeydown"
		/>
		<div class="pr-2.5">
			<ui-button
				variant="ghost"
				color="primary"
				square
				:disabled="!message"
				:class="{
					'disabled:opacity-50': !loading
				}"
				@click.stop.prevent="sendMessage"
			>
				<ui-icon
					:name="
						loading
							? 'svg-spinners:90-ring'
							: 'ic:twotone-arrow-upward'
					"
				/>
			</ui-button>
		</div>
	</div>
</template>
