<script setup lang="ts">
const { newConversation } = useConversationStore()
const { conversations, searchTerm } = storeToRefs(useConversationStore())

const searching = ref(false)

const startSearch = () => {
	searching.value = !searching.value
}

const cancelSearch = () => {
	searching.value = false
	searchTerm.value = ''
}
</script>

<template>
	<div class="flex items-center justify-between p-5 min-h-[84px]">
		<template v-if="searching">
			<nui-input
				v-model="searchTerm"
				autofocus
				variant="none"
				size="xl"
				class="w-full"
				:ui="{ base: 'text-[18px] px-0' }"
				placeholder="Search"
				@blur="cancelSearch"
				@keydown.esc="cancelSearch"
			/>
			<ui-button
				variant="ghost"
				color="danger"
				square
				@click.stop.prevent="cancelSearch"
			>
				<ui-icon name="ic:twotone-close" />
			</ui-button>
		</template>
		<template v-else>
			<div class="text-white font-bold text-[18px] leading-none mr-5">
				Conversations
			</div>
			<div class="flex gap-1">
				<ui-button
					v-if="conversations.length"
					variant="ghost"
					color="white"
					square
					@click="startSearch"
				>
					<ui-icon name="ic:twotone-manage-search" />
				</ui-button>
				<ui-button
					variant="ghost"
					color="white"
					square
					@click="newConversation"
				>
					<ui-icon name="ic:twotone-plus" />
				</ui-button>
			</div>
		</template>
	</div>
</template>
