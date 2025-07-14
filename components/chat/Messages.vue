<script setup lang="ts">
const { selectedConversation } = storeToRefs(useConversationStore())

const { searchTerm, loading } = storeToRefs(useChatStore())

const setRef = (component: any) => {
	nextTick(() => {
		if (!component || !component?.$el) return

		const element = component.$el

		element.scrollIntoViewIfNeeded()
	})
}

const filteredMessages = computed(() => {
	return selectedConversation.value?.messages.filter((message) => {
		return message.content
			.toLowerCase()
			.includes(searchTerm.value.toLowerCase())
	})
})
</script>

<template>
	<div
		class="flex flex-col gap-2.5 border border-gray-200 bg-gray-100 p-5 rounded-lg h-full w-full overflow-y-auto"
	>
		<template v-if="filteredMessages?.length">
			<MessageCard
				:ref="setRef"
				v-for="(message, index) in filteredMessages"
				:key="index"
				:message="message"
			/>
			<div
				v-if="loading"
				ref="loadingRef"
				class="flex flex-col gap-1"
			>
				<nui-skeleton class="h-4 w-[250px]" />
				<nui-skeleton class="h-4 w-[200px]" />
				<nui-skeleton class="h-4 w-[150px]" />
			</div>
		</template>
		<div
			v-else
			class="flex"
		>
			<div class="bg-danger/10 text-danger p-5 rounded-lg">
				No messages match your search
			</div>
		</div>
	</div>
</template>
